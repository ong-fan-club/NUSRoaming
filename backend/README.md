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

| column_name              | column_type  | null |
|--------------------------|--------------|------|
| university_name          | VARCHAR      | YES  |
| university_website       | VARCHAR[]    | YES  |
| university_country       | VARCHAR      | YES  |
| sem1_months              | VARCHAR[]    | YES  |
| sem2_months              | VARCHAR[]    | YES  |
| faculties_accepted       | JSON         | YES  |
| module_restrictions      | JSON         | YES  |
| visa_info                | JSON         | YES  |
| accommodations_info      | JSON         | YES  |
| cost_of_living           | JSON         | YES  |
| university_description   | VARCHAR      | YES  |
| university_address       | VARCHAR      | YES  |
| location_cost_of_living  | VARCHAR      | YES  |
| location_weather         | VARCHAR      | YES  |
| location_description     | VARCHAR      | YES  |
| location_crime           | VARCHAR      | YES  |
| location_transportation  | VARCHAR      | YES  |
| location_halal           | VARCHAR      | YES  |
| location_vegetarian      | VARCHAR      | YES  |
