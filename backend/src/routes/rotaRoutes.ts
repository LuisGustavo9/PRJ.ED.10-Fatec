import { Router } from "express";
import { encontrarMelhorRota } from "../services/rotaService";
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

    const resultado = await encontrarMelhorRota(
      origem,
      destino,
      "custo"
    );

    const cidades = await listarCidades();

    const cidadesPorNome = new Map(
      cidades.map((cidade) => [cidade.nome, cidade])
    );

    const caminho = resultado.caminho.map((nomeCidade) => {
      const cidade = cidadesPorNome.get(nomeCidade);

      if (!cidade) {
        throw new Error(
          `Cidade não encontrada: ${nomeCidade}`
        );
      }

      return {
        nome: cidade.nome,
        latitude: cidade.latitude,
        longitude: cidade.longitude,
      };
    });

    return res.json({
      caminho,
      custoTotal: Number(
        resultado.custoTotal.toFixed(2)
      ),
      distanciaTotal: Number(
        resultado.distanciaTotal.toFixed(2)
      ),
      tempoTotal: Number(
        resultado.tempoTotal.toFixed(2)
      ),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao calcular rota",
    });
  }
});

export default router;