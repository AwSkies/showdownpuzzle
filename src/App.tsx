import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import { pages, mapPages } from "./utils/navigation";

function App() {
  // Since the navbar is being procedurally generated, the same props object will be passed into every component
  const props = {};
  
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {mapPages(
            (name, index) => <Route path={`/showdownpuzzle/${name}`} element={pages[name](props)} key={`key${index}`} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
