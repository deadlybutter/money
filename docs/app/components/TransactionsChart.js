import React from 'react';
import Chart from './Chart';
import toolbox from './toolbox';

const BOX_PER_ROW = 32;

// modified from http://stackoverflow.com/a/14187677
function makeColor() {
  return `hsl(${Math.floor(Math.random() * 30) * 12}, 90%, 60%)`;
}

class TransactionsChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      highlight: props.defaultHighlight ? [props.defaultHighlight] : [],
    };

    const { sort } = this.props;

    const rawData = JSON.parse(JSON.stringify(window.data));
    const colors = {};
    this.data = (sort ? rawData
      .sort((a, b) => new Date(a.date) - new Date(b.date)) : rawData)
      .map((item) => {
        if (sort && !colors[item.groupId]) colors[item.groupId] = makeColor();
        item.color = sort ? colors[item.groupId] : toolbox.colors.primary;
        return item;
      });

    this.onClick = this.onClick.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onClick(highlight) {
    const state = this.state.highlight.concat();
    const index = state.indexOf(highlight);

    if (index > -1) state.splice(index, 1);
    else state.push(highlight);

    this.setState({ highlight: state });
  }

  onReset() {
    this.setState({ highlight: [] });
  }

  render() {
    const { rulerWidth, sort } = this.props;
    if (rulerWidth === 0) return null;

    const data = this.data;

    const chartWidth = rulerWidth;
    const chartHeight = chartWidth / 2;

    const boxWidth = chartWidth / (BOX_PER_ROW * 2);
    const rows = Math.ceil(data.length / BOX_PER_ROW);
    const boxHeight = chartHeight / (rows * 2);

    const boxes = [];

    for (let x = 0; x <= chartWidth; x+= (boxWidth * 2)) {
      for (let y = 0; y <= chartHeight; y += (boxHeight * 2)) {
        const transaction = data[boxes.length];
        if (!transaction) break;

        let onClick = null;
        let onDoubleClick = null;

        if (sort) {
          onClick = () => this.onClick(transaction.groupId);
          onDoubleClick = () => this.onReset();
        }

        let opacity = 1;
        if (sort && this.state.highlight.length) {
          if (this.state.highlight.indexOf(transaction.groupId) === -1) opacity = 0.1;
        }

        boxes.push((
          <g key={`${x}-${y}`} className="hover-control" onClick={onClick} onDoubleClick={onDoubleClick}>
            <rect x={x} y={y} width={boxWidth} height={boxHeight} fill={transaction.color} opacity={opacity} />
            <text x={x + boxWidth} y={y + (boxHeight * 2)}>{ transaction.display }</text>
          </g>
        ));
      }
    }

    return (
      <Chart height={chartHeight}>
        { boxes }
      </Chart>
    );
  }
}

export default TransactionsChart;
