import { createTheme } from '@material-ui/core/styles';

export const overallTheme = (siteColor: string) =>
	createTheme({
		palette: {
			primary: {
				main: '#687350',
			},
			secondary: {
				main: '#F39C12',
			},
			background: {
				default: '#eaeaea',
			},
		},
		typography: {
			fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
			fontWeightRegular: 300,
		},
		props: {
			MuiTable: {
				size: 'small',
			},
			MuiList: {
				disablePadding: true,
			},
		},
		overrides: {
			MuiDrawer: {
				paper: {
					backgroundColor: '#222D32',
					color: '#8aa4af',
				},
				paperAnchorDockedLeft: {
					height: '100vh',
				},
			},
			MuiDivider: {
				root: {
					backgroundColor: '#394C54',
				},
			},
			MuiListItemIcon: {
				root: {
					color: '#8aa4af',
				},
			},
			MuiTypography: {
				h5: {
					marginTop: 0,
					marginBottom: 0,
				},
				body1: {
					fontSize: 14,
				},
			},
			MuiAppBar: {
				colorPrimary: {
					backgroundColor: siteColor,
				},
			},
			MuiAlert: {
				standardWarning: {
					backgroundColor: 'rgb(246, 212, 166)',
				},
				standardInfo: {
					backgroundColor: 'rgb(178, 211, 236)',
				},
				standardError: {
					backgroundColor: 'rgb(244, 183, 176)',
				},
			},
			MuiFilledInput: {
				root: {
					backgroundColor: 'rgba(0, 0, 0, 0.01)',
				},
				input: {
					padding: 4,
				},
				underline: {
					'&:before': {
						borderBottom: '1px solid rgba(0, 0, 0, .05)',
					},
				},
			},
		},
	});

export const darkTheme = (siteColor: string) =>
	createTheme({
		...overallTheme(siteColor),
		palette: {
			type: 'dark',
			primary: {
				main: '#687350',
			},
			secondary: {
				main: '#F39C12',
			},
		},
		overrides: {
			...overallTheme(siteColor).overrides,
			MuiAlert: {
				standardWarning: {
					backgroundColor: 'rgb(132, 95, 44)',
				},
				standardInfo: {
					backgroundColor: 'rgb(26, 86, 132)',
				},
				standardError: {
					backgroundColor: 'rgb(136, 39, 27)',
				},
			},
		},
	});

export const contentTheme = {
	props: {
		MuiFab: {
			variant: 'extended',
			color: 'primary',
		},
		MuiButton: {
			variant: 'contained',
			color: 'primary',
		},
		MuiButtonGroup: {
			variant: 'contained',
			color: 'primary',
		},
	},
	overrides: {
		MuiDivider: {
			root: {
				marginTop: 4,
				marginBottom: 4,
			},
		},
		MuiStepper: {
			root: {
				padding: 12,
			},
		},
		MuiPaper: {
			elevation1: {
				padding: 8,
				margin: 8,
				boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
			},
			elevation2: {
				padding: 8,
				margin: 8,
				boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.14)',
			},
		},
		MuiExpansionPanel: {
			root: {
				marginLeft: 0,
			},
		},
		MuiTypography: {
			body2: {
				fontSize: 15,
			},
			h6: {
				fontSize: 16,
			},
		},
		MuiExpansionPanelSummary: {
			root: {
				'&$expanded': {
					borderBottom: '1px solid rgba(0, 0, 0, .125)',
				},
				minHeight: 24,
			},
			content: {
				margin: 0,
			},
			expandIcon: {
				paddingTop: 0,
				paddingBottom: 0,
			},
		},
		MuiFormControl: {
			root: {
				marginTop: 4,
				marginBottom: 4,
				minWidth: 200,
			},
		},
		MuiAutocomplete: {
			popupIndicator: {
				marginRight: 0,
			},
		},
		MuiSelect: {
			nativeInput: {
				padding: 0,
				border: 0,
			},
		},
		MuiFormLabel: {
			root: {
				color: '#43a047',
			},
		},
		MuiListItemText: {
			root: {
				marginBottom: 0,
			},
		},
		MuiMenuItem: {
			root: {
				minHeight: 20,
				fontSize: '.9rem',
			},
		},
		MuiTooltip: {
			tooltip: {
				fontSize: 14,
			},
		},
		MuiTableRow: {
			root: {
				'&:nth-child(odd)': {
					backgroundColor: 'rgba(0,0,0,0.03)',
				},
				'&:empty': {
					display: 'none',
				},
			},
			footer: {
				backgroundColor: 'rgba(0, 0, 0, 0)!important', // so table striping is ignored
			},
			head: {
				backgroundColor: 'rgba(0, 0, 0, 0)!important', // so table striping is ignored
			},
		},
		MuiTableCell: {
			root: {
				padding: 12,
			},
			head: {
				color: '#43a047',
				fontSize: 15,
				fontWeight: 300,
			},
			body: {
				whiteSpace: 'nowrap',
				'& p': {
					margin: 0,
				},
			},
			footer: {
				color: '#43a047',
				fontSize: 15,
				fontWeight: 300,
			},
			sizeSmall: {
				paddingTop: 8,
				paddingBottom: 8,
			},
		},
		MuiCardActions: {
			root: {
				paddingTop: 12,
				paddingBottom: 16,
			},
		},
		MuiAccordion: {
			root: {
				paddingTop: 0,
				paddingBottom: 0,
			},
		},
		MuiTreeItem: {
			root: {
				'&$selected > $content $label': {
					backgroundColor: 'transparent !important',
					// finally added the important since I guess specificity overrides were favoring Mui defaults
				},
			},
		},
		MuiChip: {
			label: {
				userSelect: 'auto',
			},
			colorPrimary: {
				backgroundColor: '#81935a',
			},
		},
	},
};
