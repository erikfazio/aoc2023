import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.replace(/[\r\n]/gm, "");
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  console.log(input);

  let sum = 0;

  function isNumber(char: string) {
    return /\d/.test(char);
  }

  function isSymbol(char: string) {
    return /[^\d^.]/.test(char);
  }

  const length = input.length;
  const depth = Math.sqrt(length);
  let point;
  let group = "";
  let hasAdjacentSymbol = false;
  let line = -1;

  for (let i = 0; i < length; i++) {
    point = input[i];

    if (i % depth === 0) {
      line++;
    }

    if (isNumber(point)) {
      if (!hasAdjacentSymbol) {
        const hasLeftSymbol = i > 0 && isSymbol(input[i - 1]);
        const hasRightSymbol = i < length - 1 && isSymbol(input[i + 1]);
        const hasBottomSymbol = line < depth - 1 && isSymbol(input[i + depth]);
        const hasTopSymbol = line > 0 && isSymbol(input[i - depth]);
        const hasLeftUpSymbol =
          i > 0 && line > 0 && isSymbol(input[i - depth - 1]);
        const hasRightUpSymbol =
          i < length - 1 && line > 0 && isSymbol(input[i - depth + 1]);
        const hasLeftDownSymbol =
          line < depth - 1 && i > 0 && isSymbol(input[i + depth - 1]);
        const hasRightDownSymbol =
          line < depth - 1 && i < length - 1 && isSymbol(input[i + depth + 1]);

        if (
          hasLeftSymbol ||
          hasRightSymbol ||
          hasBottomSymbol ||
          hasTopSymbol ||
          hasLeftUpSymbol ||
          hasRightUpSymbol ||
          hasLeftDownSymbol ||
          hasRightDownSymbol
        ) {
          hasAdjacentSymbol = true;
        }
      }
      group += point;
    } else {
      if (group !== "") {
        if (hasAdjacentSymbol) {
          console.log(group);
          sum += parseInt(group);
        }
        group = "";
        hasAdjacentSymbol = false;
      }
    }
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
