import Prj from "../model/Prj";
import ValidationItem from "./ValidationItem";
import { validator } from "./Validator";

export function Autobind(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalFunction = descriptor.value;
  return {
    configurable: true,
    get: function () {
      const newFunction = originalFunction.bind(this);

      return newFunction;
    },
  };
}

export function NonNull(target: any, fieldName: keyof Prj) {
  validator.register(
    target.constructor.name,
    new ValidationItem(fieldName, (prj) => prj[fieldName])
  );
}

export function NthLetterMustBe(letter: string, position: number) {
  return function (target: any, fieldName: keyof Prj) {
    validator.register(
      target.constructor.name,
      new ValidationItem(
        fieldName,
        (prj) => prj[fieldName][position] === letter
      )
    );
  };
}
