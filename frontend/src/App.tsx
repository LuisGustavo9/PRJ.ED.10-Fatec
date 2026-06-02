import { useState } from "react";

import { api } from "./services/api";

import type { ResultadoRota } from "./types/route";

import { RouteForm } from "./components/RouteForm";
import { RouteInfo } from "./components/RouteInfo";
import { MapView } from "./components/MapView";

import "./App.css";

export default function App() {
  const [origem, setOrigem] = useState("São Paulo");

  const [destino, setDestino] = useState("Salvador");

  const [rota, setRota] =
    useState<ResultadoRota | null>(null);

  async function buscarRota() {
    try {
      const response = await api.get("/rota", {
        params: {
          origem,
          destino,
        },
      });

      setRota(response.data);
    } catch (error) {
      console.error(error);

      alert("Erro ao buscar rota");
    }
  }

  return (
    <div className="container">
      <aside className="sidebar">
        <RouteForm
          origem={origem}
          destino={destino}
          setOrigem={setOrigem}
          setDestino={setDestino}
          buscarRota={buscarRota}
        />

        <RouteInfo rota={rota} />
      </aside>

      <main>
        <MapView rota={rota} />
      </main>
    </div>
  );
}

