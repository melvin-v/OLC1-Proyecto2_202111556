import { Instruccion } from "../abstract/Instruction";
import { Node } from "../abstract/Node";
import Environment from "../tools/Environment";
import Tree from "../tools/Tree";

export class RenameColumn implements Instruccion{
    public old_name: string;
    public new_name: string;
    public row: number;
    public column: number;
    constructor(old_name: string, new_name: string, row: number, column: number){
        this.old_name = old_name;
        this.new_name = new_name;
        this.row = row;
        this.column = column;
    }
    interpret(_: Tree, __: Environment) {
        return {old_name: this.old_name, new_name: this.new_name, op: "RENAME_COLUMN"}
    }
    getAST(): Node {
        let node: Node = new Node("RENAME COLUMN");
        node.addChild(this.old_name);
        node.addChild(this.new_name);
        return node;
    }
}