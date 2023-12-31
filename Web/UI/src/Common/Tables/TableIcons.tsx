import * as React from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

export const TableIcons = {
	Add: React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
		<AddBox style={{ color: '#4caf50' }} {...props} ref={ref} />
	)),
	Check: React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
		<Check style={{ color: '#4caf50' }} {...props} ref={ref} />
	)),
	Clear: React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
		<Clear style={{ color: '#f44336' }} {...props} ref={ref} />
	)),
	Delete: React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
	Edit: React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
		<Edit style={{ color: '#ed6c02' }} {...props} ref={ref} />
	)),
	Export: React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => <SaveAlt {...props} ref={ref} />),
	Filter: React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => <FilterList {...props} ref={ref} />),
	FirstPage: React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => <FirstPage {...props} ref={ref} />),
	LastPage: React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => <LastPage {...props} ref={ref} />),
	NextPage: React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ChevronLeft {...props} ref={ref} />),
	ResetSearch: React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
	Search: React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Search {...props} ref={ref} />),
	SortArrow: React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ArrowUpward {...props} ref={ref} />),
	ThirdStateCheck: React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Remove {...props} ref={ref} />),
	ViewColumn: React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ViewColumn {...props} ref={ref} />),
};
