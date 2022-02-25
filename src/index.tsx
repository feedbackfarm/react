import * as React from 'react';

import { usePopper } from 'react-popper';
import FeedbackModal, { Colors, IdentifierMode } from './FeedbackModal';

type Props = {
  children: React.ReactNode;
  colors?: Colors;
  identifier?: string;
  onClose?: () => void;
  onFeedbackAdded?: () => void;
  onOpen?: () => void;
  projectId: string;
  identifierMode?: IdentifierMode;
  identifierPlaceholder?: string;
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

function FeedbackFarm(props: Props) {
  const [visible, setVisibility] = React.useState(false);

  const [referenceRef, setReferenceRef] = React.useState(null);
  const [popperRef, setPopperRef] = React.useState(null);

  const { styles, attributes } = usePopper(referenceRef, popperRef, {
    placement: 'auto',
  });

  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef, () => handleClose());

  function handleOpen() {
    setVisibility(true);
    if (props.onOpen) {
      props.onOpen();
    }
  }

  function handleClose() {
    setVisibility(false);
    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <div ref={wrapperRef}>
      <div
        // @ts-ignore
        ref={setReferenceRef}
        onClick={handleOpen}
        style={{ cursor: 'pointer' }}
      >
        {props.children}
      </div>
      <div
        // @ts-ignore
        ref={setPopperRef}
        style={{
          ...styles.popper,
          minWidth: 300,
          minHeight: 230,
          zIndex: 9999,
          ...(!visible ? { pointerEvents: 'none' } : {}),
        }}
        {...attributes.popper}
      >
        {visible && (
          <FeedbackModal
            onFeedbackAdded={props.onFeedbackAdded}
            onClose={handleClose}
            projectId={props.projectId}
            identifier={props.identifier}
            colors={props.colors}
            identifierMode={props.identifierMode}
            identifierPlaceholder={props.identifierPlaceholder}
          />
        )}
      </div>
    </div>
  );
}

export default FeedbackFarm;
