import { createReducer, on } from '@ngrx/store';
import { FlyingObject } from '../../models/aviator-colors.model';
import { AviatorActions } from '../actions';

export const featureKey = 'aviator';

export interface State {
  flyMode: boolean;
  vrSession: boolean;
  flyingObject: FlyingObject;
}

export const initialState: State = {
  flyMode: false,
  vrSession: false,
  flyingObject: 'aviator',
};

export const reducer = createReducer(
  initialState,
  on(AviatorActions.changeFlyingObject, (state, { flyingObject }) => ({
    ...state,
    flyingObject,
  })),
  on(AviatorActions.vrSessionStart, (state) => ({
    ...state,
    vrSession: true,
  })),
  on(AviatorActions.vrSessionEnd, (state) => ({
    ...state,
    vrSession: false,
  }))
);
