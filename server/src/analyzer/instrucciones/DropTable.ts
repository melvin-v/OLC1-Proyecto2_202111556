import { Instruccion } from "../abstract/Instruction";
import { Node } from "../abstract/Node";
import { Data } from "../data/Data";
import Environment from "../tools/Environment";
import Tree from "../tools/Tree";

export class DropTable implements Instruccion{
    public name: string;
    public row: number;
    public column: number;
    constructor(name: string, row: number, column: number){
        this.name = name;
        this.row = row;
        this.column = column;
    }
    interpret(_: Tree, __: Environment) {
        const data = Data.getInstance();
        const tablas = data.get_tablas();
        tablas.forEach((element, index) => {
            if (element.nombre == this.name){
                tablas.splice(index, 1);
            }
        });
    }
    getAST(): Node {
        let node: Node = new Node("DROP TABLE");
        node.addChild(this.name);
        return node;
    }
}