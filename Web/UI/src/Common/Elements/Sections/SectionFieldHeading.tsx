import React from 'react';
import { Chip, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
	headingWrapper: {
		marginBottom: theme.spacing(1),
	},
	heading: {
		marginTop: 20,
		color: '#43a047',
		fontSize: '1.05rem',
		'& > strong': {
			fontWeight: 500,
		},
	},
}));

export const SectionFieldHeading: React.FC<{ chip?: string; chipTooltip?: string }> = props => {
	const classes = useStyles();

	const renderChipComponent = () => {
		if (!props.chip) {
			return undefined;
		}

		const chipComponent = (icon?: JSX.Element) => (
			<Chip label={props.chip} size="small" color="default" icon={icon} />
		);
		return props.chipTooltip ? (
			<Tooltip title={props.chipTooltip}>{chipComponent(<InfoIcon />)}</Tooltip>
		) : (
			chipComponent()
		);
	};

	return (
		<div className={classes.headingWrapper}>
			<Typography component="h1" variant="h5" className={classes.heading}>
				{props.children} {renderChipComponent()}
			</Typography>
		</div>
	);
};
