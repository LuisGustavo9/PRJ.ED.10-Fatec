import { useEffect, useState } from "react";

import { api } from "./services/api";

import type {
  Cidade,
  ResultadoRota,
} from "./types/route";

import { RouteForm } from "./components/RouteForm";
import { RouteInfo } from "./components/RouteInfo";
import { MapView } from "./components/MapView";

import "./App.css";

export default function App() {
  const [cidades, setCidades] =
    useState<Cidade[]>([]);

  const [origem, setOrigem] =
    useState("");

  const [destino, setDestino] =
    useState("");

  const [rota, setRota] =
    useState<ResultadoRota | null>(null);

  useEffect(() => {
    async function carregarCidades() {
      try {
        const response = await api.get("/cidades");

        const lista = response.data;

        setCidades(lista);

        if (lista.length >= 2) {
          setOrigem(lista[0].nome);
          setDestino(lista[1].nome);
        }
      } catch (error) {
        console.error(error);
      }
    }

    carregarCidades();
  }, []);

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
          cidades={cidades}
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