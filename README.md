# Fin Alchemist App

## Technologies

- Frontend
    - NodeJS (>= 22.19.0)
    - Typescript
    - Vite
    - React
    - Electron
- Backend
    - n8n
    - mongodb
- Infrastructure
    - Local
        - Docker Compose


## How to Backup Data From MongoDB Container

- **Exchanges**

```Shell
docker exec -i fin_alchemist_app_mongodb mongoexport --authenticationDatabase admin -u ****** -p ****** --db main --collection exchanges --type=csv --fields _id,name,status,country,exchangeId,createdAt,updatedAt | gzip > exchanges.csv
```

- **Stocks**
```Shell
docker exec -i fin_alchemist_app_mongodb mongoexport --authenticationDatabase admin -u ****** -p ****** --db main --collection stocks --type=csv --fields _id,symbol,name,exchangeId,status,sector,stockId,createdAt,updatedAt | gzip > stocks.csv
```
