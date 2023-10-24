export class User {
	id = '';
	name = '';
	userName = '';
	applicationAccess: ApplicationAccess[] = []
}

export class ApplicationAccess {
	application = '';
	accessLevel = '';
}