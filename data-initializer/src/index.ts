import dotenv from "dotenv";
import express, { raw, type Request, type Response } from "express";

import fs from "fs";

import { DuckDBInstance as duckDBInstance } from "@duckdb/node-api";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({limit: '50mb'}));

app.post("/api/export", async (req: Request, res: Response) => {
  const rawData: object = req.body.data;
  const dataName: string = req.body.dataName;
  console.log("dataName", dataName);

  const jsonFilePath: string = `raw/${dataName}.json`;
  const exportParquetFilePath: string = `processed/${dataName}.parquet`;

  await fs.writeFile(jsonFilePath, JSON.stringify(rawData), "utf8", () => {
    console.log(`Data written to ${jsonFilePath} as JSON.`);
  });
  await fs.close(0);

  try {
    const parqData = await duckDBInstance.create();
    const parqConn = await parqData.connect();

    const prepared = await parqConn.prepare(
      `
                COPY 
                (
                    SELECT *
                    FROM read_json($1)
                ) TO $2 (
                    FORMAT parquet,
                    COMPRESSION zstd,
                    ROW_GROUP_SIZE 1_000
                );
                `
    );
    prepared.bindVarchar(1, jsonFilePath);
    prepared.bindVarchar(2, exportParquetFilePath);
    prepared.run();
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
