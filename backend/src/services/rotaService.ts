import { Graph, Peso } from "../graph/Graph";
import { dijkstra, ResultadoRota } from "../algor/dijkstra";
import { listarCidades } from "../repositorio/cidade";
import { listarRotas } from "../repositorio/rotaRepositorio";

export interface RotaPossivel {
  caminho: string[];
  custoTotal: number;
  distanciaTotal: number;
  tempoTotal: number;
}

interface EstadoCaminho {
  caminho: string[];
  custoTotal: number;
  distanciaTotal: number;
  tempoTotal: number;
}

async function montarGrafo(): Promise<Graph> {
  const cidades = await listarCidades();
  const rotas = await listarRotas();

  const graph = new Graph();

  for (const cidade of cidades) {
    graph.addVertex(cidade.nome);
  }

  for (const rota of rotas) {
    graph.addEdge(
      rota.origem,
      rota.destino,
      {
        custo: rota.custo,
        distancia: rota.distancia_km,
        tempo: rota.tempo,
      },
      true
    );
  }

  return graph;
}

function compararEstados(a: EstadoCaminho, b: EstadoCaminho): number {
  if (a.custoTotal !== b.custoTotal) {
    return a.custoTotal - b.custoTotal;
  }
  return a.caminho.length - b.caminho.length;
}

function encontrarRotasEntreOrigemDestino(
  graph: Graph,
  origem: string,
  destino: string,
  maxRotas = 10,
  maxParadas = 6
): RotaPossivel[] {
  const resultados: RotaPossivel[] = [];
  const fronteira: EstadoCaminho[] = [
    {
      caminho: [origem],
      custoTotal: 0,
      distanciaTotal: 0,
      tempoTotal: 0,
    },
  ];

  while (fronteira.length > 0 && resultados.length < maxRotas) {
    fronteira.sort(compararEstados);
    const atual = fronteira.shift()!;
    const ultimo = atual.caminho[atual.caminho.length - 1];

    if (ultimo === destino) {
      resultados.push({
        caminho: atual.caminho,
        custoTotal: atual.custoTotal,
        distanciaTotal: atual.distanciaTotal,
        tempoTotal: atual.tempoTotal,
      });
      continue;
    }

    if (atual.caminho.length > maxParadas + 1) {
      continue;
    }

    const vizinhos = graph.getNeighbors(ultimo).sort((a, b) => a.custo - b.custo);

    for (const vizinho of vizinhos) {
      if (atual.caminho.includes(vizinho.to)) {
        continue;
      }

      fronteira.push({
        caminho: [...atual.caminho, vizinho.to],
        custoTotal: atual.custoTotal + vizinho.custo,
        distanciaTotal: atual.distanciaTotal + vizinho.distancia,
        tempoTotal: atual.tempoTotal + vizinho.tempo,
      });
    }
  }

  return resultados.sort((a, b) => a.custoTotal - b.custoTotal);
}

export async function encontrarMelhorRota(
  origem: string,
  destino: string,
  criterio: Peso = "custo"
): Promise<ResultadoRota> {
  const graph = await montarGrafo();
  return dijkstra(graph, origem, destino, criterio);
}

export async function encontrarRotasPossiveis(
  origem: string,
  destino: string,
  maxRotas = 10,
  maxParadas = 6
): Promise<RotaPossivel[]> {
  const graph = await montarGrafo();
  return encontrarRotasEntreOrigemDestino(graph, origem, destino, maxRotas, maxParadas);
}