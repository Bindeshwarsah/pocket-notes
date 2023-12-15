import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "../groupPopup/Popup";
import styles from "./GroupList.module.css";
import GroupTitle from "../groupTitle/GroupTitle";

const generateUniqueId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

const GroupList = ({ setActiveGroup, activeGroup, handleGroupClick }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [groups, setGroups] = useState(
    JSON.parse(localStorage.getItem("groups")) || []
  );

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleGroupCreate = (newGroup) => {
    const isGroupExist = groups.some(
      (group) =>
        (group.name === newGroup.name && group.color === newGroup.color) ||
        (group.name === newGroup.name && group.color !== newGroup.color)
    );

    if (isGroupExist) {
      toast.warning(
        "Group with the same name already exists. Please choose a different name."
      );
      return;
    }

    const groupId = generateUniqueId();
    const updatedGroups = [...groups, { ...newGroup, id: groupId }];
    setGroups(updatedGroups);

    // Ensure that initial and groupName are present in newGroup
    const { initial, groupName } = newGroup;

    // Store groupInfo in localStorage
    localStorage.setItem(
      `groupInfo_${groupId}`,
      JSON.stringify({ initial, groupName })
    );

    localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };
  return (
    <div className={styles.groupListContainer}>
      <div className={styles.groupList}>
        <div>
          <h2 className={styles.heading}>Pocket Notes</h2>
        </div>
        <ul className={styles.listItem}>
          {groups.map((group) => (
            <GroupTitle
              key={group.id}
              group={group}
              isActive={group.id === activeGroup?.id}
              onClick={() => handleGroupClick(group)}
            />
          ))}
        </ul>
      </div>
      <div onClick={handleOpenPopup} className={styles.popupBtn}>
        +
      </div>
      {isPopupOpen && (
        <Popup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          onGroupCreate={handleGroupCreate}
          groups={groups}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default GroupList;
