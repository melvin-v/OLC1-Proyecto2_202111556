import { Instruccion } from "../abstract/Instruction";
import { Node } from "../abstract/Node";
import { Data } from "../data/Data";
import Environment from "../tools/Environment";
import Tree from "../tools/Tree";

export class Select implements Instruccion{
    public cabeceras: string[];
    public nombre: string;
    public row: number;
    public column: number;
    constructor(cabeceras: string[], nombre: string, row: number, column: number){
        this.cabeceras = cabeceras;
        this.nombre = nombre;
        this.row = row;
        this.column = column;
    }
    interpret(tree: Tree, __: Environment) {
        const data = Data.getInstance();
        const tabla = data.get_tabla(this.nombre);
        if (tabla != null){
            let texto = ''
            const data = Data.getInstance();
            const tabla = data.get_tabla(this.nombre);
            if (tabla != null){
                texto += 'Tabla: ' + this.nombre + '\n';
                const columnNames = tabla.columnas.map(col => {
                    if (this.cabeceras.includes(col.id))
                        col.id 
                });
                texto += columnNames.join(' | ') + '\n';
                tabla.columnas[0].values.forEach((_, rowIndex) => {
                const rowData = tabla.columnas.map(col => col.values[rowIndex].value);
                texto += rowData.join(' | ') + '\n'})
                tree.updateConsole(texto);
            }
        }
    }
    getAST(): Node {
        let node: Node = new Node("SELECT");
        let txtCabecera = 'Columnas: ';
        this.cabeceras.forEach(element => {
            txtCabecera += element + ', ';
            });
        node.addChild(txtCabecera);
        node.addChild(this.nombre);
        return node;
    }
}