import './pg.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import { fromLonLat } from 'ol/proj.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Icon, Style } from 'ol/style.js';

// Criando uma fonte de dados vetoriais para os marcadores
const vectorSource = new VectorSource();

// Criando uma camada vetorial para os marcadores
const vectorLayer = new VectorLayer({
  source: vectorSource,
});

// Criando o mapa com camadas OSM e vetorial
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    vectorLayer // Adicionando a camada vetorial ao mapa
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

// Função para adicionar um marcador ao mapa
function addMarker(coord) {
  // Convertendo as coordenadas para o sistema de projeção do OpenLayers
  const olCoord = fromLonLat(coord);
  
  // Criando um objeto de característica (feature) com base na geometria do ponto
  const marker = new Feature({
    geometry: new Point(olCoord),
  });
  
  // Adicionando um estilo ao marcador
  marker.setStyle(new Style({
    image: new Icon({
      anchor: [0.5, 1], // Definindo o ponto de ancoragem do ícone
      src: 'https://openlayers.org/theme/img/logo-dark.svg', // URL da imagem do ícone
    }),
  }));
  
  // Adicionando o marcador à fonte de dados vetoriais
  vectorSource.addFeature(marker);
}

// Exemplo de adicionar um marcador em uma coordenada específica
addMarker([-12.230733484562657, -38.96933569139361]); // Adicionando um marcador no centro do mapa

// Você pode chamar a função addMarker com diferentes coordenadas para adicionar mais marcadores ao mapa
