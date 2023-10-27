import { Instruccion } from "../abstract/Instruction.js";
import { Expresion } from "../abstract/Expression.js";
import { Type } from "../tools/Type";
import Tree from "../tools/Tree.js";
import Environment from "../tools/Environment.js";
import ReturnType from "../tools/ReturnType.js";
import Symbol from "../tools/Symbol.js";
import { Node } from "../abstract/Node.js";
import { retornarTipo } from "../tools/retornarTipo.js";


export class Declare implements Instruccion {
    public type: Type;
    public id: string;
    public expression: Expresion;
    public row : number;
    public column : number;


    constructor(id: string, type: Type, expression: Expresion, row: number, column: number){
        this.id = id;
        this.type = type;
        this.expression = expression;
        this.row = row;
        this.column = column;
    }


    interpret(tree: Tree, table: Environment) {
        let value: ReturnType;
        value = this.expression.getValue(tree, table);
        table.saveSymbol(new Symbol(this.id, this.type, value.value, this.row, this.column, table.name));
    }

    getAST(): Node {
        let node: Node = new Node('DECLARE');
        node.addChild(retornarTipo(this.type));
        node.addChild(this.id);
        node.addChildsNode(this.expression.getAST());

        return node;
    }
}