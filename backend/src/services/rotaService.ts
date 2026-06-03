import { Graph, Peso } from "../graph/Graph";
import { dijkstra, ResultadoRota } from "../algor/dijkstra";
import { listarCidades } from "../repositorio/cidade";
import { listarRotas } from "../repositorio/rotaRepositorio";

export async function encontrarMelhorRota(
  origem: string,
  destino: string,
  criterio: Peso = "custo"
): Promise<ResultadoRota> {
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

  return dijkstra(graph, origem, destino, criterio);
}