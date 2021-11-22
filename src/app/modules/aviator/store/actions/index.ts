import { union } from '@ngrx/store';
import * as AviatorActions from './aviator.actions';

const TypedActions = union(AviatorActions);
type AviatorActionsType = typeof TypedActions;

export { AviatorActionsType, AviatorActions };
