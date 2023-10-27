import { useContext, useEffect } from "react";
import { DataContext } from "../DataContext";
import Viz from "viz.js";
import { Module, render } from "viz.js/full.render.js";

function Toolbar() {
  const { data, setData, activeTabIndex, setActiveTabIndex } = useContext(DataContext);

  const nuevoArchivo = () => {
    const newData = [...data];
    let numero = 1;
    newData.forEach((element) => {
      if (element.nombre.includes("Nuevo ")) {
        numero++;
      }
    });
    newData.push({
      nombre: `Nuevo ${data.length + 1}`,
      contenido: "",
      salida: "",
      ruta: "",
      tokens: "",
      errores: "",
      ast: ""
    });
    setData(newData);
    setActiveTabIndex(newData.length - 1);
  };

  const abrirArchivo = (event) => {
    const archivo = event.target.files[0];
    const newData = [...data];
    if (archivo) {
      const lector = new FileReader();

      lector.onload = (e) => {
        let newObjeto={
          nombre: archivo.name,
          contenido: e.target.result,
          salida: "",
          ruta: URL.createObjectURL(archivo),
          tokens: "",
          errores: "",
          ast: ""
        }
        
        setActiveTabIndex(newData.length);
        newData.push(newObjeto);
        setData(newData);
      };

      lector.readAsText(archivo);
    }
  }

  const guadar = () => {
    const newData = [...data];
    const blob = new Blob([newData[activeTabIndex].contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = newData[activeTabIndex].nombre;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const cerrar = () => {
    if (data.length > 1){
      const newData = [...data];
    newData.splice(activeTabIndex, 1);
    setData(newData);
    if (activeTabIndex > 0) {
      setActiveTabIndex(activeTabIndex - 1);
    }
    }
  }

  const ejecutar = () => {
    console.log('Hola')
    fetch('http://localhost:3000/analizar', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        "code": data[activeTabIndex].contenido
      })
    }).then(res => res.json())
    .then(d => {
      console.log(d)
      data[activeTabIndex].salida = d.console;
      data[activeTabIndex].tokens = d.reporte_tokens;
      data[activeTabIndex].errores = d.reporte_errores;
      data[activeTabIndex].ast = d.ast;
    });
  }
  const generateAndDownloadImage = (dotSource) => {
    return new Promise(async (resolve, reject) => {
      const viz = new Viz({ Module, render });
  
      try {
        const svgContent = await viz.renderString(dotSource, { format: "svg" });
  
        // Crea un blob SVG
        const svgBlob = new Blob([svgContent], { type: "image/svg+xml" });
  
        // Crea una URL del blob y crea un enlace de descarga
        const svgUrl = URL.createObjectURL(svgBlob);
        const link = document.createElement("a");
        link.href = svgUrl;
        link.download = "graph.svg";
        link.click();
        resolve();
      } catch (error) {
        console.error("Error al generar la imagen DOT:", error);
        reject(error);
      }
    });
  }
  function descargarComoArchivo(texto, nombreArchivo) {
    const blob = new Blob([texto], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = nombreArchivo;
    enlace.click();
    URL.revokeObjectURL(url);
  }
    return (
      <div className="toolbar">
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Archivo
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" onClick={nuevoArchivo}>
                        Nuevo archivo
                      </button>
                    </li>
                    <li>
                      <label className="dropdown-item">
                        <input
                          type="file"
                          style={{ display: 'none' }}
                          onChange={abrirArchivo}
                        />
                        Abrir archivo
                      </label>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={guadar}>
                        Guardar
                      </button>
                    </li>
                    
                  </ul>
                  
                </li>
                <li className="nav-item">
                      <button className="nav-link active" aria-current="page" onClick={ejecutar}>Ejecutar</button>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Reportes
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" onClick={()=>descargarComoArchivo(data[activeTabIndex].tokens, "Tokens")}>
                        Reporte de tokens
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={()=>descargarComoArchivo(data[activeTabIndex].errores, "Errores")}>
                        Reporte de errores
                      </button>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Reporte de tabla de simbolos
                      </a>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() =>generateAndDownloadImage(data[activeTabIndex].ast)}>
                        General arbol de analisis sintactico
                      </button>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                      <button className="nav-link active" onClick={cerrar}>Cerrar pestaña</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
  
  export default Toolbar;
  