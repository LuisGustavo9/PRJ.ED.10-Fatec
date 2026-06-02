import type { ResultadoRota } from "../types/route";

interface Props {
  rota: ResultadoRota | null;
}

export function RouteInfo({ rota }: Props) {
  if (!rota) return null;

  return (
    <div className="route-info">
      <h3>Resultado</h3>

      <p>
        <strong>Caminho:</strong>
      </p>

      <p>
        {rota.caminho.map((c) => c.nome).join(" → ")}
      </p>

      <p>
        <strong>Custo:</strong> R$ {rota.custoTotal}
      </p>

      <p>
        <strong>Distância:</strong> {rota.distanciaTotal.toFixed(2)} km
      </p>

      <p>
        <strong>Tempo:</strong> {rota.tempoTotal.toFixed(0)} min
      </p>
    </div>
  );
}