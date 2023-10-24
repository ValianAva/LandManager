import { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export interface IHistoryTrackerProps {
	onChange: () => void;
}

/** Tracks router history and sends an event when history changes */
export const HistoryTracker = (props: IHistoryTrackerProps & RouteComponentProps) => {
	// https://stackoverflow.com/a/57356519
	useEffect(
		() =>
			props.history.listen(() => {
				props.onChange();
			}),
		[]
	);

	return null;
};

export default withRouter(HistoryTracker);
