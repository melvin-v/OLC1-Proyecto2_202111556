import { Instruccion } from "../abstract/Instruction";
import { Node } from "../abstract/Node";
import Environment from "../tools/Environment";
import Tree from "../tools/Tree";

export class RenameTable implements Instruccion{
    public new_name: string;
    public row: number;
    public column: number;
    constructor(new_name: string, row: number, column: number){
        this.new_name = new_name;
        this.row = row;
        this.column = column;
    }
    interpret(_: Tree, __: Environment) {
        return {new_name: this.new_name, op: "RENAME_TABLE"}
    }
    getAST(): Node {
        let node: Node = new Node("RENAME TABLE");
        node.addChild(this.new_name);
        return node;
    }
}