export default class SpriteManager
{
    constructor(canvas = null)
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }
}