import { Instruccion } from "../abstract/Instruction";
import { Node } from "../abstract/Node";
import Environment from "../tools/Environment";
import Tree from "../tools/Tree";

export class DropColumn implements Instruccion{
    public id: string;
    public row: number;
    public column: number;
    constructor(id: string, row: number, column: number){
        this.id = id;
        this.row = row;
        this.column = column;
    }
    interpret(_: Tree, __: Environment) {
        return {id: this.id, op: "DROP_COLUMN"}
    }
    getAST(): Node {
        let node: Node = new Node("DROP COLUMN");
        node.addChild(this.id);
        return node;
    }
}