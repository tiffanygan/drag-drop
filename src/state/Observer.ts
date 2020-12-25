import Prj from "../model/Prj";

export default interface Observer {
    observe(prjs: Prj[]): void;
}
