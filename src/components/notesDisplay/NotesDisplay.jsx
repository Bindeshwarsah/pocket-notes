import React from "react";
import styles from "./NotesDisplay.module.css";

const NotesDisplay = ({ messages }) => {
  return (
    <div className={styles.displayContainer}>
      {messages.map((message, index) => (
        <div key={index} className={styles.messageContainer}>
          <div className={styles.content}>{message.content}</div>
          <div className={styles.dateTime}>
            {new Date(message.timestamp)
              .toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
              .replace(/,/, "")
              .replace(/(\d+) (\w+) (\d+)/, "$2 $1 $3")}
            &nbsp; &nbsp; <span className={styles.bullet}> &bull; </span>&nbsp;
            &nbsp;
            {new Date(message.timestamp).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesDisplay;
