import { formatAudioTime } from "@/utils/formatter";

describe("formatAudioTime", () => {
  test.each([
    [0, "00:00"],
    [1, "00:01"],
    [2, "00:02"],
    [10, "00:10"],
    [11, "00:11"],
    [59, "00:59"],
  ])("should format audio time - seconds -  %p -> %p", (time, expected) => {
    expect(formatAudioTime(time)).toBe(expected);
  });

  test.each([
    [60, "01:00"],
    [61, "01:01"],
    [70, "01:10"],
    [71, "01:11"],
    [600, "10:00"],
    [601, "10:01"],
    [610, "10:10"],
    [611, "10:11"],
  ])("should format audio time - minutes- %p -> %p", (time, expected) => {
    expect(formatAudioTime(time)).toBe(expected);
  });
});
