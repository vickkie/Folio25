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
    <>
      <div className="belowAbouthero">
        <div className="tppl">
          <div className="worksline"></div>
          <div className=""></div>
          <div className=""></div>
        </div>
        <div className="tpcn">
          <div className="belowLeftHero">
            <span className="inlineTxt">History</span>
          </div>
          <div className="belowLeftCenter">
            <span className="inlineTxt"></span>
          </div>
          <div className="belowRightHero">
            <div className="arrangeTabs">
              <span className="inlineTxt">2025</span>
            </div>
          </div>
        </div>
        <div className="tpbl"></div>
      </div>

      <div className={Styles.aboutHero}>
        {story && (
          <>
            <h3 className={Styles.aboutHeader}>{story.title}</h3>
            <div
              dangerouslySetInnerHTML={{ __html: story.content.replace(/\n/g, "<br/>") }}
              className={Styles.storyText}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Story;
