#


# Database Schemas

1. `mapping` table -- this should be pretty much set in stone and is exactly as-is from EduRec. There exist NULL values for some course codes and titles which will be read as empty strings.

| column_name          | column_type |
|----------------------|-------------|
| faculty              | VARCHAR     |
| partner_uni          | VARCHAR     |
| partner_course_code  | VARCHAR     |
| partner_course_title | VARCHAR     |
| nus_course_code      | VARCHAR     |
| nus_course_title     | VARCHAR     |

2. `partner_unis` table -- this isn't really set in stone and should be adjusted based on business requirements. The data isn't great (some empty some invalid) and cleaning / augmenting process will be carried out a bunch of times.

| column_name              | column_type  |
|--------------------------|--------------|
| university_name          | VARCHAR      |
| university_website       | VARCHAR[]    |
| university_country       | VARCHAR      |
| sem1_months              | VARCHAR[]    |
| sem2_months              | VARCHAR[]    |
| faculties_accepted       | JSON         |
| module_restrictions      | JSON         |
| visa_info                | JSON         |
| accommodations_info      | JSON         |
| cost_of_living           | JSON         |
| university_description   | VARCHAR      |
| university_address       | VARCHAR      |
| location_cost_of_living  | VARCHAR      |
| location_weather         | VARCHAR      |
| location_description     | VARCHAR      |
| location_crime           | VARCHAR      |
| location_transportation  | VARCHAR      |
| location_halal           | VARCHAR      |
| location_vegetarian      | VARCHAR      |
