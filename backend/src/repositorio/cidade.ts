import { pool } from "../db/pool";

export interface Cidade {
  id: number;
  nome: string;
  latitude: number;
  longitude: number;
}

export async function listarCidades(): Promise<Cidade[]> {
  const { rows } = await pool.query(`
    SELECT id, nome, latitude, longitude
    FROM cidades
    ORDER BY nome
  `);

  return rows;
}