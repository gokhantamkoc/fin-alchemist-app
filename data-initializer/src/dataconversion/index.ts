import { convertCsvToParquet } from "./data_convertor.js";
import { readParquet } from "./data_reader.js";

// await convertCsvToParquet("raw/nyse-stocks-stocks.csv");
// await convertCsvToParquet("raw/nasdaq-stocks-stocks.csv");
// await convertCsvToParquet("raw/etf-list.csv");

readParquet("processed/TSM_Income_Statement.parquet");