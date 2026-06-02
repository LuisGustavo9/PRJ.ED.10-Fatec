import { pool } from "../db/pool";

export interface RotaDB {
  origem: string;
  destino: string;
  custo: number;
  tempo: number;
  distancia_km: number;
}

export async function listarRotas(): Promise<RotaDB[]> {
  const { rows } = await pool.query(`
    SELECT
      c1.nome AS origem,
      c2.nome AS destino,
      r.custo::float8 AS custo,
      COALESCE(r.tempo_min, 0)::float8 AS tempo,
      (ST_Distance(c1.geom, c2.geom) / 1000.0)::float8 AS distancia_km
    FROM rotas r
    JOIN cidades c1 ON c1.id = r.origem_id
    JOIN cidades c2 ON c2.id = r.destino_id
    ORDER BY c1.nome, c2.nome
  `);

  return rows;
}