# HospitalApi (Server Side)
## Description
-Theme
- An API for the doctors of a Hospital which has been
allocated by the govt for testing and quarantine + well being of COVID-19
patients
- There can be 2 types of Users
  - Doctors
  - Patients
- Doctors can log in
- Each time a patient visits, the doctor will follow 2 steps
  - Register the patient in the app (using phone number, if the patient
  already exists, just return the patient info in the API)
  - After the checkup, create a Report
- Patient Report will have the following fields
  - Created by doctor
  - Status (enums ):
    - Can be either of: [Negative, Travelled-Quarantine,Symptoms-Quarantine, Positive-Admit]
    - Keywords (Status)
      - N [Negative]
      - TQ [Trevelled-Quarantine]
      - SQ [Symotoms-Quarantine]
      - PA [Positive-Admit]
- Date
## Routes
### - Doctor (Authentication and Authorisation using jwt)
- /doctors/register → doctor register using unique username and password
- /doctors/login → returns the JWT to be used by the doctor
- /patients/register  →  register the patient 
   - post request requires mobile number of patient as body parameter
   - if patient exits returns the info of patient and its id
   - if not create new patient and returns its id
- /patients/:id/create_report → create report of patient
  - requires status Keyword explained above [ N , TQ , SQ , PA ] as body parameter
  - returns the report of that patient
### Public
- /patients/:id/all_reports → List all the reports of a patient oldest to latest
- /reports/:status → List all the reports of all the patients filtered by a specific status
  - status here is any of the keyword [ N, TQ , SQ , PA ]

## INSTALLATION

- Clone the repository: git clone https://github.com/AtulRaj151/HospitalApi.git
- Install the application: npm install
- Start the server: npm start
- visit localhost:8000/api/(ROUTES)
