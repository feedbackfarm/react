import React, { useState } from "react";
import { usePopper } from "react-popper";

import { FeedbackFarmModal } from "./FeedbackFarmModal";
import classes from "./styles.module.css";

type Props = {
  children?: JSX.Element;
  projectId: string;
};

// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
function useOutsideAlerter(ref: any, onClose: () => void) {
  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function FeedbackFarmWrapper(props: Props) {
  const { children, projectId } = props;
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "auto",
  });

  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef, () => handleClose());

  function handleClose() {
    setIsModalVisible(false);
  }

  return (
    <div ref={wrapperRef}>
      <div ref={setReferenceElement} onClick={() => setIsModalVisible(true)}>
        {children}
      </div>

      {isModalVisible && (
        <div
          className={classes.resetStyle}
          ref={setPopperElement}
          style={{ ...styles.popper, zIndex: 9999 }}
          {...attributes.popper}
        >
          <FeedbackFarmModal onClose={handleClose} projectId={projectId} />
        </div>
      )}
    </div>
  );
}

export default FeedbackFarmWrapper;
