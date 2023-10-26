import Symbol from "./Symbol.js";

export default class Environment {

    public name: string;
    public table: Map<string, Symbol>;
    public prev: Environment | undefined;

    constructor(prev?: Environment, name: string = "Global") {
        this.name = name;
        this.prev = prev;
        this.table = new Map<string, Symbol>();
    }

    public saveSymbol(symbol: Symbol) {
        if (!this.getSymbol(symbol.id)){
            symbol.environment = this.name;
            this.table.set(symbol.id, symbol);
        }
        return undefined;
    }

    public getSymbol(id: string) {
        let currentTable: Environment | undefined = this;

        while (currentTable != undefined) {
            if (currentTable.table.has(id)) {
                return currentTable.table.get(id);
            }

            currentTable = currentTable.prev;
        }

        return undefined;
    }

    public updateSymbol(symbol: Symbol) {
        let currentTable: Environment | undefined = this;

        while (currentTable != undefined) {
            if (currentTable.table.has(symbol.id)) {
                for (let entry of Array.from(currentTable.table)) {
                    if (entry[0] === symbol.id) {
                        entry[1].value = symbol.value;
                    }
                }
            }
            currentTable = currentTable.prev;
        }

        return undefined;
    }

}