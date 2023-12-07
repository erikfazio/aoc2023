import run from "aocrunner";

type Color = "red" | "green" | "blue";

type Drawing = {
  number: number;
  type: Color;
};

const parseInput = (rawInput: string) => {
  const pattern = /(\d+\s(red|green|blue)(,|;)?\s?)+/gm;

  const matches: string[] = Array.from(
    rawInput.matchAll(pattern),
    (match) => match[0],
  );

  return matches.map((match) => {
    return match
      .trim()
      .split(/,|;/)
      .map((text) => {
        const a = text.trim().split(/\s/);
        return {
          number: parseInt(a[0]),
          type: a[1],
        };
      });
  });

  return result;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const MAX_VALUES = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const result: number = input.reduce(
    (acc: number, game: Drawing[], index: number) => {
      return (
        acc +
        (game.every((drawing) => drawing.number <= MAX_VALUES[drawing.type])
          ? index + 1
          : 0)
      );
    },
    0,
  );

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const getMaxDrawingByColor = (game: Drawing[], type: Color) => {
    return Math.max(
      ...game
        .filter((drawing: any) => drawing.type === type)
        .map((drawing: any) => drawing.number),
    );
  };

  const result: number = input.reduce((acc: number, game: Drawing[]) => {
    const red = getMaxDrawingByColor(game, "red");
    const green = getMaxDrawingByColor(game, "green");
    const blue = getMaxDrawingByColor(game, "blue");

    return acc + red * green * blue;
  }, 0);

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `
          Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
          Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
          Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
          Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
          Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
        `,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
