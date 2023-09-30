import { useContext } from "react";
import { DataContext } from "../DataContext";
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
                      <a className="nav-link active" aria-current="page" href="#">Ejecutar</a>
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
                      <a className="dropdown-item" href="#">
                        Reporte de tokens
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Reporte de errores
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Reporte de tabla de simbolos
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        General arbol de analisis sintactico
                      </a>
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
  