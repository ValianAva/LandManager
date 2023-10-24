declare module 'labels-base' {
	export interface defaultLabel {
		label: string;
		tooltip?: string;
	}
	export interface multiLineLabel {
		label: string[];
		tooltip?: string;
	}

	export interface shortLabel extends defaultLabel {
		short?: string;
	}

	export interface CommonLabels {
		installations: defaultLabel;
		services: defaultLabel;
	}

	export interface Labels {
		common: CommonLabels;
	}
}
