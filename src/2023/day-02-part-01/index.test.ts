import { calculate } from "./index";
import fsPromises from "fs/promises";
import path from "path";

describe("2023 - day 2", async () => {
  it("should", async () => {
    const input = (
      await fsPromises.readFile(path.resolve(__dirname, "input.txt"))
    ).toString();

    const result = await calculate(
      {
        red: 12,
        green: 13,
        blue: 14,
      },
      input
    );

    expect(result).toEqual(2377);
  });
});
