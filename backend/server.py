from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import graphene
from starlette_graphene3 import GraphQLApp
import uvicorn
import duckdb
import pandas as pd

# Create a FastAPI instance
app = FastAPI()

# Enable CORS (Cross-Origin Resource Sharing) to allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a GraphQL schema
class Query(graphene.ObjectType):
    hello = graphene.String()

    def resolve_hello(self, info):
        return "Hello, GraphQL World!"

# Bind the GraphQL schema to the '/graphql' endpoint
app.add_route("/graphql", GraphQLApp(schema=graphene.Schema(query=Query)))

# Define a REST endpoint
@app.get("/rest")
def hello_rest():
    conn = duckdb.connect(database=':memory:')
    query = 'SELECT * FROM parquet_scan(\'../mapping-fetcher-scripts/parqs/soc\') LIMIT 1'
    result = conn.execute(query)
    df = pd.DataFrame(result.fetchall(), columns=result.description)
    print(df.to_dict(orient='records')[0])
    conn.close()

    return "Hello, REST World!"


# Run the FastAPI application
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
