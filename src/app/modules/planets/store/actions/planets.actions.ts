import { createAction } from '@ngrx/store';

export const switchFlyMode = createAction('[Planets] switch fly mode');

export const switchDefinition = createAction('[Planets] switch definition');

export const switchAntialias = createAction('[Planets] switch antialias');

export const vrSessionStart = createAction('[Planets] VR session start');

export const vrSessionEnd = createAction('[Planets] VR session end');
