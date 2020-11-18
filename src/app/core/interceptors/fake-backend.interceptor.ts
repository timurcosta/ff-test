import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {
  IResolution,
  IResolutionState,
  MockDataService,
} from '@services/mock-data.service';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const mockData = this.injector.get(MockDataService);
    const { url, method, body } = request;
    return of(null).pipe(
      mergeMap(handleRoute),
      materialize(),
      delay(500),
      dematerialize()
    );

    function handleRoute() {
      switch (true) {
        case url.match(/\/resolution\/\d+$/) && method === 'GET':
          return getResolution();
        case url.endsWith('/resolution/state') && method === 'POST':
          return setResolutionState(body);
        case url.match(/\/resolution\/state\/\d+$/) && method === 'GET':
          return getResolutionState();
        default:
          return next.handle(request);
      }
    }

    function ok(
      body: IResolution | IResolutionState
    ): Observable<HttpResponse<IResolution | IResolutionState>> {
      return of(new HttpResponse({ status: 200, body }));
    }

    function getResolution(): Observable<
      HttpResponse<IResolution | IResolutionState>
    > {
      return ok(mockData.resolution);
    }

    function getResolutionState(): Observable<
      HttpResponse<IResolution | IResolutionState>
    > {
      return ok(mockData.resolutionState);
    }

    function setResolutionState(
      payload: IResolutionState
    ): Observable<HttpResponse<IResolution | IResolutionState>> {
      mockData.resolutionState = payload;
      return ok(payload);
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
