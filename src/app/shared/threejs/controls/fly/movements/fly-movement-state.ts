export class FlyMovementState {
  private _state: boolean = false;

  constructor(readonly name: string = '') {
  }

  start(): void {
    this.log('start');
    this._state = true;
  }

  stop(): void {
    this.log('stop');
    this._state = false;
  }

  switch(): void {
    this.log('switch');
    this._state = !this._state;
  }

  get state(): boolean {
    return this._state;
  }

  get number(): number {
    return Number(this._state);
  }

  private log(label: string): void {
    console.log(`FlyMovementState | ${this.name} | ${label}`);
  }
}
