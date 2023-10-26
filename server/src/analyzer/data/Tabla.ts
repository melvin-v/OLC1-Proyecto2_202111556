import { Columna } from "./Columna"

export class Tabla{
    public nombre: string
    public columnas: Columna[] = []
    constructor(nombre: string, columnas: Columna[]){
        this.nombre = nombre
        this.columnas = columnas
    }
}