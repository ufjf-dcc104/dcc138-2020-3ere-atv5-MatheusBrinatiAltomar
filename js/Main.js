import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";

const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaImagem("orc","assets/orc.png");

assets.carregaImagem("parede", "assets/wall.png");
assets.carregaImagem("chao", "assets/piso.png");
assets.carregaImagem("agua", "assets/agua.png");

assets.carregaAudio("moeda", "assets/coin.wav");
assets.carregaAudio("boom", "assets/boom.wav");


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 14*32;
canvas.height = 10*32;
const cena1 = new Cena(canvas, assets);

const mapa1 = new Mapa(10, 14, 32);
mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1);

const pc = new Sprite({x: 50, y: 90, vx: 10});
const en1 = new Sprite({x: 160, vx: -10, color: "red"});

cena1.adicionar(pc);
cena1.adicionar(en1);
cena1.adicionar(new Sprite({x: 110, y: 70, vy: 10, color: "red"}));
cena1.adicionar(new Sprite({x: 110, y: 180, vy: -10, color: "red"}));

for (let i = 0; i < cena1.sprites.length; i++)
{
    cena1.sprites[i].mixer = mixer;
    cena1.sprites[i].assets = assets;
}

cena1.iniciar();

document.addEventListener("keydown", (e)=>{
    switch (e.key) {
    case "s":
        cena1.iniciar();
        break;
    case "S":
        cena1.parar();
        break;
    case "c":
        assets.play("moeda");
        break;
    case "b":
        assets.play("boom");
        break;
}})