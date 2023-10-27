import { Tabla } from "./Tabla"

export class Data{
    private static instance: Data
    private consola: string = ""
    public errores: any[] = []
    public tokens: any[] = []
    private tablas: Tabla[] = []
    constructor() {
    }
    public static getInstance(): Data {
        if (!Data.instance) {
            Data.instance = new Data();
        }
        return Data.instance;
    }
    public addConsole(data: string) {
        this.consola += data
    }
    public getConsole(): string {
        return this.consola
    }
    public cleanConsole(): void {
        this.consola = ''
    }
    public add_errores(data: any) {
        this.errores.push(data)
    }
    public get_errores(): any[] {
        return this.errores
    }
    public cleanErrors(): void {
        this.errores = []
    }
    public add_tabla(data: Tabla) {
        this.tablas.push(data)
    }
    public get_tabla(nombre: string) {
        let tabla: Tabla | undefined;
        this.tablas.forEach(element => {
            if (element.nombre == nombre) {
                tabla = element;
            }
        });
        return tabla
    }
    public get_tablas(): Tabla[] {
        return this.tablas
    }
    public cleanTables(): void {
        this.tablas = []
    }
}