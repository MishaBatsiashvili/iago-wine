import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Loader from './Loader';
import PropTypes from 'prop-types';

/**
 * This component recieves content, that must be loaded as a children prop
 * and exposes other props as well that give control over when and how to hide and show the loader
 */
const LoaderWrapper = ({ children, isLoaded, extraMilisecondsToWait = null }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    handleLoaderToggle();
  }, [isLoaded]);

  const handleLoaderToggle = () => {
    let timeout = null;

    if (isLoaded) {
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
  isLoaded: PropTypes.bool,
  extraMilisecondsToWait: PropTypes.number
};
