import React from "react";
import "./avatar.css";
const AvatarSection = () => {
  return (
    <div className="flexhero">
      <div className="avatars">
        <a href="#">
          <img
            alt="User1"
            className="avatar"
            height="96"
            width="96"
            src="https://ik.imagekit.io/ae76otrg0/images/customer-1.webp"
          />
        </a>
        <a href="#" title="Bramus on Twitter">
          <img
            alt="User3"
            className="avatar"
            height="96"
            width="96"
            src="https://ik.imagekit.io/ae76otrg0/images/customer-2.webp"
          />
        </a>
        <a href="#">
          <img
            alt="User4"
            className="avatar"
            height="96"
            width="96"
            src="https://ik.imagekit.io/ae76otrg0/images/customer-5.webp"
          />
        </a>
        <a href="#">
          <img
            alt="User2"
            className="avatar"
            height="96"
            width="96"
            src="https://ik.imagekit.io/ae76otrg0/images/testimonial-3.jpg"
          />
        </a>
      </div>
    </div>
  );
};

export default AvatarSection;
