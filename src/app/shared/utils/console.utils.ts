export class Console {
  constructor(
    private base: string,
    private separator: string = '|',
    private end: string = ':'
  ) {}

  log(label: any, value?: any): void {
    this.message('log', label, value);
  }

  error(label: any, value?: any): void {
    this.message('error', label, value);
  }

  private message(type: 'log' | 'error', label: any, value?: any): void {
    const base: string[] = [];
    base.push(this.base);
    value ? base.push(label) : (value = label);
    label = base.join(` ${this.separator} `) + this.end;
    console[type](label, value);
  }
}
