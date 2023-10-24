import { SectionStatuses } from 'Common/Models/SectionStatusModels';

export const IsComplete = (status: SectionStatuses) => {
	return (status & SectionStatuses.Complete) === SectionStatuses.Complete;
};

export const IsCompleteString = (status: string) => {
	return ['Complete', 'Complete/Re-Review'].includes(status);
};

export const IsReReview = (status: SectionStatuses) => {
	return (status & SectionStatuses.ReReview) === SectionStatuses.ReReview;
};
