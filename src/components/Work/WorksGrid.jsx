import React, { useEffect, useRef, useState } from "react";
import "./css/worksGrid.css";
import data from "../../assets/json/allWorks.json";

const WorksGrid = () => {
  //   const [data, setData] = useState([]);
  const [visible, setVisible] = useState(2);
  const loadMoreRef = useRef(null);

  // Load JSON data from public folder
  //   useEffect(() => {
  //     fetch("../..assets/jsonworks.json")
  //       .then((res) => res.json())
  //       .then((json) => setData(json))
  //       .catch((err) => console.error("Failed to load JSON", err));
  //   }, []);

  // Lazy load as user scrolls
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visible < data.length) {
          setVisible((prev) => prev + 2);
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [visible, data.length]);

  return (
    <div className="works-container">
      <div className="grid">
        {data.slice(0, visible).map((work) => (
          <div className="work-card" key={work.id}>
            <div className="yearmade">{work?.year}</div>
            <div className="work-tile" style={{ backgroundImage: `url(${encodeURI(work?.showoffImage)})` }}></div>

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
        ))}
      </div>
      <div ref={loadMoreRef} className="load-trigger" />
    </div>
  );
};

export default WorksGrid;
