import React from "react";
import styles from "./GroupTitle.module.css";

const GroupTitle = ({ group, isActive, onClick }) => {
  if (!group || !group.name) {
    return null;
  }

  return (
    <li
      className={`${styles.groupItem} ${isActive ? styles.activeItem : ""}`}
      onClick={onClick}
    >
      <div style={{ backgroundColor: group.color }} className={styles.initial}>
        {group.name
          .split(/\s+/)
          .slice(0, 2)
          .map((word) => word.charAt(0).toUpperCase())
          .join("")}
      </div>
      <span className={styles.groupName}>{group.name}</span>
    </li>
  );
};

export default GroupTitle;
