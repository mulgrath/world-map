import { WorldMap } from "./world-map.js";
import { Viewport } from "./viewport.js";

const map = new WorldMap(20, 15);
const canvas = document.getElementById('map-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

if (!ctx) {
    throw new Error("Missing HTML elements!");
}

const viewport = new Viewport(map, ctx);
viewport.render();