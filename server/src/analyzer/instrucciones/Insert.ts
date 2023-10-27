import { Instruccion } from "../abstract/Instruction";
import { Data } from "../data/Data";
import Environment from "../tools/Environment";
import Tree from "../tools/Tree";
import { Node } from "../abstract/Node";

export class Insert implements Instruccion{
    id: string;
    cabaceras: string[];
    valores: any[];
    row: number;
    column: number;
    constructor(id: string, cabaceras: string[], valores: any[], row: number, column: number){
        this.id = id;
        this.cabaceras = cabaceras;
        this.valores = valores;
        this.row = row;
        this.column = column;
    }
    interpret(_: Tree, __: Environment) {

        const data = Data.getInstance();
        const tabla = data.get_tabla(this.id);
        if (tabla != null){
            if (tabla.columnas.length == this.valores.length){
                tabla.columnas.forEach((col, index) => {
                    col.values.push(this.valores[index]);
                });
            }
            else{
                console.log("Error en el numero de columnas");
            }
        }
        else{
            console.log("Error la tabla no existe");
        }
    }
    getAST(): Node {
        let node: Node = new Node("INSERT");
        node.addChild(this.id);
        let txtCabecera = 'Columnas: ';
        this.cabaceras.forEach(element => {
            txtCabecera += element + ', ';
            });
        let txtValores = 'Valores: ';
        this.valores.forEach(element => {
            txtValores += element.value + ', ';
        });
        node.addChild(txtCabecera);
        node.addChild(txtValores);
        return node;
}
}