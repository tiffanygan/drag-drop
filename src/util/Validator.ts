import ValidationItem from "./ValidationItem";
import ValidatorResult from "./ValidatorResult";

class Validator {
  private static validator: Validator;
  public items: Map<string, ValidationItem[]>;

  private constructor() {
    this.items = new Map();
  }

  static getValidator() {
    if (!Validator.validator) {
      Validator.validator = new Validator();
    }
    return Validator.validator;
  }

  public register(objName: string, item: ValidationItem) {
    if (!this.items.has(objName)) {
      this.items.set(objName, []);
    }
    this.items.get(objName)!.push(item);
  }

  public validate(obj: any) {
    if (!this.items.has(obj.constructor.name)) {
      return new ValidatorResult(true);
    }
    const validateItems = this.items.get(obj.constructor.name)!;
    const failedItem = validateItems.find(
      (validationItem) => !validationItem.validationFunc(obj)
    );
    return new ValidatorResult(!failedItem, failedItem?.fieldName);
  }
}

export const validator = Validator.getValidator();
