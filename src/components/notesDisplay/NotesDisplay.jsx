import React from "react";
import styles from "./NotesDisplay.module.css";
import { format } from "date-fns";

const NotesDisplay = ({ messages }) => {
  return (
    <div className={styles.displayContainer}>
      {messages.map((message, index) => (
        <div key={index} className={styles.messageContainer}>
          <div className={styles.content}>{message.content}</div>
          <div className={styles.dateTime}>
            {format(new Date(message.timestamp), "dd MMM yyyy")}
            &nbsp; &nbsp; <span className={styles.bullet}> &bull; </span>&nbsp;
            &nbsp;
            {format(new Date(message.timestamp), "h:mm a")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesDisplay;
