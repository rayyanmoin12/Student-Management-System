#! /usr/bin/env node
import inquirer from "inquirer";

const randomNumber: number = Math.floor(Math.random() * 90000 + 10000)

let myBalance: number = 0;

let ans = await inquirer.prompt([{
    type: "input",
    name: "name",
    message: "Enter your name:",
    validate: function (value) {
        if (value.trim() !== "") {
            return true;
        }
        return "Please enter something.";
    }
},
{
    type: "list",
    name: "courses",
    message: "Select your course:",
    choices: ["English", "Biology", "Physics", "Chemistry", "IT"]
}
]);

const tuitionFee: {[key: string]: number} = {
    "English": 2000,
    "Biology": 3000,
    "Physics": 4000,
    "Chemistry": 5000,
    "IT": 6000
};

console.log(`\nTuition fees: ${tuitionFee[ans.courses]}/-\n`);
console.log(`Balance: ${myBalance}\n`);

let paymentType = await inquirer.prompt([{
    type: "list",
    name: "payment",
    message: "Select payment method",
    choices: ["Bank transfer", "Jazzcash", "Easypaisa"]
},
{
    type: "input",
    name: "amount",
    message: "Transfer money",
    validate: function(value){
        if (value.trim() !== ""){
            return true;
        }
        return "Please enter a value.";      
    }
}
]);

console.log(`\nYou have selected payment method ${paymentType.payment}\n`);

const tuitionFees = tuitionFee[ans.courses];
const paymentAmount = parseFloat(paymentType.amount);

if (tuitionFees === paymentAmount){
    console.log(`You have successfully enrolled in ${ans.courses}.\n`); 
    
    let answer = await inquirer.prompt([{
        type: "list",
        name: "select",
        message: "What would you like to do next?",
        choices: ["View status", "Exit"]
    }]);
    
    if (answer.select === "View status") {
        console.log("\n***********STATUS***********\n")
        console.log(`Student name: ${ans.name}`);
        console.log(`Student ID: ${randomNumber}`);
        console.log(`Courses: ${ans.courses}`);
        console.log(`Tuition fees: ${paymentAmount}`);
        console.log(`Balance: ${myBalance += paymentAmount}`);        
    } else {
        console.log("\nExit student management system\n");
    }
    
} else {
    console.log("Amount not sufficient to enroll in course.");
    
}

