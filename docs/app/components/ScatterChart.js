import React from 'react';
import Chart from './Chart';
import toolbox from './toolbox';

const ScatterChart = ({ rulerWidth }) => {
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
  .sort((a, b) => b.totalSpending - a.totalSpending);

  const xAxisStart = chartWidth * .1;
  const xAxisEnd = chartWidth * .9;
  const workingWidth = xAxisEnd - xAxisStart;
  const xMax = groups.reduce((acc, val) => {
    const frequency = val.items.length;
    return frequency > acc ? frequency : acc;
  }, 0);

  const yAxis = chartHeight * .85;
  const yIncrement = 200;
  const yMax = Math.ceil((groups[0].totalSpending + 1) / yIncrement) * yIncrement;
  const markerWidth = chartWidth * .01;
  const yMarkers = yMax / yIncrement;

  for (const group of groups) {
    const spending = group.totalSpending;
    const frequency = group.items.length;

    const x = xAxisStart + ((frequency / xMax) * workingWidth);
    const y = yAxis - ((spending / yMax) * yAxis);
    const r = workingWidth * .01;

    chart.push((
      <g key={`${group.name}`} className="hover-control" >
        <circle
          cx={x}
          cy={y}
          r={r}
          fill={toolbox.colors.primary}
        />
        <text
          x={x + r}
          y={y + r}
        >{ group.name }</text>
      </g>
    ));
  }

  for (let yIndex = 0; yIndex < yMarkers; yIndex ++) {
    if (yIndex % 2 == 0) continue;

    const y = yAxis - (yIndex * (yAxis / yMarkers));

    chart.push((
      <g key={`y axis ${yIndex}`}>
        <line
          x1={xAxisStart} y1={y} x2={xAxisStart - markerWidth} y2={y}
          strokeWidth="2" stroke="black"
        />
        <text x="0" y={y + ((yAxis / yMarkers) / 4)}>{ `$${yIncrement * yIndex}` }</text>
      </g>
    ));
  }

  for (let xIndex = 1; xIndex < xMax; xIndex++) {
    if (xIndex % 4 !== 0) continue;

    const x = xAxisStart + ((xIndex / xMax) * workingWidth);

    chart.push((
      <g key={`x axis ${xIndex}`}>
        <line
          x1={x} y1={yAxis} x2={x} y2={yAxis + markerWidth}
          strokeWidth="2" stroke="black"
        />
        <text
          x={x}
          y={yAxis + (markerWidth * 3)}
          textAnchor="middle"
        >{ xIndex }</text>
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

  chart.push((
    <text
      x={chartWidth / 2}
      y={chartHeight - (chartHeight * .05)}
      textAnchor="middle"
      key="frequency label"
    >Frequency of transactions</text>
  ));

  return (
    <Chart height={chartHeight}>
      { chart }
    </Chart>
  );
};

export default ScatterChart;
