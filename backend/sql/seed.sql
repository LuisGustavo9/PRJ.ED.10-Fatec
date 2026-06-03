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
('Goiânia',          -16.686891, -49.264794, ST_SetSRID(ST_MakePoint(-49.264794, -16.686891), 4326)::geography);

WITH rotas_base(origem, destino) AS (
    VALUES
        -- Sudeste / Centro-Oeste
        ('São Paulo', 'Rio de Janeiro'),
        ('São Paulo', 'Belo Horizonte'),
        ('São Paulo', 'Brasília'),
        ('São Paulo', 'Curitiba'),
        ('São Paulo', 'Goiânia'),

        ('Rio de Janeiro', 'Belo Horizonte'),
        ('Rio de Janeiro', 'Brasília'),
        ('Rio de Janeiro', 'Salvador'),

        ('Belo Horizonte', 'Brasília'),
        ('Belo Horizonte', 'Goiânia'),
        ('Belo Horizonte', 'Curitiba'),
        ('Belo Horizonte', 'Salvador'),

        ('Brasília', 'Goiânia'),
        ('Brasília', 'Salvador'),
        ('Brasília', 'Recife'),
        ('Brasília', 'Fortaleza'),
        ('Brasília', 'Belém'),

        ('Curitiba', 'Porto Alegre'),
        ('Curitiba', 'São Paulo'),
        ('Curitiba', 'Belo Horizonte'),

        ('Porto Alegre', 'Curitiba'),
        ('Porto Alegre', 'São Paulo'),

        -- Nordeste
        ('Salvador', 'Recife'),
        ('Salvador', 'Fortaleza'),
        ('Salvador', 'Rio de Janeiro'),

        ('Recife', 'Fortaleza'),
        ('Recife', 'Belém'),
        ('Recife', 'Brasília'),

        ('Fortaleza', 'Belém'),
        ('Fortaleza', 'Manaus'),
        ('Fortaleza', 'Brasília'),

        -- Norte
        ('Belém', 'Manaus'),
        ('Belém', 'Brasília'),

        ('Manaus', 'Belém'),
        ('Manaus', 'Fortaleza')
),
rotas_calculadas AS (
    SELECT
        c1.id AS origem_id,
        c2.id AS destino_id,
        ROUND((((ST_Distance(c1.geom, c2.geom) / 1000.0) * 0.20 + 70)::numeric), 2) AS custo,
        ROUND((((ST_Distance(c1.geom, c2.geom) / 1000.0) / 850.0 * 60.0 + 35)::numeric), 2) AS tempo_min
    FROM rotas_base rb
    JOIN cidades c1 ON c1.nome = rb.origem
    JOIN cidades c2 ON c2.nome = rb.destino
)
INSERT INTO rotas (origem_id, destino_id, custo, tempo_min)
SELECT origem_id, destino_id, custo, tempo_min
FROM rotas_calculadas;

COMMIT;