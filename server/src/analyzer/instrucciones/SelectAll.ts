import { Instruccion } from "../abstract/Instruction";
import { Data } from "../data/Data";
import { Node } from "../abstract/Node";
import Tree from "../tools/Tree";
import Environment from "../tools/Environment";

export class SelectAll implements Instruccion{
    public nombre: string;
    public row: number;
    public column: number;
    constructor(nombre: string, row: number, column: number){
        this.nombre = nombre;
        this.row = row;
        this.column = column;
    }
    interpret(tree: Tree, __: Environment) {
        let texto = ''
        const data = Data.getInstance();
        const tabla = data.get_tabla(this.nombre);
        if (tabla != null){
            texto += 'Tabla: ' + this.nombre + '\n';
            const columnNames = tabla.columnas.map(col => col.id);
            texto += columnNames.join(' | ') + '\n';
            tabla.columnas[0].values.forEach((_, rowIndex) => {
            const rowData = tabla.columnas.map(col => col.values[rowIndex].value);
            texto += rowData.join(' | ') + '\n'})
            tree.updateConsole(texto);
        }
    }
    getAST(): Node {
        let node: Node = new Node("SELECT *");
        node.addChild(this.nombre);
        return node;
    }
}