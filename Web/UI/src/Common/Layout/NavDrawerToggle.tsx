import React from 'react';
import { Drawer, Hidden, IconButton, Theme, useMediaQuery } from '@material-ui/core';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/styles';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useAppDispatch, useAppState } from 'Common/Context/AppProvider';

interface INavDrawerToggle {
	backgroundImage: string;
}

const drawerWidth = 255;
const useStyles = (bgImg: string) =>
	makeStyles((theme: Theme) => ({
		appBarSpacer: {
			minHeight: 69,
		},
		toolbar: theme.mixins.toolbar,
		toolbarIconContainer: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			padding: '0 8px',
			...theme.mixins.toolbar,
		},
		toolbarIcon: {
			color: '#fff',
		},
		drawerPaper: {
			color: 'white',
			backgroundColor: 'rgba(0, 0, 0, .75)',
			backgroundImage: `url('${bgImg}')`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			boxShadow:
				'0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
			position: 'relative',
			whiteSpace: 'nowrap',
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerPaperClose: {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9),
			},
		},
	}));

export const NavDrawerToggle: React.FC<INavDrawerToggle> = props => {
	const classes = useStyles(props.backgroundImage)();
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
	const state = useAppState();
	const dispatch = useAppDispatch();

	return (
		<>
			<Hidden smDown={true}>
				<Drawer
					variant="permanent"
					anchor="left"
					ModalProps={{ onClose: () => dispatch({ type: 'APP/SET_MENU_EXPANDED', payload: false }) }}
					classes={{
						paper: classnames(
							'page-links',
							classes.drawerPaper,
							!state.MenuExpanded && classes.drawerPaperClose
						),
					}}
					open={true}
				>
					<div className={classes.toolbar} />
					{props.children}
				</Drawer>
			</Hidden>
			<Drawer
				variant="temporary"
				anchor="left"
				ModalProps={{ onClose: () => dispatch({ type: 'APP/SET_MENU_OPEN', payload: false }) }}
				classes={{
					paper: classes.drawerPaper,
				}}
				open={state.MenuOpen && isMobile}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={() => dispatch({ type: 'APP/SET_MENU_OPEN', payload: false })}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				{props.children}
			</Drawer>
		</>
	);
};
