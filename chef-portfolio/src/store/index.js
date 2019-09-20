import React from 'react';
import useGlobalHook from 'use-global-hook';

import * as actions from '../actions';

const initialState = {
  userId: null,
  status: 'INITIAL',
  isLoggedIn: false,
  recipes: []
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
