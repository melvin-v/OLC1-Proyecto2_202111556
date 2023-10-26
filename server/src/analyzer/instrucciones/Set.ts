import { Instruccion } from "../abstract/Instruction.js";
import Tree from "../tools/Tree.js";
import Environment from "../tools/Environment.js";
import ReturnType from "../tools/ReturnType.js";
import Symbol from "../tools/Symbol.js";
import { Node } from "../abstract/Node.js";
import { Expresion } from "../abstract/Expression.js";

export class Set implements Instruccion {
    public row: number;
    public column: number;
    public id: string;
    public value: Expresion;

    constructor(id: string, value: Expresion, row: number, column: number) {
        this.id = id;
        this.value = value;
        this.row = row;
        this.column = column;
    }

    interpret(tree: Tree, table: Environment) {
        let value: ReturnType;
        value = this.value.getValue(tree, table);
        table.updateSymbol(new Symbol(this.id, value.Type, value.value, this.row, this.column));
    }

    getAST(): Node {
        let node = new Node("Set");
        node.addChild(this.id);
        node.addChild("=");
        node.addChildsNode(this.value.getAST());
        return node;
    }
}