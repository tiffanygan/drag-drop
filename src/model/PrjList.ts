import Observer from "../state/Observer.js";
import PrjManager from "../state/PrjManager.js";
import { Autobind } from "../util/Decorators.js";
import Prj from "./Prj.js";
import PrjListItem from "./PrjListItem.js";
import { PrjListType } from "../state/PrjType.js";
import Component from "./Component.js";

export default class PrjList
  extends Component<HTMLDivElement, HTMLElement>
  implements Observer {
  private ulEle: HTMLUListElement;

  constructor(
    private prjManager: PrjManager,
    private prjListType: PrjListType
  ) {
    super("prj-list-template", "app", "beforeend");
    this.element.querySelector("h3")!.textContent = this.prjListType.toString();
    this.ulEle = this.element.querySelector("ul")! as HTMLUListElement;
    this.ulEle.id = prjListType;

    this.register();
  }

  observe(prjs: Prj[]): void {
    this.ulEle.innerHTML = "";
    prjs
      .filter((prj) => prj.prjStatus === this.prjListType)
      .forEach((prj) => new PrjListItem(this.ulEle.id, prj));
  }

  private register() {
    this.prjManager.register(this);
  }

  protected config() {
    this.element.addEventListener("dragover", this.dragoverHandler);
    this.element.addEventListener("dragleave", this.dragleaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
  }

  @Autobind
  private dragoverHandler(e: DragEvent) {
    if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
      e.preventDefault();
      this.element.style.color = "red";
    }
  }

  @Autobind
  private dragleaveHandler(e: DragEvent) {
    this.element.style.color = "";
  }

  @Autobind
  private dropHandler(e: DragEvent) {
    const dropId = e.dataTransfer!.getData("text/plain");
    this.prjManager.update(dropId, this.prjListType);
    this.element.style.color = "";
  }
}
