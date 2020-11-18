import { Injectable } from '@angular/core';

export interface IResolution {
  id?: number;
  title: string;
  text: string;
}

export interface IResolutionState {
  id?: number;
  approver: string;
  resolution: string;
  comment?: string;
  state: number;
}

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  _resolution: IResolution = {
    title: 'Резолюция Lorem Ipsum',
    text: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum nemo,
    exercitationem voluptatem commodi aspernatur veritatis similique quas
    aliquam voluptas, repellat impedit labore eum iusto deserunt facere cumque
    sed, ab quaerat? Necessitatibus dolorem culpa earum, et provident totam
    nesciunt quis sequi!`,
  };
  _resolutionState: IResolutionState;

  get resolution(): IResolution {
    return this._resolution;
  }

  get resolutionState(): IResolutionState {
    return this._resolutionState;
  }

  set resolutionState(value: IResolutionState) {
    this._resolutionState = value;
  }
}
