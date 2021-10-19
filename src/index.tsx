import * as React from "react";
import { usePopper } from "react-popper";
import FeedbackModal from "./FeedbackModal";

type Props = {
  children: React.ReactNode;
};
function FeedbackFarm(_props: Props) {
  const [visible, setVisibility] = React.useState(true);

  const [referenceRef, setReferenceRef] = React.useState(null);
  const [popperRef, setPopperRef] = React.useState(null);

  const { styles, attributes } = usePopper(referenceRef, popperRef, {
    placement: "auto",
  });

  return (
    <React.Fragment>
      {/* @ts-ignore */}
      <div ref={setReferenceRef} onClick={() => setVisibility(true)}>
        {_props.children}
      </div>
      {/* @ts-ignore */}
      <div ref={setPopperRef} style={styles.popper} {...attributes.popper}>
        {visible && <FeedbackModal onClose={() => setVisibility(false)} />}
      </div>
    </React.Fragment>
  );
}

export default FeedbackFarm;
