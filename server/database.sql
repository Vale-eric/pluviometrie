CREATE DATABASE pluviometrie;

CREATE TABLE pluvioday(
  pluvio_id SERIAL PRIMARY KEY,
  quantity NUMERIC(4,1),
  posting_date DATE NOT NULL DEFAULT CURRENT_DATE

);