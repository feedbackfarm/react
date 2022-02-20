import React from "react";

import { CloseSvg } from "../svg/close";

import classes from "./styles.module.css";

type Props = {
  title: string;
  onClose: () => void;
};

function Header(props: Props) {
  const { title, onClose } = props;

  return (
    <div className={classes.header}>
      <h1 className={classes.headerTitle}>{title}</h1>
      <button className={classes.headerCloseButton} onClick={onClose}>
        <CloseSvg />
      </button>
    </div>
  );
}

export { Header };
