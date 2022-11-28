import { useState } from "react";

import Home from "./pages/home/Home";
import Header from "./components/header/Header";

import "./App.css";

function App() {
  const [searchString, setSearchString] = useState("");

  return (
    <>
      <Header onSearch={setSearchString} />

      <main>
        <Home searchString={searchString} />
      </main>
    </>
  );
}

export default App;
