import { makeStyles } from '@material-ui/core/styles';

export const useCardStyles = makeStyles(theme => ({
	card: {
		marginTop: 20,
		marginBottom: 25,
		overflow: 'visible',
	},
	cardContent: {
		position: 'relative',
		overflowX: 'auto',
		width: '100%',
	},
	title: {
		background: 'linear-gradient(60deg, #687350, #50583e)',
		borderRadius: 5,
		boxShadow: '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(0, 0, 0,.4)',
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: 14,
		marginTop: -35,
		padding: 10,
		'& h2, h2&': {
			color: 'white',
		},
	},
}));
