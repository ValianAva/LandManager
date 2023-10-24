/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { ArrayHelper } from 'Common/Helpers';
import MaterialTable from '@material-table/core';

import { Chip, PropTypes, Fab, Tooltip } from '@material-ui/core';
import { useUsersEndpoint } from 'SSO/Endpoints';
import { UserSummary, AppAccessDisplay } from 'SSO/Models/UserModels';
import { useNameof } from 'Common/Helpers/ReactHelper';
import { Link } from 'react-router-dom';
import { TableIcons, TableFilters } from 'Common/Tables';
import { DeleteConfirmation } from 'Common/Modals';
import TrashIcon from '@material-ui/icons/Delete';
import { useColors } from 'SSO/Common/Styles/Colors';
import AddIcon from '@material-ui/icons/Add';
import { useAppState } from 'Common/Context/AppProvider';
import { TableStyles } from 'Common/Tables';
import ToggleOn from '@material-ui/icons/ToggleOn';
import ToggleOff from '@material-ui/icons/ToggleOff';
import { ExportCsv } from '@material-table/exporters';
import { usePageTitle } from 'Common/Hooks/Pages';

const AccessChip = (props: { appAccess: AppAccessDisplay }) => {
	let variant = 'default' as Exclude<PropTypes.Color, 'inherit'>;
	switch (props.appAccess.accessLevel) {
		case 'Write':
			variant = 'primary';
			break;
		case 'ReadOnly':
			variant = 'secondary';
			break;
		default:
			break;
	}

	return (
		<Tooltip title={`Access Level: ${props.appAccess.accessLevel}`}>
			<Chip color={variant} size="small" label={props.appAccess.application} style={{ margin: 2 }} />
		</Tooltip>
	);
};

export const Users = () => {
	usePageTitle('Users');
	const colors = useColors();
	const ep = useUsersEndpoint();
	const [users, setUsers] = useState<UserSummary[]>([]);
	const nameof = useNameof<UserSummary>();
	const [idToDelete, setIdToDelete] = useState('');
	const state = useAppState();
	const [isAdvanced, setIsAdvanced] = useState(false);

	useEffect(() => {
		ep.GetUsers().then(r => setUsers(r));
	}, []);

	const handleDeleteSuccess = () => {
		setUsers(users.filter(u => u.id !== idToDelete));
		setIdToDelete('');
	};

	return (
		<React.Fragment>
			<MaterialTable
				style={{ marginBottom: 75 }} // make enough room for the fab to be below pagination controls
				columns={[
					{
						title: 'Name',
						field: nameof('name'),
						render: rowData =>
							rowData.id !== state.CurrentUser?.guid ? (
								<Link to={'/users/' + rowData.id}>{rowData.name}</Link>
							) : (
								rowData.name
							),
						customFilterAndSearch: (term, rowData) => TableFilters.FilterText(term, rowData.name),
					},
					{ title: 'Username', field: nameof('userName') },
					{
						title: 'Service',
						field: nameof('serviceName'),
						lookup: ArrayHelper.toObject<UserSummary>(users, 'serviceName'),
					},
					{
						title: 'Role',
						field: nameof('roleName'),
						lookup: ArrayHelper.toObject<UserSummary>(users, 'roleName'),
					},
					{
						title: 'Has Admin Access',
						field: nameof('hasAdminAccess'),
						render: rowData => (rowData.hasAdminAccess ? 'Yes' : 'No'),
					},
					{
						title: 'Installation(s)',
						field: nameof('installations'),
						render: rowData => rowData.installations.map(i => i.name).join(', '),
						customFilterAndSearch: (term, rowData) =>
							TableFilters.FilterText(term, rowData.installations.map(i => i.name).join(', ')),
						exportTransformer: rowData => rowData.installations.map(i => i.name).join(', '),
					},
					{
						title: 'Partner(s)',
						field: nameof('partners'),
						render: rowData => rowData.partners.map(i => i.name).join(', '),
						customFilterAndSearch: (term, rowData) =>
							TableFilters.FilterText(term, rowData.partners.map(i => i.name).join(', ')),
						exportTransformer: rowData => rowData.partners.map(p => p.name).join(', '),
					},
					{
						title: 'Last Login',
						field: nameof('lastLogin'),
						hidden: true,
						export: true,
						render: rowData => rowData.lastLogin,
					},
					{
						title: 'Application Access',
						field: nameof('applicationAccess'),
						render: rowData =>
							rowData.applicationAccess.map(a => {
								return <AccessChip key={a.application} appAccess={a} />;
							}),
						cellStyle: TableStyles.noWrap,
						exportTransformer: rowData =>
							rowData.applicationAccess.map(a => `${a.application}|${a.accessLevel}`).join(', '),
					},
				]}
				data={users}
				title="Users"
				icons={TableIcons}
				options={{
					pageSize: 10,
					headerStyle: TableStyles.headerStyle,
					rowStyle: TableStyles.rowStyle,
					actionsColumnIndex: -1,
					filtering: isAdvanced,
					search: !isAdvanced,
					exportAllData: true,
					exportMenu: [
						{
							label: 'Export CSV',
							exportFunc: (columns, currentPageData, tableData) =>
								ExportCsv(columns, tableData.searchedData, 'Users'),
						},
					],
				}}
				actions={[
					{
						icon: () => <TrashIcon className={colors.error} />,
						tooltip: 'Delete',
						onClick: (event, rowData: UserSummary) => setIdToDelete(rowData.id),
					},
					{
						icon: () => (isAdvanced ? <ToggleOn /> : <ToggleOff />),
						tooltip: 'Toggle Advanced Search',
						isFreeAction: true,
						onClick: () => setIsAdvanced(!isAdvanced),
					},
				]}
				isLoading={ep.IsLoading}
			/>

			<Link to="/users/add">
				<Fab aria-label="add">
					<AddIcon /> Add User
				</Fab>
			</Link>

			<DeleteConfirmation
				label="User"
				isOpen={idToDelete !== ''}
				onCancel={() => setIdToDelete('')}
				onConfirm={() => ep.DeleteUser(idToDelete).then(r => r && handleDeleteSuccess())}
			/>
		</React.Fragment>
	);
};
