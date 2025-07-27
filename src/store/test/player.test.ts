import { PlayerStatus } from "@/typings/player";

import { onPlayerStateUpdate, pause, play, prepare, release, seekTo } from "@/store/actions/player";
import { getPlayer } from "@/store/selectors/player";

import StoreTester from "./index";

describe("Store - storage", () => {
  let store: StoreTester;

  beforeEach(() => {
    store = new StoreTester();
    jest.useFakeTimers();
  });

  afterEach(() => {
    store.dispatch(release());
  });

  it("should perform prepare player action", async () => {
    let player = getPlayer(store.getState());
    expect(player.status).toBe(PlayerStatus.IDLE);
    expect(player.position).toBe(0);
    expect(player.duration).toBe(0);
    expect(player.isPlaying).toBe(false);

    const action = prepare.request({ file: "sample.mp3" });
    store.dispatch(action);
    jest.runOnlyPendingTimers();
    await store.waitFor(prepare.success);
    player = getPlayer(store.getState());
    expect(player.status).toBe(PlayerStatus.READY);
    expect(player.position).toBe(0);
    expect(player.duration).not.toBe(0);
    expect(player.isPlaying).toBe(false);
  });

  it("should perform release player action", async () => {
    store.dispatch(prepare.request({ file: "sample.mp3" }));
    jest.runOnlyPendingTimers();
    await store.waitFor(prepare.success);

    let player = getPlayer(store.getState());
    expect(player.status).toBe(PlayerStatus.READY);
    expect(player.position).toBe(0);
    expect(player.duration).not.toBe(0);
    expect(player.isPlaying).toBe(false);

    store.dispatch(release());
    player = getPlayer(store.getState());
    expect(player.status).toBe(PlayerStatus.IDLE);
    expect(player.position).toBe(0);
    expect(player.duration).toBe(0);
    expect(player.isPlaying).toBe(false);
  });

  it("should perform play action", async () => {
    store.dispatch(prepare.request({ file: "sample.mp3" }));
    jest.runOnlyPendingTimers();
    await store.waitFor(prepare.success);

    let player = getPlayer(store.getState());
    expect(player.isPlaying).toBe(false);
    expect(player.position).toBe(0);

    store.dispatch(play.request());
    await store.waitFor(play.success);
    player = getPlayer(store.getState());
    expect(player.isPlaying).toBe(true);
    expect(player.position).toBe(0);
  });

  it("should perform pause action", async () => {
    store.dispatch(prepare.request({ file: "sample.mp3" }));
    jest.runOnlyPendingTimers();
    await store.waitFor(prepare.success);
    store.dispatch(play.request());
    await store.waitFor(play.success);

    let player = getPlayer(store.getState());
    expect(player.isPlaying).toBe(true);
    expect(player.position).toBe(0);

    store.dispatch(pause());
    player = getPlayer(store.getState());
    expect(player.isPlaying).toBe(false);
    expect(player.position).toBe(0);
  });

  it("should perform seek to action", async () => {
    store.dispatch(prepare.request({ file: "sample.mp3" }));
    jest.runOnlyPendingTimers();
    await store.waitFor(prepare.success);

    let player = getPlayer(store.getState());
    expect(player.position).toBe(0);

    const position = 5;
    store.dispatch(seekTo({ position }));
    player = getPlayer(store.getState());
    expect(player.position).toBe(position);
  });

  it("should start listening player state by performing play action", async () => {
    store.dispatch(prepare.request({ file: "sample.mp3" }));
    jest.runAllTimers();
    await store.waitFor(prepare.success);

    store.dispatch(play.request());
    await store.waitFor(play.success);
    const positions = [1, 2, 3, 4, 5];
    for (const position of positions) {
      jest.runOnlyPendingTimers();
      await store.waitFor(onPlayerStateUpdate, position);
      const player = getPlayer(store.getState());
      expect(player.position).toBe(position);
    }
  });

  it("should stop listening player state by performing pause action", async () => {
    store.dispatch(prepare.request({ file: "sample.mp3" }));
    jest.runOnlyPendingTimers();
    await store.waitFor(prepare.success);

    store.dispatch(play.request());
    await store.waitFor(play.success);
    const positions = [1, 2, 3];
    for (const position of positions) {
      jest.runOnlyPendingTimers();
      await store.waitFor(onPlayerStateUpdate, position);
      const player = getPlayer(store.getState());
      expect(player.position).toBe(position);
    }

    store.dispatch(pause());
    jest.runOnlyPendingTimers();
    await store.waitFor(onPlayerStateUpdate, positions[positions.length - 1]);
    const player = getPlayer(store.getState());
    expect(player.position).toBe(positions[positions.length - 1]);
  });

  it("should stop listening player state by performing release action", async () => {
    store.dispatch(prepare.request({ file: "sample.mp3" }));
    jest.runOnlyPendingTimers();
    await store.waitFor(prepare.success);

    store.dispatch(play.request());
    await store.waitFor(play.success);
    const positions = [1, 2, 3];
    for (const position of positions) {
      jest.runOnlyPendingTimers();
      await store.waitFor(onPlayerStateUpdate, position);
      const player = getPlayer(store.getState());
      expect(player.position).toBe(position);
    }

    store.dispatch(release());
    jest.runOnlyPendingTimers();
    await store.waitFor(onPlayerStateUpdate, positions[positions.length - 1]);
    const player = getPlayer(store.getState());
    expect(player.position).toBe(0);
  });
});
