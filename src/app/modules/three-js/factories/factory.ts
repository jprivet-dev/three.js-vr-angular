import { Decorator } from '../decorators';

export interface Factory {
  create(): Decorator;
}
