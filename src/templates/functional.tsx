import React from 'react';

interface Props {
  children: React.ReactNode;
}

const COMPONENT_NAME = React.forwardRef((props: Props, ref: any) => {
  return <div ref={ref} {...props} />;
});

export { COMPONENT_NAME };