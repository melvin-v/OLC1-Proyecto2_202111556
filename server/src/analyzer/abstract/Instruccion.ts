import Environment from "../tools/Environment";
import ReturnType from "../tools/ReturnType";
import Tree from "../tools/Tree";
import { Node } from "./Node";

export interface Instruccion {
    row: number;
    column: number;

    getValue(tree: Tree, table: Environment): ReturnType;
    interpret(tree: Tree, table: Environment): any;
    getAST(): Node;
}