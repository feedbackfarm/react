import * as React from "react";

export type Strings = {
  askTitle?: React.ReactNode,
  askSubtitle?: React.ReactNode,
  sendButton?: React.ReactNode,
  conclusionTitle?: React.ReactNode,
  conclusionSubtitle?: React.ReactNode,
  anotherFeedbackButton?: React.ReactNode
  defaultError?: React.ReactNode
  userIdentificationInputPlaceholder?: string
  textareaPlaceholders?: {
    BUG?: string,
    FEATURE?: string,
    OTHER?: string,
    DEFAULT?: string
  }
  feedbackTypes?: {
    feature?: string,
    bug?: string,
    other?: string
  }
}

export function getStrings(providedStrings?: Strings) {
  return {
    askTitle: providedStrings?.askTitle || "Give feedback!",
    askSubtitle: providedStrings?.askSubtitle || "What do you want to say?",
    sendButton: providedStrings?.sendButton || "Send Feedback",
    conclusionTitle: providedStrings?.conclusionTitle || "Thank you!",
    conclusionSubtitle: providedStrings?.conclusionSubtitle || "Your feedback has been received!",
    anotherFeedbackButton: providedStrings?.anotherFeedbackButton || "Another thing to say?",
    error: providedStrings?.defaultError || "An error occurred, try again.",
    userIdentificationInputPlaceholder: providedStrings?.userIdentificationInputPlaceholder || "Your email to contact you if needed",
    textareaPlaceholders: {
      BUG: providedStrings?.textareaPlaceholders?.BUG || "I have an issue with ...",
      FEATURE: providedStrings?.textareaPlaceholders?.FEATURE || "It would be nice ...",
      OTHER: providedStrings?.textareaPlaceholders?.OTHER || "I have a suggestion for ...",
      DEFAULT: providedStrings?.textareaPlaceholders?.DEFAULT || "I really ...",
    },
    feedbackTypes: {
      feature: providedStrings?.feedbackTypes?.feature || "Feature",
      bug: providedStrings?.feedbackTypes?.bug || "Bug",
      other: providedStrings?.feedbackTypes?.other || "Other"
    }
  };
}
