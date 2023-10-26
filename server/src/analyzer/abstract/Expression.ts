import Environment from "../tools/Environment";
import ReturnType from "../tools/ReturnType";
import Tree from "../tools/Tree";


export interface Expresion{
    row: number;
    column: number;
    getValue(tree: Tree, table: Environment): ReturnType;
    getAST(): any;
}