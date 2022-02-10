import * as React from "react";
import {useEffect, useState} from "react";

import {usePopper} from "react-popper";
import FeedbackModal, {Colors, IdentifierMode} from "./FeedbackModal";
import {createPortal} from "react-dom";
import {Placement} from "@popperjs/core";
import {Strings} from "./getStrings";

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
  strings?: Strings;
  placement?: Placement;
};

//https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
function useOutsideAlerter(ref: any, onClose: () => void) {
  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
}

function FeedbackFarm(props: Props) {
  const [visible, setVisibility] = React.useState(false);

  const [referenceRef, setReferenceRef] = React.useState(null);
  const [popperRef, setPopperRef] = React.useState(null);

  const {styles, attributes} = usePopper(referenceRef, popperRef, {
    placement: props.placement || "auto",
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
        style={{cursor: "pointer"}}
      >
        {props.children}
      </div>
      {visible && (
        <ModalPortal>
          <div
            // @ts-ignore
            ref={setPopperRef}
            style={{
              ...styles.popper,
              minWidth: 300,
              minHeight: 230,
              zIndex: 9999,
              ...(!visible ? {pointerEvents: "none"} : {}),
            }}
            {...attributes.popper}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FeedbackModal
              onFeedbackAdded={props.onFeedbackAdded}
              onClose={handleClose}
              projectId={props.projectId}
              identifier={props.identifier}
              colors={props.colors}
              identifierMode={props.identifierMode}
              identifierPlaceholder={props.identifierPlaceholder}
              strings={props.strings}
            />
          </div>
        </ModalPortal>
      )}
    </div>
  );
}

const ModalPortal = (props: any) => {
  const [wrapperDiv, setWrapperDiv] = useState(undefined as HTMLDivElement | undefined);
  useEffect(() => {
    const wrapperDiv = document.createElement('div')
    document.body.append(wrapperDiv);
    wrapperDiv.className = "FF210xFF_modalWrapper"
    setWrapperDiv(wrapperDiv)
    return () => {
      document.body.removeChild(wrapperDiv)
    }
  }, [])

  if (!wrapperDiv) {
    return <></>
  }

  return createPortal(
    props.children,
    wrapperDiv
  );
}

export default FeedbackFarm;
