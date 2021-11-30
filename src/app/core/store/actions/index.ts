import { union } from '@ngrx/store';
import * as AppActions from './app.actions';

const TypedActions = union(AppActions);
type AppActionsType = typeof TypedActions;

export { AppActionsType, AppActions };
