INSERT INTO cidades (nome, latitude, longitude, geom) VALUES
('São Paulo', -23.550520, -46.633308, ST_SetSRID(ST_MakePoint(-46.633308, -23.550520), 4326)::geography),
('Rio de Janeiro', -22.906847, -43.172897, ST_SetSRID(ST_MakePoint(-43.172897, -22.906847), 4326)::geography),
('Brasília', -15.793889, -47.882778, ST_SetSRID(ST_MakePoint(-47.882778, -15.793889), 4326)::geography),
('Salvador', -12.977749, -38.501630, ST_SetSRID(ST_MakePoint(-38.501630, -12.977749), 4326)::geography)
ON CONFLICT (nome) DO NOTHING;

INSERT INTO rotas (origem_id, destino_id, custo, tempo_min)
SELECT c1.id, c2.id, 200.00, 60
FROM cidades c1, cidades c2
WHERE c1.nome = 'São Paulo' AND c2.nome = 'Rio de Janeiro'
ON CONFLICT DO NOTHING;

INSERT INTO rotas (origem_id, destino_id, custo, tempo_min)
SELECT c1.id, c2.id, 300.00, 90
FROM cidades c1, cidades c2
WHERE c1.nome = 'São Paulo' AND c2.nome = 'Brasília'
ON CONFLICT DO NOTHING;

INSERT INTO rotas (origem_id, destino_id, custo, tempo_min)
SELECT c1.id, c2.id, 250.00, 75
FROM cidades c1, cidades c2
WHERE c1.nome = 'Rio de Janeiro' AND c2.nome = 'Brasília'
ON CONFLICT DO NOTHING;

INSERT INTO rotas (origem_id, destino_id, custo, tempo_min)
SELECT c1.id, c2.id, 350.00, 120
FROM cidades c1, cidades c2
WHERE c1.nome = 'Rio de Janeiro' AND c2.nome = 'Salvador'
ON CONFLICT DO NOTHING;

INSERT INTO rotas (origem_id, destino_id, custo, tempo_min)
SELECT c1.id, c2.id, 280.00, 100
FROM cidades c1, cidades c2
WHERE c1.nome = 'Brasília' AND c2.nome = 'Salvador'
ON CONFLICT DO NOTHING;