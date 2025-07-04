import React, { useState, useEffect } from "react";
import Styles from "./css/about.module.css";
import aboutData from "../../assets/json/about.json";

const Experience = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(aboutData);
  }, []);

  if (!data) return <div>Loading...</div>;

  const experienceSection = data.find((item) => item.experience);

  if (!experienceSection) return null;

  const { title, experiences } = experienceSection.experience;

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
            <span className="inlineTxt">Xperiences</span>
          </div>
          <div className="belowLeftCenter">
            <span className="inlineTxt"></span>
          </div>
          <div className="belowRightHero">
            <div className="arrangeTabs">
              <span className="inlineTxt">💢</span>
            </div>
          </div>
        </div>
        <div className="tpbl"></div>
      </div>

      <div className={Styles.aboutHero}>
        <h3 className={Styles.aboutHeader}>Experiences</h3>

        <div className="experienceGrid">
          {experiences.map((exp, i) => (
            <div key={i} className="experienceWhere">
              <div className="experienceTop">
                <div className="experienceCompany">
                  <strong>{exp.role}</strong> @ {exp.company}
                </div>
                <div className="experienceYear">{exp.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Experience;
