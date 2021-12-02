export class CameraMovementState {
  private _state: boolean = false;

  start(): void {
    this._state = true;
  }

  stop(): void {
    this._state = false;
  }

  switch(): void {
    this._state = !this._state;
  }

  get state(): boolean {
    return this._state;
  }

  get number(): number {
    return Number(this._state);
  }
}
