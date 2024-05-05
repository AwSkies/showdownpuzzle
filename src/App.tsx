import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { pages } from "./utils/navigation";
import styles from "./App.module.css";

function App() {
  // Since the navbar is being procedurally generated, the same props object will be passed into every component
  const props = {};
  
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {pages.map(
            (page, index) => <Route path={`/showdownpuzzle/${page.path}`} element={page.element(props)} key={`key${index}`} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
