import { Type } from "./Type";

export const retornarTipo = (tipo: Type) => { 
    if(tipo == Type.INT){
        return 'int';
    }
    else if(tipo == Type.DOUBLE){
        return 'double';
    }
    else if(tipo == Type.BOOLEAN){
        return 'boolean';
    }
    else if(tipo == Type.VARCHAR){
        return 'varchar';
    }
    else if(tipo == Type.DATE){
        return 'date';
    }
    else if(tipo == Type.NULL){
        return 'null';
    }
    else if(tipo == Type.NEGATIVE){
        return 'negative';
    }
    else{
        return '???';
    }
}