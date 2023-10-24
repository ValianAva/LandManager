import { ListItem, ListItemIcon, ListItemText, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { useAppDispatch, useAppState } from 'Common/Context/AppProvider';

export interface INavLinkProps {
	to: string;
	text: string;
	icon: React.ReactNode;
	nested?: boolean;
	onClick?: () => void;
}

export const useStyles = makeStyles((theme: Theme) => ({
	pageLinks: {
		textDecoration: 'none',
	},
	navItem: {
		margin: '4px',
		borderRadius: '3px',
		width: 'auto',
		'&:hover': {
			backgroundColor: 'rgba(255,255,255,0.23)',
		},
	},
	nestedNavItem: {
		paddingLeft: theme.spacing(4),
		'&:hover': {
			backgroundColor: 'rgba(255,255,255,0.23)',
		},
	},
	nestedIcon: {
		marginRight: 6,
	},
}));

export const NavLink = (props: INavLinkProps) => {
	const classes = useStyles();
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
	const state = useAppState();
	const dispatch = useAppDispatch();

	// if to starts with a protocol, make it a regular old a tag
	// if it ends with known file extensions, make it a link
	if (/^((http|https|ftp|mailto):)/.test(props.to) || /.(pdf|doc|docx|xls|xlsx|ppt|pptx|jpg)$/.test(props.to)) {
		return (
			<a
				href={props.to}
				target="_blank"
				className={classes.pageLinks}
				onClick={() => dispatch({ type: 'APP/SET_MENU_OPEN', payload: false })}
			>
				<ListItem button={true} className={props.nested ? classes.nestedNavItem : classes.navItem}>
					<ListItemIcon>{props.icon}</ListItemIcon>
					{(state.MenuExpanded || (state.MenuOpen && isMobile)) && <ListItemText primary={props.text} />}
				</ListItem>
			</a>
		);
	}

	return (
		<Link
			to={props.to}
			className={classes.pageLinks}
			onClick={() => dispatch({ type: 'APP/SET_MENU_OPEN', payload: false })}
		>
			<ListItem button={true} className={props.nested ? classes.nestedNavItem : classes.navItem}>
				<ListItemIcon>{props.icon}</ListItemIcon>
				{(state.MenuExpanded || (state.MenuOpen && isMobile)) && <ListItemText primary={props.text} />}
			</ListItem>
		</Link>
	);
};
