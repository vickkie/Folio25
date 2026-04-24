import React, { useEffect, useRef, useState, useMemo } from "react";
import "./css/worksGrid.css";
import data from "../../assets/json/allWorks.json";

const WorksGrid = () => {
  const [visible, setVisible] = useState(2);
  const loadMoreRef = useRef(null);

  // Sort once: newest first
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.year - a.year);
  }, []);

  // IntersectionObserver for lazy load
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visible < sortedData.length) {
          setVisible((prev) => prev + 2);
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [visible, sortedData.length]);

  return (
    <>
      {/* Header section */}
      <div className="belowAbouthero">
        <div className="tppl">
          <div className="worksline"></div>
          <div className=""></div>
          <div className=""></div>
        </div>
        <div className="tpcn">
          <div className="belowLeftHero">
            <span className="inlineTxt">@2018-25</span>
          </div>
          <div className="belowLeftCenter">
            <span className="inlineTxt">works [{sortedData.length}]</span>
          </div>
          <div className="belowRightHero">
            <div className="arrangeTabs">
              <span className="inlineTxt">Final</span>
            </div>
          </div>
        </div>
        <div className="tpbl"></div>
      </div>

      {/* Grid section */}
      <div className="works-container">
        <div className="grid">
          {sortedData.slice(0, visible).map((work) => (
            <a href={`/projects/${work.id}`} key={work.id}>
              <div className="work-card">
                <div className="yearmade">{work?.year}</div>
                <div
                  className="work-tile"
                  style={{
                    backgroundImage: `url(${encodeURI(work?.showoffImage || work?.previewImage)})`,
                  }}
                ></div>
                <div className="explaWorkx">
                  <div className="work-title">{work?.title}</div>
                  <div className="work-subtitle">{work?.dataContent}</div>
                </div>
                <div className="work-tags">
                  {Array.isArray(work.task) &&
                    work.task.map((task, i) => (
                      <span className="work-tag" key={i}>
                        {task.trim()}
                      </span>
                    ))}
                </div>
              </div>
            </a>
          ))}
        </div>
        <div ref={loadMoreRef} className="load-trigger" />
      </div>
    </>
  );
};

export default WorksGrid;
