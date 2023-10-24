declare module 'settings' {
	type Settings = import('settings-base').Settings;

	export interface SSOSettings extends Settings {}

	const settings: SSOSettings;

	export default settings;
}
