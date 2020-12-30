import { PrjListType } from "./PrjType";

export default class Prj {
  public id: Number = -1;

  constructor(
    public name: string,
    public description: string,
    public people: number,
    public prjStatus: PrjListType
  ) {}

  setId(id: Number) {
    this.id = id;
  }
}
