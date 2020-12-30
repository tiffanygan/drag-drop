import Prj from "./Prj";

export default class PrjListItem {
    private template: HTMLTemplateElement;
    private element: HTMLElement;

    constructor(private host: HTMLUListElement, private prj: Prj) {
        this.template = document.getElementById('prj-list-item')! as HTMLTemplateElement;
        this.element = document.importNode(this.template.content.firstElementChild!, true) as HTMLLIElement;
        this.element.querySelector('h3')!.textContent = this.prj.name;
        this.element.querySelector('p')!.textContent = this.prj.description;
        this.element.lastChild!.textContent = this.prj.people.toString();

        this.attach();
        this.config();
    }

    private attach() {
        this.host.appendChild(this.element);
    }

    private config() {
        this.element.addEventListener('dragstart', ((e: DragEvent) => {
            e.dataTransfer!.setData('text/plain', this.prj.id.toString());
            e.dataTransfer!.effectAllowed = 'move';
        }).bind(this));
    }
}
