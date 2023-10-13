import { Instruccion } from "../abstract/Instruccion.js";
import { type } from "../tools/Type.js";
import Tree from "../tools/Tree.js";
import Environment from "../tools/Environment.js";
import ReturnType from "../tools/ReturnType.js";
import Exception from "../tools/Exception.js";
import Symbol from "../tools/Symbol.js";
import { Node } from "../abstract/Node.js";


export class Declare implements Instruccion {
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

    getValue(_: Tree, __: Environment): ReturnType {
        return new ReturnType(type.INT, undefined);
    }

    interpret(tree: Tree, table: Environment) {
        let value: ReturnType;

        value = this.expression.getValue(tree, table);

        if (value.value instanceof Exception) {
            // Semantic error
            return value.value;
        }

        if (this.type !== value.type) {
            // Semantic error
            return new Exception("Semantic", `The type: ${value.type} don't be assigned to variable of type: ${this.type}`, this.row, this.column, table.name);
        }

        let result: any = table.setTable(new Symbol(this.id, this.type, value.value, this.row, this.column, table.name));

        if (result instanceof Exception) {
            return result;
        }

        return undefined;
    }

    getAST(): Node {
        let node: Node = new Node('=');
        node.addChild(this.type);
        node.addChild(this.id);
        node.addChildsNode(this.expression.getAST());

        return node;
    }
}