-- CreateTable
CREATE TABLE "Farmer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "document" BIGINT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "totalArea" DOUBLE PRECISION NOT NULL,
    "agriculturalArea" DOUBLE PRECISION NOT NULL,
    "vegetationArea" DOUBLE PRECISION NOT NULL,
    "plantedCrops" TEXT[],

    CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_name_key" ON "Farmer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_farmName_key" ON "Farmer"("farmName");

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_document_key" ON "Farmer"("document");

-- SEEDING 

INSERT INTO "Farmer" ("name", "farmName", "document", "city", "state", "totalArea", "agriculturalArea", "vegetationArea", "plantedCrops")
VALUES
  ('João Silva', 'Fazenda Esperança', 12345678901, 'Campinas', 'SP', 100.0, 30.0, 20.0, '{"corn", "coffee", "cotton"}'),
  ('Maria Santos', 'Fazenda Progresso', 23456789012, 'Uberlândia', 'MG', 150.0, 40.0, 30.0, '{"sugar_cane", "corn"}'),
  ('Carlos Oliveira', 'Fazenda Aurora', 34567890123, 'Belo Horizonte', 'MG', 200.0, 50.0, 40.0, '{"coffee"}'),
  ('Ana Rocha', 'Fazenda Harmonia', 45678901234, 'Recife', 'PE', 250.0, 60.0, 50.0, '{"cotton"}'),
  ('Lucas Pereira', 'Fazenda Sol Nascente', 56789012345, 'Brasília', 'DF', 180.0, 40.0, 20.0, '{"corn", "coffee"}'),
  ('Isabela Almeida', 'Fazenda Doce Vida', 67890123456, 'Curitiba', 'PR', 120.0, 30.0, 20.0, '{"coffee"}'),
  ('Eduardo Costa', 'Fazenda Verdejante', 78901234567, 'Fortaleza', 'CE', 220.0, 70.0, 50.0, '{"sugar_cane", "corn", "coffee"}'),
  ('Camila Lima', 'Fazenda Dourada', 89012345678, 'Porto Alegre', 'RS', 300.0, 80.0, 60.0, '{"corn", "cotton"}'),
  ('Gustavo Pereira', 'Fazenda Abundante', 90123456789, 'São Paulo', 'SP', 180.0, 50.0, 30.0, '{"sugar_cane", "coffee"}'),
  ('Laura Mendes', 'Fazenda Vista Café', 12345098765, 'Salvador', 'BA', 250.0, 60.0, 40.0, '{"coffee"}'),
  ('Vinícius Santos', 'Fazenda Algodão Real', 98765432101, 'Goiânia', 'GO', 120.0, 40.0, 20.0, '{"cotton"}'),
  ('Juliana Costa', 'Fazenda Serenidade', 87654321012, 'Manaus', 'AM', 180.0, 50.0, 30.0, '{"sugar_cane"}'),
  ('Rafael Oliveira', 'Fazenda Do Café', 76543210987, 'Porto Velho', 'RO', 200.0, 60.0, 40.0, '{"coffee", "corn"}');
