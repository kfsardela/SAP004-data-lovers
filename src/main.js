import {
  filterBy,
  calculator,
  filterByName,
  sortData
} from './data.js';
import data from './data/pokemon/pokemon.js';

const pokemons = data.pokemon
let types = []
let eggs = [];


for (const pokemon of pokemons) {
  for (const type of pokemon.type) {
    types.push(type);
  }
  eggs.push(pokemon.egg);
}

//types = [...new Set(types)];
types = types.filter((type, index) => types.indexOf(type) === index)
let typesHtml = '<option class="options"> Todos </option>'

for (const type of types) {
  typesHtml += '<option class="options" value="' + type + '">' + type + '</option>'
}

eggs = eggs.filter((egg, index) => eggs.indexOf(egg) === index)

let eggsHtml = '<option class="option-egg"></option>'
for (const egg of eggs) {
  eggsHtml += '<option class="option-egg" value="' + egg + '">' + egg + '</option>'
}
document.getElementById("types").innerHTML = typesHtml

document.getElementById("eggs").innerHTML = eggsHtml

function mostrarNaTela(pokemonArray) {
  let cards = ""
  for (const pokemon of pokemonArray) {
    cards += '<div class="card-container">'
    cards += '<div class="card">'
    cards += '<div class="front">'
    cards += '  <div><img src="' + pokemon.img + '" alt="' + pokemon.name + '"></div>'
    cards += '  <div class="numero">' + pokemon.num + '</div>'
    cards += '  <div class="nome">' + pokemon.name + '</div>'
    cards += '  <div class="tipo"> Tipo:' + pokemon.type + '</div>'
    cards += '  <div class="ovos"> Ovos:' + pokemon.egg + '</div>'
    cards += '</div>'
    cards += '<div class="back">'
    //cards += '  <div class="imagem"><img src="' + pokemon.img + '" alt="' + pokemon.name + '"></div>'
    cards += '  <div class="altura"> Altura ' + pokemon.height + '</div>'
    cards += '  <div class="largura"> Largura: ' + pokemon.weight + '</div>'
    cards += '  <div class="qauntidade-doce"> Doces: ' + pokemon.candy_count + '</div>'
    cards += '  <div class="chance-aparecer"> Chance de Aparecer: ' + pokemon.spawn_chance + '</div>'
    cards += '  <div class="tempo-desova"> Tempo de Desova: ' + pokemon.spawn_time + '</div>'
    cards += '  <div class="fraquezas"> Fraquezas: ' + pokemon.weaknesses + '</div>'
    cards += '</div>'
    cards += '</div>'
    cards += '</div>'
  }
  return document.getElementById("pokemonList").innerHTML = cards
}

mostrarNaTela(pokemons)

let pokemonType = document.getElementById("types");
let pokemonEgg = document.getElementById("eggs");
let imprimirPorcentagem = document.getElementById("porcentagem-de-tipo-de-pokemon");
pokemonType.addEventListener("click", seletorDeTipo)
pokemonEgg.addEventListener("click", seletorDeEgg)

function seletorDeTipo() {
  const tipoDePokemon1 = pokemonType.selectedIndex;
  const tipoDePokemon2 = pokemonType.options;
  const typeSelecionado = tipoDePokemon2[tipoDePokemon1].text;
  const resultType = filterBy(pokemons, "type", typeSelecionado);
  const porcentagem = calculator(pokemons, resultType);
  mostrarNaTela(resultType)
  imprimirPorcentagem.innerHTML = ` A porcentagem de pokemons do tipo ${typeSelecionado} é de ${porcentagem} % em relação a todos os outros pokemons.`
  imprimirPorcentagem.classList.remove("invisivel");
  if (typeSelecionado == "Todos") {
    mostrarNaTela(pokemons);
    imprimirPorcentagem.classList.add("invisivel");
  }
}

function seletorDeEgg() {
  const tipoDePokemon3 = pokemonEgg.selectedIndex;
  const tipoDePokemon4 = pokemonEgg.options;
  const typeSelecionado = tipoDePokemon4[tipoDePokemon3].text;
  const resultEgg = filterBy(pokemons, "egg", typeSelecionado);
  imprimirPorcentagem.classList.add("invisivel");
  mostrarNaTela(resultEgg);
  if (typeSelecionado == "") {
    mostrarNaTela(pokemons)
  }
}

document.getElementById("ordens").addEventListener('change', (event) => {
  const ordem = event.target.value.split("|");
  const sortBy = ordem[0];
  const sortOrder = ordem[1]
  const resultado = sortData(pokemons, sortBy, sortOrder);
  mostrarNaTela(resultado)
})
const campoDeBusca = document.getElementById("cpBusca")
campoDeBusca.addEventListener("input", searchName)

function searchName() {
  const nomeDigitado = campoDeBusca.value
  const letrasDigitadas = new RegExp(nomeDigitado, "i")
  const resultBusca = filterByName(pokemons, letrasDigitadas)
  mostrarNaTela(resultBusca)
}
