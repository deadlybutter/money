const fs = require('fs');
const csvtojson = require('csvtojson');
const json2csv = require('json2csv');

const fields = ['date', 'id', 'groupId', 'title', 'amount', 'display'];

function parseCsv(file) {
  const data = [];
  return new Promise((resolve) =>
    csvtojson().fromFile(file).on('json', json => data.push(json)).on('done', () => resolve(data))
  );
}

function formatData(source) {
  const displayMap = {};

  return source.map(item => {
    if (item.display) {
      displayMap[item.groupId] = item.display;
      return item;
    }

    item.display = displayMap[item.groupId];
    return item;
  });
}

function writeData(data) {
  const csv = json2csv({ data, fields });

  return new Promise((resolve) => {
    fs.writeFile('./polished/data.csv', csv, resolve);
  });
}

parseCsv('./raw/transactions-data.csv')
  .then(formatData)
  .then(writeData)
  .then(() => console.log('done'));
