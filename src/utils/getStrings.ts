import * as React from 'react';

export type Strings = {
  askTitle?: string;
  send?: string;
  conclusionTitle?: string;
  conclusionSubtitle?: string;
  anotherFeedback?: string;
  error?: string;
  userIdentificationInputPlaceholder?: string;
  textareaPlaceholders?: {
    BUG?: string;
    FEATURE?: string;
    OTHER?: string;
    DEFAULT?: string;
  };
  feedbackTypes?: {
    FEATURE?: string;
    BUG?: string;
    OTHER?: string;
  };
  poweredBy?: string;
};

export function getStrings(providedStrings?: Strings) {
  return {
    askTitle: providedStrings?.askTitle || 'Give feedback!',
    send: providedStrings?.send || 'Send!',
    conclusionTitle: providedStrings?.conclusionTitle || 'Thank you!',
    conclusionSubtitle:
      providedStrings?.conclusionSubtitle || 'Your feedback has been received!',
    anotherFeedback:
      providedStrings?.anotherFeedback || 'Send another feedback',
    error: providedStrings?.error || 'An error occurred, try again.',
    userIdentificationInputPlaceholder:
      providedStrings?.userIdentificationInputPlaceholder || 'Email',
    textareaPlaceholders: {
      BUG:
        providedStrings?.textareaPlaceholders?.BUG ||
        'I have an issue with ...',
      FEATURE:
        providedStrings?.textareaPlaceholders?.FEATURE ||
        'It would be nice ...',
      OTHER:
        providedStrings?.textareaPlaceholders?.OTHER ||
        'I have a suggestion for ...',
      DEFAULT: providedStrings?.textareaPlaceholders?.DEFAULT || 'I really ...',
    },
    feedbackTypes: {
      feature: providedStrings?.feedbackTypes?.FEATURE || 'Feature',
      bug: providedStrings?.feedbackTypes?.BUG || 'Bug',
      other: providedStrings?.feedbackTypes?.OTHER || 'Other',
    },
    poweredBy: providedStrings?.poweredBy || 'Powered by ',
  };
}
