# SIH2022

# Problem Statement
### PS Number : AK1211

Courts are getting many cases and currently it is becoming challenging to prioritize those cases. A software/algorithm should be developed for prioritizing and allocations of dates to the cases based on the following parameters: - Time of filing of chargesheet - Severity of the crime and sections involved - Last hearing date - Degree of responsibility of the alleged perpetrators System should be free of impartiality

# Solution

The algorithm developed by our team will help in priortizing and allocation of dates to court cases by considering varied number of factors involved, And prioritize the court cases and propose a certain optimal date by running out number of operations and constraints on the dataset.

### Factors considered: <br/>
         1. Date & Time of filling of chargesheet
         2. Status of accused : In Jail/ On Run (Uncaught) / On Bail
         3. Sections Involved : Terms of Imprisonment, Fine imposed, Bailable/ Non-Bailable
         4. Last hearing date
         5. Number of total hearings till date
    
 ![Screenshot from 2022-03-14 09-27-27](https://user-images.githubusercontent.com/59157988/158102446-d6066138-06bd-4c5b-bb9d-8a2ddbfd035a.png)

         
### Use cases
         1. Utilizing judiciary resources in an efficient manner to hear cases having high priority
         2. Proposing/Allocating optimal dates against absurd demand of lawyer
         3. Minimize human involvement in allocation of hearing dates to court cases
         4. Reduce impartiality and avoid stalling of cases
### UI
![Desktop - 1](https://user-images.githubusercontent.com/59157988/158102145-2fa60698-4bcd-4571-bb64-956b1ed68ffe.png)

### Architecture
![Screenshot from 2022-03-14 09-25-41](https://user-images.githubusercontent.com/59157988/158102293-0fe12604-56a9-4556-8402-fcc98cff5c3a.png)


### Getting started
- Fork the repository
- Clone in to your machine
- Open terminal in the src directory
- cd server && npm i && npm run devserver
- cd .. && cd client
- npm install && npm start
