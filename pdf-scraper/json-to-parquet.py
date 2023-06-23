from pyspark.sql import SparkSession

spark = SparkSession \
    .builder \
    .appName("JsonToParquetPysparkExample") \
    .getOrCreate()

json_df = spark.read.json("combined.json", multiLine=True,) 
json_df.printSchema()
json_df.write.parquet("combined.parquet")
