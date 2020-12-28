export default abstract class Component<H extends HTMLElement, E extends HTMLElement> {
    protected template: HTMLTemplateElement;
    protected host: H;
    protected element: E;

    constructor(templateId: string, hostId: string, position: 'afterbegin' | 'beforeend') {
        this.template = document.getElementById(templateId)! as HTMLTemplateElement;
        this.host = document.getElementById(hostId)! as H;
        this.element = document.importNode(this.template.content.firstElementChild!, true) as E;

        this.attach(position);
        this.config();
    }

    protected abstract config(): void;

    private attach(position: 'afterbegin' | 'beforeend') {
        this.host.insertAdjacentElement(position, this.element);
    }
}
