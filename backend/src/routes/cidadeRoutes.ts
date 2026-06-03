import { Router } from "express";
import { listarCidades } from "../repositorio/cidade";

const router = Router();

router.get("/cidades", async (_req, res) => {
  try {
    const cidades = await listarCidades();

    return res.json(cidades);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao listar cidades",
    });
  }
});

export default router;