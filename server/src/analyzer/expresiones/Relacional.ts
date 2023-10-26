import { Expresion } from "../abstract/Expression.js";
import { Node } from "../abstract/Node.js";
import Environment from "../tools/Environment.js";
import ReturnType from "../tools/ReturnType.js";
import Tree from "../tools/Tree.js";
import { relationalOperator, Type } from "../tools/Type.js";

export class Relacional implements Expresion {

    public exp1: Expresion;
    public exp2: Expresion;
    public operator: relationalOperator;
    public row: number;
    public column: number;

    constructor(exp1: Expresion, exp2: Expresion, operator: relationalOperator, row: number, column: number) {
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.operator = operator;
        this.row = row;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        const left = this.exp1.getValue(tree, table);
        const right = this.exp2.getValue(tree, table);

        if (Object.values(relationalOperator).includes(this.operator)) {
            return new ReturnType(Type.BOOLEAN, this.operate(Number(left.value), Number(right.value), this.operator));
        } 
        return new ReturnType(Type.NULL, null);
    }

    operate(exp1: number, exp2: number, op: relationalOperator): string {
        switch(op){
            case relationalOperator.IGUAL:
                return String(exp1 == exp2).toLowerCase();
            case relationalOperator.DIF:
                return String(exp1 != exp2).toLowerCase();
            case relationalOperator.MAYOR:
                return String(exp1 > exp2).toLowerCase();
            case relationalOperator.MAYORIGUAL:
                return String(exp1 >= exp2).toLowerCase();
            case relationalOperator.MENOR:
                return String(exp1 < exp2).toLowerCase();
            case relationalOperator.MENORIGUAL:
                return String(exp1 <= exp2).toLowerCase();
        }
    }

    getAST(): Node {
        let node: Node = new Node(this.operator);
        node.addChildsNode(this.exp1.getAST());
        node.addChildsNode(this.exp2.getAST());

        return node;
    }

}