import React, { useState } from 'react';
import { usePopper } from 'react-popper';

import { Colors, FeedbackFarmModal, IdentifierMode } from './FeedbackFarmModal';
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
  theme?: 'light' | 'dark';
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
    theme,
  } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'auto',
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
    <div ref={wrapperRef}>
      <div ref={setReferenceElement} onClick={handleOpen}>
        {children}
      </div>

      {isModalVisible && (
        <div
          className={classes.resetStyle}
          ref={setPopperElement}
          style={{ ...styles.popper, zIndex: 9999 }}
          {...attributes.popper}
        >
          <FeedbackFarmModal
            identifier={identifier}
            identifierMode={identifierMode}
            onClose={handleClose}
            onFeedbackAdded={onFeedbackAdded}
            projectId={projectId}
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
      )}
    </div>
  );
}

export default FeedbackFarmWrapper;
