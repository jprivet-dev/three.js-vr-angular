export class Console {
  constructor(
    private base: string,
    private separator: string = '|',
    private end: string = ':'
  ) {}

  log(label: any, value?: any): void {
    const base: string[] = [];

    base.push(this.base);
    value ? base.push(label) : (value = label);

    label = base.join(` ${this.separator} `) + this.end;
    console.log(label, value);
  }
}
