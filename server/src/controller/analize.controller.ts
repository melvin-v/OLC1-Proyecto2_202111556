import { Request, Response } from "express"
import Tree from "../Analyzer/tools/Tree.js";
import Environment from "../Analyzer/tools/Environment.js";
import { Instruccion } from "../Analyzer/abstract/Instruction.js";
// @ts-ignore
import { grammar, errors, clean_errors } from '../Analyzer/grammar.js'
import { Node } from "../Analyzer/abstract/Node.js";
import { Data } from "../Analyzer/data/Data.js";



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
    const data = Data.getInstance();
    let tree: Tree | null;
    let globalTable: Environment | null;

    let instructions: Array<Instruccion>;
    instructions = grammar.parse(bufferStrem);
    
    tree = new Tree(instructions);
    globalTable = new Environment(undefined, undefined);
    tree.globalTable = globalTable;
    for (let instr of instructions) {
        try{
        instr.interpret(tree, globalTable);}
        catch(error){
            console.log(error);
        }
    }
    let rootAst: Node = new Node("Root");
    let value: Node = new Node("Instructions");

    for (let item of tree.instructions) {
        try{
        value.addChildsNode(item.getAST());}
        catch(error){
            console.log(error);
        }
    }

    rootAst.addChildsNode(value);

    let ast = tree.getDot(rootAst, false);
    return {
        "console": tree.console,
        "ast": ast,
        "reporte_tokens": crearTablaHTMLTokens(data.tokens),
        "reporte_errores": crearTablaHTMLErrores(data.errores),
        "reporte_simbolos": "test"
    }
    
}
function crearTablaHTMLTokens(datos: any[]) {
    // Inicializa la variable que contendrá el HTML de la tabla
    let tablaHTML = '<table>';
  
    // Encabezados de tabla
    tablaHTML += '<tr>';
    tablaHTML += '<th>Tipo</th>';
    tablaHTML += '<th>Valor</th>';
    tablaHTML += '</tr>';
  
    // Recorre el arreglo de datos y agrega filas a la tabla
    datos.forEach(dato => {
      tablaHTML += '<tr>';
      tablaHTML += `<td>${dato.Tipo}</td>`;
      tablaHTML += `<td>${dato.Valor}</td>`;
      tablaHTML += '</tr>';
    });
  
    // Cierra la tabla
    tablaHTML += '</table>';
  
    return tablaHTML;
  }

  function crearTablaHTMLErrores(datos: any[]) {
    // Inicializa la variable que contendrá el HTML de la tabla
    let tablaHTML = '<table>';
  
    // Encabezados de tabla
    tablaHTML += '<tr>';
    tablaHTML += '<th>Linea</th>';
    tablaHTML += '<th>Columna</th>';
    tablaHTML += '<th>Tipo</th>';
    tablaHTML += '<th>Mensaje</th>';
    tablaHTML += '</tr>';
  
    // Recorre el arreglo de datos y agrega filas a la tabla
    datos.forEach(dato => {
      tablaHTML += '<tr>';
      tablaHTML += `<td>${dato.line}</td>`;
      tablaHTML += `<td>${dato.column}</td>`;
      tablaHTML += `<td>${dato.type}</td>`;
      tablaHTML += `<td>${dato.message}</td>`;
      tablaHTML += '</tr>';
    });
  
    // Cierra la tabla
    tablaHTML += '</table>';
  
    return tablaHTML;
  }