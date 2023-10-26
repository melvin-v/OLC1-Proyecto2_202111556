import { Expresion } from "../abstract/Expression.js";
import { Node } from "../abstract/Node.js";
import Environment from "../tools/Environment.js";
import ReturnType from "../tools/ReturnType.js";
import Tree from "../tools/Tree.js";
import { Type } from "../tools/Type.js";

export class Identificador implements Expresion {

    public id: string;
    public Type: Type;
    public row: number;
    public column: number;

    constructor(id: string, row: number, column: number) {
        this.id = id;
        this.Type = Type.INT;
        this.row = row;
        this.column = column;
    }

    getValue(_: Tree, environment: Environment): ReturnType {
        const value = environment.getSymbol(this.id);
        return new ReturnType(this.Type, value);
    }

    getAST(): Node {
        return new Node(this.id);
    }
}