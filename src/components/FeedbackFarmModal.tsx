import React, { useState } from "react";
import { Header } from "./Header";

// @ts-ignore
import ZapImage from "./../images/zap.png";
// @ts-ignore
import BeetleImage from "./../images/beetle.png";

// @ts-ignore
import MonkeyImage from "./../images/monkey.png";

import classes from "./styles.module.css";

type Props = {
  onClose: () => void;
};

function FeedbackType({
  image,
  typeBackgroundColor,
  type,
}: {
  image: React.ReactElement;
  typeBackgroundColor: string;
  type: string;
}) {
  return (
    <div
      className={classes.feedbackFarmModalType}
      style={{ borderColor: "red" }}
    >
      <div
        style={{ backgroundColor: typeBackgroundColor }}
        className={classes.feedbackFarmModalTypeImageContainer}
      >
        {image}
      </div>

      <span className={classes.feedbackFarmModalTypeText}>{type}</span>
    </div>
  );
}

function FeedbackFarmModal(props: Props) {
  const { onClose } = props;
  const [feedbackText, setFeedbackText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const modalBackgroundColor = "#ffffff";
  const typeBackgroundColor = "#FCFBFA";
  const textAreaBorderColor = "#D1D1D1";

  const [buttonColor, setButtonColor] = useState({
    button: "#D1D1D1",
    text: "#A7A7A7",
  });

  const placeholder = "It would be nice to ...";

  function handleSubmitForm(e: any) {
    e.preventDefault();
  }

  async function handleSubmit() {
    if (!feedbackText) {
      return;
    }
    console.log("submit", feedbackText);

    try {
      setIsSending(true);
    } catch (error) {}
    setIsSending(false);
  }

  function handleKeyDown(event: any) {
    if (event.key === "Enter" && event.metaKey) {
      handleSubmit();
    }
  }

  function handleTextChange(e: any) {
    const text = e.target.value;
    setFeedbackText(text);

    if (text.length > 0) {
      return setButtonColor({ button: "#22c197", text: "#ffffff" });
    }

    setButtonColor({
      button: "#D1D1D1",
      text: "#A7A7A7",
    });
  }

  return (
    <form
      onSubmit={handleSubmitForm}
      className={classes.feedbackFarmModalRoot}
      style={{ backgroundColor: modalBackgroundColor }}
    >
      <Header title="Give feedback!" onClose={onClose} />
      <div className={classes.feedbackFarmModalTypeSelectorRoot}>
        <FeedbackType
          typeBackgroundColor={typeBackgroundColor}
          type="Feature"
          image={
            <img
              src={ZapImage}
              className={classes.feedbackFarmModalTypeLightning}
            />
          }
        />

        <FeedbackType
          typeBackgroundColor={typeBackgroundColor}
          type="Bug"
          image={
            <img
              src={BeetleImage}
              className={classes.feedbackFarmModalTypeBeetle}
            />
          }
        />

        <FeedbackType
          typeBackgroundColor={typeBackgroundColor}
          type="Other"
          image={
            <img
              src={MonkeyImage}
              className={classes.feedbackFarmModalTypeMonkey}
            />
          }
        />
      </div>

      <textarea
        onKeyDown={handleKeyDown}
        style={{ borderColor: textAreaBorderColor }}
        className={classes.feedbackFarmModalTextArea}
        placeholder={placeholder}
        value={feedbackText}
        onChange={handleTextChange}
      />

      <button
        type="submit"
        disabled={feedbackText.length === 0}
        style={{ backgroundColor: buttonColor.button }}
        className={classes.feedbackFarmModalSendButton}
        onClick={handleSubmit}
      >
        <span
          style={{ color: buttonColor.text }}
          className={classes.feedbackFarmModalSendButtonText}
        >
          {isSending ? (
            <div className={classes.loadingContainer}>
              <div className={classes.loading}></div>
            </div>
          ) : (
            "Send!"
          )}
        </span>
      </button>

      <span className={classes.feedbackFarmModalPoweredBy}>
        Powered by{" "}
        <a
          className={classes.feedbackFarmModalPoweredByLink}
          href="https://feedback.farm"
        >
          feedback.farm
        </a>
      </span>
    </form>
  );
}

export { FeedbackFarmModal };
