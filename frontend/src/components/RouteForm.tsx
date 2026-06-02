interface Props {
  origem: string;
  destino: string;
  setOrigem: (v: string) => void;
  setDestino: (v: string) => void;
  buscarRota: () => void;
}

export function RouteForm({
  origem,
  destino,
  setOrigem,
  setDestino,
  buscarRota,
}: Props) {
  return (
    <div>
      <h2>Consulta de Rotas</h2>

      <div className="form-group">
        <label>Origem</label>
        <input
          value={origem}
          onChange={(e) => setOrigem(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Destino</label>
        <input
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />
      </div>

      <button onClick={buscarRota}>
        Buscar rota
      </button>
    </div>
  );
}