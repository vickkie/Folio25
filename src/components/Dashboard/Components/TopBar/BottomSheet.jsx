import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import styles from "./bottom-sheet.module.css";
import { User, Settings, LogOut } from "lucide-react"; // Import specific icons
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(Draggable);

const BottomSheet = ({ isOpen, onClose, handleLogout }) => {
  const sheetRef = useRef(null);
  const draggableInstance = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const sheetHeight = sheetRef.current.offsetHeight;

      // Initialize Draggable
      draggableInstance.current = Draggable.create(sheetRef.current, {
        type: "y",
        bounds: {
          minY: 0, // Fully visible position
          maxY: sheetHeight, // Allow dragging downwards
        },
        inertia: true, // Makes dragging smoother
        onDragEnd: function () {
          // If dragged downwards by 3/4th of the sheet height, close the sheet
          if (this.y > sheetHeight * 0.75) {
            onClose(); // Close the bottom sheet
          } else {
            // Animate the sheet back to the original position if not dragged enough
            gsap.to(sheetRef.current, { y: 0, duration: 0.3 });
          }
        },
      });
    } else {
      // Destroy draggable when closing
      if (draggableInstance.current) {
        draggableInstance.current[0].kill();
      }
    }

    return () => {
      // Clean up Draggable on unmount
      if (draggableInstance.current) {
        draggableInstance.current[0].kill();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} ref={sheetRef} onClick={(e) => e.stopPropagation()}>
        <div className={styles.sheetToggler}>
          <div className={styles.sheetToggle} onClick={onClose}></div>
        </div>
        <div className={styles.content}>
          <button
            className={styles.option}
            onClick={() => {
              navigate("/profile");
            }}
          >
            <User className={styles.icon} />
            <div>Profile</div>
          </button>
          <button
            className={styles.option}
            onClick={() => {
              navigate("/profile");
            }}
          >
            <Settings className={styles.icon} />
            <div>Settings</div>
          </button>
          <button className={styles.option} onClick={handleLogout}>
            <LogOut className={styles.icon} />
            <div>Logout</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
