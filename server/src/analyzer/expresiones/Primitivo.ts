import { Expresion } from "../abstract/Expression.js";
import { Node } from "../abstract/Node.js";
import Environment from "../tools/Environment.js";
import ReturnType from "../tools/ReturnType.js";
import Tree from "../tools/Tree.js";
import { Type } from "../tools/Type.js";

export class Primitivo implements Expresion {
    public row: number;
    public column: number;
    public Type: Type;
    public value: any;

    constructor(value: any, Type: Type, row: number, column: number) {
        this.value = value;
        this.Type = Type;
        this.row = row;
        this.column = column;
    }

    getValue(_: Tree, __: Environment): ReturnType {
        //return new ReturnType(this.Type, this.value);
        if (this.Type == Type.INT){
            return new ReturnType( Type.INT, this.value );
        }
        else if (this.Type == Type.DOUBLE){
            return new ReturnType( Type.DOUBLE, this.value );
        }
        else if (this.Type === Type.VARCHAR) {

            const regex = /^\"/g;
            const regex2 = /\"$/g;

            //Quitar comillas al inicio y al final
            this.value = this.value.replace(regex, "").replace(regex2, "")

            //Quitar caracteres de escape /n /t // /"
            let string = this.value.replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\"/g, "\"").replace(/\\/g, "\\");

            return new ReturnType( Type.VARCHAR, string );

        }
        else if (this.Type === Type.BOOLEAN){
            return new ReturnType( Type.BOOLEAN, this.value === 'true' ? Boolean(true) : Boolean(false) );
        }
        else if (this.Type === Type.NEGATIVE) {
            if (this.value.Type === Type.INT) {
                this.value.value = Number(this.value.value) * -1
            } else if (this.value.Type === Type.DOUBLE) {
                this.value.value = parseFloat(this.value.value) * -1
            } 
            return new ReturnType( this.value.Type, this.value.value );

        }
        else if (this.Type === Type.DATE) {
            return new ReturnType( Type.DATE, this.value );
        } 
        else {
            return new ReturnType( Type.NULL, null );
        }

    }

    getAST(): Node {
        return new Node(this.value);
    }
}