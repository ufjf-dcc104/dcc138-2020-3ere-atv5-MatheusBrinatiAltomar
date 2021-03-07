export default class Sprite
{
    //É responsável por modelar algo que se move na tela.

    constructor({x=100, y=100, vx=0, vy=0, w=20, h=20, color="white"}={})
    {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.w = w;
        this.h = h;
        this.color = color;
        this.cena = null;
        this.mapaX = 0;
        this.mapaY = 0;
        this.mixer = null;
        this.assets = null;
    }

    desenhar(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        ctx.strokeStyle = "blue";
        ctx.strokeRect(
            this.mapaX * this.cena.mapa.SIZE,
            this.mapaY * this.cena.mapa.SIZE,
            this.cena.mapa.SIZE,
            this.cena.mapa.SIZE
        );
    }

    passo(dt)
    {
        this.x = this.x + this.vx * dt;
        this.y = this.y + this.vy * dt;
        this.mapaX = Math.floor(this.x / this.cena.mapa.SIZE);
        this.mapaY = Math.floor(this.y / this.cena.mapa.SIZE);
    }

    colidiuCom(outro)
    {
        if (this.x - this.w / 2 > outro.x + outro.w / 2 ||
            this.x + this.w / 2 < outro.x - outro.w / 2 ||
            this.y - this.h / 2 > outro.y + outro.h / 2 ||
            this.y + this.h / 2 < outro.y - outro.h / 2) 
        {
            return false;
        }
        else
        {
            this.assets.play("boom");
            return true;
        }
    }

    aplicaRestricoes(dt)
    {
        this.aplicaRestricoesDireita(this.mapaX + 1, this.mapaY - 1);
        this.aplicaRestricoesDireita(this.mapaX + 1, this.mapaY);
        this.aplicaRestricoesDireita(this.mapaX + 1, this.mapaY + 1);

        this.aplicaRestricoesEsquerda(this.mapaX - 1, this.mapaY - 1);
        this.aplicaRestricoesEsquerda(this.mapaX - 1, this.mapaY);
        this.aplicaRestricoesEsquerda(this.mapaX - 1, this.mapaY + 1);

        this.aplicaRestricoesCima(this.mapaX - 1, this.mapaY - 1);
        this.aplicaRestricoesCima(this.mapaX, this.mapaY - 1);
        this.aplicaRestricoesCima(this.mapaX + 1, this.mapaY - 1);

        this.aplicaRestricoesBaixo(this.mapaX - 1, this.mapaY + 1);
        this.aplicaRestricoesBaixo(this.mapaX, this.mapaY + 1);
        this.aplicaRestricoesBaixo(this.mapaX + 1, this.mapaY + 1);        
    }
    
    aplicaRestricoesDireita(proxMapaX, proxMapaY)
    {
        if (this.vx > 0) 
        {
            const SIZE = this.cena.mapa.SIZE;
            if (this.cena.mapa.tiles[proxMapaY][proxMapaX] != 0) 
            {
                const tile = {
                    x: proxMapaX * SIZE + SIZE / 2,
                    y: proxMapaY * SIZE + SIZE / 2,
                    w: SIZE,
                    h: SIZE
                };

                this.cena.ctx.strokeStyle = "white";
                this.cena.ctx.strokeRect(tile.x - SIZE / 2, tile.y - SIZE / 2, SIZE, SIZE);

                if (this.colidiuCom(tile)) 
                {
                    this.vx = 0;
                    this.x = tile.x - tile.w / 2 - this.w / 2 - 1;
                }
            }
        }
    }

    aplicaRestricoesEsquerda(proxMapaX, proxMapaY)
    {
        if (this.vx < 0) 
        {
            const SIZE = this.cena.mapa.SIZE;
            if (this.cena.mapa.tiles[proxMapaY][proxMapaX] != 0) 
            {
                const tile = {
                    x: proxMapaX * SIZE + SIZE / 2,
                    y: proxMapaY * SIZE + SIZE / 2,
                    w: SIZE,
                    h: SIZE
                };

                this.cena.ctx.strokeStyle = "white";
                this.cena.ctx.strokeRect(tile.x - SIZE / 2, tile.y - SIZE / 2, SIZE, SIZE);

                if (this.colidiuCom(tile)) 
                {
                    this.vx = 0;
                    this.x = tile.x + tile.w / 2 + this.w / 2 + 1;
                }
            }
        }
    }

    aplicaRestricoesBaixo(proxMapaX, proxMapaY)
    {
        if (this.vy > 0) 
        {
            const SIZE = this.cena.mapa.SIZE;
            if (this.cena.mapa.tiles[proxMapaY][proxMapaX] != 0) 
            {
                const tile = {
                    x: proxMapaX * SIZE + SIZE / 2,
                    y: proxMapaY * SIZE + SIZE / 2,
                    w: SIZE,
                    h: SIZE
                };

                this.cena.ctx.strokeStyle = "white";
                this.cena.ctx.strokeRect(tile.x - SIZE / 2, tile.y - SIZE / 2, SIZE, SIZE);

                if (this.colidiuCom(tile)) 
                {
                    this.vy = 0;
                    this.y = tile.y - tile.h / 2 - this.h / 2 - 1;
                }
            }
        }
    }

    aplicaRestricoesCima(proxMapaX, proxMapaY)
    {
        if (this.vy < 0) 
        {
            const SIZE = this.cena.mapa.SIZE;
            if (this.cena.mapa.tiles[proxMapaY][proxMapaX] != 0) 
            {
                const tile = {
                    x: proxMapaX * SIZE + SIZE / 2,
                    y: proxMapaY * SIZE + SIZE / 2,
                    w: SIZE,
                    h: SIZE
                };

                this.cena.ctx.strokeStyle = "white";
                this.cena.ctx.strokeRect(tile.x - SIZE / 2, tile.y - SIZE / 2, SIZE, SIZE);

                if (this.colidiuCom(tile)) 
                {
                    this.vy = 0;
                    this.y = tile.y + tile.h / 2 + this.h / 2 + 1;
                }
            }
        }
    }
}