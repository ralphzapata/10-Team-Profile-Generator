//variabels

const inquirer = require("inquirer");
const jest = require("jest");
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");
const Manager = require("./lib/manager.js");
var uniqueId = 0;
var teamArray = [];

function promptUser(answers) {
    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "what is your role?",
            choices: ["Engineer", "Intern", "Manager"]
        },
    ]).then(function (res) {
        // should use switch case instead of if/else starting here
        console.log(res)
        if (res.role === "Engineer") {
            inquirer.prompt([
                {
                    name: "name",
                    message: "What is your full name?",
                    type: "input"
                },
                {
                    name: "github",
                    type: "input",
                    message: "What is your github Username?"
                },
                {
                    name: "email",
                    type: "input",
                    message: "What is your email address?"
                }
            ]).then(function (engineerResponse) {
                var newEngineer = new Engineer(engineerResponse.name, engineerResponse.email, uniqueId, engineerResponse.github);
                uniqueId = uniqueId + 1;
                console.log(newEngineer);
                teamArray.push(newEngineer);
                addUser();
            });
        } else if (res.role === "Intern") {
            inquirer.prompt([
                {
                    name: "name",
                    message: "What is your full name?",
                    type: "input"
                },
                {
                    name: "email",
                    type: "input",
                    message: "What is your email address?"
                },
                {
                    name: "school",
                    type: "input",
                    message: "What is the name of your University?"
                }
            ]).then(function (internResponse) {
                var newIntern = new Intern(internResponse.name, internResponse.email, uniqueId, internResponse.school);
                uniqueId = uniqueId + 1; 
                console.log(newIntern)
                teamArray.push(newIntern);
                addUser();
            });
        } else if (res.role === "Manager") {
            inquirer.prompt([
                {
                    name: "name",
                    message: "What is your full name?",
                    type: "input"
                },
                {
                    name: "email",
                    type: "input",
                    message: "What is your email address?"
                },
                {
                    name: "office",
                    type: "input",
                    message: "What is your office number?"
                }
            ]).then(function (managerResponse) {
                var newManager = new Manager(managerResponse.name, managerResponse.email, uniqueId, managerResponse.office);
                uniqueId = uniqueId + 1; 
                console.log(newManager);
                teamArray.push(newManager);
                addUser();
            });
        };
    })
    .catch(function (err) {
        console.log(err);
    });

};
function generateHTML() {
    // put html here
    
    console.log(teamArray)

};

function addUser(){
    inquirer.prompt([
        {   
            name: "continue",
            message: "Do you want to add another team member?",
            type: "confirm"
        }
    ]).then(function(confirmRes){
        confirmRes.continue ? promptUser() : generateHTML()
    })
};


promptUser();
