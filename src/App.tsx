import React from "react";
import "./App.css";
import Home from "./components/Home";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const App: React.FC = () => {
  return (
    <div className="App">
      <Home />
    </div>
  );
};

export default App;
