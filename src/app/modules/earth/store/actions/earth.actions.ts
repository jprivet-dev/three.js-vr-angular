import { createAction } from '@ngrx/store';

export const switchFlyMode = createAction('[Earth] switch fly mode');

export const switchDefinition = createAction('[Earth] switch definition');

export const switchAntialias = createAction('[Earth] switch antialias');

export const vrSessionStart = createAction('[Earth] VR session start');

export const vrSessionEnd = createAction('[Earth] VR session end');
