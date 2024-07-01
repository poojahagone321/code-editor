import React, { useState, useEffect } from "react";
import CodeEditor from "./Components/CodeEditor/codeEditor.jsx";
import styled, { keyframes } from "styled-components";

const fadeOutRotate = keyframes`
  0% {
    opacity: 1;
    transform: rotate(0deg);
  }
  100% {
    opacity: 0;
    transform: rotate(360deg);
  }
`;

const SplashScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: rgb(238, 174, 202);
  background: linear-gradient(
    90deg,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  font-size: 3rem;
  color: #333;
  animation: ${fadeOutRotate} 3s forwards;
`;

const AppWrapper = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState(
    `import React from "react";\n\nconst Tealfeed = () => {\n  return <div>Hello, Tealfeed!</div>;\n};\n\nexport default Tealfeed;`
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (newCode) => {
    setCode(newCode);
  };

  return (
    <>
      {loading && <SplashScreen> Code Editor</SplashScreen>}
      <AppWrapper show={!loading}>
        <h1>Simple Code Editor</h1>
        <CodeEditor code={code} onChange={handleChange} />
      </AppWrapper>
    </>
  );
};

export default App;