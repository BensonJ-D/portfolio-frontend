import React, { PropsWithChildren } from 'react';
import Skeleton from '@mui/material/Skeleton';

const SkeletonWrapper = ({ disabled, children }: PropsWithChildren<{disabled: boolean}>) => {
  return (
    <>
      {disabled && children}
      {!disabled &&
        <Skeleton>
          {children}
        </Skeleton>
      }
    </>
  );
};

export default SkeletonWrapper;
