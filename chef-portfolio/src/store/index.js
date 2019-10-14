import React from 'react';
import useGlobalHook from 'use-global-hook';

import * as actions from '../actions';

const initialState = {
  userId: null,
  status: 'INITIAL',
  loginUnaut: false,
  isLoggedIn: false,
  recipes: [],
  myrecipes: [],
  regErr: false,
  userName: ''
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
