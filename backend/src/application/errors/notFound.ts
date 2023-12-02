export class NotFound extends Error {
  field: any;
  value: any;
  code: number;
  constructor(field, value) {
    super(`O usuario do ${field}: ${value} não existe`);
    this.name = 'Not Found';
    this.field = field;
    this.code = 500;
    this.value = value;
  }
}
