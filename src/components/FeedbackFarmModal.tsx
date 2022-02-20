import React, { useState } from "react";
import { Header } from "./Header";

import { sendFeedback } from "@feedbackfarm/core";

// @ts-ignore
import ZapImage from "./../images/zap.png";
// @ts-ignore
import BeetleImage from "./../images/beetle.png";

// @ts-ignore
import MonkeyImage from "./../images/monkey.png";

// @ts-ignore
import TadaImage from "./../images/tada.png";

import classes from "./styles.module.css";

type FeedbackType = "FEATURE" | "BUG" | "OTHER";

type Props = {
  onClose: () => void;
  projectId: string;
};

function FeedbackType({
  image,
  typeBackgroundColor,
  type,
  onClick,
  isSelected,
}: {
  image: React.ReactElement;
  typeBackgroundColor: string;
  type: string;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <button onClick={onClick} className={classes.feedbackFarmModalType}>
      <div
        style={{
          backgroundColor: typeBackgroundColor,
          borderColor: isSelected ? "#d1d1d1" : "transparent",
        }}
        className={classes.feedbackFarmModalTypeImageContainer}
      >
        {image}
      </div>

      <span className={classes.feedbackFarmModalTypeText}>{type}</span>
    </button>
  );
}

function FeedbackFarmModal(props: Props) {
  const { onClose, projectId } = props;
  const [feedbackText, setFeedbackText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [selectedType, setSelectedType] = useState<FeedbackType>();
  const modalBackgroundColor = "#ffffff";
  const typeBackgroundColor = "#FCFBFA";
  const textAreaBorderColor = "#D1D1D1";

  const [buttonColor, setButtonColor] = useState({
    button: "#D1D1D1",
    text: "#A7A7A7",
  });

  const [step, setStep] = useState<"ask" | "conclusion">("ask");

  const [placeholder, setPlaceholder] = useState("I really ...");

  function handleSubmitForm(e: any) {
    e.preventDefault();
  }

  async function handleSubmit() {
    if (!feedbackText || !selectedType) {
      return;
    }

    try {
      setIsSending(true);
      await sendFeedback(projectId, feedbackText, selectedType);
      setStep("conclusion");
      setFeedbackText("");
      setSelectedType(undefined);
    } catch (error) {}
    setIsSending(false);
  }

  function handleKeyDown(event: any) {
    if (event.key === "Enter" && event.metaKey) {
      handleSubmit();
    }
  }

  function handleSelectType(type: FeedbackType) {
    setSelectedType(type);

    const message = {
      FEATURE: "It would be nice ...",
      BUG: "I have an issue with ...",
      OTHER: "I have a suggestion for ...",
    };

    setPlaceholder(message[type]);

    if (feedbackText.length > 0) {
      return setButtonColor({ button: "#22c197", text: "#ffffff" });
    }
  }

  function handleTextChange(e: any) {
    const text = e.target.value;
    setFeedbackText(text);

    if (text.length > 0 && selectedType) {
      return setButtonColor({ button: "#22c197", text: "#ffffff" });
    }

    setButtonColor({
      button: "#D1D1D1",
      text: "#A7A7A7",
    });
  }

  function renderFooter(buttonText: string, onClick: () => void, disabled) {
    return (
      <>
        <button
          type="submit"
          disabled={disabled}
          style={{ backgroundColor: buttonColor.button }}
          className={classes.feedbackFarmModalSendButton}
          onClick={onClick}
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
              buttonText
            )}
          </span>
        </button>
        <span className={classes.feedbackFarmModalPoweredBy}>
          Powered by{" "}
          <a
            className={classes.feedbackFarmModalPoweredByLink}
            href="https://feedback.farm?ref=widget"
            target="_blank"
          >
            feedback.farm
          </a>
        </span>
      </>
    );
  }

  if (step === "conclusion") {
    return (
      <div
        className={classes.feedbackFarmModalRoot}
        style={{ backgroundColor: modalBackgroundColor }}
      >
        <Header title="Thank you!" onClose={onClose} />

        <div className={classes.thankYou}>
          <img src={TadaImage} className={classes.feedbackFarmTadaImage} />
          <span className={classes.feedbackReceived}>
            Your feedback has been received!
          </span>
        </div>

        {renderFooter("Send another feedback", () => setStep("ask"), false)}
      </div>
    );
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
          onClick={() => handleSelectType("FEATURE")}
          typeBackgroundColor={typeBackgroundColor}
          type="Feature"
          isSelected={selectedType === "FEATURE"}
          image={
            <img
              src={ZapImage}
              className={classes.feedbackFarmModalTypeLightning}
            />
          }
        />

        <FeedbackType
          onClick={() => handleSelectType("BUG")}
          typeBackgroundColor={typeBackgroundColor}
          type="Bug"
          isSelected={selectedType === "BUG"}
          image={
            <img
              src={BeetleImage}
              className={classes.feedbackFarmModalTypeBeetle}
            />
          }
        />

        <FeedbackType
          onClick={() => handleSelectType("OTHER")}
          typeBackgroundColor={typeBackgroundColor}
          type="Other"
          isSelected={selectedType === "OTHER"}
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

      {renderFooter(
        "Send!",
        handleSubmit,
        feedbackText.length === 0 || !selectedType
      )}
    </form>
  );
}

export { FeedbackFarmModal };
