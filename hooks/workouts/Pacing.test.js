import { paceIntervals, paceTempo, paceLongRun } from "./Pacing";

describe("paceIntervals", () => {
  it("should return an empty string if racePace is not a valid string", () => {
    expect(paceIntervals("", 400)).toBe("");
    expect(paceIntervals(null, 400)).toBe("");
    expect(paceIntervals(undefined, 400)).toBe("");
  });

  it("should adjust pace correctly for intervals", () => {
    expect(paceIntervals("5:00", 400)).toBe("4:00");
    expect(paceIntervals("5:00", 600)).toBe("4:05");
    expect(paceIntervals("5:00", 800)).toBe("4:10");
    expect(paceIntervals("5:00", 1000)).toBe("4:15");
    expect(paceIntervals("5:00", 1200)).toBe("4:20");
    expect(paceIntervals("5:00", 3200)).toBe("4:20");
    expect(paceIntervals("5:00", 2000)).toBe("4:25");
  });
});

describe("paceTempo", () => {
  it("should return an empty string if racePace is not a valid string", () => {
    expect(paceTempo("", 3)).toBe("");
    expect(paceTempo(null, 3)).toBe("");
    expect(paceTempo(undefined, 3)).toBe("");
  });

  it("should adjust pace correctly for tempo runs", () => {
    expect(paceTempo("5:00", 3)).toBe("4:50");
    expect(paceTempo("5:00", 4)).toBe("4:50");
    expect(paceTempo("5:00", 5)).toBe("4:50");
    expect(paceTempo("5:00", 7)).toBe("5:05");
    expect(paceTempo("5:00", 6.5)).toBe("5:05");
    expect(paceTempo("5:00", 8)).toBe("5:05");
    expect(paceTempo("5:00", 10)).toBe("5:20");
  });
});

describe("paceLongRun", () => {
  it("should return an empty string if racePace is not a valid string", () => {
    expect(paceLongRun("", 42)).toBe("");
    expect(paceLongRun(null, 42)).toBe("");
    expect(paceLongRun(undefined, 42)).toBe("");
  });

  it("should adjust pace correctly for long runs", () => {
    expect(paceLongRun("5:00", 42)).toBe("5:00");
    expect(paceLongRun("5:00", 30)).toBe("5:30");
    expect(paceLongRun("5:00", 20)).toBe("5:30");
    expect(paceLongRun("5:00", 10)).toBe("5:30");
  });
});