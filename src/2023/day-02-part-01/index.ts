type Bag = {
  red: number;
  green: number;
  blue: number;
};

type Set = {
  red: number;
  green: number;
  blue: number;
};

type Game = Record<string, Set[]>;

export async function calculate(
  bag: Bag,
  possibleGames: string
): Promise<number> {
  const games = possibleGames.split("\r").reduce((acc, game, idx) => {
    const gameNumber = idx + 1;

    const colourSets = game
      .replace(`Game ${gameNumber}: `, "")
      .replace("\n", "")
      .split("; ")
      .map((set) =>
        set.split(", ").reduce((acc, colourCount) => {
          const [count, colour] = colourCount.split(" ");

          return {
            ...acc,
            [String(colour)]: Number(count),
          };
        }, {} as Set)
      );

    return { ...acc, [gameNumber]: colourSets };
  }, {} as Game);

  return Object.entries(games).reduce((acc, [game, sets]) => {
    let setIsPossible = !sets.find((set) =>
      Object.entries(set).some(([colour, count]) => count > bag[colour])
    );

    return setIsPossible ? acc + Number(game) : acc;
  }, 0);
}
