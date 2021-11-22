import { createAction } from '@ngrx/store';

export const switchFlyMode = createAction('[Aviator] switch fly mode');

export const switchDefinition = createAction('[Aviator] switch definition');

export const switchAntialias = createAction('[Aviator] switch antialias');

export const vrSessionStart = createAction('[Aviator] VR session start');

export const vrSessionEnd = createAction('[Aviator] VR session end');
