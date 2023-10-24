/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { getIn, FieldProps } from 'formik';
import { Editor } from '@tinymce/tinymce-react';
import settings from 'settings';
import { useAppState } from 'Common/Context/AppProvider';
import { FormHelperText } from '@material-ui/core';
import { useTinyMCE } from 'Common/Helpers/ReactHelper';
import { debounce } from 'debounce';

export interface RichTextEditorTablesProps extends FieldProps {
	height?: number;
	disabled?: boolean;
	limit?: number;
}

/** A rich-text editor component meant to be used in a Formik form, that exposes an onChange event */
export const RichTextEditorTables = (props: RichTextEditorTablesProps) => {
	const { field, form } = props;
	const { name } = field;
	const { touched, errors, isSubmitting } = form;
	const currentError: string = getIn(errors, name);

	const showError: boolean = getIn(touched, name) && !!currentError;
	const state = useAppState();
	const [theme, setTheme] = useState(state.Theme);
	const { handleInit, handleUpdate, handleBeforeAddUndo } = useTinyMCE(props.limit);

	useEffect(() => {
		setTheme(state.Theme);
	}, [state.Theme]);

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

	lightSwitch(frame, theme);
	return (
		<>
			<Editor
				id={name}
				apiKey={settings.tinyApiKey}
				onInit={handleInit}
				value={field.value}
				disabled={isSubmitting}
				init={{
					height: 200,
					width: 400,
					skin_url: '../../Assets/skins/ui/AppSkin',
					statusbar: true,
					menubar: false,
					placeholder: 'Type here to enter descripton...',
					plugins: ['help', 'link', 'lists'],
					toolbar: 'undo redo | formatgroup | numlist bullist | link unlink',
					toolbar_groups: {
						formatgroup: {
							icon: 'format',
							tooltip: 'Formatting',
							items: 'bold italic underline | forecolor backcolor removeformat',
						},
					},
					contextmenu: false,
					invalid_elements: 'script',
				}}
				onEditorChange={e => {
					form.setFieldValue(field.name, e);
				}}
				onKeyDown={debounce(handleUpdate, 750)}
				onBlur={() => {
					form.setFieldTouched(field.name, true);
				}}
				onBeforeAddUndo={handleBeforeAddUndo}
				onLoadContent={() => {
					// have to call it here so it will load properly
					const thisFrame = document.getElementById(`${name}_ifr`) as HTMLIFrameElement;
					lightSwitch(thisFrame, theme);
				}}
			/>
			<FormHelperText error={showError}>{currentError}</FormHelperText>
		</>
	);
};
