const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


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
       console.log("Here are the employees")
   }

   function viewAllEmployeesbyManager(){
    console.log("Here are the employees by Manager")
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