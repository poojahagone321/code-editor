import React, { useState, useEffect, useRef } from "react";
import { Highlight, Prism } from "prism-react-renderer";
import styled from "styled-components";


const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  font-family: "Fira Code", "Fira Mono", Consolas, Menlo, Courier, monospace;
  font-size: 16px;

  line-height: 21px;
  margin: 23.38px 0;
  max-height: 400px;
  overflow-x: auto;
  overflow-y: auto;
  tab-size: 42px;
  text-align: center;
  unicode-bidi: isolate;
  width: 100%;
  max-width: 100%;
  z-index: 1;
`;

const TextArea = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  margin: 0;
  font-family: "Fira Code", monospace;
  font-size: 18px;
  border: none;
  outline: none;
  resize: none;
  color: transparent;
  background: transparent;
  caret-color: #fff;
  z-index: 1;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.5;
  &::placeholder {
    color: #ccc;
  }
`;

const Pre = styled.pre`
  position: relative;
  margin: 0;
  font-size: 18px;
  padding: 20px;
  border-radius: 8px;
  background-color: #282c34;
  color: #f8f8f2;
  overflow-x: auto;
  overflow-y: scroll;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.5;
  max-width: 100%;
  width: 100%;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 255);
    border-radius: 6px;
  }
`;

const CodeEditor = ({ code, onChange }) => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    }
  }, [code]);

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Wrapper>
      <TextArea
        ref={textAreaRef}
        value={code}
        onChange={handleChange}
        spellCheck="false"
        placeholder="Type some code here...."
      />
      <Pre aria-hidden="true">
        <Highlight Prism={Prism} code={code} language="jsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <code
              className={className}
              style={{ ...style, fontFamily: "'Fira Code', monospace" }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </code>
          )}
        </Highlight>
      </Pre>
    </Wrapper>
  );
};

export default CodeEditor;