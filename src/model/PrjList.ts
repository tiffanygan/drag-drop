import Observer from "../state/Observer";
import PrjManager from "../state/PrjManager";
import Prj from "./Prj";
import PrjListItem from "./PrjListItem";
import { PrjListType } from "./PrjType";

export default class PrjList implements Observer {
    private template: HTMLTemplateElement;
    private host: HTMLDivElement;
    private element: HTMLElement;

    constructor(private prjManager: PrjManager, private prjListType: PrjListType) {
        this.template = document.getElementById('prj-list-template')! as HTMLTemplateElement;
        this.host = document.getElementById('app')! as HTMLDivElement;
        this.element = document.importNode(this.template.content.firstElementChild!, true) as HTMLElement;
        this.element.querySelector('h3')!.textContent = this.prjListType.toString();

        this.attach();
        this.register();
        this.config();
    }

    observe(prjs: Prj[]): void {
        const ulEle = this.element.querySelector('ul')! as HTMLUListElement;
        ulEle.innerHTML = '';
        prjs.filter(prj => prj.prjStatus === this.prjListType).forEach(prj => new PrjListItem(ulEle, prj));
    }

    private attach() {
        this.host.append(this.element);
    }

    private register() {
        this.prjManager.register(this);
    }

    private config() {
        this.element.addEventListener('dragover', e => {
            e.preventDefault();
        });
        this.element.addEventListener('drop', ((e: DragEvent) => {
            const dropId = e.dataTransfer!.getData('text/plain');
            this.prjManager.update(dropId, this.prjListType);
        }).bind(this));
    }
}
