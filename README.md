# NUSRoaming

### Architecture

```mermaid
graph LR

    subgraph Web App

        subgraph Frontend
            FE[React App with Tailwind CSS]
        end

        subgraph Backend
            BE[FastAPI Server]
            DB[In-Memory DuckDB Instance]
            BE <--> DB
        end
    end

    subgraph Data Lake
        subgraph S3[Amazon S3]
            P1((Parquet File 1))
            P2((Parquet File 2))
            P3((Parquet File N))
        end
    end

    subgraph Mapping Fetcher
        subgraph LA[AWS Lambda Scheduled Event]
            P4[Python + Selenium Scraper]
        end
    end

    BE <-->|REST/GraphQL| FE
    BE -->|REST| S3
    LA -->|REST| S3
    LA -->|REST| BE

    classDef aws fill:#FF9900
    class S3,LA aws
    style S3 color:#000000
    style LA color:#000000
```