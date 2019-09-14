import React from 'react';
import useGlobalHook from 'use-global-hook';

import * as actions from '../actions';

const initialState = {
  users: {
    username: '',
    password: '',
    city: '',
    state: '',
    email: '',
    phone: ''
  },
  status: 'INITIAL',
  repos: []
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
