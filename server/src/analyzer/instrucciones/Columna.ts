import { Instruccion } from "../abstract/Instruction";
import { Node } from "../abstract/Node";
import Environment from "../tools/Environment";
import Tree from "../tools/Tree";
import { Col } from "../data/Col";
import { Type } from "../tools/Type";
import { retornarTipo } from "../tools/retornarTipo";

export class Columna implements Instruccion{
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

    interpret(_: Tree, __: Environment){
        return new Col(this.id, this.type, [])
    }
    getAST(): Node {
        let node: Node = new Node("COLUMN");
        node.addChild(this.id);
        node.addChild(retornarTipo(this.type));
        return node;
    }
}