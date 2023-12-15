import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DesktopHomeLogo from "../components/homeDesktopLogo/DesktopHomeLogo";
import styles from "./DesktopView.module.css";
import GroupList from "../components/groupList/GroupList";
import NotesContent from "../components/notesContent/NotesContent";

const DesktopView = () => {
  const [isReady, setIsReady] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);
  const navigate = useNavigate();
  const { groupId } = useParams();

  const handleGroupClick = (group) => {
    setActiveGroup({ ...group });
    navigate(`/notes/${group.id}`);
  };

  useEffect(() => {
    if (!groupId) {
      setActiveGroup(null);
      setIsReady(true);
      return;
    }

    const groups = JSON.parse(localStorage.getItem("groups")) || [];
    const group = groups.find((g) => g.id === groupId);

    if (group) {
      setActiveGroup({ ...group });
    } else {
      setActiveGroup(null);
    }

    setIsReady(true);
  }, [groupId]);

  return (
    <div className={styles.homePage}>
      {isReady && ( // Render content only when isReady is true
        <>
          {groupId ? (
            <div className={styles.homeContent}>
              <GroupList
                setActiveGroup={setActiveGroup}
                activeGroup={activeGroup}
                handleGroupClick={handleGroupClick}
              />
              {activeGroup ? (
                <NotesContent
                  key={groupId}
                  activeGroup={activeGroup}
                  backgroundColor={activeGroup.backgroundColor}
                />
              ) : null}
            </div>
          ) : (
            <>
              <GroupList
                setActiveGroup={setActiveGroup}
                activeGroup={activeGroup}
                handleGroupClick={handleGroupClick}
              />
              <DesktopHomeLogo />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DesktopView;
