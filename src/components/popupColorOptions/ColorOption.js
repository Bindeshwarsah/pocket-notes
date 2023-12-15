import React from "react";
import styles from "./ColorOption.module.css";

const ColorOption = ({ color, onClick }) => {
  return (
    <div
      className={styles.colorOption}
      style={{ backgroundColor: color }}
      onClick={() => onClick(color)}
    ></div>
  );
};

export default ColorOption;
