import { Type } from "./Type"

export default class ReturnType {

    public Type: Type;
    public value: any;

    constructor(Type: Type, value: any) {
        this.Type = Type;
        this.value = value;
    }

    public toString(): string {
        return this.value;
    }

}