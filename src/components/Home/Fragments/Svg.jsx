"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

const SvgIcon = () => {
  const paths = useRef({});

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.4 });

    const order = ["v_path", "i_path", "s_path", "u_path", "a_path", "l_path", "dot_path"];

    order.forEach((id, i) => {
      const el = paths.current[id];
      if (!el) return;

      tl.fromTo(
        el,
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          duration: 0.8,
          ease: "power2.inOut",
        },
        i * 0.3 // stagger each path
      );
    });
  }, []);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="Visual" viewBox="0 35 870 305" className="visual-me">
      <defs>
        <clipPath id="clip-path" transform="translate(31.09 32.56)">
          <path
            id="dot_clip"
            fill="none"
            d="M250.12 82.48c1.15-15.33 9.2-33.72 13.79-44.83l-1.15-.77-30.27 10c-5.36 4.6-9.2 21.46-4.6 30.65 7.29 1.88 16.49 3.41 22.23 4.95"
          ></path>
        </clipPath>
        <clipPath id="clip-path-2" transform="translate(31.09 32.56)">
          <path
            id="l_clip"
            fill="none"
            d="m794.74 18-40.61 14.57L753 29.5 829.23 0l4.6 5.75L748 285.44l39.46-17.24.77 2.3-52.88 26.44c-7.66-2.3-13.41-9.2-21.07-19.92Z"
          ></path>
        </clipPath>
        <clipPath id="clip-path-3" transform="translate(31.09 32.56)">
          <path
            id="i_clip"
            fill="none"
            d="m207.78 123.76-32.18 9.58-.77-2.3 66.28-21.84 4.21.77-52.87 176.25 39.46-19.92 1.15 2.3-49.81 28.4c-9.2-6.9-13.79-11.88-20.69-23.37Z"
          ></path>
        </clipPath>
        <clipPath id="clip-path-4" transform="translate(31.09 32.56)">
          <path
            id="a_clip"
            fill="none"
            d="M654.51 105.36c14.56-1.92 41 7.66 54 14.18L661 277.78l38.7-16.09v3.06l-72.8 32.18c-1.92-1.53-5.37-4.6-6.13-6.9l46.36-150.58H666c-11.88 29.89-78.16 131.42-95.4 154.41-21.84-3.83-35.25-29.5-35.25-49.43 0-62.43 91.58-137.53 119.16-139.07m-71.26 157.86c3.07-1.15 67.82-95.79 78.93-123.76l4.21-8.05c-10.35-6.13-23-11.11-36.78-9.58-18.39 0-57.09 85.44-57.09 118 0 13.05 3.06 22.24 10.73 23.39"
          ></path>
        </clipPath>
        <clipPath id="clip-path-5" transform="translate(31.09 32.56)">
          <path
            id="u_clip"
            fill="none"
            d="m409.3 116.09-36.4 18.39-1.53-2.3L420 106.13c9.58 3.83 16.48 10.34 22.22 19.16 0 22.22-44.45 128-44.45 141.38 0 6.51 3.06 10 10 11.49 2.68-.38 65.14-92.34 94.64-156.71l3.45-8 39.08-2.68L493.21 277l37.16-14.56.38 2.3-71.65 32.19c-1.91-1.53-5.36-4.6-6.13-6.9l54-168.57h-1.15c-29.5 66.67-87.74 173.18-113.41 175.48-19.16-8.05-28.74-12.64-28.74-30.27.04-22.99 44.87-138.32 45.63-150.58"
          ></path>
        </clipPath>
        <clipPath id="clip-path-6" transform="translate(31.09 32.56)">
          <path
            id="s_clip"
            fill="none"
            d="M286.7 275.1c15.71 0 31.8-6.9 39.85-18 3.83-31-60.92-51.34-55.94-93.87 3.83-29.12 41.38-64.37 72-64.37 14.56 0 30.65 1.53 35.25 10.34l-7.66 24.52h-2.68c-12.64-10.34-29.12-22.61-37.93-22.61-18.39 0-29.12 9.58-38.7 20.31 0 37.17 57.47 67.43 55.56 83.91-5.36 41.76-36.78 69-78.16 78.54-13 3.07-41.38-10-41.76-24.52l20.31-17.62c8.83 13.41 26.84 21.84 39.86 23.37"
          ></path>
        </clipPath>
        <clipPath id="clip-path-7" transform="translate(31.09 32.56)">
          <path
            id="v_clip"
            fill="none"
            d="M197.77 86c-16 78.5-114.7 181.76-183.67 222.16a3.33 3.33 0 0 1-3-3.43c4.57-2.67 9.15-5.72 14.1-9.15-11-5-19.43-16.76-25.15-33.15l69.3-218.71L22.86 64.3 21 59.35l80-36.58 4.57-2.29c3.43 2.29 5.33 6.1 4.57 11.81-12.56 71.64-56 176.81-73.91 248.07a5.41 5.41 0 0 0 3.43 4.95c67.45-51.06 141.75-140.61 149-213.77-11.43-15.24-30.48-31.25-46.49-29 0-3.43 25.91-30.87 28.2-30.87 13 0 33.15 12.19 33.15 38.87-.04 9.95-2.32 21.38-5.75 35.46"
          ></path>
        </clipPath>
      </defs>

      {/* Example for one path updated to include ref */}
      <g id="dot" clipPath="url(#clip-path)">
        <path
          id="dot_path"
          ref={(el) => (paths.current["dot_path"] = el)}
          fill="none"
          stroke="#52e0ed"
          strokeWidth="34"
          d="M235.53 91.06s-3.65-21.72 18.78-61"
          transform="translate(31.09 32.56)"
        />
      </g>

      <g id="l" clipPath="url(#clip-path-2)">
        <path
          id="l_path"
          ref={(el) => (paths.current["l_path"] = el)}
          fill="none"
          stroke="#52e0ed"
          strokeWidth="42"
          d="m820.4 302.62-64.5 31.5 88-295-59.5 24.5"
        />
      </g>

      {/* Add refs to the rest the same way */}
      <g id="i" clipPath="url(#clip-path-3)">
        <path
          id="i_path"
          ref={(el) => (paths.current["i_path"] = el)}
          fill="none"
          stroke="#52e0ed"
          strokeWidth="42"
          d="m207.9 165.12 47-18-53 182 61-30"
        />
      </g>

      <g id="a" clipPath="url(#clip-path-4)">
        <path
          id="a_path"
          ref={(el) => (paths.current["a_path"] = el)}
          fill="none"
          stroke="#52e0ed"
          strokeWidth="42"
          d="m671.81 121.56-104 173s-28-39-5-98 114.34-107 123.5-80.5c9 26-49.5 180.5-49.5 180.5l67.5-35.5"
          transform="translate(31.09 32.56)"
        />
      </g>

      <g id="u" clipPath="url(#clip-path-5)">
        <path
          id="u_path"
          ref={(el) => (paths.current["u_path"] = el)}
          fill="none"
          stroke="#52e0ed"
          strokeWidth="42"
          d="m371.81 132.56 64-31-68 200 34-7s80-120 109-181l15-4-55 187 60-33"
          transform="translate(31.09 32.56)"
        />
      </g>

      <g id="s" clipPath="url(#clip-path-6)">
        <path
          id="s_path"
          ref={(el) => (paths.current["s_path"] = el)}
          fill="none"
          stroke="#52e0ed"
          strokeWidth="42"
          d="M232.31 261.06s20.5 20.5 32.5 22.5 57-6 69-39-53-64-53-82c0 0 19.5-74.5 97.5-41.5"
          transform="translate(31.09 32.56)"
        />
      </g>

      <g id="V" clipPath="url(#clip-path-7)">
        <path
          id="v_path"
          ref={(el) => (paths.current["v_path"] = el)}
          fill="none"
          stroke="#52e0ed"
          strokeWidth="70"
          d="m21.31 59.06 71-32-5 26L26 246.56l-8.69 57.5s85-71 122-114c28-34 100.21-133.4 12-171"
          transform="translate(31.09 32.56)"
        />
      </g>
    </svg>
  );
};

export default SvgIcon;
