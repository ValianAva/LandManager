import React from 'react';
import { money } from 'Common/Helpers/TextHelper';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useChartStyles } from './ChartStyles';

export const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
	if (active && payload) {
		var yearlyTotal = 0;
		const classes = useChartStyles();

		return (
			<div className={classes.tooltip}>
				<div>{label}</div>
				{payload && (
					<ul className={classes.tooltipItemList}>
						{payload.map(item => {
							yearlyTotal = yearlyTotal + (item.value as number);
							return (
								<li key={item.dataKey as string} className={classes.tooltipItem}>
									<span className={classes.tooltipItemLabel} style={{ color: item.color }}>
										{item.name}
									</span>
									:{money(item.value as number)}
								</li>
							);
						})}
						<li key={yearlyTotal.toString()} className={classes.tooltipItem}>
							<span className={classes.tooltipItemLabel}>{'Total'}</span>: {money(yearlyTotal)}
						</li>
					</ul>
				)}
			</div>
		);
	}

	return null;
};
