import logo from "./logo.svg";
import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");

  const save = async () => {
    const data = {
      name,
      surname,
      age,
    };

    const response = await axios.post("http://localhost:3000/saveUser", data);
    console.log("response ", response.data.encrypted);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input onChange={(e) => setName(e.target.value)} />
        <input onChange={(e) => setSurname(e.target.value)} />
        <input onChange={(e) => setAge(e.target.value)} />
        <button onClick={save}>Kaydet</button>
      </header>
    </div>
  );
}

export default App;
