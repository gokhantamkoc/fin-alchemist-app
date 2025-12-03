import {
    DuckDBInstance as duckDBInstance 
} from '@duckdb/node-api';


export const convertCsvToParquet = async (csvFilePath: string) => {
    const dataName = csvFilePath
        .replace("raw/", "")
        .replace(".csv", "");
    const parquetFilePath = csvFilePath
        .replace("raw/", "processed/")
        .replace(".csv", ".parquet");
    const insNYSEStocksCSV = await duckDBInstance.create(csvFilePath);
    const connCSV = await insNYSEStocksCSV.connect();
    console.log(`connection created!`)

    const prepared = await connCSV.prepare(
        `
        SELECT *
        FROM read_csv($1,
        delim = $2,
        header = $3);
        `
    )

    prepared.bindVarchar(1, csvFilePath);
    prepared.bindVarchar(2, ',');
    prepared.bindBoolean(3, true);

    const resCSV = await prepared.run()
    let rowsCSV = await resCSV.getRows()

    if (rowsCSV.length > 0) {
        // convert to parquet
        const prepared = await connCSV.prepare(
            `
            COPY 
            (
                SELECT *
                FROM read_csv($1,
                delim = $2,
                header = $3)
            ) TO $4 (
                FORMAT parquet,
                COMPRESSION zstd,
                ROW_GROUP_SIZE 1_000
            );
            `
        )
        prepared.bindVarchar(1, csvFilePath);
        prepared.bindVarchar(2, ',');
        prepared.bindBoolean(3, true);
        prepared.bindVarchar(
            4, 
            parquetFilePath
        );
        await prepared.run();
    }

    const insNYSEStocksParq = await duckDBInstance.create(parquetFilePath);
    const connParq = await insNYSEStocksParq.connect();

    const preparedParq = await connParq.prepare(
        `
        SELECT 
            *
        FROM read_parquet($1);
        `
    )
    preparedParq.bindVarchar(1, parquetFilePath);

    const resParq = await preparedParq.run()
    let rowsParq = await resParq.getRows();

    if (rowsCSV.length === rowsParq.length) {
        console.log(`${dataName}: csv converted to parquet`)
    }
    
    insNYSEStocksCSV.closeSync();
    insNYSEStocksParq.closeSync();
}