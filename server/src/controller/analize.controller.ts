import { Request, Response } from "express"
import Tree from "../Analyzer/tools/Tree.js";
import Environment from "../Analyzer/tools/Environment.js";
import { Instruccion } from "../Analyzer/abstract/Instruction.js";
// @ts-ignore
import { grammar, errors, clean_errors } from '../Analyzer/grammar.js'
import { Node } from "../Analyzer/abstract/Node.js";

interface outParse {
    "console": string,
    "ast": string,
    "reporte_tokens": string,
    "reporte_errores": string,
    "reporte_simbolos": string
}

export const analyze = (req: Request, res: Response) => {
    const { code } =  req.body;

    const out = interpret(code);

    res.json({
        "console": out.console,
        "ast": out.ast,
        "reporte_tokens": out.reporte_tokens,
        "reporte_errores": out.reporte_errores,
        "reporte_simbolos": out.reporte_simbolos
    });
}

const interpret = (bufferStrem: string): outParse => {
    let tree: Tree | null;
    let globalTable: Environment | null;

    let instructions: Array<Instruccion>;
    console.log(bufferStrem);
    instructions = grammar.parse(bufferStrem);
    
    tree = new Tree(instructions);
    globalTable = new Environment(undefined, undefined);
    tree.globalTable = globalTable;

    let rootAst: Node = new Node("Root");
    let value: Node = new Node("Instructions");

    for (let item of tree.instructions) {
        value.addChildsNode(item.getAST());
    }

    rootAst.addChildsNode(value);

    let ast = tree.getDot(rootAst, false);
    return {
        "console": tree.console,
        "ast": ast,
        "reporte_tokens": "test",
        "reporte_errores": "test",
        "reporte_simbolos": "test"
    }
    
}