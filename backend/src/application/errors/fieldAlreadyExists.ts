export class FieldAlreadyExists extends Error {
  field: any;
  code: number;
  constructor(field) {
    super(`O campo '${field}' já existe cadastrado banco de dados.`);
    this.name = 'Field Already Exists';
    this.field = field;
    this.code = 500;
  }
}
