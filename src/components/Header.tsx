import React from 'react';

import { CloseSvg } from '../svg/close';

import classes from './styles.module.css';

type Props = {
  title: string;
  onClose: () => void;
  textColor: string;
};

function Header(props: Props) {
  const { title, onClose, textColor } = props;

  return (
    <div className={classes.header}>
      <h1 className={classes.headerTitle} style={{ color: textColor }}>
        {title}
      </h1>
      <button className={classes.headerCloseButton} onClick={onClose}>
        <CloseSvg />
      </button>
    </div>
  );
}

export { Header };
