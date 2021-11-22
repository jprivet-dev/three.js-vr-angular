import { union } from '@ngrx/store';
import * as EarthActions from './earth.actions';

const TypedActions = union(EarthActions);
type EarthActionsType = typeof TypedActions;

export { EarthActionsType, EarthActions };
