import { Instruccion } from "../abstract/Instruction";
import Environment from "../tools/Environment";
import Tree from "../tools/Tree";

export class Columna implements Instruccion{
    public id: string;
    public type: string;
    public row: number;
    public column: number;

    constructor(id: string, type: string, row: number, column: number){
        this.id = id;
        this.type = type;
        this.row = row;
        this.column = column;
    }

    interpret(tree: Tree, table: Environment){
        
    }
}