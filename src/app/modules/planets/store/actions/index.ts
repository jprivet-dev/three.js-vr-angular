import { union } from '@ngrx/store';
import * as PlanetsActions from './planets.actions';

const TypedActions = union(PlanetsActions);
type PlanetsActionsType = typeof TypedActions;

export { PlanetsActionsType, PlanetsActions };
