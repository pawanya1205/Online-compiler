import React from "react";
import Select from "react-select";
import "../Styles/Navbar.css";

const Navbar = ({
  // Props passed to Navbar component
  userLang, // User-selected programming language
  setUserLang, // Function to set the user's selected language
  userTheme, // User-selected editor theme (Dark or Light)
  setUserTheme, // Function to set the user's selected theme
  fontSize, // User-selected font size
  setFontSize, // Function to set the user's selected font size
  codeToCopy, // User code to copy to the clipboard (Unused variable)
  handleCopyClick, // Function to handle copying user code to the clipboard
  handleSaveClick, // Function to handle saving user code
  isLocked, // Boolean indicating whether code editing is locked
  toggleLock, // Function to toggle the code editing lock state
}) => {
  // Options for programming languages
  const languages = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
  ];

  // Options for editor themes (Dark and Light)
  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];

  return (
    <div className="navbar">
      <h1>Edvanta Compiler</h1>
      <Select
        options={languages}
        value={userLang}
        onChange={(e) => setUserLang(e.value)}
        placeholder={userLang}
      />
      <Select
        options={themes}
        value={userTheme}
        onChange={(e) => setUserTheme(e.value)}
        placeholder={userTheme}
      />
      <label>Font Size</label>
      <input
        type="range"
        min="18"
        max="30"
        value={fontSize}
        step="2"
        onChange={(e) => {
          setFontSize(e.target.value);
        }}
      />

      <button onClick={handleCopyClick}>Copy</button>
      <button onClick={handleSaveClick}>Save</button>
      <button onClick={toggleLock}>{isLocked ? "Unlock" : "Lock"}</button>
    </div>
  );
};

export default Navbar;
