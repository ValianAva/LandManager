import { Collapse, List, ListItem, ListItemIcon, ListItemText, Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { makeStyles } from '@material-ui/styles';
import { useAppState } from 'Common/Context/AppProvider';

export interface INavCollapseProps {
	onClick: (section: number) => void;
	text: string;
	section: number;
	icon: React.ReactNode;
	openSection: number;
}

export const useStyles = makeStyles(() => ({
	listItem: {
		paddingTop: 10,
		paddingBottom: 10,
		'&:hover': {
			backgroundColor: 'rgba(255,255,255,0.23)',
		},
	},
}));

export const NavCollapse: React.FC<INavCollapseProps> = props => {
	const classes = useStyles();
	const state = useAppState();
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

	return (
		<List disablePadding={true}>
			<ListItem button={true} className={classes.listItem} onClick={() => props.onClick(props.section)}>
				<ListItemIcon>{props.icon}</ListItemIcon>
				{(state.MenuExpanded || (state.MenuOpen && isMobile)) && <ListItemText primary={props.text} />}
				{props.openSection === props.section ? <ArrowDownIcon /> : <ArrowRightIcon />}
			</ListItem>

			<Collapse in={props.openSection === props.section} timeout="auto" unmountOnExit={true}>
				{props.children}
			</Collapse>
		</List>
	);
};
