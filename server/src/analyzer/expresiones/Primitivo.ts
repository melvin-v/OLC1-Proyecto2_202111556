import { Instruccion } from "../abstract/Instruccion.js";
import { Node } from "../abstract/Node.js";
import Environment from "../tools/Environment.js";
import ReturnType from "../tools/ReturnType.js";
import Tree from "../tools/Tree.js";
import { type } from "../tools/Type.js";

export default class Primitive implements Instruccion {
    public row: number;
    public column: number;
    public type: type;
    public value: string;

    constructor(value: string, type: type, row: number, column: number) {
        this.value = value;
        this.type = type;
        this.row = row;
        this.column = column;
    }

    getValue(_: Tree, __: Environment): ReturnType {
        return new ReturnType(this.type, this.value);
    }

    interpret(): any {
        return undefined;
    }

    getCST(): Node {
        let node = new Node("Primitive");
        node.addChild(this.value);
        return node;
    }

    getAST(): Node {
        return new Node(this.value);
    }
}