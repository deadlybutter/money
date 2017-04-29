const fs = require('fs');
const csvtojson = require('csvtojson');
const json2csv = require('json2csv');
const uuidV4 = require('uuid/v4');

const fields = ['date', 'id', 'groupId', 'title', 'amount'];

function parseCsv(file) {
  const data = [];
  return new Promise((resolve) =>
    csvtojson().fromFile(file).on('json', json => data.push(json)).on('done', () => resolve(data))
  );
}

function formatData(source) {
  return source.map((item) => ({
    date: item.date,
    id: uuidV4(),
    groupId: null, // Filled in later
    title: (isNaN(item.transaction) ? item.transaction : false) || item.type,
    amount: parseInt(item.amount),
  })).filter(item => item.amount <= 0);
}

function splitTitle(title) {
  const words = title.replace(/\*/g, ' ').split(' ').map(word => word.toLowerCase());
  return words.splice(0, words.indexOf(''));
  // return title.split((/[\s*]+/)).filter(word => word).map(word => word.toLowerCase());
}

function getIdentifier(title) {
  return title.replace(/\*/g, ' ').split(' ')[0].toLowerCase();
}

function groupData(data) {
  function findMatches(title) {
    const comparison = getIdentifier(title);
    return data.filter(item => getIdentifier(item.title) === comparison);
  }

  for (const item of data) {
    if (item.groupId) continue;

    const matches = findMatches(item.title);
    const matchesWithGroupId = matches.filter(match => match.groupId);
    const groupId = matchesWithGroupId.length ? matchesWithGroupId[0].groupId : uuidV4();
    item.groupId = groupId;
  }

  return data;
}

function writeData(data) {
  const csv = json2csv({ data, fields });

  return new Promise((resolve) => {
    fs.writeFile('./polished/data.csv', csv, resolve);
  });
}

parseCsv('./raw/CHK_304.csv')
  .then(formatData)
  .then(groupData)
  .then(writeData)
  .then(() => console.log('done'));
