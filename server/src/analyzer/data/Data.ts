import { Tabla } from "./Tabla"

export class Data{
    private consola: string = ""
    private errores: any[] = []
    private tablas: Tabla[] = []
    constructor(consola: string, errores: any[], tablas: Tabla[]){
        this.consola = consola
        this.errores = errores
        this.tablas = tablas
    }
}