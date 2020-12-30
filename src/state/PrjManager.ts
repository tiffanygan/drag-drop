import Observer from "./Observer";
import Prj from "../model/Prj";
import { PrjListType } from "./PrjType";

export default class PrjManager {
  private prjList: Prj[];
  private observerList: Observer[];
  private static prjManager: PrjManager;
  private idCount: number = 0;

  private constructor() {
    this.prjList = [];
    this.observerList = [];
  }

  static getManager() {
    if (!this.prjManager) {
      this.prjManager = new PrjManager();
    }
    return this.prjManager;
  }

  public addPrj(prj: Prj) {
    prj.setId(this.idCount++);
    this.prjList.push(prj);
    this.notify();
    return prj;
  }

  public register(observer: Observer) {
    this.observerList.push(observer);
  }

  public update(dropId: string, prjListType: PrjListType) {
    const prj = this.prjList.find(
      (currPrj) => currPrj.id === parseInt(dropId)
    )!;
    if (prj.prjStatus !== prjListType) {
      prj.prjStatus = prjListType;
      this.notify();
    }
  }

  private notify() {
    for (const observer of this.observerList) {
      observer.observe([...this.prjList]);
    }
  }
}
