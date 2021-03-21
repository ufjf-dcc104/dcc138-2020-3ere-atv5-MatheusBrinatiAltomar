import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaJogo from "./CenaJogo.js";
import CenaFim from "./CenaFim.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("pc", "assets/Sonic.png");
assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaImagem("orc", "assets/orc.png");

assets.carregaImagem("moeda_sprite", "assets/Coin.png");

assets.carregaImagem("parede", "assets/wall.png");
assets.carregaImagem("chao", "assets/piso.png");
assets.carregaImagem("agua", "assets/agua.png");

assets.carregaAudio("moeda_audio", "assets/coin.wav");
assets.carregaAudio("boom", "assets/boom.wav");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 14 * 32;
canvas.height = 10 * 32;

input.configurarTeclado({
  ArrowLeft: "MOVE_ESQUERDA",
  ArrowRight: "MOVE_DIREITA",
  ArrowUp: "MOVE_CIMA",
  ArrowDown: "MOVE_BAIXO",
  " ": "PROXIMA_CENA"
})

const game = new Game(canvas, assets, input);

const cena0 = new CenaCarregando();
const cena1 = new CenaJogo();
const cena2 = new CenaFim();

game.adicionarCena("carregando", cena0);
game.adicionarCena("jogo", cena1);
game.adicionarCena("fim", cena2);

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

document.addEventListener("visibilitychange", function()
{
  if (document.visibilityState === 'visible')
  {
    game.iniciar();
  }
  else
  {
    game.parar();
  }
});

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "s":
      game.iniciar();
      break;
    case "S":
      game.parar();
      break;
    case "c":
      assets.play("moeda_audio");
      break;
    case "b":
      assets.play("boom");
      break;
  }
});
