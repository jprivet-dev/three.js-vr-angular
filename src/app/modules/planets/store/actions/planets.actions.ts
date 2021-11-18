import { Definition } from '@core/store/store.model';
import { createAction, props } from '@ngrx/store';

export const switchDefinition = createAction(
  '[Planets] switch definition',
);

export const changeDefinition = createAction(
  '[Planets] change definition',
  props<{ definition: Definition }>()
);
