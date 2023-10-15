import Environment from "../tools/Environment";
import Tree from "../tools/Tree";
import { Node } from "./Node";

export interface SQL {
    row: number;
    column: number;

    interpret(tree: Tree, table: Environment): any;
    getAST(): Node;
}