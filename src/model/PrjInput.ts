import Prj from "./Prj";
import PrjManager from "../state/PrjManager";
import { PrjListType } from "../state/PrjType";
import { Autobind } from "../util/Decorators";
import Component from "./Component";
import { validator } from "../util/Validator";

export default class PrjInput extends Component<HTMLDListElement, HTMLElement> {
  private nameInput!: HTMLInputElement;
  private descriptionInput!: HTMLInputElement;
  private peopleInput!: HTMLInputElement;
  private btn!: HTMLButtonElement;

  constructor(private prjManager: PrjManager) {
    super("prj-input-template", "app", "afterbegin");
  }

  protected config() {
    const inputs = this.element.querySelectorAll("input")!;
    this.nameInput = inputs[0] as HTMLInputElement;
    this.descriptionInput = inputs[1] as HTMLInputElement;
    this.peopleInput = inputs[2] as HTMLInputElement;
    this.btn = this.element.querySelector("button")! as HTMLButtonElement;
    this.btn.addEventListener("click", this.submitHandler);
  }

  private createPrj() {
    const prj = new Prj(
      this.nameInput.value,
      this.descriptionInput.value,
      +this.peopleInput.value,
      PrjListType.ACTIVE
    );
    const validationResult = validator.validate(prj);
    if (!validationResult.isValid) {
      alert(`Please input ${validationResult.fieldName} again`);
      return false;
    }
    return prj;
  }

  @Autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    const prj = this.createPrj() as Prj;
    if (prj) {
      this.prjManager.addPrj(prj);
    }
  }
}
