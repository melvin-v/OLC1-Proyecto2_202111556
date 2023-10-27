import { Instruccion } from "../abstract/Instruction";
import { Node } from "../abstract/Node";
import Environment from "../tools/Environment";
import Tree from "../tools/Tree";
import { Type } from "../tools/Type";
import { retornarTipo } from "../tools/retornarTipo";

export class AddColumn implements Instruccion{
    public id: string;
    public type: Type;
    public row: number;
    public column: number;
    constructor(id: string, type: Type, row: number, column: number){
        this.id = id;
        this.type = type;
        this.row = row;
        this.column = column;
    }
    interpret(_: Tree, __: Environment) {
        return {id: this.id, type: this.type, op: "ADD_COLUMN"}
    }
    getAST(): Node {
        let node: Node = new Node("ADD COLUMN");
        node.addChild(this.id);
        node.addChild(retornarTipo(this.type));
        return node;
    }
}