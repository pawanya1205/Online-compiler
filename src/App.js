import { useState } from "react";
import "./App.css";
import Editor from "@monaco-editor/react";
import Navbar from "./Components/Navbar";
import Axios from "axios";
import spinner from "./spinner.svg";

function App() {
  // State variables
  const [userCode, setUserCode] = useState("");
  const [userLang, setUserLang] = useState("python");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(20);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const options = {
    fontSize: fontSize,
  };

  // Function to compile user code
  function compile() {
    setLoading(true);
    if (userCode === "") {
      return;
    }

    Axios.post("http://localhost:8000/compile", {
      code: userCode,
      language: userLang,
      input: userInput,
    })
      .then((res) => {
        setUserOutput(res.data.output);
      })
      .then(() => {
        setLoading(false);
      });
  }

  // Function to clear the output
  function clearOutput() {
    setUserOutput("");
  }

  // Function to handle copying the user code to the clipboard
  function handleCopyClick() {
    if (!isLocked) {
      navigator.clipboard.writeText(userCode);
    }
  }

  // Function to save the user code to local storage
  function handleSaveClick() {
    if (!isLocked) {
      localStorage.setItem("savedCode", userCode);
    }
  }

  return (
    <div className="App">
      <Navbar
        userLang={userLang}
        setUserLang={setUserLang}
        userTheme={userTheme}
        setUserTheme={setUserTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        handleCopyClick={handleCopyClick}
        handleSaveClick={handleSaveClick}
        isLocked={isLocked}
        toggleLock={() => setIsLocked(!isLocked)}
      />
      <div className="main">
        <div className="left-container">
          <Editor
            options={options}
            height="calc(100vh - 50px)"
            width="100%"
            theme={userTheme}
            language={userLang}
            defaultLanguage="python"
            defaultValue="# Let's hussle"
            onChange={(value) => {
              setUserCode(value);
            }}
          />
          <button className="run-btn" onClick={compile}>
            Run
          </button>
        </div>
        <div className="right-container">
          <h4>Input:</h4>
          <div className="input-box">
            <textarea
              id="code-inp"
              onChange={(e) => setUserInput(e.target.value)}
              readOnly={isLocked}
            ></textarea>
          </div>
          <h4>Output:</h4>
          {loading ? (
            <div className="spinner-box">
              <img src={spinner} alt="Loading..." />
            </div>
          ) : (
            <div className="output-box">
              <pre>{userOutput}</pre>
              <button onClick={clearOutput} className="clear-btn">
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
