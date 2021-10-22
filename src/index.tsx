import * as React from "react";
import { usePopper } from "react-popper";
import FeedbackModal from "./FeedbackModal";

type Props = {
  children: React.ReactNode;
  projectId: string;
  identifier?: string;
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

function FeedbackFarm(props: Props) {
  const [visible, setVisibility] = React.useState(false);

  const [referenceRef, setReferenceRef] = React.useState(null);
  const [popperRef, setPopperRef] = React.useState(null);

  const { styles, attributes } = usePopper(referenceRef, popperRef, {
    placement: "auto",
  });

  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef, () => setVisibility(false));

  return (
    <div ref={wrapperRef}>
      <div
        // @ts-ignore
        ref={setReferenceRef}
        onClick={() => setVisibility(true)}
        style={{ cursor: "pointer" }}
      >
        {props.children}
      </div>
      <div
        // @ts-ignore
        ref={setPopperRef}
        style={{ ...styles.popper, minWidth: 300, minHeight: 230 }}
        {...attributes.popper}
      >
        {visible && (
          <FeedbackModal
            onClose={() => setVisibility(false)}
            projectId={props.projectId}
            identifier={props.identifier}
          />
        )}
      </div>
    </div>
  );
}

export default FeedbackFarm;
