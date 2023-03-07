import React, {forwardRef} from 'react';
import styles from './COMPONENT_NAME.module.scss';
import cx from 'classnames';

type Props = {
  children: React.ReactNode;
}

const COMPONENT_NAME = forwardRef((props: Props, ref: any) => {
  const themeClass = cx(styles.COMPONENT_NAME, {});

  return <div className={`opub-COMPONENT_NAME ${themeClass}`} ref={ref} {...props} />;
});

export { COMPONENT_NAME };