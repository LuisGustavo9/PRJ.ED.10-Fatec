import { Graph, Peso } from "../graph/Graph";

export interface ResultadoRota {
  caminho: string[];
  pesoTotal: number;
  custoTotal: number;
  distanciaTotal: number;
  tempoTotal: number;
}

export function dijkstra(
  graph: Graph,
  start: string,
  destination: string,
  criterio: Peso = "custo"
): ResultadoRota {
  const vertices = graph.getVertices();

  if (!vertices.includes(start)) {
    throw new Error(`Origem "${start}" não existe no grafo.`);
  }

  if (!vertices.includes(destination)) {
    throw new Error(`Destino "${destination}" não existe no grafo.`);
  }

  const dist: Record<string, number> = {};
  const prev: Record<string, string | null> = {};
  const visited = new Set<string>();

  for (const v of vertices) {
    dist[v] = Number.POSITIVE_INFINITY;
    prev[v] = null;
  }

  dist[start] = 0;

  while (true) {
    let current: string | null = null;
    let minDist = Number.POSITIVE_INFINITY;

    for (const v of vertices) {
      if (!visited.has(v) && dist[v] < minDist) {
        minDist = dist[v];
        current = v;
      }
    }

    if (current === null) break;
    if (current === destination) break;

    visited.add(current);

    for (const edge of graph.getNeighbors(current)) {
      const pesoAresta = edge[criterio];
      const novoCusto = dist[current] + pesoAresta;

      if (novoCusto < dist[edge.to]) {
        dist[edge.to] = novoCusto;
        prev[edge.to] = current;
      }
    }
  }

  if (dist[destination] === Number.POSITIVE_INFINITY) {
    throw new Error(`Não foi possível encontrar caminho de "${start}" até "${destination}".`);
  }

  const caminho: string[] = [];
  let atual: string | null = destination;

  while (atual !== null) {
    caminho.unshift(atual);
    atual = prev[atual];
  }

  let custoTotal = 0;
  let distanciaTotal = 0;
  let tempoTotal = 0;

  for (let i = 0; i < caminho.length - 1; i++) {
    const edge = graph.getEdge(caminho[i], caminho[i + 1]);
    if (!edge) {
      throw new Error(`Aresta inválida entre "${caminho[i]}" e "${caminho[i + 1]}".`);
    }

    custoTotal += edge.custo;
    distanciaTotal += edge.distancia;
    tempoTotal += edge.tempo;
  }

  return {
    caminho,
    pesoTotal: dist[destination],
    custoTotal,
    distanciaTotal,
    tempoTotal
  };
}