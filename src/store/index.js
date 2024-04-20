import { proxy } from "valtio";

const state = proxy({
    isEnd: false,
    isPlaying: false,
});

export default state;