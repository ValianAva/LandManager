import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { CSSProperties } from 'react';

export const headerStyle = {
	whiteSpace: 'nowrap',
} as CSSProperties;

export const denseStyle = {
	paddingTop: 10,
	paddingBottom: 10,
} as CSSProperties;

export const rowStyle = {
	paddingTop: 4,
	paddingBottom: 4,
} as CSSProperties;

export const dragRowStyle = {
	cursor: 'grab',
} as CSSProperties;

export const noWrap = {
	whiteSpace: 'nowrap',
} as CSSProperties;

export const useTableStyles = makeStyles((theme: Theme) => ({
	separateTable: {
		marginTop: 16,
		borderTop: '1px solid ' + (theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700]),
	},
	cardTable: {
		display: 'table',
		width: '100%',
		overflow: 'auto',
	},
	wrapCell: {
		whiteSpace: 'normal',
		wordWrap: 'break-word',
	},
	helperText: {
		color: '#f44336',
		fontSize: '12px',
	},
	actionIconsContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	actionIcon: {
		cursor: 'pointer',
		fontSize: '21px',
		marginRight: theme.spacing(1),
	},

	description: {
		maxWidth: 450,
		whiteSpace: 'normal',
	},
	// https://codepen.io/dbushell/pen/wGaamR for DES table
	transpose: {
		display: 'flex !important',
		overflow: 'hidden',
		background: 'none',
		'& table': { borderCollapse: 0 },
		'& thead': {
			display: 'flex',
			flexShrink: '0',
			minWidth: 'min-content',
		},
		'& thead th': {
			minHeight: 57,
		},
		'& tbody': {
			display: 'flex',
			position: 'relative',
			overflowX: 'auto',
			overflowY: 'hidden',
		},
		'& tbody td': {
			padding: '7.8px !important',
		},
		'& tr': {
			display: 'flex',
			flexDirection: 'column',
			minWidth: 'min-content',
			flexShrink: 0,
		},
		'& td, & th': {
			display: 'block',
		},
		'& foot th, td': {
			minHeight: 57,
		},
	},
	// styles for priority area table "striping"
	topRow: {
		background: '#696969!important',
		color: '#ffffff !important',
	},
	grouping: {
		background: `${theme.palette.type === 'light' ? '#e8e8e8' : '#4e4e4e'} !important`,
		border: 0,
	},
}));
