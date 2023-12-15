import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./MobileView.module.css";
import GroupList from "../components/groupList/GroupList";
import NotesContent from "../components/notesContent/NotesContent";

const MobileView = () => {
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();
  const { groupId } = useParams();

  const handleGroupClick = (group, index) => {
    setActiveGroup({ ...group });
    setActiveIndex(index);

    // Use group.id, not the general groupId from useParams
    navigate(`/notes/${group.id}`);
  };

  return (
    <div className={styles.homePage}>
      {activeGroup ? (
        <div className={styles.homeContent}>
          <NotesContent
            activeGroup={activeGroup}
            backgroundColor={activeGroup.backgroundColor}
          />
        </div>
      ) : (
        <>
          <GroupList
            setActiveGroup={setActiveGroup}
            activeGroup={activeGroup}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            handleGroupClick={handleGroupClick}
          />
        </>
      )}
    </div>
  );
};

export default MobileView;
