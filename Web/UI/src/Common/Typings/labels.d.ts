declare module 'labels' {
	export type defaultLabel = import('labels-base').defaultLabel;
	export type multiLineLabel = import('labels-base').multiLineLabel;
	export type Labels = import('labels-base').Labels;

	const labels: Labels;
	export default labels;
}
