import { Button, ButtonGroup, ClickAwayListener, MenuItem, MenuList, Popper, Grow, Paper } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export interface ISplitButtonProps {
	onClick: () => void;
	options: number[];
	onOptionClick: (value: number) => void;
}

export const SplitButton: React.FC<ISplitButtonProps> = props => {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLDivElement>(null);

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen);
	};

	const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setOpen(false);
	};

	return (
		<>
			<ButtonGroup aria-label="split button">
				<Button onClick={props.onClick} style={{ marginLeft: 8 }}>
					{props.children}
				</Button>

				<Button color="primary" size="small" aria-haspopup="menu" onClick={handleToggle}>
					<div ref={anchorRef}>
						<ArrowDropDownIcon />
					</div>
				</Button>
			</ButtonGroup>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition={true}
				disablePortal={true}
				style={{ zIndex: 100 }}
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList id="split-button-menu">
									{props.options.map(option => (
										<MenuItem key={option} onClick={() => props.onOptionClick(option)}>
											{option}
										</MenuItem>
									))}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
};
