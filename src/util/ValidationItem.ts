export default class ValidationItem {
  constructor(
    public fieldName: string,
    public validationFunc: (prj: any) => boolean
  ) {}
}
