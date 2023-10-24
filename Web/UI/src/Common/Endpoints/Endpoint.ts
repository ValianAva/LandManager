import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import settings from 'settings';
import { useReducer } from 'react';
import { createAction, ActionType } from 'typesafe-actions';

const Actions = {
	Init: createAction('REQUEST_INIT')(),
	Progress: createAction('REQUEST_PROGRESS')<number>(),
	ProgressCount: createAction('REQUEST_COUNT')<number>(),
	Success: createAction('REQUEST_SUCCESS')(),
	Error: createAction('REQUEST_ERROR')<AxiosError>(),
};

class State {
	isLoading = false;
	progressPercent = 0;
	progressCount = 0;
}

export const initialState = new State();

export const endpointReducer = (state: State, action: ActionType<typeof Actions>): State => {
	switch (action.type) {
		case 'REQUEST_INIT':
			return { ...state, isLoading: true };
		case 'REQUEST_PROGRESS':
			return { ...state, isLoading: true, progressPercent: action.payload };
		case 'REQUEST_COUNT':
			return { ...state, isLoading: true, progressCount: action.payload };
		case 'REQUEST_SUCCESS':
			return { ...state, isLoading: false };
		case 'REQUEST_ERROR':
			console.error(action.payload);
			return { ...state, isLoading: false };
		default:
			return state;
	}
};

// doing hooks for each HTTP method works, but I preferred to pass in the controller name once
/** Creates an endpoint function that allow sending/receiving HTTP requests
 * @param {string} controllerName - The name of the associated controller, with no leading or trailing slashes
 * @param {string} baseUrl - An optional base url for the endpoint if it differs from what is set in UI settings.
 * Should have a trailing slash
 */
export const Endpoint = (controllerName: string, baseUrl: string = settings.httpClient.baseUrl) => {
	const [state, dispatch] = useReducer(endpointReducer, initialState);
	const config: AxiosRequestConfig = {
		onUploadProgress: progressEvent => {
			state.progressPercent = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
			dispatch({
				type: 'REQUEST_PROGRESS',
				payload: state.progressPercent,
			});

			if (progressEvent.loaded === progressEvent.total) {
				state.progressCount++;
				dispatch({ type: 'REQUEST_COUNT', payload: state.progressCount });
			}
		},
	};

	const Get = <T>(id?: string | number) => {
		dispatch({ type: 'REQUEST_INIT' });
		return axios
			.get<T>(baseUrl + controllerName + (id ? `/${id}` : ''))
			.then(r => {
				dispatch({ type: 'REQUEST_SUCCESS' });
				return r.data;
			})
			.catch((error: AxiosError) => {
				dispatch({ type: 'REQUEST_ERROR', payload: error });
				throw error;
			});
	};

	const Post = <T>(dto: unknown, actionName = '') => {
		dispatch({ type: 'REQUEST_INIT' });
		return axios
			.post<T>(baseUrl + controllerName + (actionName !== '' ? `/${actionName}/` : ''), dto, config)
			.then(r => {
				dispatch({ type: 'REQUEST_SUCCESS' });
				return r.data;
			})
			.catch((error: AxiosError) => {
				dispatch({ type: 'REQUEST_ERROR', payload: error });
				throw error;
			});
	};

	const Put = <T>(id: string | number, dto: unknown, actionName = '') => {
		dispatch({ type: 'REQUEST_INIT' });

		if (settings.usePost) {
			return axios
				.post<T>(
					baseUrl + controllerName + '/edit' + (actionName !== '' ? `/${actionName}/` : '/') + id,
					dto,
					config
				)
				.then(r => {
					dispatch({ type: 'REQUEST_SUCCESS' });
					return r.data;
				})
				.catch((error: AxiosError) => {
					dispatch({ type: 'REQUEST_ERROR', payload: error });
					throw error;
				});
		}

		return axios
			.put<T>(baseUrl + controllerName + (actionName !== '' ? `/${actionName}/` : '/') + id, dto)
			.then(r => {
				dispatch({ type: 'REQUEST_SUCCESS' });
				return r.data;
			})
			.catch((error: AxiosError) => {
				dispatch({ type: 'REQUEST_ERROR', payload: error });
				throw error;
			});
	};

	const Delete = <T>(id: string | number, actionName = '') => {
		dispatch({ type: 'REQUEST_INIT' });

		if (settings.usePost) {
			return axios
				.post<T>(
					baseUrl + controllerName + '/delete' + (actionName !== '' ? `/${actionName}/` : '/') + id,
					config
				)
				.then(r => {
					dispatch({ type: 'REQUEST_SUCCESS' });
					return r.data;
				})
				.catch((error: AxiosError) => {
					dispatch({ type: 'REQUEST_ERROR', payload: error });
					throw error;
				});
		}

		return axios
			.delete<T>(baseUrl + controllerName + (actionName !== '' ? `/${actionName}/` : '/') + id)
			.then(r => {
				dispatch({ type: 'REQUEST_SUCCESS' });
				return r.data;
			})
			.catch((error: AxiosError) => {
				dispatch({ type: 'REQUEST_ERROR', payload: error });
				throw error;
			});
	};

	// not generic since we're assuming everything is a blob
	const Download = (id: string | number, actionName = '', defaultFileName = 'file-download') => {
		dispatch({ type: 'REQUEST_INIT' });
		return axios
			.get<Blob>(baseUrl + controllerName + (actionName !== '' ? `/${actionName}/` : '/') + id, {
				responseType: 'arraybuffer',
			})
			.then(r => {
				// note: requires proper header access
				// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Access-Control-Expose-Headers
				const disposition = r.request.getResponseHeader('content-disposition');
				let fileName = defaultFileName;
				const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
				const matches = filenameRegex.exec(disposition);
				if (matches !== null && matches[1]) {
					fileName = matches[1].replace(/['"]/g, '');
				}
				const url = window.URL.createObjectURL(new Blob([r.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', fileName);
				document.body.appendChild(link);
				link.click();
				dispatch({ type: 'REQUEST_SUCCESS' });
			})
			.catch((error: AxiosError) => {
				dispatch({ type: 'REQUEST_ERROR', payload: error });
				throw error;
			});
	};

	return {
		Get,
		Post,
		Put,
		Delete,
		Download,
		IsLoading: state.isLoading,
		ProgressPercent: state.progressPercent,
		ProgressCount: state.progressCount,
	};
};
