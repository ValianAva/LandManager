import React, { useEffect, useRef, useState } from 'react';
import { CheckBoxOutlineBlank as EmptyCheckboxIcon, CheckBox as CheckedCheckboxIcon } from '@material-ui/icons';
import { Button } from '@material-ui/core';

export interface ICheckboxButtonProps {
	isChecked: boolean;
	onChange: (isChecked: boolean) => void;
}

export const CheckboxButton: React.FC<ICheckboxButtonProps> = props => {
	const isMounted = useRef(false);
	const [isChecked, setIsChecked] = useState<boolean>(props.isChecked);

	const handleClick = () => {
		// just negate isChecked so we're not dealing with async stuff with the useState
		props.onChange(!isChecked);
		setIsChecked(!isChecked);
	};

	useEffect(() => {
		if (isMounted.current) {
			setIsChecked(props.isChecked);
		}

		return () => {
			isMounted.current = true;
		};
	}, [props.isChecked]);

	return (
		<Button
			type="button"
			size="small"
			startIcon={isChecked ? <CheckedCheckboxIcon /> : <EmptyCheckboxIcon />}
			onClick={handleClick}
			fullWidth={false}
			color={isChecked ? 'primary' : 'default'}
			style={{ marginLeft: 6 }}
		>
			{props.children}
		</Button>
	);
};
