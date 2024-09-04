# Digimun
Digimun is a web application I created to help run Model United Nations conferences. The application is still a WIP and has many bugs that need to be solved.  

Run:  
To run this code, it is neccessary to create a dotenv file with postgresql DATABASE_URL and a JWT_SECRET, in the backend folder  
In order to run the application, open two terminals.  
  
In the first terminal:  
cd backend  
npm install
npx prisma migrate dev --name init  
npm run start  
  
In the second terminal:  
cd frontend  
npm install  
npm run dev 
  



Issues To Fix:  
Committee setup add a country input doesn't autoclear after selection  
Committee setup switches flicker when a new country is added  
Clear button on motions page does not delete all motions  
Unmod time does not get synced to db  
Committee page needs redesign  
Figure out functionality of mod tab when no mods are in the committee  
Add hover/click effect to timer button  
Design front page  
Set up demo account  
Create messaging system  
Work on different authority levels  
Create collaborative text editing system  
Make Unmod motions delete automatically when opened  
Create functionality for other speaker's lists and caucus extensions
Set up a table with number of people needed for majority, present, present and voting etc to set up page  
Add clean up function to timer's to save current time when tab is switched  
Change progress bar to phase through different colors depending on time left Green-Blue-Red  
Create proper card components for countries in the mod queue