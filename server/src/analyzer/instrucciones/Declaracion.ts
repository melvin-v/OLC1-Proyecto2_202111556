import { Instruccion } from "../abstract/Instruccion.js";
import { type } from "../tools/Type.js";
import Tree from "../tools/Tree.js";
import Environment from "../tools/Environment.js";
import ReturnType from "../tools/ReturnType.js";


export class Declaracion implements Instruccion {
    public type: type;
    public id: string;
    public expression: Instruccion;
    public row : number;
    public column : number;

    constructor(type: type, id: string, expression: Instruccion, row: number, column: number){
        this.type = type;
        this.id = id;
        this.expression = expression;
        this.row = row;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        const value = this.expression.getValue(tree, table);
        if(value.type != this.type){
            throw new Error("Type Error: The type of the variable is not the same as the value assigned");
        }
        table.setVariable(this.id, value.value, value.type, this.row, this.column);
        return {value: null, type: type.VOID};
    }
}