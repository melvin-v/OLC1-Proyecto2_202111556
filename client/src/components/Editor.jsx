import React, { useState, useEffect } from 'react'
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { StandardSQL } from '@codemirror/lang-sql';
import { useContext } from "react";
import { DataContext } from "../DataContext";
import {dracula} from 'thememirror';


function Editor(){
    const { data, setData, activeTabIndex, setActiveTabIndex } = useContext(DataContext);
    const [code, setCode] = useState('');
    const [out, setOut] = useState('Hello');

    // Este efecto se ejecutará cuando cambies de pestaña
    //useEffect(() => {
    //  setCode(data[activeTabIndex].contenido);
    // }, [data, activeTabIndex]);
    
    const onChange = (value) => {
      // Actualiza el contenido en el contexto
      let newData = [...data];
      newData[activeTabIndex].contenido = value;
      setData(newData);
    };
    return(
    <div className='container-fluid'>
        <div className="row w-100">
          <div className='col'>
            <CodeMirror
              className='cm1'
              width='100%'
              height='100%'
              theme={dracula}
              extensions={[StandardSQL]}
              onChange={onChange}
              value={data[activeTabIndex].contenido}
            />
          </div>
          <div className='col'>
            <CodeMirror
              className='cm2'
              value={out}
              width='100%'
              height='100%'
              readOnly={true}
              theme={dracula}
            />
          </div>
        </div>
      </div>
    )
}

export default Editor;