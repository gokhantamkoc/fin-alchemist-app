import {
    DuckDBInstance as duckDBInstance 
} from '@duckdb/node-api';


export const readParquet = async (parquetFilePath: string) => {
    const dataName = parquetFilePath
        .replace("processed/", "")
        .replace(".parquet", "");
    console.log(`======== ${dataName} ========`)
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
    let headers = resParq.columnNames();
    let rowsParq = await resParq.getRows();

    console.log(headers.join(","))

    rowsParq.forEach(row => {
        console.log(row.join(","))
    });

    insNYSEStocksParq.closeSync();
}