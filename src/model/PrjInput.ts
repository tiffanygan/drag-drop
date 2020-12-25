import Prj from "./Prj.js";
import PrjManager from "../state/PrjManager.js";
import { PrjListType } from "./PrjType.js";

export default class PrjInput {
    private template: HTMLTemplateElement;
    private hostElement: HTMLDivElement;
    private element: HTMLElement;
    private nameInput: HTMLInputElement;
    private descriptionInput: HTMLInputElement;
    private peopleInput: HTMLInputElement;
    private btn: HTMLButtonElement;

    constructor(private prjManager: PrjManager) {
        this.template = document.getElementById('prj-input-template')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
        this.element = document.importNode(this.template.content.firstElementChild!, true)! as HTMLElement;

        const inputs = this.element.querySelectorAll('input')!;
        this.nameInput = inputs[0] as HTMLInputElement;
        this.descriptionInput = inputs[1] as HTMLInputElement;
        this.peopleInput = inputs[2] as HTMLInputElement;
        this.btn = this.element.querySelector('button')! as HTMLButtonElement;
        this.prjManager = prjManager;

        this.attach();
        this.config();
    }

    private attach() {
        this.hostElement.prepend(this.element);
    }

    private createPrj() {
        const prj = new Prj(this.nameInput.value, this.descriptionInput.value, +this.peopleInput.value, PrjListType.ACTIVE);
        return prj;
    }

    private config() {
        this.btn.addEventListener('click', ((e: Event) => {
            e.preventDefault();
            const prj = this.createPrj();
            this.prjManager.addPrj(prj);
        }).bind(this));
    }
}
