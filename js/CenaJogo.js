import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";

export default class CenaJogo extends Cena
{
    quandoColidir(a, b)
    {
        if (a.tags.has("pc") && b.tags.has("enemy"))
        {
            if (!this.aRemover.includes(a)) 
            {
                this.aRemover.push(a)    
            }
            if (!this.aRemover.includes(b)) 
            {
                this.aRemover.push(b)    
            }
            this.game.selecionaCena("fim");
        }
        else if (a.tags.has("pc") && b.tags.has("coin"))
        {
            if (!this.aRemover.includes(b)) 
            {
                this.aRemover.push(b)    
            }
        }
        else
        {
            if (!this.aRemover.includes(a)) 
            {
                this.aRemover.push(a)    
            }
            if (!this.aRemover.includes(b)) 
            {
                this.aRemover.push(b)    
            }
        }
        
        
    }
    preparar()
    {
        super.preparar();
        const mapa1 = new Mapa(10, 14, 32);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);

        const pc = new Sprite({ x: 50, y: 90, w: 20, h: 30, assets: this.assets});
        pc.tags.add("pc");
        const cena = this
        pc.controlar = function (dt)
        {
            if (cena.input.comandos.get("MOVE_ESQUERDA"))
            {
                this.vx = -50;
            }
            else if (cena.input.comandos.get("MOVE_DIREITA"))
            {
                this.vx = +50;
            }
            else
            {
                this.vx = 0;
            }

            if (cena.input.comandos.get("MOVE_CIMA"))
            {
                this.vy = -50;
            }
            else if (cena.input.comandos.get("MOVE_BAIXO"))
            {
                this.vy = +50;
            }
            else
            {
                this.vy = 0;
            }
        }
        this.adicionar(pc);

        function perseguePC(dt)
        {
            this.vx = 25*Math.sign(pc.x - this.x);
            this.vy = 25*Math.sign(pc.y - this.y);
        }

        this.adicionar(new Sprite({ x: 360, w: 25, h: 25, color: "red", controlar: perseguePC, tags: ["enemy"], assets: this.assets }));
        this.adicionar(new Sprite({ x: 230, y: 70, w: 25, h: 25, color: "red", controlar: perseguePC, tags: ["enemy"], assets: this.assets }));
        this.adicionar(new Sprite({ x: 200, y: 180, w: 25, h: 25, color: "red", controlar: perseguePC, tags: ["enemy"], assets: this.assets }));

        this.adicionar(new Sprite({ x: 40, y: 260, w: 25, h: 25, tags: ["coin"], assets: this.assets }));
        this.adicionar(new Sprite({ x: 256, y: 32, w: 25, h: 25, tags: ["coin"], assets: this.assets }));
        this.adicionar(new Sprite({ x: 256, y: 192, w: 25, h: 25, tags: ["coin"], assets: this.assets }));
    }
}