export class NotPermitted extends Error {
  code: number;
  message: string;
  constructor(message) {
    super(message);
    this.name = 'Not Permitted';
    this.code = 406;
  }
}
