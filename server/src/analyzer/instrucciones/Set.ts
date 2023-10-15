import { Instruccion } from "../abstract/Instruction.js";
import { type } from "../tools/Type.js";
import Tree from "../tools/Tree.js";
import Environment from "../tools/Environment.js";
import ReturnType from "../tools/ReturnType.js";
import Exception from "../tools/Exception.js";
import Symbol from "../tools/Symbol.js";
import { Node } from "../abstract/Node.js";

export class Set implements Instruccion {
    public row: number;
    public column: number;
    public id: string;
    public value: Instruccion;

    constructor(id: string, value: Instruccion, row: number, column: number) {
        this.id = id;
        this.value = value;
        this.row = row;
        this.column = column;
    }

    getValue(_: Tree, __: Environment): ReturnType {
        return new ReturnType(type.INT, undefined);
    }

    interpret(tree: Tree, table: Environment) {
        let value: ReturnType;

        value = this.value.getValue(tree, table);

        if (value.value instanceof Exception) {
            // Semantic error
            return value.value;
        }

        let result: any = table.updateTable(new Symbol(this.id, value.type, value.value, this.row, this.column));

        if (result instanceof Exception) {
            return result;
        }

        return undefined;
    }

    getAST(): Node {
        let node = new Node("Set");
        node.addChild(this.id);
        node.addChild("=");
        node.addChildsNode(this.value.getAST());
        return node;
    }
}