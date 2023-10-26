import { Instruccion } from "../abstract/Instruction.js";
import { Type } from "../tools/Type.js";
import Tree from "../tools/Tree.js";
import Environment from "../tools/Environment.js";
import ReturnType from "../tools/ReturnType.js";
import Symbol from "../tools/Symbol.js";
import { Node } from "../abstract/Node.js";


export class DeclareNull implements Instruccion {
    public type: Type;
    public id: string;
    public row : number;
    public column : number;


    constructor(id: string, type: Type, row: number, column: number){
        this.id = id;
        this.type = type;
        this.row = row;
        this.column = column;
    }


    interpret(_: Tree, table: Environment) {
        let value: ReturnType;
        value = new ReturnType(this.type, null);
        table.saveSymbol(new Symbol(this.id, this.type, value.value, this.row, this.column, table.name));
    }

    getAST(): Node {
        let node: Node = new Node('DECLARE');
        if(this.type == Type.INT){
            node.addChild('int');
        }
        else if(this.type == Type.DOUBLE){
            node.addChild('double');
        }
        else if(this.type == Type.BOOLEAN){
            node.addChild('boolean');
        }
        else if(this.type == Type.VARCHAR){
            node.addChild('varchar');
        }
        else if(this.type == Type.DATE){
            node.addChild('date');
        }
        else if(this.type == Type.NULL){
            node.addChild('null');
        }
        else if(this.type == Type.NEGATIVE){
            node.addChild('negative');
        }
        else{
            node.addChild('???');
        }
        node.addChild(this.id);
        node.addChild('Null');

        return node;
    }
}