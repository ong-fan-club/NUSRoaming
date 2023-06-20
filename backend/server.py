from fastapi import FastAPI
import duckdb
# import pandas as pd
import uvicorn

app = FastAPI()

# Assume Parquet file is in the same directory
parquet_file = 'mappings.parquet'
# df = pd.read_parquet(parquet_file)

conn = duckdb.connect(database=':memory:', read_only=False)

conn.execute("""
create table mappings 
    as select 
        \"A\" as faculty,
        \"B\" as partner_uni,
        \"C\" as partner_course_code,
        \"D\" as partner_course_title,
        \"I\" as nus_course_code,
        \"J\" as nus_course_title,
    from read_parquet('mappings.parquet');
""")

conn.execute("""
create table partner_unis as select * from 'combined.json';
""")

print(conn.execute("select * from partner_unis;").fetch_df().to_dict())

@app.on_event("shutdown")
def disconnect_db():
    conn.close()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/query")
async def run_arbitrary_query_dev_only(query: str):
    try:
        result = conn.execute(query).fetchdf()
        result = result.fillna('')
        return result.to_dict('records')
    except Exception as e:
        return {"error": str(e)}

# endpoint to query all mapped courses from a given university
@app.get("/partner_unis/{partner_uni}/mappings")
async def get_mappings(partner_uni: str):
    try:
        result = conn.execute(f"select * from mappings where partner_uni = ?", [partner_uni]).fetchdf()
        result = result.fillna('')
        return result.to_dict('records')
    except Exception as e:
        return {"error": str(e)}

# endpoint to query all mapped courses from all universities in a given country
@app.get("/mappings/countries/{country}")
async def get_mappings_by_country(country: str):
    print("hi im here")
    try:
        result = conn.execute(f"select * from mappings where partner_uni in (select university_name from partner_unis where university_country = ? )", [country]).fetchdf()
        result = result.fillna('')
        print(result.to_dict())
        return result.to_dict('records')
    except Exception as e:
        return {"error": str(e)}

# endpoint to query all universities from a given country
@app.get("/partner_unis/{country}")
async def get_universities_by_country(country: str):
    print("called here")
    try:
        result = conn.execute(f"select * from partner_unis where university_country = ?", [country]).fetchdf()
        result = result.fillna('')
        return result.to_dict('records')
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
