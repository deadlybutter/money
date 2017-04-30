import React from 'react';
import Chart from './Chart';
import toolbox from './toolbox';

const COLUMNS = 16;

// @see http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function shadeColor2(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

const StackedBarChart = ({ rulerWidth }) => {
  if (rulerWidth === 0) return null;
  const data = JSON.parse(JSON.stringify(window.data));

  const chartWidth = rulerWidth;
  const chartHeight = chartWidth / 4;

  const totalSpending = Math.abs(data.reduce((acc, val) => acc + parseInt(val.amount), 0));
  const groupAccumulated = data.reduce((acc, val) => {
    (acc[val.groupId] = acc[val.groupId] || { items: [] }).items.push(val);
    return acc;
  }, {});

  const groups = Object.keys(groupAccumulated).map(key => {
    const group = groupAccumulated[key];
    group.name = group.items[0].display;
    group.totalSpending = Math.abs(group.items.reduce((acc, val) => acc + parseInt(val.amount), 0));

    return group;
  })
  .filter(item => item.totalSpending >= 50)
  .sort((a, b) => b.totalSpending - a.totalSpending);

  const boxHeight = chartHeight * .75;
  const boxSpacing = chartWidth * .005;
  const actulChartWidth = chartWidth - (groups.length * boxSpacing);
  let runningX = 0;

  const boxes = groups.map((group, index) => {
    const relativeSpending = group.totalSpending / totalSpending;
    const width = relativeSpending * actulChartWidth;
    const color = shadeColor2(toolbox.colors.primary, relativeSpending)
    const x = runningX;
    runningX += width + boxSpacing;

    return (
      <g key={x}>
        <rect x={x} y={0} width={width} height={boxHeight} fill={color} />
        <text x={Math.min(chartWidth * .7, x)} y={boxHeight + 10}>{ group.name }</text>
      </g>
    );
  });

  return (
    <Chart height={chartHeight}>
      { boxes }
    </Chart>
  );
};

export default StackedBarChart;
