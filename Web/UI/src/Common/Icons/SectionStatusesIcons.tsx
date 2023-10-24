import React from 'react';
import Check from '@material-ui/icons/Check';
import Edit from '@material-ui/icons/Edit';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import LoopIcon from '@material-ui/icons/Loop';
import { makeStyles } from '@material-ui/core/styles';
import { SectionStatusNames } from 'Common/Models/SectionStatusModels';

const useStyles = makeStyles(theme => ({
	notStarted: {
		color: theme.palette.error.main,
	},
	incomplete: {
		color: theme.palette.warning.main,
	},
	complete: {
		color: theme.palette.success.main,
	},
}));

export const NeedsReviewIcon = () => {
	const classes = useStyles();
	return <ErrorOutlineIcon className={classes.notStarted} />;
};

export const UnderDevelopmentIcon = () => {
	const classes = useStyles();
	return <Edit className={classes.incomplete} />;
};

export const CompleteIcon = () => {
	const classes = useStyles();
	return <Check className={classes.complete} />;
};

export interface IRereviewIconProps {
	isComplete: boolean;
}
export const ReReviewIcon = (props: IRereviewIconProps) => {
	const classes = useStyles();
	return <LoopIcon className={props.isComplete ? classes.complete : classes.incomplete} />;
};

export const SectionStatusIcon = (props: { status: SectionStatusNames }) => {
	switch (props.status) {
		case 'Needs Review':
			return <NeedsReviewIcon />;
			break;
		case 'Under Development':
			return <UnderDevelopmentIcon />;
			break;
		case 'Complete':
			return <CompleteIcon />;
			break;
		case 'Re-Review Requested':
			return <ReReviewIcon isComplete={false} />;
			break;
		case 'Complete/Re-Review':
			return <ReReviewIcon isComplete={true} />;
			break;
		default:
			return null;
			break;
	}
};
