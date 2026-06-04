import { Router } from "express";
import { encontrarMelhorRota, encontrarRotasPossiveis } from "../services/rotaService";
import { listarCidades } from "../repositorio/cidade";

const router = Router();

router.get("/rota", async (req, res) => {
  try {
    const origem = String(req.query.origem ?? "");
    const destino = String(req.query.destino ?? "");

    if (!origem || !destino) {
      return res.status(400).json({
        error: "Informe origem e destino.",
      });
    }

    const cidades = await listarCidades();
    const cidadesPorNome = new Map(
      cidades.map((cidade) => [cidade.nome, cidade])
    );

    const melhorRotaBruta = await encontrarMelhorRota(origem, destino, "custo");
    const rotasPossiveisBrutas = await encontrarRotasPossiveis(origem, destino, 10, 6);

    const converterCaminho = (caminho: string[]) => {
      return caminho.map((nomeCidade) => {
        const cidade = cidadesPorNome.get(nomeCidade);

        if (!cidade) {
          throw new Error(`Cidade não encontrada: ${nomeCidade}`);
        }

        return {
          nome: cidade.nome,
          latitude: cidade.latitude,
          longitude: cidade.longitude,
        };
      });
    };

    const melhorRota = {
      caminho: converterCaminho(melhorRotaBruta.caminho),
      custoTotal: Number(melhorRotaBruta.custoTotal.toFixed(2)),
      distanciaTotal: Number(melhorRotaBruta.distanciaTotal.toFixed(2)),
      tempoTotal: Number(melhorRotaBruta.tempoTotal.toFixed(2)),
    };

    const rotasPossiveis = rotasPossiveisBrutas.map((rota) => ({
      caminho: converterCaminho(rota.caminho),
      custoTotal: Number(rota.custoTotal.toFixed(2)),
      distanciaTotal: Number(rota.distanciaTotal.toFixed(2)),
      tempoTotal: Number(rota.tempoTotal.toFixed(2)),
    }));

    return res.json({
      melhorRota,
      rotasPossiveis,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao calcular rota",
    });
  }
});

export default router;