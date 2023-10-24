import React from 'react';
import Filter from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';

export interface IFilterIconProps {
	isFiltering: boolean;
}

export const FilterIcon = (props: IFilterIconProps) => {
	return props.isFiltering ? <SearchIcon /> : <Filter />;
};
