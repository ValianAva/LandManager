import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DragIcon from '@material-ui/icons/DragIndicator';
import CloseIcon from '@material-ui/icons/Close';
import { MinimizeIcon } from 'Common/Icons';

interface IDraggableWindow {
	boundsSelector?: string;
	heading: JSX.Element | string;
	subheading?: JSX.Element | string;
	controls?: JSX.Element;
	onClose?: React.Dispatch<React.SetStateAction<boolean>>;
	defaultX?: number;
	// used for minor adjustments on windows that don't change with the size of the inputs and fore edit DES tables because they are still janky
	defaultY?: number;
	width?: number;
	height?: number;
	// used for the evaluation windows and DES table maps so we can calculate where to open them
	windowAnchorId?: string;
}

export const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		zIndex: 1300,
		boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.14)',
	},
	box: {
		backgroundColor: theme.palette.background.paper,
		borderRadius: theme.shape.borderRadius,
		borderBottom: `1px solid ${theme.palette.grey[400]}`,
		borderLeft: `1px solid ${theme.palette.grey[400]}`,
		borderRight: `1px solid ${theme.palette.grey[400]}`,
		borderTop: `4px solid ${theme.palette.primary.main}`,
		padding: theme.spacing(2),
		position: 'absolute',
	},
	header: {
		borderBottom: `1px solid ${theme.palette.grey[300]}`,
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: theme.spacing(2),
		paddingBottom: theme.spacing(1),
	},
	headerTextContainer: {
		display: 'flex',
	},
	headline: { fontWeight: 500 },
	subheading: {
		fontSize: '12px',
		marginLeft: '8px',
		position: 'relative',
		top: '6px',
	},
	actions: { alignItems: 'center', display: 'flex' },
	dragIcon: {
		cursor: 'move',
		margin: `0 ${theme.spacing(0.5)}`,
	},
	closeIcon: {
		cursor: 'pointer',
	},
	bodyTextContainer: {
		overflowY: 'auto',
	},
	bodyText: {
		fontSize: '14px',
	},
}));

export const DraggableWindow: React.FC<IDraggableWindow> = props => {
	const classes = useStyles();
	const [isMinimized, setIsMinimized] = useState(false);
	let iconButton: DOMRect | undefined;
	let offSet: number | undefined;
	if (props.windowAnchorId) {
		iconButton = document.getElementById(`${props.windowAnchorId}`)?.getBoundingClientRect();
		offSet = document.getElementById(`${props.windowAnchorId}`)?.offsetTop;
	}

	function handleMinimize() {
		setIsMinimized(!isMinimized);
	}

	return (
		<Draggable
			handle=".handle"
			bounds={props.boundsSelector || '#app'}
			defaultPosition={{
				x: props.defaultX || 0,
				y: props.defaultY || (iconButton && offSet && iconButton.y - offSet) || 0,
			}}
			defaultClassName={classes.root}
		>
			<div className={classes.box} style={{ width: props.width || 600 }}>
				<div className={classes.header}>
					<div className={classes.headerTextContainer}>
						<Typography variant="subtitle1" className={classes.headline}>
							{props.heading}
						</Typography>
						<Typography variant="subtitle2" color="textSecondary" className={classes.subheading}>
							{props.subheading}
						</Typography>
					</div>
					<div className={classes.actions}>
						{props.controls}
						<DragIcon className={`handle ${classes.dragIcon}`} />
						<MinimizeIcon onClick={handleMinimize} isMinimized={isMinimized} />
						{props.onClose && (
							<CloseIcon
								className={classes.closeIcon}
								onClick={() => props.onClose && props.onClose(false)}
							/>
						)}
					</div>
				</div>
				<div className={classes.bodyTextContainer} style={{ height: isMinimized ? 0 : props.height || 'auto' }}>
					{props.children}
				</div>
			</div>
		</Draggable>
	);
};
