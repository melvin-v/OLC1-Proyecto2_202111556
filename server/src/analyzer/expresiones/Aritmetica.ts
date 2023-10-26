import { Expresion } from "../abstract/Expression.js";
import { Node } from "../abstract/Node.js";
import Environment from "../tools/Environment.js";
import ReturnType from "../tools/ReturnType.js";
import Tree from "../tools/Tree.js";
import { Type, ArithmeticOperator } from "../tools/Type.js";
import { tipos, types_pot_module } from "../tools/tablaTipos.js";

export class Aritmetica implements Expresion {

    public operator: ArithmeticOperator;
    public exp1: Expresion;
    public exp2: Expresion;
    public row: number;
    public column: number;

    constructor(exp1: Expresion, exp2: Expresion, operator: ArithmeticOperator, row: number, column: number) {
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.operator = operator;
        this.row = row;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {

        const left = this.exp1.getValue(tree, table);
        const right = this.exp2.getValue(tree, table);
      
        let result = new ReturnType(Type.NULL, null);

        let tipoDominante = this.tipoDominante(left.Type, right.Type, 1); //Segun el enunciado del proyecto: (Ej: double + int = double)

        if (this.operator === ArithmeticOperator.MOD) {
            tipoDominante = this.tipoDominante(left.Type, right.Type, 2);
        }
        
        if (this.operator === ArithmeticOperator.PLUS) {

            if (tipoDominante == Type.VARCHAR) {
                result = new ReturnType(Type.VARCHAR, (left.value.toString() + right.value.toString()));

            } else if (tipoDominante === Type.INT) {

                if (right.Type === Type.VARCHAR) {
                    right.value = right.value.charCodeAt(0);
                }

                if (left.Type === Type.VARCHAR) {
                    left.value = left.value.charCodeAt(0);
                }
                result = new ReturnType(Type.INT, (Number(left.value) + Number(right.value)));

            } else if (tipoDominante === Type.DOUBLE) {

                if (right.Type === Type.VARCHAR) {
                    right.value = right.value.charCodeAt(0);
                }

                if (left.Type === Type.VARCHAR) {
                    left.value = left.value.charCodeAt(0);
                }
                result = new ReturnType(Type.DOUBLE, ((parseFloat(left.value) + parseFloat(right.value)).toFixed(2)));
            } 

        } else if (this.operator == ArithmeticOperator.MINUS) {

            if (tipoDominante === Type.INT) {

                if (right.Type === Type.VARCHAR) {
                    right.value = right.value.charCodeAt(0);
                }

                if (left.Type === Type.VARCHAR) {
                    left.value = left.value.charCodeAt(0);
                }
                result = new ReturnType(Type.INT, (Number(left.value) - Number(right.value)));
            } else if (tipoDominante === Type.DOUBLE) {

                if (right.Type === Type.VARCHAR) {
                    right.value = right.value.charCodeAt(0);
                }

                if (left.Type === Type.VARCHAR) {
                    left.value = left.value.charCodeAt(0);
                }
                result = new ReturnType(Type.DOUBLE, ((parseFloat(left.value) - parseFloat(right.value))));
            } 

        } else if (this.operator == ArithmeticOperator.DATE) {

            if (tipoDominante === Type.INT) {

                if (right.Type === Type.VARCHAR) {
                    right.value = right.value.charCodeAt(0);
                }

                if (left.Type === Type.VARCHAR) {
                    left.value = left.value.charCodeAt(0);
                }
                result = new ReturnType(Type.INT, (Number(left.value) * Number(right.value)));

            } else if (tipoDominante === Type.DOUBLE) {

                if (right.Type === Type.VARCHAR) {
                    right.value = right.value.charCodeAt(0);
                }

                if (left.Type === Type.VARCHAR) {
                    left.value = left.value.charCodeAt(0);
                }
                result = new ReturnType(Type.DOUBLE, ((parseFloat(left.value) * parseFloat(right.value)).toFixed(2)));
            } 

        } else if (this.operator == ArithmeticOperator.DIV) {

            if (right.value == 0) {
                console.log('No se puede dividir entre 0');
            } else {

                if (tipoDominante === Type.INT) {

                    if (right.Type === Type.VARCHAR) {
                        right.value = right.value.charCodeAt(0);
                    }

                    if (left.Type === Type.VARCHAR) {
                        left.value = left.value.charCodeAt(0);
                    }
                    result = new ReturnType(Type.INT, Math.trunc(Number(left.value) / Number(right.value)));

                } else if (tipoDominante === Type.DOUBLE) {

                    if (right.Type === Type.VARCHAR) {
                        right.value = right.value.charCodeAt(0);
                    }

                    if (left.Type === Type.VARCHAR) {
                        left.value = left.value.charCodeAt(0);
                    }
                    result = new ReturnType(Type.DOUBLE, ((parseFloat(left.value) / parseFloat(right.value))));

                } 

            }
        }  else if (this.operator == ArithmeticOperator.MOD) {

            if (tipoDominante === Type.DOUBLE) {

                if (right.Type === Type.VARCHAR) {
                    right.value = right.value.charCodeAt(0);
                }

                if (left.Type === Type.VARCHAR) {
                    left.value = left.value.charCodeAt(0);
                }
                result = new ReturnType(Type.DOUBLE, ((parseFloat(left.value) % parseFloat(right.value))));
            } 

        }
        
        return result;
    }

    public tipoDominante(Type_1: Type, Type_2: Type, TypeResult: number): Type {

        let type: any;

        if (TypeResult === 1)
            type = tipos[Type_1][Type_2];
        else if (TypeResult === 2)
            type = types_pot_module[Type_1][Type_2];
        return type;

    }
    getAST(): Node {
        console.log(this.operator.toString());
        let node: Node;
        if (this.operator === ArithmeticOperator.PLUS) {
            node = new Node('+');
        }
        else if (this.operator === ArithmeticOperator.MINUS) {
            node = new Node('-');
        }
        else if (this.operator === ArithmeticOperator.MULT) {
            node = new Node('*');
        }
        else if (this.operator === ArithmeticOperator.DIV) {
            node = new Node('/');
        }
        else if (this.operator === ArithmeticOperator.MOD) {
            node = new Node('%');
        }
        else if (this.operator === ArithmeticOperator.DATE) {
            node = new Node('date');
        }
        else {
            node = new Node('???');
        }
        node.addChildsNode(this.exp1.getAST());
        node.addChildsNode(this.exp2.getAST());

        return node;
    }

}