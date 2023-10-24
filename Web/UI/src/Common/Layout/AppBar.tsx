import React from 'react';
import { makeStyles } from '@material-ui/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import LightIcon from '@material-ui/icons/Brightness7';
import DarkIcon from '@material-ui/icons/Brightness4';
import { Theme, Button, AppBar as MuiAppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core';
import { useAppState, useAppDispatch } from 'Common/Context/AppProvider';
import settings from 'settings';
import { Skeleton } from '@material-ui/lab';
import { CuiWarning } from 'Common/Layout';

const useStyles = makeStyles((theme: Theme) => ({
	barContainer: {
		zIndex: theme.zIndex.drawer + 1,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}));

export const AppBar: React.FC = props => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<Element>();

	const isMenuOpen = Boolean(anchorEl);

	const state = useAppState();
	const dispatch = useAppDispatch();

	function handleMenuOpen(event: React.MouseEvent<HTMLElement>) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(undefined);
	}

	return (
		<div className={classes.barContainer}>
			<MuiAppBar position="fixed">
				<CuiWarning />
				<Toolbar variant="dense">
					<IconButton
						onClick={() => {
							dispatch({ type: 'APP/SET_MENU_EXPANDED', payload: !state.MenuExpanded });
							dispatch({ type: 'APP/SET_MENU_OPEN', payload: true });
						}}
						className={classes.menuButton}
						color="inherit"
						aria-label="Open drawer"
					>
						<MenuIcon />
					</IconButton>

					<Typography variant="h6" color="inherit" noWrap={true}>
						{settings.siteName}
					</Typography>

					{props.children}

					<div className={classes.grow} />
					{state.LoginStatus !== 'Logged In' ? (
						<Skeleton variant="circle" width={40} height={40} />
					) : (
						<React.Fragment>
							<div className={classes.sectionDesktop}>
								{state.Theme === 'light' ? (
									<IconButton
										onClick={() => dispatch({ type: 'APP/SET_THEME', payload: 'dark' })}
										color="inherit"
										size="small"
										className={classes.menuButton}
									>
										<DarkIcon />
									</IconButton>
								) : (
									<IconButton
										onClick={() => dispatch({ type: 'APP/SET_THEME', payload: 'light' })}
										color="inherit"
										size="small"
										className={classes.menuButton}
									>
										<LightIcon />
									</IconButton>
								)}

								<div className="profile-menu">
									<Button
										aria-owns={isMenuOpen ? 'material-appbar' : undefined}
										aria-haspopup="true"
										onClick={handleMenuOpen}
										color="inherit"
										startIcon={<AccountCircle />}
									>
										{state.CurrentUser?.name}
									</Button>
								</div>
							</div>
							<div className={classes.sectionMobile}>
								<IconButton aria-haspopup="true" onClick={handleMenuOpen} color="inherit">
									<MoreIcon />
								</IconButton>
							</div>
						</React.Fragment>
					)}
				</Toolbar>
			</MuiAppBar>
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={isMenuOpen}
				onClose={handleMenuClose}
			>
				<MenuItem onClick={handleMenuClose}>
					<a href={`${settings.appLinks.sso}/profile`} target="_blank">
						Profile
					</a>
				</MenuItem>
				{state.Theme === 'light' ? (
					<MenuItem onClick={() => dispatch({ type: 'APP/SET_THEME', payload: 'dark' })}>Dark Mode</MenuItem>
				) : (
					<MenuItem onClick={() => dispatch({ type: 'APP/SET_THEME', payload: 'light' })}>
						Light Mode
					</MenuItem>
				)}

				<MenuItem onClick={() => dispatch({ type: 'APP/USER_LOGGED_OUT' })}>Sign Out</MenuItem>
			</Menu>
		</div>
	);
};
