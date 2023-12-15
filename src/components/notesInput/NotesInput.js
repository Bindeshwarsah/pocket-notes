import React, { useState } from "react";
import styles from "./NotesInput.module.css";
import disabled_send from "../../assets/icons/disabled_send_icon.svg";
import enabled_send from "../../assets/icons/enabled_send_icon.svg";

const NotesInput = ({ onSendMessage }) => {
  const [messageInput, setMessageInput] = useState("");

  const sendMessage = () => {
    const trimmedMessage = messageInput.trim();
    if (trimmedMessage === "") return;

    onSendMessage(trimmedMessage);
    setMessageInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Check if the screen width is less than or equal to 500px
      const isMobile = window.innerWidth <= 500;

      if (isMobile) {
        // For mobile devices, prevent the default Enter behavior (new line) and insert a line break
        e.preventDefault();
        setMessageInput((prevMessage) => prevMessage + "\n");
      } else if (!e.shiftKey) {
        // For non-mobile devices, or mobile devices with Shift key pressed, trigger the send message action
        e.preventDefault();
        sendMessage();
      }
    }
  };

  return (
    <div className={styles.notesInputContainer}>
      <textarea
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Enter your text here..........."
        onKeyDown={handleKeyDown}
        className={styles.notesTextArea}
      />
      <div
        onClick={sendMessage}
        disabled={messageInput.trim() === ""}
        style={{
          backgroundImage: `url(${
            messageInput.trim() === "" ? disabled_send : enabled_send
          })`,
        }}
        className={styles.sendBtn}
      ></div>
    </div>
  );
};

export default NotesInput;
