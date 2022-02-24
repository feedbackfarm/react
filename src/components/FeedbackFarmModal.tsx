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

export type IdentifierMode = "required" | "optional";
export type Colors = {
  modalBackgroundColor: string;
  typeBackgroundColor: string;
  textAreaBorderColor: string;
  textAreaBackgroundColor: string;
  buttonColor: string;
  buttonTextColor: string;
  buttonDisabledColor: string;
  buttonTextDisabledColor: string;
  textColor: string;
  textAreaColor: string;
};

type Props = {
  identifier?: string;
  onClose: () => void;
  onFeedbackAdded?: () => void;
  projectId: string;
  colors: Colors;
  identifierMode?: IdentifierMode;
};

function FeedbackType({
  image,
  typeBackgroundColor,
  type,
  onClick,
  isSelected,
  textColor,
}: {
  image: React.ReactElement;
  typeBackgroundColor: string;
  type: string;
  onClick: () => void;
  isSelected: boolean;
  textColor: string;
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

      <span
        className={classes.feedbackFarmModalTypeText}
        style={{ color: textColor }}
      >
        {type}
      </span>
    </button>
  );
}

function FeedbackFarmModal(props: Props) {
  const {
    colors,
    identifier: _identifier,
    identifierMode,
    onClose,
    onFeedbackAdded,
    projectId,
  } = props;
  const [feedbackText, setFeedbackText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [identifier, setIdentifier] = useState(_identifier);

  const askIdentifierMode = identifierMode;

  const {
    buttonColor,
    buttonDisabledColor,
    buttonTextColor,
    buttonTextDisabledColor,
    modalBackgroundColor,
    textAreaBackgroundColor,
    textAreaBorderColor,
    textAreaColor,
    textColor,
    typeBackgroundColor,
  } = colors;

  const [selectedType, setSelectedType] = useState<FeedbackType>();

  const [buttonColorState, setButtonColorState] = useState({
    button: buttonDisabledColor,
    text: buttonTextDisabledColor,
  });

  const [step, setStep] = useState<"ask" | "conclusion">("ask");

  const [placeholder, setPlaceholder] = useState("I really ...");

  function handleSubmitForm(e: any) {
    e.preventDefault();
  }

  const idIsValid =
    askIdentifierMode === "required"
      ? identifier && identifier.length > 0
      : true;

  async function handleSubmit() {
    if (!feedbackText || !selectedType) {
      return;
    }

    if (!idIsValid) {
      return;
    }

    try {
      setIsSending(true);
      await sendFeedback(projectId, feedbackText, selectedType, identifier);
      setStep("conclusion");
      setFeedbackText("");
      setSelectedType(undefined);

      if (onFeedbackAdded) {
        onFeedbackAdded();
      }
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

    if (feedbackText.length > 0 && idIsValid) {
      return setButtonColorState({
        button: buttonColor,
        text: buttonTextColor,
      });
    }
  }

  function handleTextChange(e: any) {
    const text = e.target.value;
    setFeedbackText(text);

    if (text.length > 0 && selectedType && idIsValid) {
      return setButtonColorState({
        button: buttonColor,
        text: buttonTextColor,
      });
    }

    setButtonColorState({
      button: buttonDisabledColor,
      text: buttonTextDisabledColor,
    });
  }

  function handleOnIdentifierChange(e: any) {
    const identifier = e.target.value;
    setIdentifier(identifier);

    if (
      feedbackText.length > 0 &&
      selectedType &&
      askIdentifierMode === "required"
        ? identifier && identifier.length > 0
        : true
    ) {
      return setButtonColorState({
        button: buttonColor,
        text: buttonTextColor,
      });
    }

    setButtonColorState({
      button: buttonDisabledColor,
      text: buttonTextDisabledColor,
    });
  }

  function renderFooter(buttonText: string, onClick: () => void, disabled) {
    return (
      <div className={classes.footer}>
        <div className={classes.footerIdentifier}>
          {step === "ask" && !!askIdentifierMode && (
            <>
              <input
                className={classes.footerEmailInput}
                placeholder="Email"
                style={{
                  borderColor: textAreaBorderColor,
                  color: textColor,
                }}
                value={identifier}
                onChange={handleOnIdentifierChange}
              />
              <div style={{ width: 20, height: "100%" }} />
            </>
          )}
          <button
            type="submit"
            disabled={disabled}
            style={{ backgroundColor: buttonColorState.button }}
            className={classes.feedbackFarmModalSendButton}
            onClick={onClick}
          >
            <span
              style={{ color: buttonColorState.text }}
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
        </div>
        <span
          className={classes.feedbackFarmModalPoweredBy}
          style={{ color: textColor }}
        >
          Powered by{" "}
          <a
            className={classes.feedbackFarmModalPoweredByLink}
            href="https://feedback.farm?ref=widget"
            target="_blank"
          >
            feedback.farm
          </a>
        </span>
      </div>
    );
  }

  if (step === "conclusion") {
    return (
      <div
        className={classes.feedbackFarmModalRoot}
        style={{ backgroundColor: modalBackgroundColor }}
      >
        <Header title="Thank you!" onClose={onClose} textColor={textColor} />

        <div className={classes.thankYou}>
          <img src={TadaImage} className={classes.feedbackFarmTadaImage} />
          <span
            className={classes.feedbackReceived}
            style={{ color: textColor }}
          >
            Your feedback has been received!
          </span>
        </div>

        {renderFooter(
          "Send another feedback",
          () => {
            setButtonColorState({
              button: buttonDisabledColor,
              text: buttonTextDisabledColor,
            });
            setStep("ask");
          },
          false
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmitForm}
      className={classes.feedbackFarmModalRoot}
      style={{ backgroundColor: modalBackgroundColor }}
    >
      <Header title="Give feedback!" textColor={textColor} onClose={onClose} />
      <div className={classes.feedbackFarmModalTypeSelectorRoot}>
        <FeedbackType
          onClick={() => handleSelectType("FEATURE")}
          typeBackgroundColor={typeBackgroundColor}
          type="Feature"
          isSelected={selectedType === "FEATURE"}
          textColor={textColor}
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
          textColor={textColor}
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
          textColor={textColor}
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
        style={{
          borderColor: textAreaBorderColor,
          backgroundColor: textAreaBackgroundColor,
          color: textAreaColor,
        }}
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
