import React, { useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import { createPortal } from 'react-dom';

import { Colors, FeedbackFarmModal, IdentifierMode } from './FeedbackFarmModal';
import { Strings } from '../utils/getStrings';

import classes from './styles.module.css';

type UndefinedColors = {
  buttonColor?: string;
  buttonDisabledColor?: string;
  buttonTextColor?: string;
  buttonTextDisabledColor?: string;
  modalBackgroundColor?: string;
  textAreaBackgroundColor?: string;
  textAreaBorderColor?: string;
  textAreaColor?: string;
  textColor?: string;
  typeBackgroundColor?: string;
  modalBorderColor?: string;
};

type Props = {
  children?: JSX.Element;
  colors?: UndefinedColors;
  identifier?: string;
  identifierMode?: IdentifierMode;
  onClose?: () => void;
  onFeedbackAdded?: () => void;
  onOpen?: () => void;
  projectId: string;
  strings?: Strings;
  theme?: 'light' | 'dark';
  placement?: Placement;
};

// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
function useOutsideAlerter(ref: any, onClose: () => void) {
  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

const defaultColors: Colors = {
  buttonColor: '#22c197',
  buttonDisabledColor: '#D1D1D1',
  buttonTextColor: '#ffffff',
  buttonTextDisabledColor: '#A7A7A7',
  modalBackgroundColor: '#ffffff',
  textAreaBackgroundColor: '#FFFFFF',
  textAreaBorderColor: '#D1D1D1',
  textAreaColor: '#000000',
  textColor: '#000000',
  typeBackgroundColor: '#FCFBFA',
  modalBorderColor: 'transparent',
};

const darkColors: Colors = {
  buttonColor: '#22c197',
  buttonDisabledColor: '#646464',
  buttonTextColor: '#ffffff',
  buttonTextDisabledColor: '#A7A7A7',
  modalBackgroundColor: '#111111',
  textAreaBackgroundColor: '#111111',
  textAreaBorderColor: '#525252',
  textAreaColor: '#ffffff',
  textColor: '#ffffff',
  typeBackgroundColor: '#000000',
  modalBorderColor: '#525252',
};

function FeedbackFarmWrapper(props: Props) {
  const {
    children,
    colors,
    identifier,
    identifierMode,
    onClose,
    onFeedbackAdded,
    onOpen,
    projectId,
    strings,
    theme,
  } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: props.placement || 'auto',
  });

  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef, () => handleClose());

  function handleClose() {
    setIsModalVisible(false);
    if (onClose) {
      onClose();
    }
  }

  function handleOpen() {
    setIsModalVisible(true);
    if (onOpen) {
      onOpen();
    }
  }

  return (
    <div>
      <div ref={setReferenceElement} onClick={handleOpen}>
        {children}
      </div>

      {isModalVisible && (
        <ModalPortal>
          <div ref={wrapperRef}>
            <div
              id="FeedbackFarmModalPortal"
              className={classes.resetStyle}
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              <FeedbackFarmModal
                identifier={identifier}
                identifierMode={identifierMode}
                onClose={handleClose}
                onFeedbackAdded={onFeedbackAdded}
                projectId={projectId}
                strings={strings}
                colors={{
                  ...(theme === 'light'
                    ? defaultColors
                    : !!theme
                    ? darkColors
                    : defaultColors),
                  ...colors,
                }}
              />
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  );
}

const ModalPortal = (props: any) => {
  const [wrapperDiv, setWrapperDiv] = useState(
    undefined as HTMLDivElement | undefined
  );
  useEffect(() => {
    const wrapperDiv = document.createElement('div');
    document.body.append(wrapperDiv);
    wrapperDiv.className = classes.modalPortal;
    setWrapperDiv(wrapperDiv);
    return () => {
      document.body.removeChild(wrapperDiv);
    };
  }, []);

  if (!wrapperDiv) {
    return <></>;
  }

  return createPortal(props.children, wrapperDiv);
};

export default FeedbackFarmWrapper;
