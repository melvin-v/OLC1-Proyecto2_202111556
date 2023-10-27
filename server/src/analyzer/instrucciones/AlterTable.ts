import { Instruccion } from "../abstract/Instruction";
import { Node } from "../abstract/Node";
import { Col } from "../data/Col";
import { Data } from "../data/Data";
import Environment from "../tools/Environment";
import Tree from "../tools/Tree";

export class AlterTable implements Instruccion{
    public name: string;
    public row: number;
    public column: number;
    public instruccion: Instruccion
    constructor(name: string, instruccion: Instruccion, row: number, column: number){
        this.name = name;
        this.row = row;
        this.column = column;
        this.instruccion = instruccion;
    }
    interpret(tree: Tree, table: Environment) {
        
        const alter = this.instruccion.interpret(tree, table);
        const data = Data.getInstance();
        const tablas = data.get_tablas();
        if (alter.op == "ADD_COLUMN"){
            tablas.forEach(element => {
                if (element.nombre == this.name){
                    element.columnas.push(new Col(alter.id, alter.type, []));
                }
            });
        }
        else if(alter.op == "DROP_COLUMN"){
            tablas.forEach(element => {
                if (element.nombre == this.name){
                    element.columnas.forEach((col, index) => {
                        if (col.id == alter.id){
                            element.columnas.splice(index, 1);
                        }
                    });
                }
            });
        }
        else if(alter.op == "RENAME_TABLE"){
            tablas.forEach(element => {
                if (element.nombre == this.name){
                    element.nombre = alter.id;
                }
            });
        }
        else if(alter.op == "RENAME_COLUMN"){
            tablas.forEach(element => {
                if (element.nombre == this.name){
                    element.columnas.forEach(col => {
                        if (col.id == alter.id){
                            col.id = alter.type;
                        }
                    });
                }
            });
        }
    }
    getAST(): Node {
        let node: Node = new Node("ALTER TABLE");
        node.addChild(this.name);
        node.addChildsNode(this.instruccion.getAST());
        return node;
    }
   
}