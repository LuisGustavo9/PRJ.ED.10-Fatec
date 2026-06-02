export interface Cidade {
  nome: string;
  latitude: number;
  longitude: number;
}

export interface ResultadoRota {
  caminho: Cidade[];
  custoTotal: number;
  distanciaTotal: number;
  tempoTotal: number;
}