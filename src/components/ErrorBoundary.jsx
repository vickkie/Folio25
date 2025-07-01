import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, showModal: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({ error, errorInfo });
  }

  toggleModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  };

  render() {
    if (this.state.hasError) {
      // my custom fallback UI
      return (
        <div className="ErrorContainer">
          <div className="ErrorTopbackground"></div>
          <video className="ErrorvideoBackground" autoPlay muted loop poster="/images/error-frame.webp">
            <source src="/videos/error-code.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className="ErrorDataWrapper">
            <div className="ErrorData">Something went wrong.</div>

            <div className="iconShow" onClick={this.toggleModal}>
              <img src="/images/bug.svg" alt="Error Icon" />
            </div>
          </div>

          {this.state.showModal && (
            <div className="modalOverlay" onClick={this.toggleModal}>
              <div className="modalBox" onClick={(e) => e.stopPropagation()}>
                <h2>Error Details</h2>
                {/* Display the error message */}
                <p>
                  <strong>Error:</strong> {this.state.error?.toString()}
                </p>
                <pre>{this.state.errorInfo?.componentStack}</pre>
                <div className="closeModal" onClick={this.toggleModal}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" height="70px">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <circle cx="12" cy="12" r="10" stroke="#1C274C" strokeWidth="1.5"></circle>
                      <path
                        d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
