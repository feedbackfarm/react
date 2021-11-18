import * as React from "react";

import { sendFeedback } from "@feedbackfarm/core";
import "./styles.scss";

type Props = {
  projectId: string;
  identifier?: string;
  onClose: () => void;
};

type FeedbackType = "BUG" | "FEATURE" | "OTHER";

export const FeedbackColor = {
  BUG: "#FF4D2B",
  FEATURE: "#2ADE9E",
  OTHER: "#16DBF5",
};

const disabledColor = "#c6c6c6";
const placeholderMap = {
  BUG: "I have an issue with ...",
  FEATURE: "It would be nice ...",
  OTHER: "I have a suggestion for ...",
};

export default function FeedbackModal(props: Props) {
  const [feedback, setFeedback] = React.useState("");
  const [modalTitle, setModalTitle] = React.useState("Give feedback!");
  const [feedbackButtonText, setFeedbackButtonText] =
    React.useState("Send Feedback");
  const [state, setState] = React.useState<"ask" | "conclusion">("ask");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [feedbackType, setFeedbackType] = React.useState<FeedbackType>();

  async function handleSubmitFeedback() {
    try {
      if (state === "conclusion") {
        setFeedback("");
        setState("ask");
        setModalTitle("Give feedback!");
        setFeedbackButtonText("Send Feedback");
        setFeedbackType(undefined);
        return;
      }

      if (!feedback || isLoading || !feedbackType) {
        return;
      }

      setIsLoading(true);
      const result = await sendFeedback(
        props.projectId,
        feedback,
        feedbackType,
        props.identifier,
        window.location.pathname
      );
      if (result.status !== 200) {
        throw new Error(result.statusText);
      }

      setState("conclusion");
      setModalTitle("Thank you!");
      setFeedbackButtonText("Another thing to say?");
    } catch (error) {
      setError("An error occured, try again.");
    }
    setIsLoading(false);
  }

  function handleKeyDown(event: any) {
    if (event.key === "Enter" && event.metaKey) {
      handleSubmitFeedback();
    }
  }

  function handleSetFeedbackType(type: FeedbackType) {
    setFeedbackType(type);
    document.getElementById("textAreaFeedback")?.focus();
  }

  return (
    <>
      <div className="reset container">
        {/* Header */}
        <div className="reset header">
          <div className="reset top">
            <p className="reset title">{modalTitle}</p>
            <button className="reset closeButton" onClick={props.onClose}>
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Path"
                  d="M19.773 16.809 L12.94 9.953 19.789 3.186 C20.07 2.905 20.07 2.447 19.789 2.166 L17.841 0.208 C17.706 0.073 17.523 0 17.331 0 17.138 0 16.956 0.078 16.82 0.208 L10.003 6.955 3.174 0.213 C3.039 0.078 2.857 0.005 2.664 0.005 2.471 0.005 2.289 0.083 2.154 0.213 L0.211 2.171 C-0.07 2.452 -0.07 2.91 0.211 3.191 L7.06 9.958 0.232 16.809 C0.096 16.944 0.018 17.126 0.018 17.319 0.018 17.512 0.091 17.694 0.232 17.829 L2.18 19.787 C2.32 19.927 2.503 20 2.69 20 2.872 20 3.06 19.932 3.201 19.787 L10.003 12.957 16.81 19.781 C16.951 19.922 17.133 19.995 17.32 19.995 17.503 19.995 17.69 19.927 17.831 19.781 L19.779 17.824 C19.914 17.689 19.992 17.507 19.992 17.314 19.987 17.126 19.909 16.944 19.773 16.809 Z"
                  fill="#aeaeae"
                  stroke="none"
                />
              </svg>
            </button>
          </div>
          {state === "ask" && (
            <>
              <p className="reset subtitle">What do you want to say?</p>
              <div className="reset buttons">
                <button
                  className="reset classificationButton"
                  style={{
                    backgroundColor:
                      feedbackType === "FEATURE"
                        ? FeedbackColor.FEATURE
                        : disabledColor,
                  }}
                  onClick={() => handleSetFeedbackType("FEATURE")}
                >
                  <span>Feature</span>
                </button>

                <button
                  className="reset classificationButton"
                  style={{
                    backgroundColor:
                      feedbackType === "BUG"
                        ? FeedbackColor.BUG
                        : disabledColor,
                  }}
                  onClick={() => handleSetFeedbackType("BUG")}
                >
                  <span>Bug</span>
                </button>
                <button
                  className="reset classificationButton"
                  style={{
                    backgroundColor:
                      feedbackType === "OTHER"
                        ? FeedbackColor.OTHER
                        : disabledColor,
                  }}
                  onClick={() => handleSetFeedbackType("OTHER")}
                >
                  <span>Other</span>
                </button>
              </div>
            </>
          )}
        </div>

        {state === "ask" && (
          <textarea
            id="textAreaFeedback"
            placeholder={
              feedbackType ? placeholderMap[feedbackType] : "I really ..."
            }
            className="reset textArea"
            onKeyDown={handleKeyDown}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
        )}

        {state === "conclusion" && (
          <p className="reset conclusion">Your feedback has been received!</p>
        )}
        {/* Footer */}
        <div className="reset footer">
          {error && (
            <div className="reset error">
              <span>{error}</span>
            </div>
          )}
          <div className="reset innerFooter">
            <button
              className="reset actionButton"
              style={{
                backgroundColor:
                  !feedback || !feedbackType
                    ? disabledColor
                    : "rgb(46, 212, 167",
                ...(isLoading
                  ? { animation: "shrinkButton 0.4s ease-in-out forwards" }
                  : { animation: "unshrinkButton 0.1s ease-in-out forwards" }),
              }}
              onClick={handleSubmitFeedback}
            >
              <span className="reset feedbackButtonText">
                {!isLoading ? feedbackButtonText : ""}
                {isLoading && (
                  <div className="reset loadingContainer">
                    <div className="reset loading"></div>
                  </div>
                )}
              </span>
            </button>
          </div>
          <span className="reset poweredBy">
            Powered by{" "}
            <a href="https://feedback.farm" target="_blank" className="link">
              feedback.farm
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
