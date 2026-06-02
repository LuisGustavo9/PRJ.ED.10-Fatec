export type Peso = "custo" | "distancia" | "tempo";

export interface Aresta {
  to: string;
  custo: number;
  distancia: number;
  tempo: number;
}

export class Graph {
  private adj: Map<string, Aresta[]> = new Map();

  addVertex(v: string): void {
    if (!this.adj.has(v)) {
      this.adj.set(v, []);
    }
  }

  addEdge(
    from: string,
    to: string,
    data: Omit<Aresta, "to">,
    bidirectional = true
  ): void {
    this.addVertex(from);
    this.addVertex(to);

    this.adj.get(from)!.push({ to, ...data });

    if (bidirectional) {
      this.adj.get(to)!.push({
        to: from,
        ...data
      });
    }
  }

  getNeighbors(v: string): Aresta[] {
    return this.adj.get(v) ?? [];
  }

  getVertices(): string[] {
    return [...this.adj.keys()];
  }

  getEdge(from: string, to: string): Aresta | undefined {
    return this.getNeighbors(from).find((e) => e.to === to);
  }
}