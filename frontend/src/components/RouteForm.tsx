import type { Cidade } from "../types/route";

interface Props {
  cidades: Cidade[];

  origem: string;
  destino: string;

  setOrigem: (value: string) => void;
  setDestino: (value: string) => void;

  buscarRota: () => void;
}

export function RouteForm({
  cidades,
  origem,
  destino,
  setOrigem,
  setDestino,
  buscarRota,
}: Props) {
  return (
    <div>
      <h2>Consulta de Rotas</h2>

      <div>
        <label>Origem</label>

        <select
          value={origem}
          onChange={(e) => setOrigem(e.target.value)}
        >
          {cidades.map((cidade) => (
            <option
              key={cidade.id}
              value={cidade.nome}
            >
              {cidade.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Destino</label>

        <select
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        >
          {cidades
            .filter((cidade) => cidade.nome !== origem)
            .map((cidade) => (
              <option
                key={cidade.id}
                value={cidade.nome}
              >
                {cidade.nome}
              </option>
            ))}
        </select>
      </div>

      <button onClick={buscarRota}>
        Buscar rota
      </button>
    </div>
  );
}