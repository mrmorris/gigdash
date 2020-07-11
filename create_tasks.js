import * as C from './src/constants.js';
import * as fs from 'fs';
import parse from 'csv-parse/lib/sync.js';

const outputFile = './src/tasks.js';

const main = () => {
  fs.readFile('./src/assets/tasks.csv', 'utf8', function (err, data) {
    if (err) throw err;

    const rowsList = parse(data, {
      columns: true,
      skip_empty_lines: true,
    });

    fs.writeFile(
      outputFile,
      `
import * as C from './constants';
import Task from './entities/Task';

export default [
${rowsList.map((row) => {
  let {
    id,
    customerName,
    description,
    destination,
    itemsList,
    positiveReview,
    negativeReview,
  } = row;

  destination = getDestinationConstantString(destination);
  itemsList = itemsList
    .split(',')
    .map((item) => {
      let constant = getItemConstantString(item);

      if (constant === 'C.undefined') {
        console.log(`${item} did not match any known constants`);
      }

      return constant;
    })
    .join();

  return `new Task(
    ${id},
    "${addslashes(description)}",
    "${customerName}",
    ${destination},
    [${itemsList}],
    "${positiveReview}",
    "${negativeReview}"
  )
  `;
})}
]
`,
      (err) => {
        if (err) throw err;
        console.log('done');
      }
    );
  });
};

const getItemConstantString = (item) =>
  `C.${constantMap[item.trim().toLowerCase()]}`;
const getDestinationConstantString = (dest) => {
  let constantDest = constantMap[dest.toLowerCase()];

  if (!constantDest) {
    console.log(`${dest} did not match any known constants`);
  }
  return `C.${constantDest}`;
};

const addslashes = (str) => {
  return (str + '').replace(/[\\"]/g, '\\$&');
};

const constantMap = Object.entries(C).reduce((acc, [key, val]) => {
  acc[val.toLowerCase()] = key;
  return acc;
}, {});

main();
