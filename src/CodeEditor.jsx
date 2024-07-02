import React, { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

const CodeEditor = (props) => {
  const [content, setContent] = useState(props.content || "");
  const textareaRef = useRef(null);

  // Reset content when language changes
  useEffect(() => {
    setContent(""); // Reset content to empty string
  }, [props.language]);
  const handleKeyDown = (evt) => {
    let value = content,
      selStartPos = evt.currentTarget.selectionStart;

    console.log(evt.currentTarget);

    // handle 4-space indent on
    if (evt.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "    " +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      setContent(value);
    }
    // Handle parentheses and bracket completion
    else if (evt.key === "(") {
      value =
        value.substring(0, selStartPos) +
        "()" +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 1;
      evt.currentTarget.selectionEnd = selStartPos + 1;
      evt.preventDefault();
    } else if (evt.key === "[") {
      value =
        value.substring(0, selStartPos) +
        "[]" +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 1;
      evt.currentTarget.selectionEnd = selStartPos + 1;
      evt.preventDefault();
    } else if (evt.key === "{") {
      value =
        value.substring(0, selStartPos) +
        "{}" +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 1;
      evt.currentTarget.selectionEnd = selStartPos + 1;
      evt.preventDefault();
    }
    // Handle quotes completion
    else if (evt.key === '"' || evt.key === "'") {
      value =
        value.substring(0, selStartPos) +
        evt.key +
        evt.key +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 1;
      evt.currentTarget.selectionEnd = selStartPos + 1;
      evt.preventDefault();
    }

    // Handle tag completion
    else if (evt.key === ">") {
      const textBeforeCursor = value.substring(0, selStartPos);
      const tagMatch = textBeforeCursor.match(/<(\w+)([^<]*)$/);
      if (tagMatch) {
        const tagName = tagMatch[1];
        value =
          value.substring(0, selStartPos) +
          `></${tagName}>` +
          value.substring(selStartPos, value.length);
        evt.currentTarget.selectionStart = selStartPos + 1;
        evt.currentTarget.selectionEnd = selStartPos + 1;
        evt.preventDefault();
      }
    }
    setContent(value);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [props.language, content]);

  return (
    <div className="code-edit-container">
      <textarea
        ref={textareaRef}
        className="code-input"
        value={content}
        onChange={(evt) => setContent(evt.target.value)}
        onKeyDown={handleKeyDown}
      />

      <pre className="code-output">
        <code className={`language-${props.language}`}>{content}</code>
      </pre>
    </div>
  );
};

export default CodeEditor;
