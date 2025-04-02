import React from 'react';
import useApiContext from '../contexts/ApiContext';
import Loader from './Loader';

const DisplayLoader = ({ children }) => {
  const { loading } = useApiContext();
  return loading ? <Loader /> : children;
};

export default DisplayLoader;