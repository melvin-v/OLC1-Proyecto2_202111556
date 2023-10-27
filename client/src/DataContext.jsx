import {createContext, useState} from "react";

export const DataContext = createContext();

const dataFija =[
{nombre: "new.sql",
contenido: " ",
salida: "",
ruta: "C:/Users/Usuario/Desktop/Instrucciones.sql",
tokens: "",
errores: "",
ast: ""}]

export const DataProvider = ({children}) => {
    const [data, setData] = useState(dataFija);
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <DataContext.Provider value={{data, setData, activeTabIndex, setActiveTabIndex}}>
            {children}
        </DataContext.Provider>
    );
}