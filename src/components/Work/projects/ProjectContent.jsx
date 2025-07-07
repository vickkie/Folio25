import React from "react";
import useGsapMagic from "../../hooks/useGsapMagic";

function ProjectContent({ pageData, nextPage }) {
  let mediaAttr;

  if (window.innerWidth < 768) {
    mediaAttr = pageData.media;
  } else {
    mediaAttr = pageData.mediaLarge;
  }

  //TODO needs improvements
  // const mediaAttr = pageData.media;
  const mediaUrls = mediaAttr ? mediaAttr.split(" || ") : [];
  const projectPreview = pageData.previewImage;
  const media1 = mediaUrls[0];
  const media2 = mediaUrls[1];
  const media3 = mediaUrls[2];

  const importantMedia = [...mediaUrls.slice(0, 15)];
  const restMedia = [...mediaUrls.slice(3)];

  useGsapMagic({
    splitText: true,
    hoverZoom: true,
    splitSelector: ".splitchars",
    zoomSelectors: [".projectImage2-inner img", ".otherImage-inner img"],
  });

  function MediaComponent({ src, type, alt }) {
    return (
      <div className="otherImage">
        <div className="otherImage-inner">
          {type === "video/mp4" || type === "video/webm" ? (
            <video muted={true} loop={true} autoPlay={true} playsInline={true}>
              <source src={src} type={type} />
            </video>
          ) : (
            <img src={src} alt={alt} />
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="workHero_inner">
        <div className="preview__title ">
          <span className="preview__title-inner splitchars" style={{ color: `${pageData.previewColor}` }}>
            {pageData?.title}
          </span>
        </div>

        <div className="preview__titlex ">
          <span className="preview__title-inner " style={{ color: `${pageData.previewColor}` }}>
            {pageData?.dataContent}
          </span>
        </div>
      </div>
      <section className="projectHeroWrapper">
        <div className="projectHero">
          <div className="preview__img">
            {projectPreview.endsWith(".mp4") || projectPreview.endsWith(".webm") ? (
              <>
                <div className="preview__img-inner relative">
                  <video
                    muted={true}
                    metadata
                    loop={true}
                    autoPlay={true}
                    playsInline={true}
                    poster={`/images/works/${pageData.id}/hero-poster.avif`}
                  >
                    <source src={projectPreview} type={projectPreview.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
                  </video>
                </div>
              </>
            ) : (
              <>
                <div className="preview__img-inner" style={{ backgroundImage: `url(${projectPreview})` }}></div>
                {/* <div className="preview__title">
                  <span className="preview__title-inner splitchars" style={{ color: `${pageData.previewColor}` }}>
                    {pageData.title}
                  </span>
                </div> */}
              </>
            )}
          </div>
        </div>
        <div className="gradient-me"></div>
      </section>
      <section className="projectDetails">
        <div className="projectMetadata">
          <div className="projectclient">
            <div className="metaDataheader">CLIENT</div>
            <div className="lowercase">{pageData?.client}</div>
          </div>
          <div className="projecttask">
            <div className="metaDataheader">EXPERTISE</div>
            <div className="lowercase">{pageData?.task}</div>
          </div>
          <div className="projectyear">
            <div className="metaDataheader">YEAR</div>
            <div>{pageData.year}</div>
          </div>
        </div>
        <div className="projectHighlights">
          <div className="highlightRight">
            <div className="highlight">
              <div className="highlight-title">Highlights</div>
              <div className="highlight-content">
                {pageData.highlights.map((highlight, index) => (
                  <div key={index} className="highlight">
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="highlightLeft">
            <div className="aim-outer">
              <div className="aim-inner">
                <div className="highlight-title">Our Mission</div>
                <div className="aim-content">
                  <div className="font5 aim-content-inner" dangerouslySetInnerHTML={{ __html: pageData.aim }}></div>
                </div>
                <div className="highlightc">
                  <div>
                    <a href={pageData.link} className="highlight-linkk" target="_blank" rel="noopener noreferrer">
                      <div className="highlight-link">Visit</div>
                      <div>
                        <svg
                          class="new-tab"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden=""
                        >
                          <path
                            d="M18.3327 10.4167V15.8334C18.3327 16.4965 18.0693 17.1323 17.6005 17.6012C17.1316 18.07 16.4957 18.3334 15.8327 18.3334H4.16602C3.50297 18.3334 2.86709 18.07 2.39825 17.6012C1.92941 17.1323 1.66602 16.4965 1.66602 15.8334V4.16675C1.66602 3.50371 1.92941 2.86782 2.39825 2.39898C2.86709 1.93014 3.50297 1.66675 4.16602 1.66675H9.58268C9.69319 1.66675 9.79917 1.71065 9.87731 1.78879C9.95545 1.86693 9.99935 1.97291 9.99935 2.08341V2.91675C9.99935 3.02725 9.95545 3.13324 9.87731 3.21138C9.79917 3.28952 9.69319 3.33341 9.58268 3.33341H4.16602C3.945 3.33341 3.73304 3.42121 3.57676 3.57749C3.42048 3.73377 3.33268 3.94573 3.33268 4.16675V15.8334C3.33268 16.0544 3.42048 16.2664 3.57676 16.4227C3.73304 16.579 3.945 16.6667 4.16602 16.6667H15.8327C16.0537 16.6667 16.2657 16.579 16.4219 16.4227C16.5782 16.2664 16.666 16.0544 16.666 15.8334V10.4167C16.666 10.3062 16.7099 10.2003 16.7881 10.1221C16.8662 10.044 16.9722 10.0001 17.0827 10.0001H17.916C18.0265 10.0001 18.1325 10.044 18.2106 10.1221C18.2888 10.2003 18.3327 10.3062 18.3327 10.4167ZM17.8604 1.66675H13.8059C13.7125 1.66673 13.6211 1.69441 13.5435 1.74629C13.4658 1.79818 13.4053 1.87192 13.3695 1.95821C13.3338 2.0445 13.3244 2.13945 13.3427 2.23105C13.3609 2.32266 13.4059 2.4068 13.4719 2.47283L14.6154 3.61675C14.6936 3.69489 14.7375 3.80087 14.7375 3.91137C14.7375 4.02188 14.6936 4.12786 14.6154 4.206L9.65468 9.16675C9.57654 9.24489 9.53265 9.35087 9.53265 9.46137C9.53265 9.57188 9.57654 9.67786 9.65468 9.756L10.2438 10.3452C10.322 10.4233 10.428 10.4672 10.5385 10.4672C10.649 10.4672 10.755 10.4233 10.8331 10.3452L15.7938 5.38433C15.872 5.30619 15.978 5.2623 16.0885 5.2623C16.199 5.2623 16.305 5.30619 16.3831 5.38433L17.5265 6.52775C17.5926 6.59381 17.6768 6.63879 17.7684 6.657C17.86 6.67521 17.955 6.66582 18.0413 6.63004C18.1276 6.59426 18.2014 6.53368 18.2532 6.45598C18.3051 6.37827 18.3327 6.28692 18.3327 6.1935V2.139C18.3327 2.01375 18.2829 1.89363 18.1944 1.80507C18.1058 1.7165 17.9857 1.66675 17.8604 1.66675Z"
                            fill="#111111"
                          ></path>
                        </svg>
                      </div>
                    </a>

                    {pageData ? pageData.link && <div className="highlight-link">Visit</div> : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="projectImage1">
          <div className="projectImage1-inner">
            {media1.endsWith(".mp4") || media1.endsWith(".webm") ? (
              <video muted={true} loop={true} autoPlay={true} playsInline={true}>
                <source src={media1} type={media1.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
              </video>
            ) : (
              <img src={media1} alt={pageData.title} />
            )}
          </div>
        </div>

        <div className="projectImage2">
          <div className="projectImage2-left">
            <div className="projectImage2-inner">
              {media2.endsWith(".mp4") || media2.endsWith(".webm") ? (
                <video muted={true} loop={true} autoPlay={true} playsInline={true}>
                  <source src={media2} type={media2.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
                </video>
              ) : (
                <img src={media2} alt={pageData.title} />
              )}
            </div>
          </div>
          <div className="projectImage2-right">
            <div className="projectImage2-inner">
              {media3.endsWith(".mp4") || media3.endsWith(".webm") ? (
                <video muted={true} loop={true} autoPlay={true} playsInline={true}>
                  <source src={media3} type={media3.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
                </video>
              ) : (
                <img src={media3} alt={pageData.title} />
              )}
            </div>
          </div>
        </div>
        <div className="projectSolution">
          <div className="solutionLeft">
            <div>Solution</div>
          </div>
          <div className="solutionCenter">
            {/* Render the dynamic HTML content */}
            <div className="font5" dangerouslySetInnerHTML={{ __html: pageData.solution }} />

            {/* Render the SVG separately */}
          </div>

          <div className="solutionRight">
            <div className="deco-svg">
              <img src="/svg/asterisk-w.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="remainingImages">
          {importantMedia.length !== null &&
            importantMedia.slice(3).map((media, index) => {
              const fileType = media.match(/\.(\w+)$/);
              let type = "image/webp";

              if (fileType) {
                switch (fileType[1]) {
                  case "mp4":
                    type = "video/mp4";
                    break;
                  case "webm":
                    type = "video/webm";
                    break;
                  default:
                    // Any other file type is treated as an image
                    type = "image/webp"; // changeable
                    break;
                }
              } else {
                // If no file extension is detected, treat it as an unknown type
                type = "unknown";
              }

              return <MediaComponent key={index} src={media} type={type} alt={`Media ${index + 8}`} />;
            })}
        </div>
      </section>
      <section className="thirtyworks">
        <a
          href={`/projects/${nextPage}`}
          onClick={() =>
            setTimeout(() => {
              location.reload();
              document.documentElement.scrollTop = 0;
            }, 300)
          }
          className="thirty-wrapper"
        >
          <div className="below-line" style={{ width: "100%" }}>
            <span></span>
          </div>
          <div className="top-line" style={{ width: "100%" }}>
            <span></span>
          </div>
          <div className="thirty-left">
            <svg role="button">
              <use xlinkHref="/svg/sprite.svg#sharp-arrow"></use>
            </svg>
          </div>
          <div className="thirty-center">
            Next <span className="gt-italic">Project</span>
          </div>
          <div className="thirty-right">
            <svg role="button">
              <use xlinkHref="/svg/sprite.svg#sharp-arrow"></use>
            </svg>
          </div>
        </a>
      </section>
    </>
  );
}

export default ProjectContent;
