import { createAction } from '@ngrx/store';

export const switchFlyMode = createAction('[Planets] switch fly mode');

export const flyModeOff = createAction('[Planets] set fly mode off');

export const vrSessionStart = createAction('[Planets] VR session start');

export const vrSessionEnd = createAction('[Planets] VR session end');
