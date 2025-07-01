// src/components/OtherWaysToContact.jsx

import React from "react";
import "./contact.css";
import { Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OtherWaysToContact = () => {
  const navigate = useNavigate();

  const chatUrl = "/help";

  return (
    <div className="contactPOthers">
      <div className="contctOthersHead">Other ways to get in touch</div>

      <div className="contactContactBody">
        <div
          className="contactBoxy contactBoxy1"
          onClick={() => {
            navigate("/login", { state: { redirect: chatUrl } });
          }}
        >
          <div className="contaBoxHead">
            <div className="contaIcon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17 12C19.7614 12 22 9.76142 22 7C22 4.23858 19.7614 2 17 2C14.2386 2 12 4.23858 12 7C12 7.79984 12.1878 8.55582 12.5217 9.22624C12.6105 9.4044 12.64 9.60803 12.5886 9.80031L12.2908 10.9133C12.1615 11.3965 12.6035 11.8385 13.0867 11.7092L14.1997 11.4114C14.392 11.36 14.5956 11.3895 14.7738 11.4783C15.4442 11.8122 16.2002 12 17 12Z"
                  fill="#1C274C"
                />
                <path
                  opacity="0.5"
                  d="M8.03759 7.31617L8.6866 8.4791C9.2723 9.52858 9.03718 10.9053 8.11471 11.8278C8.11459 11.8279 6.99588 12.9468 9.02451 14.9755C11.0525 17.0035 12.1714 15.8861 12.1722 15.8853C13.0947 14.9628 14.4714 14.7277 15.5209 15.3134L16.6838 15.9624C18.2686 16.8468 18.4557 19.0692 17.0628 20.4622C16.2258 21.2992 15.2004 21.9505 14.0669 21.9934C12.1588 22.0658 8.91828 21.5829 5.6677 18.3323C2.41713 15.0817 1.93421 11.8412 2.00655 9.93309C2.04952 8.7996 2.7008 7.77423 3.53781 6.93723C4.93076 5.54428 7.15317 5.73144 8.03759 7.31617Z"
                  fill="#1C274C"
                />
              </svg>
            </div>
            <div className="contaHeadx">Contact Support</div>
          </div>
          <div className="contaBoxDetails"></div>
        </div>

        <div className="contactBoxy contactBoxy2">
          <div className="contaBoxHead">
            <div className="contaIcon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7 2.75C5.38503 2.75 3.92465 3.15363 2.86466 4.1379C1.79462 5.13152 1.25 6.60705 1.25 8.5V15.5C1.25 17.393 1.79462 18.8685 2.86466 19.8621C3.92465 20.8464 5.38503 21.25 7 21.25H17C18.615 21.25 20.0754 20.8464 21.1353 19.8621C22.2054 18.8685 22.75 17.393 22.75 15.5V8.5C22.75 6.60705 22.2054 5.13152 21.1353 4.1379C20.0754 3.15363 18.615 2.75 17 2.75H7ZM19.2285 8.3623C19.5562 8.10904 19.6166 7.63802 19.3633 7.31026C19.1101 6.98249 18.6391 6.9221 18.3113 7.17537L12.7642 11.4616C12.3141 11.8095 11.6858 11.8095 11.2356 11.4616L5.6886 7.17537C5.36083 6.9221 4.88982 6.98249 4.63655 7.31026C4.38328 7.63802 4.44367 8.10904 4.77144 8.3623L10.3185 12.6486C11.3089 13.4138 12.691 13.4138 13.6814 12.6486L19.2285 8.3623Z"
                  fill="#000000"
                />
              </svg>
            </div>
            <div className="contaHeadx">Email us</div>
          </div>
          <div className="contaBoxDetails"></div>
        </div>

        <div
          className="contactBoxy contactBoxy3"
          onClick={() => {
            navigate("/login", { state: { redirect: chatUrl } });
          }}
        >
          <div className="contaBoxHead">
            <div className="contaIcon">
              <Ticket size={32} />
            </div>
            <div className="contaHeadx">Ticket</div>
          </div>
          <div className="contaBoxDetails"></div>
        </div>
      </div>
    </div>
  );
};

export default OtherWaysToContact;
