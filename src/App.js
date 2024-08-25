import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

function App() {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const jsonInput = JSON.parse(input);
      setIsValid(true);

      // Replace '/api-endpoint' with your actual API endpoint.
      const apiResponse = await axios.post("/api-endpoint", jsonInput);
      setResponse(apiResponse.data);
    } catch (error) {
      setIsValid(false);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected || []);
  };

  const options = [
    { value: "Alphabets", label: "Alphabets" },
    { value: "Numbers", label: "Numbers" },
    {
      value: "Highest lowercase alphabet",
      label: "Highest lowercase alphabet",
    },
  ];

  return (
    <div>
      <h1>JSON Processor</h1>

      {/* Wrapper for the textarea and label */}
      <div style={{ position: "relative", margin: "20px" }}>
        <label
          style={{
            position: "absolute",
            top: "-10px",
            left: "10px",
            backgroundColor: "white",
            padding: "0 5px",
            color: "grey",
            fontWeight: "bold",
          }}
        >
          API Input
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter JSON here"
          rows="10"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid lightgrey",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {!isValid && <p style={{ color: "red" }}>Invalid JSON</p>}

      {/* Styled Submit Button */}
      <button
        onClick={handleSubmit}
        style={{
          width: "calc(100% - 40px)", // Full width minus margin
          margin: "20px", // Margin of 20px
          padding: "10px", // Padding of 10px
          backgroundColor: "navy", // Navy blue background
          color: "white", // White text color
          border: "none", // Remove default border
          borderRadius: "8px", // Rounded rectangle shape
          cursor: "pointer", // Pointer cursor on hover
          fontSize: "16px", // Font size for better readability
          boxSizing: "border-box", // Ensures padding is included in the element's total width and height
        }}
      >
        Submit
      </button>

      {/* React Select Dropdown */}
      <div style={{ margin: "20px" }}>
        <Select
          isMulti
          options={options}
          value={selectedOptions}
          onChange={handleSelectChange}
          placeholder="Select options..."
          styles={{
            control: (provided) => ({
              ...provided,
              width: "calc(100% - 40px)",
              margin: "20px",
              padding: "5px",
              borderRadius: "8px",
            }),
          }}
        />
      </div>
    </div>
  );
}

export default App;
