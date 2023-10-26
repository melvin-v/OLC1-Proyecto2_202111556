import { Instruccion } from "../abstract/Instruction";
import { Node } from "../abstract/Node";
import Environment from "../tools/Environment";
import Tree from "../tools/Tree";
import { Declare } from "./Declare";

export class Declaraciones implements Instruccion {
    public lista: Array<Declare>;
    public row: number;
    public column: number;
    constructor(lista: Array<Declare>, row: number, column: number) {
        this.lista = lista;
        this.row = row;
        this.column = column;
    }

    interpret(tree: Tree, table: Environment) {
        for (let instr of this.lista) {
            instr.interpret(tree, table);
        }
    }
    getAST(): Node {
        let root: Node = new Node("DECLARACIONES");
        for (let instr of this.lista) {
            root.addChildsNode(instr.getAST());
        }
        return root;
    }
}
