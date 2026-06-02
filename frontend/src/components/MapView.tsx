import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import type { ResultadoRota } from "../types/route";
import "leaflet/dist/leaflet.css";

interface Props {
  rota: ResultadoRota | null;
}

export function MapView({ rota }: Props) {
  const center: LatLngExpression = [-15.79, -47.88];

  const pontos: LatLngExpression[] =
    rota?.caminho.map((cidade) => [cidade.latitude, cidade.longitude]) ?? [];

  return (
    <MapContainer
      center={center}
      zoom={4}
      style={{ width: "100%", height: "100vh" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {rota?.caminho.map((cidade) => (
        <Marker
          key={cidade.nome}
          position={[cidade.latitude, cidade.longitude]}
        >
          <Popup>{cidade.nome}</Popup>
        </Marker>
      ))}

      {pontos.length > 1 && <Polyline positions={pontos} />}
    </MapContainer>
  );
}