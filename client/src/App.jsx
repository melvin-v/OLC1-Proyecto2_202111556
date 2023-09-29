import { DataProvider } from "./DataContext.jsx"
import Toolbar from "./components/Toolbar.jsx"
import Tab from "./components/Tab.jsx"
import Editor from "./components/Editor.jsx"


function App() {

  return (
    <DataProvider>
        <Toolbar/>
        <Tab/>
        <Editor/>
    </DataProvider>
  )
}

export default App
