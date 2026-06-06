import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import type { ResultadoRota } from "../types/route";

import "leaflet/dist/leaflet.css";

interface Props {
  rota: ResultadoRota | null;
  rotasPossiveis: ResultadoRota[];
}

export function MapView({ rota, rotasPossiveis }: Props) {
  const centro: LatLngExpression = [-15.79, -47.88];

  const pontosMelhorRota =
    rota?.caminho.map(
      (cidade) => [cidade.latitude, cidade.longitude] as [number, number],
    ) ?? [];

  return (
    <MapContainer
      center={centro}
      zoom={4}
      style={{ width: "100%", height: "100vh" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {rotasPossiveis.map((rotaPossivel, index) => (
        <Polyline
          key={`rota-vermelha-${index}`}
          positions={rotaPossivel.caminho.map(
            (cidade) => [cidade.latitude, cidade.longitude] as [number, number],
          )}
          pathOptions={{
            color: "#ef4444",
            weight: 3,
            opacity: 0.35,
          }}
        >
          <Popup>
            <div className="route-popup">
              <div className="popup-header">✈️ Rota Alternativa</div>

              <div className="popup-body">
                <p>
                  <strong>Caminho:</strong>
                </p>

                <p>
                  {rotaPossivel.caminho
                    .map((cidade) => cidade.nome)
                    .join(" → ")}
                </p>

                <hr />

                <p>
                  <strong>💰 Custo:</strong> R${" "}
                  {rotaPossivel.custoTotal.toFixed(2)}
                </p>

                <p>
                  <strong>📏 Distância:</strong>{" "}
                  {rotaPossivel.distanciaTotal.toFixed(2)} km
                </p>

                <p>
                  <strong>⏱ Tempo:</strong> {rotaPossivel.tempoTotal.toFixed(0)}{" "}
                  min
                </p>
              </div>
            </div>
          </Popup>
        </Polyline>
      ))}

      {pontosMelhorRota.length > 1 && (
        <Polyline
          positions={pontosMelhorRota}
          pathOptions={{
            color: "#2563eb",
            weight: 5,
            opacity: 1,
          }}
        />
      )}

      {rota?.caminho.map((cidade) => (
        <Marker
          key={cidade.nome}
          position={[cidade.latitude, cidade.longitude]}
        >
          <Popup>{cidade.nome}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
