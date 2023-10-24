/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { getIn, FieldProps } from 'formik';
import { Editor } from '@tinymce/tinymce-react';

import settings from 'settings';
import { FormHelperText } from '@material-ui/core';
import { useAppState } from 'Common/Context/AppProvider';
import { useTinyMCE } from 'Common/Helpers/ReactHelper';
import { debounce } from 'debounce';

export interface RichTextEditorProps extends FieldProps {
	height?: number;
	disabled?: boolean;
	limit?: number;
}

/** A rich-text editor component meant to be used in a Formik form, that exposes an onChange event */
export const RichTextEditor = (props: RichTextEditorProps) => {
	const { field, form } = props;
	const { name } = field;
	const { touched, errors, isSubmitting } = form;
	const currentError: string = getIn(errors, name);

	const showError: boolean = getIn(touched, name) && !!currentError;
	const state = useAppState();
	const { handleInit, handleUpdate, handleBeforeAddUndo } = useTinyMCE(props.limit);

	// have to call it out here so it will switch on the fly when the light or dark button is used
	const frame = document.getElementById(`${name}_ifr`) as HTMLIFrameElement;
	const lightSwitch = (iFrame: HTMLIFrameElement, iTheme: string) => {
		if (iFrame) {
			const body = iFrame.contentDocument && iFrame.contentDocument.body;
			if (body) {
				body.style.color = iTheme === 'light' ? 'black' : 'white';
			}
		}
	};

	lightSwitch(frame, state.Theme);

	return (
		<>
			<Editor
				id={name}
				apiKey={settings.tinyApiKey}
				onInit={handleInit}
				value={field.value}
				disabled={isSubmitting || props.disabled === true}
				inline={false}
				init={{
					height: props.height || 300,
					skin_url:
						state.Theme === 'light'
							? '../../Assets/skins/ui/AppSkinLight'
							: '../../Assets/skins/ui/AppSkinDark',
					skin: false,
					statusbar: true,
					menubar: false,
					placeholder: 'Type here to enter descripton...',
					plugins: ['help', 'link', 'lists'],
					toolbar:
						'undo redo | bold italic underline | forecolor backcolor removeformat | numlist bullist | link unlink',
					contextmenu: false,
					invalid_elements: 'script',
				}}
				onEditorChange={e => form.setFieldValue(name, e)}
				onKeyDown={debounce(handleUpdate, 750)}
				onBeforeAddUndo={handleBeforeAddUndo}
				onLoadContent={() => {
					// have to call it here so it will load properly
					const thisFrame = document.getElementById(`${name}_ifr`) as HTMLIFrameElement;
					lightSwitch(thisFrame, state.Theme);
				}}
			/>
			<FormHelperText error={showError}>{currentError}</FormHelperText>
		</>
	);
};
