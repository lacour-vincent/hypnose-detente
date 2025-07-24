import { PlayerStatus } from "@/typings/player";

import { onPlayerStateUpdate, pause, play, prepare, release, seekTo } from "@/store/actions/player";
import { getPlayer } from "@/store/selectors/player";

import { PLAYER_STATE_MOCK } from "@/fixtures/player";

import StoreTester from "./index";

describe("Store - storage", () => {
  let store: StoreTester;

  beforeEach(() => {
    store = new StoreTester();
  });

  afterEach(() => {
    store.dispatch(release());
  });

  it("should perform prepare player action", async () => {
    store.dispatch(release());
    let player = getPlayer(store.getState());
    expect(player.status).toBe(PlayerStatus.STATE_IDLE);
    expect(player.position).toBe(0);
    expect(player.duration).toBe(0);
    expect(player.isPlaying).toBe(false);

    jest.useFakeTimers();
    const action = prepare.request({ file: "sample.mp3" });
    store.dispatch(action);
    jest.runAllTimers();
    await store.waitFor(prepare.success);
    player = getPlayer(store.getState());
    expect(player.status).toBe(PlayerStatus.STATE_READY);
    expect(player.position).toBe(0);
    expect(player.duration).not.toBe(0);
    expect(player.isPlaying).toBe(false);
  });

  it("should perform release player action", () => {
    store.dispatch(prepare.success({ state: PLAYER_STATE_MOCK }));
    let player = getPlayer(store.getState());
    expect(player.status).toBe(PlayerStatus.STATE_READY);
    expect(player.position).toBe(0);
    expect(player.duration).not.toBe(0);
    expect(player.isPlaying).toBe(false);

    store.dispatch(release());
    player = getPlayer(store.getState());
    expect(player.status).toBe(PlayerStatus.STATE_IDLE);
    expect(player.position).toBe(0);
    expect(player.duration).toBe(0);
    expect(player.isPlaying).toBe(false);
  });

  it("should perform play action", () => {
    store.dispatch(pause());
    let player = getPlayer(store.getState());
    expect(player.isPlaying).toBe(false);
    expect(player.position).toBe(0);

    store.dispatch(play());
    player = getPlayer(store.getState());
    expect(player.isPlaying).toBe(true);
    expect(player.position).toBe(0);
  });

  it("should perform pause action", () => {
    store.dispatch(play());
    let player = getPlayer(store.getState());
    expect(player.isPlaying).toBe(true);
    expect(player.position).toBe(0);

    store.dispatch(pause());
    player = getPlayer(store.getState());
    expect(player.isPlaying).toBe(false);
    expect(player.position).toBe(0);
  });

  it("should perform seek to action", () => {
    let player = getPlayer(store.getState());
    expect(player.position).toBe(0);

    store.dispatch(seekTo({ position: 1 }));
    player = getPlayer(store.getState());
    expect(player.position).toBe(1);
  });

  it("should start pulling player state by performing play action", async () => {
    jest.useFakeTimers();
    store.dispatch(play());
    const positions = [1, 2, 3, 4, 5];
    for (const position of positions) {
      jest.runAllTimers();
      await store.waitFor(onPlayerStateUpdate, position);
      const player = getPlayer(store.getState());
      expect(player.position).toBe(position);
    }
  });

  it("should stop pulling player state by performing pause action", async () => {
    jest.useFakeTimers();
    store.dispatch(play());
    const positions = [1, 2, 3];
    for (const position of positions) {
      jest.runAllTimers();
      await store.waitFor(onPlayerStateUpdate, position);
      const player = getPlayer(store.getState());
      expect(player.position).toBe(position);
    }

    store.dispatch(pause());
    jest.runAllTimers();
    await store.waitFor(onPlayerStateUpdate, positions[positions.length - 1]);
    const player = getPlayer(store.getState());
    expect(player.position).toBe(positions[positions.length - 1]);
  });
});
