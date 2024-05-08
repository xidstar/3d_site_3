import { proxy } from "valtio";

const state = proxy({
    isEnd: false,
    isPlaying: true,
    isHovered: false,
});

export default state;