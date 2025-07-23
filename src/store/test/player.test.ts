import { PlayerStatus } from "@/typings/player";

import { prepare, release } from "@/store/actions/player";
import { getPlayer } from "@/store/selectors/player";

import { PLAYER_STATE_MOCK } from "@/fixtures/player";

import StoreTester from "./index";

describe("Store - storage", () => {
  let store: StoreTester;

  beforeEach(() => {
    store = new StoreTester();
  });

  it("should perform prepare player action", async () => {
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

    const action = release();
    store.dispatch(action);
    player = getPlayer(store.getState());
    expect(player.status).toBe(PlayerStatus.STATE_IDLE);
    expect(player.position).toBe(0);
    expect(player.duration).toBe(0);
    expect(player.isPlaying).toBe(false);
  });

  it("should perform play action", () => {
    expect(true).toBe(true);
  });

  it("should perform pause action", () => {
    expect(true).toBe(true);
  });

  it("should perform seek to action", () => {
    expect(true).toBe(true);
  });
});
