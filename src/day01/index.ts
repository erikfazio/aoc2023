import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((acc, item) => {
    const digits = item.replace(/\D/g, "");
    return acc + parseInt(digits[0] + digits[digits.length - 1]);
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((acc, item) => {
    let numbers: string[] = [];

    const words = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];

    for (let i = 0; i < item.length; i++) {
      if (/^\d$/.test(item[i])) {
        numbers.push(item[i]);
      } else {
        let tester = item[i];
        for (let j = i; j < item.length; j++) {
          if (words.includes(tester)) {
            numbers.push(
              String(words.findIndex((word) => word === tester) + 1),
            );
            tester = "";
            break;
          } else {
            tester += item[j + 1];
          }
        }
      }
    }
    return acc + Number(numbers[0] + numbers[numbers.length - 1]);
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
