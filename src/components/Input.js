import React from "react";
import { useEffect, useState } from "react";
import TypingIndicator from "typing-indicator";

import styles from "@/styles/Home.module.css";

let typingIndicator = null;

export default function Input({ onSendMessage, onChangeTypingState }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (typingIndicator === null) {
      typingIndicator = new TypingIndicator();
      typingIndicator.listen((isTyping) => onChangeTypingState(isTyping));
    }
  }, []);

  function onChange(e) {
    const text = e.target.value;
    typingIndicator.onChange(text);
    setText(text);
  }

  function onSubmit(e) {
    e.preventDefault();
    setText("");
    onSendMessage(text);
  }

  return (
    <div className={styles.input}>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          onChange={(e) => onChange(e)}
          value={text}
          type="text"
          placeholder="Enter your message and press Enter"
        />
        <button>Send</button>
      </form>
    </div>
  );
}
