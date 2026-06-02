import { Router } from "express";

const router = Router();

router.get("/rota", async (req, res) => {

  const origem = req.query.origem;
  const destino = req.query.destino;

  return res.json({
    caminho: [
      {
        nome: String(origem),
        latitude: -23.55052,
        longitude: -46.633308
      },
      {
        nome: "Brasília",
        latitude: -15.793889,
        longitude: -47.882778
      },
      {
        nome: String(destino),
        latitude: -12.971111,
        longitude: -38.510833
      }
    ],
    custoTotal: 580,
    distanciaTotal: 1450,
    tempoTotal: 190
  });
});

export default router;