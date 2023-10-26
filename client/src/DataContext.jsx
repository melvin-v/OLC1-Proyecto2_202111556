import {createContext, useState} from "react";

export const DataContext = createContext();

const dataFija =[
{nombre: "Instrucciones.sql",
contenido: " DECLARE @numero INT DEFAULT 5;",
salida: "Esta es la salida",
ruta: "C:/Users/Usuario/Desktop/Instrucciones.sql"},
{nombre: "Instrucciones2.sql",
contenido: "SELECT * FROM tabla2;",
salida: "Esta es la salida",
ruta: "C:/Users/Usuario/Desktop/Instrucciones2.sql"}]

export const DataProvider = ({children}) => {
    const [data, setData] = useState(dataFija);
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <DataContext.Provider value={{data, setData, activeTabIndex, setActiveTabIndex}}>
            {children}
        </DataContext.Provider>
    );
}