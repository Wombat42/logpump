const commander = require('commander');
const fs = require('fs');
const readline = require('readline');
const randomInt = require('random-int');

function sleep({ min = 500, max = 1000 }) {
  const time = randomInt(min, max);
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function readWriteFile(inFilePath, outFilePath, throttle) {
  const { maxLines } = throttle;
  const outFile = fs.createWriteStream(outFilePath, { flags: 'a' });

  const rl = readline.createInterface({
    input: fs.createReadStream(inFilePath),
    console: false,
  });

  let counter = 0;
  for await (const line of rl) {
    if (counter < 1) {
      await sleep(throttle);
      counter = randomInt(maxLines);
    }
    console.log(line);
    outFile.write(line + '\n');
    counter--;
  }
  outFile.close();
  console.log('I should be done now');
}

function myParseInt(value, dummyPrevious) {
  // parseInt takes a string and an optional radix
  return parseInt(value);
}

function main(...args) {
  const program = new commander.Command();
  program
    .option('-n <number>', 'Max number of lines per write', myParseInt)
    .option('--min <number>', 'Shortest interval to write', myParseInt)
    .option('--max <number>', 'Longest interval to write', myParseInt);
  program.parse(process.argv);
  console.log(program.opts(), program.args);

  const { min, max, n: maxLines } = program.opts();

  if (program?.args.length > 1) {
    const [inFile, outFile] = program.args;
    readWriteFile(inFile, outFile, { min, max, maxLines });
  } else {
  }
}

module.exports = main;
