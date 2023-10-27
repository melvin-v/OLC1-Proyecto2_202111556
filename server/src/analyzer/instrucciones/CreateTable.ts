import { Instruccion } from "../abstract/Instruction";
import Environment from "../tools/Environment";
import Tree from "../tools/Tree";
import { Columna } from "./Columna";
import { Data } from "../data/Data";
import { Tabla } from "../data/Tabla";
import { Node } from "../abstract/Node";

export class CreateTable implements Instruccion{
    public name: string;
    public columns: Array<Columna>;
    public row: number;
    public column: number;
    constructor(name: string, columns: Array<Columna>, row: number, column: number){
        this.name = name;
        this.columns = columns;
        this.row = row;
        this.column = column;
    }
    interpret(tree: Tree, table: Environment) {
        const data = Data.getInstance();
        const c = [];
        for(let i = 0; i < this.columns.length; i++){
            c.push(this.columns[i].interpret(tree, table));
        }
        data.add_tabla(new Tabla(this.name, c));
    }
    getAST(): Node {
        let node: Node = new Node("CREATE TABLE");
        node.addChild(this.name);
        for (let instr of this.columns) {
            node.addChildsNode(instr.getAST());
        }
        return node;
    }
}