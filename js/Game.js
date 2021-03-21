export default class Game {
    constructor(canvas, assets, input)
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.assets = assets;
        this.input = input;
        this.cenas = new Map();
        this.cena = null;
        this.pontos = 0;
    }

    adicionarCena(chave, cena, mapaNumero)
    {
        this.cenas.set(chave, cena);
        cena.game = this;
        cena.canvas = this.canvas;
        cena.ctx = this.ctx;
        cena.assets = this.assets;
        cena.input = this.input;
        cena.mapaNumero = mapaNumero;
        if (this.cena === null)
        {
            this.cena = cena;    
        }
    }

    selecionaCena(chave, mapaNumero)
    {
        if (this.cenas.has(chave))
        {
            this.parar();
            this.cena = this.cenas.get(chave);
            this.cena.preparar();
            this.cena.mapaNumero = mapaNumero;
            this.iniciar();
        }
    }

    iniciar()
    {
        this.cena?.iniciar();
    }

    parar()
    {
        this.cena?.parar();
    }

    adicionarPontos()
    {
        this.pontos	++;
    }

}