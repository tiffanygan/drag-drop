import { Autobind } from "../util/Decorators";
import Component from "./Component";
import Prj from "./Prj";

export default class PrjListItem extends Component<
  HTMLUListElement,
  HTMLElement
> {
  constructor(hostId: string, private prj: Prj) {
    super("prj-list-item", hostId, "beforeend");
    this.element.querySelector("h3")!.textContent = this.prj.name;
    this.element.querySelector("p")!.textContent = this.prj.description;
    this.element.lastChild!.textContent = this.prj.people.toString();
  }

  protected config() {
    this.element.addEventListener("dragstart", this.setDataTransfer);
  }

  @Autobind
  private setDataTransfer(e: DragEvent) {
    e.dataTransfer!.setData("text/plain", this.prj.id.toString());
    e.dataTransfer!.effectAllowed = "move";
    this.element.style.color = "red";
  }
}
