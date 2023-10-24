declare module 'labels' {
	// only exists to make it seem like base label types are coming from this module
	// to make common components happy and ignorant to the location of the underlying .js file
	export type defaultLabel = import('labels-base').defaultLabel;
	export type multiLineLabel = import('labels-base').multiLineLabel;
	export type LabelsBase = import('labels-base').Labels;

	export interface Labels extends LabelsBase {}

	const label: Labels;
	export default label;
}
