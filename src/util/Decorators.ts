export function Autobind (_: any, _2: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalFunction = descriptor.value;
    return {
        configurable: true,
        get: function() {
            const newFunction = originalFunction.bind(this);

            return newFunction
        }
    };
}
