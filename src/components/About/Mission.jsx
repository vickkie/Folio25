import React, { useState, useEffect } from "react";
import Styles from "./css/about.module.css"; // Ensure this path is correct

import aboutData from "../../assets/json/about.json";

const Mission = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Assuming `aboutData` is an array of objects
    setData(aboutData);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const mission = data.find((item) => item.mission)?.mission;

  return (
    <div className={Styles.aboutHero}>
      {mission && (
        <>
          <h1 className={Styles.aboutHeader}>{mission.title}</h1>
          <p className={Styles.storyText}>{mission.content}</p>
        </>
      )}
    </div>
  );
};

export default Mission;
