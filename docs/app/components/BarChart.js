import React from 'react';
import Chart from './Chart';
import toolbox from './toolbox';

const BarChart = ({ rulerWidth }) => {
  if (rulerWidth === 0) return null;
  const data = JSON.parse(JSON.stringify(window.data));

  const chartWidth = rulerWidth;
  const chartHeight = chartWidth * .75;
  const chart = [];

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
  .filter(item => item.totalSpending >= 150)
  .sort((a, b) => b.totalSpending - a.totalSpending);

  const yAxis = chartHeight * .75;
  const xAxisStart = chartWidth * .1;
  const xAxisEnd = chartWidth * .9;

  const yIncrement = 200;
  const yMax = Math.ceil((groups[0].totalSpending + 1) / yIncrement) * yIncrement;
  const markerWidth = chartWidth * .01;
  const markers = yMax / yIncrement;

  for (let yIndex = 0; yIndex < markers; yIndex ++) {
    if (yIndex % 2 == 0) continue;

    const y = yAxis - (yIndex * (yAxis / markers));

    chart.push((
      <g key={`y axis ${yIndex}`}>
        <line
          x1={xAxisStart} y1={y} x2={xAxisStart - markerWidth} y2={y}
          strokeWidth="2" stroke="black"
        />
        <text x="0" y={y + ((yAxis / markers) / 4)}>{ `$${yIncrement * yIndex}` }</text>
      </g>
    ));
  }

  const workingWidth = xAxisEnd - xAxisStart;
  const boxSpacing = workingWidth * .005;
  const actualChartWidth = workingWidth - ((groups.length * boxSpacing) + boxSpacing);
  const barWidth = actualChartWidth / groups.length;

  for (const [index, group] of groups.entries()) {
    const x = xAxisStart + boxSpacing + (barWidth * index) + (boxSpacing * index);
    const height = (group.totalSpending / yMax) * yAxis;
    const y = yAxis - height

    chart.push((
      <g key={`item ${index}`}>
        <rect
          x={x} y={y}
          width={barWidth} height={yAxis - y}
          fill={toolbox.colors.primary}
        />
        <text
          x={x}
          y={yAxis + 4}
          transform={`rotate(90, ${x}, ${yAxis + 4})`}
        >{ group.name }</text>
      </g>
    ));
  }

  chart.push((
    <line
      x1={xAxisStart} y1="0" x2={xAxisStart} y2={yAxis}
      strokeWidth="2" stroke="black" key="y axis"
    />
  ));

  chart.push((
    <line
      x1={xAxisStart} y1={yAxis} x2={xAxisEnd} y2={yAxis}
      strokeWidth="2" stroke="black" key="x axis"
    />
  ));

  return (
    <Chart height={chartHeight}>
      { chart }
    </Chart>
  );
};

export default BarChart;
