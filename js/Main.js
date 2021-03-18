import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaImagem("orc", "assets/orc.png");

assets.carregaImagem("parede", "assets/wall.png");
assets.carregaImagem("chao", "assets/piso.png");
assets.carregaImagem("agua", "assets/agua.png");

assets.carregaAudio("moeda", "assets/coin.wav");
assets.carregaAudio("boom", "assets/boom.wav");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 14 * 32;
canvas.height = 10 * 32;

input.configurarTeclado({
  ArrowLeft: "MOVE_ESQUERDA",
  ArrowRight: "MOVE_DIREITA",
  ArrowUp: "MOVE_CIMA",
  ArrowDown: "MOVE_BAIXO"
})

const game = new Game(canvas, assets, input);

const cena1 = new Cena(canvas, assets);
game.adicionarCena("jogo", cena1);


const mapa1 = new Mapa(10, 14, 32);
mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1);

const pc = new Sprite({ x: 50, y: 90});
pc.controlar = function (dt)
{
  if (input.comandos.get("MOVE_ESQUERDA"))
  {
    this.vx = -50;
  }
  else if (input.comandos.get("MOVE_DIREITA"))
  {
    this.vx = +50;
  }
  else
  {
    this.vx = 0;
  }

  if (input.comandos.get("MOVE_CIMA"))
  {
    this.vy = -50;
  }
  else if (input.comandos.get("MOVE_BAIXO"))
  {
    this.vy = +50;
  }
  else
  {
    this.vy = 0;
  }
}
cena1.adicionar(pc);

function perseguePC(dt)
{
  this.vx = 25*Math.sign(pc.x - this.x);
  this.vy = 25*Math.sign(pc.y - this.y);
}

const en1 = new Sprite({ x: 360, color: "red"});
cena1.adicionar(en1);
en1.controlar = perseguePC;
cena1.adicionar(new Sprite({ x: 110, y: 70, color: "red", controlar: perseguePC }));
cena1.adicionar(new Sprite({ x: 110, y: 180, color: "red", controlar: perseguePC }));

/*window.setInterval(teste, 4000);
function teste() 
{
  let y = Math.floor(Math.random() * mapa1.LINHAS);
  let x = Math.floor(Math.random() * mapa1.COLUNAS);

  if (mapa1.tiles[y][x] == 0) 
  {
    y = mapa1.SIZE * y + mapa1.SIZE / 2;
    x = mapa1.SIZE * x + mapa1.SIZE / 2;
    if (x > 416 || x < 32 || y > 288 || y < 32) 
    {
      console.log("Tentando novamente (bordas)");
      teste();
    }
    else 
    {
      let vX = Math.floor(Math.random() * 11);
      if (Math.random() > 0.5)
      {
        vX = vX * -1;
      }

      let vY = Math.floor(Math.random() * 11);
      if (Math.random() > 0.5)
      {
        vY = vY * -1;
      }

      cena1.adicionar(new Sprite({ x: x, y: y, vx: vX, vy: vY, color: "red" }));
      cena1.sprites[cena1.sprites.length - 1].mixer = mixer;
      cena1.sprites[cena1.sprites.length - 1].assets = assets;
    }
  } else {
    teste();
  }
}

for (let i = 0; i < cena1.sprites.length; i++) {
  cena1.sprites[i].mixer = mixer;
  cena1.sprites[i].assets = assets;
}*/

game.iniciar();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "s":
      game.iniciar();
      break;
    case "S":
      game.parar();
      break;
    case "c":
      assets.play("moeda");
      break;
    case "b":
      assets.play("boom");
      break;
  }
});
