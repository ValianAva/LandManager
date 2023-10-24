import React, { createContext, useReducer, Dispatch, useContext, useEffect } from 'react';
import { User } from 'oidc-client-ts';
import { ActionType, createAction } from 'typesafe-actions';
import { Apps, LoggedInUser } from 'Common/Models/AppModels';
import { useLocalStorage } from 'Common/Helpers/ReactHelper';
import { useMediaQuery } from '@material-ui/core';

interface LoggedInPayload {
	user: User;
	app: Apps;
}

// actions
const Actions = {
	UserLoggedIn: createAction('APP/USER_LOGGED_IN')<LoggedInPayload>(),
	UserLoggedOut: createAction('APP/USER_LOGGED_OUT')(),
	SetTheme: createAction('APP/SET_THEME')<'light' | 'dark'>(),
	SetLockStatus: createAction('APP/SET_LOCK_STATUS')<boolean>(),
	SetMenuExpanded: createAction('APP/SET_MENU_EXPANDED')<boolean>(),
	SetMenuOpen: createAction('APP/SET_MENU_OPEN')<boolean>(),
};

// state
class State {
	CurrentUser?: LoggedInUser;
	/** A way to track a user's login status separate from CurrentUser since that can't
	 * differentiate awaiting login and logged out
	 */
	LoginStatus: 'Awaiting Login' | 'Logged In' | 'Logged Out' = 'Awaiting Login';
	Theme: 'light' | 'dark' = 'light';
	SiteLocked = false;
	MenuExpanded = true;
	MenuOpen = false;
}

// reducer
const loginReducer = (state: State, action: ActionType<typeof Actions>): State => {
	switch (action.type) {
		case 'APP/USER_LOGGED_IN':
			return {
				...state,
				CurrentUser: new LoggedInUser(action.payload.app, action.payload.user),
				LoginStatus: 'Logged In',
			};
		case 'APP/USER_LOGGED_OUT':
			return { ...state, CurrentUser: undefined, LoginStatus: 'Logged Out' };
		case 'APP/SET_THEME':
			return { ...state, Theme: action.payload };
		case 'APP/SET_LOCK_STATUS':
			return { ...state, SiteLocked: action.payload };
		case 'APP/SET_MENU_EXPANDED':
			return { ...state, MenuExpanded: action.payload };
		case 'APP/SET_MENU_OPEN':
			return { ...state, MenuOpen: action.payload };
		default:
			return state;
	}
};

// init contexts
const initialState = new State();
const AppStateContext = createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-empty-function
const AppDispatchContext = createContext<Dispatch<ActionType<typeof Actions>>>(() => {});

// create context provider
const AppProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(loginReducer, initialState);
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const [darkModeStorage, setDarkModeStorage] = useLocalStorage('dark-mode', prefersDarkMode.toString());

	useEffect(() => {
		if (darkModeStorage) {
			dispatch({ type: 'APP/SET_THEME', payload: 'dark' });
		}
	}, [darkModeStorage]);

	useEffect(() => {
		setDarkModeStorage(state.Theme === 'dark');
	}, [state.Theme]);

	return (
		<AppStateContext.Provider value={state}>
			<AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
		</AppStateContext.Provider>
	);
};

const useAppState = () => {
	return useContext(AppStateContext);
};

const useAppDispatch = () => {
	return useContext(AppDispatchContext);
};

export { useAppState, useAppDispatch, AppProvider };
