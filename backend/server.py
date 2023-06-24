from fastapi import FastAPI
import duckdb
# import pandas as pd
import uvicorn

app = FastAPI()

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
create table partner_unis as 
    (select * from 'combined.json' as t1 join 'gpt-info-combined.json' as t2 on t1.university_name=t2.university_name);
""")

# print(conn.execute("select * from partner_unis;").fetch_df().to_dict())

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
@app.get("/mappings/partner_uni/{partner_uni}")
async def get_mappings(partner_uni: str):
    try:
        result = conn.execute(f"select * from mappings where partner_uni = ?", [partner_uni]).fetchdf()
        result = result.fillna('')
        return result.to_dict('records')
    except Exception as e:
        return {"error": str(e)}

@app.get("/partner_unis/group_by_first_letter")
async def get_universities_group_by_first_letter():
    try:
        result = conn.execute(f"SELECT LIST(university_name ORDER BY university_name) as university_names, university_name[:1] as first_letter FROM partner_unis GROUP BY 2 ORDER BY 2").fetchdf()
        result = result.fillna('')
        return result.to_dict('records')
    except Exception as e:
        return {"error": str(e)}

# endpoint to get all non-mapping information about a given university
@app.get("/partner_unis/partner_uni/{university_name}")
async def get_university(university_name: str):
    try:
        result = conn.execute(f"select * from partner_unis where university_name = ?", [university_name]).fetchdf()
        result = result.fillna('')
        return result.to_dict('records')
    except Exception as e:
        return {"error": str(e)}

# endpoint to query all mapped courses from all universities in a given country
@app.get("/mappings/countries/{country}")
async def get_mappings_by_country(country: str):
    try:
        result = conn.execute(f"select * from mappings where partner_uni in (select university_name from partner_unis where university_country = ? )", [country]).fetchdf()
        result = result.fillna('')
        print(result.to_dict())
        return result.to_dict('records')
    except Exception as e:
        return {"error": str(e)}

# endpoint to query all universities from a given country
@app.get("/partner_unis/country/{country}")
async def get_universities_by_country(country: str):
    try:
        result = conn.execute(f"select university_name from partner_unis where university_country = ?", [country]).fetchdf()
        result = result.fillna('')
        return result.to_dict('records')
    except Exception as e:
        return {"error": str(e)}

# endpoint to query top 10 countries with the most universities
@app.get("/get_popular_countries")
async def get_popular_countries():
    try:
        result = conn.execute(f"select university_country from (select university_country, count(*) as count from partner_unis group by university_country order by count desc limit 10)").fetchdf()
        result = result.fillna('')
        return result.to_dict('records')
    except Exception as e:
        return {"error": str(e)}

# endpoint to list all distinct countries
@app.get("/get_all_countries")
async def get_all_countries():
    try:
        result = conn.execute(f"select distinct university_country from partner_unis").fetchdf()
        result = result.fillna('')
        return result.to_dict('records')
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
