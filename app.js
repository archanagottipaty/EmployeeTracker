const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: 'root',
  // Be sure to update with your own MySQL password!
  password: 'password',
  database: 'employeetracker',
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  // connection.end();
});
// inquirer.prompt([
//     {
//       type: "list",
//       name: "name",
//       message: "What would you like to do?",
//       choices: ["View all Employees", "View all Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager"],
//     },
//   ])
//   .then((data) => { switchRole(({ choices }));
//     });

   function viewAllEmployees(){
     console.log("inside viewALLEmp;oyees")
    
      connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.log("Here are the employees")
        console.log(res);
        connection.end();
      });
    };


   function viewAllEmployeesbyManager(){
    console.log("Here are the employees by Manager")
    inquirer.prompt([
      {
        type: "list",
        name: "name",
        message: "What would you like to do?",
        choices: ["View all Employees", "View all Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager"],
      },
    ])
    .then((data) => { 
        console.log(data);
        switchRole(data.name );
      });

    connection.query('SELECT * FROM employee', (err, res) => {
      if (err) throw err;
      console.log("Here are the employees")
      console.log(res);
      connection.end();
    });
   };

   function addEmployee(){
    console.log("Add Employee")
   };

   function removeEmployee(){
    console.log("remove employee")
   }

   function updateEmployeeRole(){
    console.log("update employee role")
   }

   function updateEmployeeManager(){
    console.log("update employee manager")
   }
    inquirer.prompt([
        {
          type: "list",
          name: "name",
          message: "What would you like to do?",
          choices: ["View all Employees", "View all Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager"],
        },
      ])
      .then((data) => { 
          console.log(data);
          switchRole(data.name );
        });

    //Function that calls ask***Question() depending on selection
const switchRole = (choices) => {
    switch (choices) {
      case "View all Employees":
        console.log("inside  case sttatement")
          viewAllEmployees();
        // managerSelect = true;
        // console.log("Ask manager question, Line 63");
        // askManagerQuestion().then(({ office }) => {
        //   const manager = new Manager(name, id, email, office);
        //   employees.push(manager);
        //   askAnotherRole();
        
        break;
      case "View all Employees by Manager":

        viewAllEmployeesbyManager();

        // askEngineerQuestion().then(({ github }) => {
        //   const engineer = new Engineer(name, id, email, github);
        //   employees.push(engineer);
        //   askAnotherRole();
    
        break;
      case "Add Employee":

       
        //  askInternQuestion().then(({ school }) => {
        //   const intern = new Intern(name, id, email, school);
        //    employees.push(intern);
  
        addEmployee();
        break;

        case "Remove Employee":
        //  askInternQuestion().then(({ school }) => {
        //   const intern = new Intern(name, id, email, school);
        //    employees.push(intern);
  
        removeEmployee();
    
        break;

        case "Update Employee Role":
        //  askInternQuestion().then(({ school }) => {
        //   const intern = new Intern(name, id, email, school);
        //    employees.push(intern);
  
        updateEmployeeRole();
    
        break;

        case "Update Employee Manager":
            //  askInternQuestion().then(({ school }) => {
            //   const intern = new Intern(name, id, email, school);
            //    employees.push(intern);
      
            updateEmployeeManager();
        
            break;
      default:
    }
  };