BEGIN;

TRUNCATE TABLE rotas, cidades RESTART IDENTITY CASCADE;

INSERT INTO cidades (nome, latitude, longitude, geom) VALUES
('São Paulo',        -23.550520, -46.633308, ST_SetSRID(ST_MakePoint(-46.633308, -23.550520), 4326)::geography),
('Rio de Janeiro',   -22.906847, -43.172897, ST_SetSRID(ST_MakePoint(-43.172897, -22.906847), 4326)::geography),
('Brasília',         -15.793889, -47.882778, ST_SetSRID(ST_MakePoint(-47.882778, -15.793889), 4326)::geography),
('Salvador',         -12.977749, -38.501630, ST_SetSRID(ST_MakePoint(-38.501630, -12.977749), 4326)::geography),
('Belo Horizonte',   -19.916681, -43.934493, ST_SetSRID(ST_MakePoint(-43.934493, -19.916681), 4326)::geography),
('Curitiba',         -25.428356, -49.273251, ST_SetSRID(ST_MakePoint(-49.273251, -25.428356), 4326)::geography),
('Porto Alegre',     -30.034647, -51.217659, ST_SetSRID(ST_MakePoint(-51.217659, -30.034647), 4326)::geography),
('Recife',           -8.047562,  -34.876964, ST_SetSRID(ST_MakePoint(-34.876964, -8.047562), 4326)::geography),
('Fortaleza',        -3.731862,  -38.526669, ST_SetSRID(ST_MakePoint(-38.526669, -3.731862), 4326)::geography),
('Manaus',           -3.119028,  -60.021731, ST_SetSRID(ST_MakePoint(-60.021731, -3.119028), 4326)::geography),
('Belém',            -1.455833,  -48.503889, ST_SetSRID(ST_MakePoint(-48.503889, -1.455833), 4326)::geography),
('Goiânia',          -16.686891, -49.264794, ST_SetSRID(ST_MakePoint(-49.264794, -16.686891), 4326)::geography),
('Florianópolis',    -27.594870, -48.548220, ST_SetSRID(ST_MakePoint(-48.548220, -27.594870), 4326)::geography),
('Campinas',         -22.909938, -47.062633, ST_SetSRID(ST_MakePoint(-47.062633, -22.909938), 4326)::geography),
('Vitória',          -20.315500, -40.312800, ST_SetSRID(ST_MakePoint(-40.312800, -20.315500), 4326)::geography),
('Natal',            -5.794480,  -35.211000, ST_SetSRID(ST_MakePoint(-35.211000, -5.794480), 4326)::geography),
('João Pessoa',      -7.119500,  -34.845000, ST_SetSRID(ST_MakePoint(-34.845000, -7.119500), 4326)::geography),
('Cuiabá',           -15.601000, -56.097000, ST_SetSRID(ST_MakePoint(-56.097000, -15.601000), 4326)::geography),
('Porto Velho',      -8.760770,  -63.899900, ST_SetSRID(ST_MakePoint(-63.899900, -8.760770), 4326)::geography),
('Macapá',           0.034934,   -51.069420, ST_SetSRID(ST_MakePoint(-51.069420, 0.034934), 4326)::geography);

WITH rotas_calculadas AS (
    SELECT
        c1.id AS origem_id,
        c2.id AS destino_id,

        ROUND(
            (
                (
                    ST_Distance(c1.geom, c2.geom) / 1000.0
                ) *
                (
                    CASE
                        WHEN c1.nome IN ('São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte', 'Salvador', 'Recife', 'Fortaleza', 'Campinas')
                         AND c2.nome IN ('São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte', 'Salvador', 'Recife', 'Fortaleza', 'Campinas')
                            THEN 0.72
                        WHEN c1.nome IN ('São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte', 'Salvador', 'Recife', 'Fortaleza', 'Campinas')
                          OR c2.nome IN ('São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte', 'Salvador', 'Recife', 'Fortaleza', 'Campinas')
                            THEN 0.86
                        ELSE 1.00
                    END
                ) * 0.22 + 65
            )::numeric,
            2
        ) AS custo,

        ROUND(
            (
                (
                    (ST_Distance(c1.geom, c2.geom) / 1000.0) / 850.0 * 60.0
                ) *
                (
                    CASE
                        WHEN c1.nome IN ('São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte', 'Salvador', 'Recife', 'Fortaleza', 'Campinas')
                         AND c2.nome IN ('São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte', 'Salvador', 'Recife', 'Fortaleza', 'Campinas')
                            THEN 0.78
                        WHEN c1.nome IN ('São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte', 'Salvador', 'Recife', 'Fortaleza', 'Campinas')
                          OR c2.nome IN ('São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte', 'Salvador', 'Recife', 'Fortaleza', 'Campinas')
                            THEN 0.90
                        ELSE 1.00
                    END
                ) + 35
            )::numeric,
            2
        ) AS tempo_min

    FROM cidades c1
    JOIN cidades c2
      ON c1.id < c2.id
)
INSERT INTO rotas (origem_id, destino_id, custo, tempo_min)
SELECT origem_id, destino_id, custo, tempo_min
FROM rotas_calculadas;

COMMIT;