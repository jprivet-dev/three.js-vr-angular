import { createAction, props } from '@ngrx/store';
import { FlyingObject } from '../../models/aviator-colors.model';

export const changeFlyingObject = createAction(
  '[Aviator] change flying object',
  props<{ flyingObject: FlyingObject }>()
);

export const vrSessionStart = createAction('[Aviator] VR session start');

export const vrSessionEnd = createAction('[Aviator] VR session end');
