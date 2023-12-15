import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./NotesContent.module.css";
import GroupTitle from "../groupTitle/GroupTitle";
import NotesDisplay from "../notesDisplay/NotesDisplay";
import NotesInput from "../notesInput/NotesInput";
import backLogo from "../../assets/icons/backLogo.svg";

const generateInitial = (groupName) => {
  const firstTwoWords = groupName.split(/\s+/).slice(0, 2);
  const initials = firstTwoWords.map((word) => word.charAt(0).toUpperCase());
  return initials.join("");
};

const NotesContent = () => {
  const [messages, setMessages] = useState([]);
  const [groupInfo, setGroupInfo] = useState({
    initial: "",
    groupName: "",
    backgroundColor: "", // Make sure to include backgroundColor if it's present in your data
  });

  const { groupId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!groupId) {
      // Handle the case where groupId is undefined
      return;
    }

    // Fetch group information from localStorage
    const groups = JSON.parse(localStorage.getItem("groups")) || [];
    const group = groups.find((g) => g.id === groupId);

    if (group) {
      // Set group information
      setGroupInfo({
        initial: group.initial || generateInitial(group.name),
        groupName: group.name,
        backgroundColor: group.color,
      });
    }

    // Fetch messages associated with the groupId
    const savedMessages =
      JSON.parse(localStorage.getItem(`notesMessages_${groupId}`)) || [];
    setMessages(savedMessages);
  }, [groupId]);

  const getCurrentDateTime = () => new Date().toISOString();

  const onSendMessage = (content) => {
    const timestamp = getCurrentDateTime();
    const newMessage = { content, timestamp };

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      localStorage.setItem(
        `notesMessages_${groupId}`,
        JSON.stringify(updatedMessages)
      );
      return updatedMessages;
    });
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.contentContainer}>
      <div className={styles.navBar}>
        <img
          src={backLogo}
          alt="backLogo"
          className={styles.backIcon}
          onClick={goBack}
        />
        {groupId && (
          <div className={styles.groupInfo}>
            <div className={styles.initialBox}>
              <div
                className={styles.initial}
                // Assuming you have 'backgroundColor' in your groupInfo
                style={{ backgroundColor: groupInfo.backgroundColor }}
              >
                {groupInfo.initial}
              </div>
            </div>
            <div className={styles.groupName}>{groupInfo.groupName}</div>
          </div>
        )}
      </div>
      {groupId && <GroupTitle title={groupInfo.groupName} />}
      <NotesDisplay
        messages={messages.map((message) => ({
          ...message,
          timestamp: message.timestamp,
        }))}
      />
      <NotesInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default NotesContent;
