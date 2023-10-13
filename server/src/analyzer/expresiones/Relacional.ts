import { Instruccion } from "../abstract/Instruccion.js";
import { Node } from "../abstract/Node.js";
import Environment from "../tools/Environment.js";
import Exception from "../tools/Exception.js";
import ReturnType from "../tools/ReturnType.js";
import Tree from "../tools/Tree.js";
import { relationalOperator, type } from "../tools/Type.js";

export class Relacional implements Instruccion {

    public exp1: Instruccion;
    public exp2: Instruccion;
    public operator: relationalOperator;
    public row: number;
    public column: number;

    constructor(exp1: Instruccion, exp2: Instruccion, operator: relationalOperator, row: number, column: number) {
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.operator = operator;
        this.row = row;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        let left: ReturnType;
        let right: ReturnType;

        left = this.exp1.getValue(tree, table);

        if (left.value instanceof Exception) {
            // Semantic Error
            return left;
        }

        right = this.exp2.getValue(tree, table);

        if (right.value instanceof Exception) {
            // Semantic Error
            return right;
        }

        if (Object.values(relationalOperator).includes(this.operator)) {
            return new ReturnType(type.BOOLEAN, this.operate(Number(left.value), Number(right.value), this.operator));
        } else {
            // Semantic Error
            return new ReturnType(type.INT, new Exception("Semantic", `The operator: ${this.operator} not be a relational operator`, this.row, this.column, table.name));
        }
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

    interpret(_: Tree, __: Environment) {
        
    }

    getAST(): Node {
        let node: Node = new Node(this.operator);
        node.addChildsNode(this.exp1.getAST());
        node.addChildsNode(this.exp2.getAST());

        return node;
    }

}