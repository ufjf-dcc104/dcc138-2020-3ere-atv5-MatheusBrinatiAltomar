import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import mapa1 from "../maps/mapa1.js";
import mapa2 from "../maps/mapa2.js";

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
            this.assets.play("moeda_audio");
            this.game.adicionarPontos();
            if (!this.aRemover.includes(b)) 
            {
                this.aRemover.push(b)    
            }
        }
        else if (a.tags.has("pc") && b.tags.has("key"))
        {
            if (!this.aRemover.includes(b)) 
            {
                this.aRemover.push(b)    
            }
            console.log("próxima fase");
            //this.mapaNumero = 2;
            this.game.selecionaCena("jogo2", 2);
        }
        else if (a.tags.has("pc") && b.tags.has("fim"))
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
        else if (a.tags.has("enemy") && b.tags.has("coin"))
        {
            return;
        }
        else if (a.tags.has("enemy") && b.tags.has("key"))
        {
            return;
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
        console.log(this.mapaNumero);
        super.preparar();
        const map = new Mapa(10, 14, 32);

        if (this.mapaNumero == 2)
        {
            this.mapaNumero = 2;
            map.carregaMapa(mapa2);
            this.configuraMapa(map);
        }
        else
        {
            this.mapaNumero = 1;
            map.carregaMapa(mapa1);
            this.configuraMapa(map);
        }
        
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

        if (this.mapaNumero == 1)
        {
            this.adicionar(new Sprite({ x: 360, w: 25, h: 25, color: "red", controlar: perseguePC, tags: ["enemy"], assets: this.assets }));
            this.adicionar(new Sprite({ x: 230, y: 70, w: 25, h: 25, color: "red", controlar: perseguePC, tags: ["enemy"], assets: this.assets }));
            this.adicionar(new Sprite({ x: 200, y: 180, w: 25, h: 25, color: "red", controlar: perseguePC, tags: ["enemy"], assets: this.assets }));

            this.adicionar(new Sprite({ x: 40, y: 260, w: 25, h: 25, tags: ["coin"], assets: this.assets }));
            this.adicionar(new Sprite({ x: 256, y: 32, w: 25, h: 25, tags: ["coin"], assets: this.assets }));
            this.adicionar(new Sprite({ x: 256, y: 192, w: 25, h: 25, tags: ["coin"], assets: this.assets }));

            this.adicionar(new Sprite({ x: 384, y: 256, w: 25, h: 25, tags: ["key"], assets: this.assets }));
            
        }
        else if (this.mapaNumero == 2)
        {
            this.adicionar(new Sprite({ x: 300, w: 25, h: 25, color: "red", controlar: perseguePC, tags: ["enemy"], assets: this.assets }));

            this.adicionar(new Sprite({ x: 40, y: 260, w: 25, h: 25, tags: ["coin"], assets: this.assets }));
            this.adicionar(new Sprite({ x: 256, y: 32, w: 25, h: 25, tags: ["coin"], assets: this.assets }));
            this.adicionar(new Sprite({ x: 256, y: 192, w: 25, h: 25, tags: ["coin"], assets: this.assets }));

            this.adicionar(new Sprite({ x: 384, y: 256, w: 25, h: 25, tags: ["fim"], assets: this.assets }));
        }
    }
}