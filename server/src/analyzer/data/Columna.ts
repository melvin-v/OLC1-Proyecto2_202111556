import { Type } from "../tools/Type";

export class Columna {
    public id: string;
    public type: Type
    public values: any[];
    constructor(id: string,type: Type, values: any[]) {
        this.id = id;
        this.type = type;
        this.values = values;
    }
    }