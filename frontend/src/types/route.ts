export interface Cidade {
  id: number;
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

export interface RespostaRota {
  melhorRota: ResultadoRota;
  rotasPossiveis: ResultadoRota[];
}