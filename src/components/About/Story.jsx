import React, { useState, useEffect } from "react";
import Styles from "./css/about.module.css"; // Ensure this path is correct

import aboutData from "../../assets/json/about.json";

const Story = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Assuming `aboutData` is an array of objects
    setData(aboutData);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  // Extract "story" data
  const story = data.find((item) => item.story)?.story;

  return (
    <div className={Styles.aboutHero}>
      {story && (
        <>
          <h1 className={Styles.aboutHeader}>{story.title}</h1>
          <p className={Styles.storyText}>{story.content}</p>
        </>
      )}
    </div>
  );
};

export default Story;
