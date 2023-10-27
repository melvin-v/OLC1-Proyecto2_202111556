import { Col } from "./Col"

export class Tabla{
    public nombre: string
    public columnas: Col[] = []
    constructor(nombre: string, columnas: Col[]){
        this.nombre = nombre
        this.columnas = columnas
    }
}