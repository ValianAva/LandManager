import { FormikConsumer } from 'formik';
import React from 'react';
import settings from 'settings';
import ReactJson from 'react-json-view';

export const FormDebugging = () => {
	if (!settings.debugForms) {
		return null;
	}

	return (
		<FormikConsumer>
			{formik => (
				<ReactJson
					collapsed={1}
					theme={'monokai'}
					style={{ maxHeight: 500, overflow: 'scroll' }}
					enableClipboard={false}
					displayDataTypes={false}
					src={formik}
				/>
			)}
		</FormikConsumer>
	);
};
