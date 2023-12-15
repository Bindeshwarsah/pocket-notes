import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DesktopView from "./view/DesktopView";
import NotesContent from "./components/notesContent/NotesContent";
import MobileView from "./view/MobileView";

const App = () => {
  // State to track whether the view should be mobile or not
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 500);

  useEffect(() => {
    // Add event listener to update isMobileView on window resize
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <Routes>
      {/* Render MobileView only if the screen width is less than or equal to 500px */}
      {isMobileView && (
        <>
          <Route path="/" element={<MobileView />} />
          <Route path="/notes/:groupId" element={<NotesContent />} />
        </>
      )}

      {/* Render DesktopHomePage for larger screens */}
      {!isMobileView && (
        <>
          <Route path="/" element={<DesktopView />} />
          <Route path="/notes/:groupId" element={<DesktopView />} />
        </>
      )}
    </Routes>
  );
};

export default App;
