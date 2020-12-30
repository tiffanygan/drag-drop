import { NonNull, NthLetterMustBe } from "../util/Decorators";
import { PrjListType } from "../state/PrjType";

export default class Prj {
  public id: number = -1;
  @NonNull
  @NthLetterMustBe("a", 1)
  public name: string;
  @NonNull
  @NthLetterMustBe("b", 2)
  public description: string;
  @NonNull
  public people: number;

  constructor(
    name: string,
    description: string,
    people: number,
    public prjStatus: PrjListType
  ) {
    this.name = name;
    this.description = description;
    this.people = people;
  }

  setId(id: number) {
    this.id = id;
  }
}
