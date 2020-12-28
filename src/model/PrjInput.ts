import Prj from "./Prj.js";
import PrjManager from "../state/PrjManager.js";
import { PrjListType } from "../state/PrjType.js";
import { Autobind, Validator } from "../util/Decorators.js";
import Component from "./Component.js";

export default class PrjInput extends Component<HTMLDListElement, HTMLElement> {
  private nameInput!: HTMLInputElement;
  private descriptionInput!: HTMLInputElement;
  private peopleInput!: HTMLInputElement;
  private btn!: HTMLButtonElement;

  constructor(private prjManager: PrjManager) {
    super("prj-input-template", "app", "afterbegin");
  }

  private createPrj() {
    const prj = new Prj(
      this.nameInput.value,
      this.descriptionInput.value,
      +this.peopleInput.value,
      PrjListType.ACTIVE
    );
    return prj;
  }

  protected config() {
    const inputs = this.element.querySelectorAll("input")!;
    this.nameInput = inputs[0] as HTMLInputElement;
    this.descriptionInput = inputs[1] as HTMLInputElement;
    this.peopleInput = inputs[2] as HTMLInputElement;
    this.btn = this.element.querySelector("button")! as HTMLButtonElement;
    this.btn.addEventListener("click", this.submitHandler);
  }

  @Autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    const prj = this.createPrj();
    this.prjManager.addPrj(prj);
  }
}
