import { proxy } from "valtio";

const state = proxy({
    isEnd: false,
    isPlaying: true,
});

export default state;