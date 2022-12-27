import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Loader from './Loader';
import PropTypes from 'prop-types';

const LoaderWrapper = ({ children, shouldToggleLoader, extraMilisecondsToWait = null }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    handleLoaderToggle();
  }, [shouldToggleLoader]);

  const handleLoaderToggle = () => {
    let timeout = null;
    if (shouldToggleLoader) {
      if (extraMilisecondsToWait) {
        timeout = setTimeout(() => {
          setShowLoader(false);
        }, extraMilisecondsToWait);
      } else {
        setShowLoader(false);
      }
    } else {
      setShowLoader(true);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  };

  return showLoader ? <Loader /> : <>{children}</>;
};

export default LoaderWrapper;

LoaderWrapper.propTypes = {
  children: PropTypes.any,
  shouldToggleLoader: PropTypes.bool,
  extraMilisecondsToWait: PropTypes.number
};
