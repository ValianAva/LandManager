// contains methods that make writing React and/or TypeScript easier

import { useEffect, useState } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';

export const useNameof = <T>() => {
	return (name: keyof T) => name;
};

export const useSessionStorage = (key: string, initialValue: string) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.sessionStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.warn(error);
			return initialValue;
		}
	});

	const setValue = (value: string) => {
		try {
			setStoredValue(value);
			window.sessionStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.warn(error);
		}
	};

	return [storedValue, setValue];
};

export const useLocalStorage = (key: string, initialValue: string | Date) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.warn(error);
			return initialValue;
		}
	});

	const setValue = (value: string) => {
		try {
			setStoredValue(value);
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.warn(error);
		}
	};

	return [storedValue, setValue];
};

// https://usehooks-ts.com/react-hook/use-script
const cachedScriptStatuses: Record<string, UseScriptStatus | undefined> = {};
function getScriptNode(src: string) {
	const node: HTMLScriptElement | null = document.querySelector(`script[src="${src}"]`);
	const status = node?.getAttribute('data-status') as UseScriptStatus | undefined;

	return {
		node,
		status,
	};
}

type UseScriptStatus = 'idle' | 'loading' | 'ready' | 'error';
export interface UseScriptOptions {
	shouldPreventLoad?: boolean;
	removeOnUnmount?: boolean;
}

export const useScript = (src: string | null, options?: UseScriptOptions): UseScriptStatus => {
	const [status, setStatus] = useState<UseScriptStatus>(() => {
		if (!src || options?.shouldPreventLoad) {
			return 'idle';
		}

		if (typeof window === 'undefined') {
			// SSR Handling - always return 'loading'
			return 'loading';
		}

		return cachedScriptStatuses[src] ?? 'loading';
	});

	useEffect(() => {
		if (!src || options?.shouldPreventLoad) {
			return;
		}

		const cachedScriptStatus = cachedScriptStatuses[src];
		if (cachedScriptStatus === 'ready' || cachedScriptStatus === 'error') {
			// If the script is already cached, set its status immediately
			setStatus(cachedScriptStatus);
			return;
		}

		// Fetch existing script element by src
		// It may have been added by another instance of this hook
		const script = getScriptNode(src);
		let scriptNode = script.node;

		if (!scriptNode) {
			// Create script element and add it to document body
			scriptNode = document.createElement('script');
			scriptNode.src = src;
			scriptNode.async = true;
			scriptNode.setAttribute('data-status', 'loading');
			document.body.appendChild(scriptNode);

			// Store status in attribute on script
			// This can be read by other instances of this hook
			const setAttributeFromEvent = (event: Event) => {
				const scriptStatus: UseScriptStatus = event.type === 'load' ? 'ready' : 'error';

				scriptNode?.setAttribute('data-status', scriptStatus);
			};

			scriptNode.addEventListener('load', setAttributeFromEvent);
			scriptNode.addEventListener('error', setAttributeFromEvent);
		} else {
			// Grab existing script status from attribute and set to state.
			setStatus(script.status ?? cachedScriptStatus ?? 'loading');
		}

		// Script event handler to update status in state
		// Note: Even if the script already exists we still need to add
		// event handlers to update the state for *this* hook instance.
		const setStateFromEvent = (event: Event) => {
			const newStatus = event.type === 'load' ? 'ready' : 'error';
			setStatus(newStatus);
			cachedScriptStatuses[src] = newStatus;
		};

		// Add event listeners
		scriptNode.addEventListener('load', setStateFromEvent);
		scriptNode.addEventListener('error', setStateFromEvent);

		// Remove event listeners on cleanup
		return () => {
			if (scriptNode) {
				scriptNode.removeEventListener('load', setStateFromEvent);
				scriptNode.removeEventListener('error', setStateFromEvent);
			}

			if (scriptNode && options?.removeOnUnmount) {
				scriptNode.remove();
			}
		};
	}, [src, options?.shouldPreventLoad, options?.removeOnUnmount]);

	return status;
};

export const useTinyMCE = (limit?: number) => {
	const [length, setLength] = useState(0);
	const [sizeLimit, setSizeLimit] = useState(limit || 200);
	const [error, setError] = useState(false);

	// This is to display the character count error before submitting the form
	// all of these have to be handled seperately even though they are very close to the same code because
	// if you use one function the counts/value gets off and it bombs on init after save.  Janky? Yes!
	const handleInit = (evt: any, editor: TinyMCEEditor) => {
		setLength(editor.getContent({ format: 'text' }).length);
		setSizeLimit(limit || 250);
		if (editor.getContainer()) {
			const statusBar = editor.getContainer().children[1].getElementsByClassName('tox-statusbar__text-container');
			const remaining = document.createElement('div');
			remaining.classList.add('remaining-characters');
			// this inserts it before the tiny branding statement
			statusBar.item(0)!.insertBefore(remaining, statusBar.item(0)!.children[1]);
			remaining.innerText = `${sizeLimit - length} characters remaining`;
		}
	};

	const handleUpdate = (evt: any, editor: TinyMCEEditor) => {
		const length = editor.getContent({ format: 'text' }).length;
		const statusBar = editor.getContainer().children[1].getElementsByClassName('tox-statusbar__text-container');
		const remaining = statusBar.item(0)!.getElementsByClassName('remaining-characters').item(0) as HTMLElement;
		if (length <= sizeLimit) {
			setLength(length);
			if (remaining) {
				remaining.style.fontWeight = '';
				remaining.style.textShadow = '';
				remaining.style.background = '';
				setError(false);
			}
		}

		if (length > sizeLimit) {
			if (remaining) {
				remaining.style.fontWeight = '500';
				remaining.style.textShadow = '0 0 1.5px red, 0 0 1.5px red, 0 0 1.5px red, 0 0 1.5px red';
				remaining.style.background = 'darkred';
				setError(true);
			}
		}

		if (remaining) {
			remaining.innerText = `${sizeLimit - length} characters remaining`;
		}
	};

	const handleBeforeAddUndo = (evt: any, editor: TinyMCEEditor) => {
		const length = editor.getContent({ format: 'text' }).length;
		const statusBar = editor.getContainer().children[1].getElementsByClassName('tox-statusbar__text-container');
		const remaining = statusBar.item(0)!.getElementsByClassName('remaining-characters').item(0) as HTMLElement;

		// note that this is the opposite test as in handleUpdate
		// because we are determining when to deny adding an undo level
		if (length > sizeLimit) {
			evt.preventDefault();
			if (remaining) {
				remaining.style.fontWeight = '500';
				remaining.style.textShadow = '0 0 1.5px red, 0 0 1.5px red, 0 0 1.5px red, 0 0 1.5px red';
				remaining.style.background = 'darkred';
				setError(true);
			}
		}

		if (remaining) {
			remaining.innerText = `${sizeLimit - length} characters remaining`;
		}
	};

	return { handleInit, handleUpdate, handleBeforeAddUndo, length, sizeLimit, error };
};
