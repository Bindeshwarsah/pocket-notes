import React, { useState, useEffect, useRef } from "react";
import ColorOption from "../popupColorOptions/ColorOption";
import styles from "./Popup.module.css";

const Popup = ({ isOpen, onClose, onGroupCreate }) => {
  const [groupData, setGroupData] = useState({ name: "", color: "" });
  const popupRef = useRef();

  const handleInputChange = (value) => {
    setGroupData({ ...groupData, name: value });
  };

  const handleColorClick = (color) => {
    setGroupData((prevGroupData) => ({ ...prevGroupData, color }));
  };

  const handleCreateGroup = () => {
    // Close the popup and reset data
    onClose();

    // Notify the parent component to add the new group
    onGroupCreate(groupData);

    setGroupData({ name: "", color: "" });
  };

  const handleBodyScroll = () => {
    // Disable body scroll when the popup is open
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    // Disable body scroll when the popup is open
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      // Add event listener for click outside the popup
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove the event listener when the component is unmounted or the popup is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Enable scrolling after the popup is closed
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  return (
    <div className={styles.popupContainer}>
      <div
        className={`${styles.popup} ${isOpen ? styles.open : styles.closed}`}
        ref={popupRef}
      >
        <>
          <h2 className={styles.title}>Create New group</h2>
          <div className={styles.grpNameSection}>
            <p className={styles.grpName}>Group Name</p>
            <input
              type="text"
              name="groupname"
              placeholder="Enter group name"
              value={groupData.name}
              onChange={(e) => handleInputChange(e.target.value)}
              className={styles.inputBox}
            />
          </div>

          <div className={styles.colorSection}>
            <p className={styles.colorTitle}>Choose colour</p>
            <div className={styles.colorOptions}>
              <ColorOption
                color="#B38BFA"
                onClick={() => handleColorClick("#B38BFA")}
              />
              <ColorOption
                color="#FF79F2"
                onClick={() => handleColorClick("#FF79F2")}
              />
              <ColorOption
                color="#43E6FC"
                onClick={() => handleColorClick("#43E6FC")}
              />
              <ColorOption
                color="#F19576"
                onClick={() => handleColorClick("#F19576")}
              />
              <ColorOption
                color="#0047FF"
                onClick={() => handleColorClick("#0047FF")}
              />
              <ColorOption
                color="#6691FF"
                onClick={() => handleColorClick("#6691FF")}
              />
            </div>
          </div>

          <button
            onClick={handleCreateGroup}
            disabled={!groupData.name || !groupData.color}
            className={styles.createGrpBtn}
          >
            Create Group
          </button>
        </>
      </div>
    </div>
  );
};

export default Popup;
