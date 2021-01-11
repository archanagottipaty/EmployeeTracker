const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Be sure to update with your own MySQL password!
  password: "password",
  database: "employeetracker",
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

function viewAllEmployees() {
  console.log("inside viewALLEmployees");

  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.log("Here are the employees");
    console.table(res);
    runApp();
  });
}

function viewAllDepartments(){

console.log("inside viewAllDepartments");

  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.log("Here is the department:");
    console.table(res);
    runApp();
  });
};

function viewAllRoles(){

  console.log("inside viewAllRoles");
  
    connection.query("SELECT * FROM role1", (err, res) => {
      if (err) throw err;
      console.log("Here are the roles:");
      console.table(res);
      runApp();
    });
  };
  
function addEmployee() {
  console.log("Add Employee");
  inquirer
    .prompt([
      {
        type: "message",
        name: "first_name",
        message: "First name of Employee?",
      },
      {
        type: "message",
        name: "last_name",
        message: "Last name of Employee?",
      },
      {
        type: "message",
        name: "role_id",
        message: "What is the role id?",
      },
      {
        type: "message",
        name: "manager_id",
        message: "What is the manager id?",
      },
    ])
    .then((data) => {
      console.log(data);
      connection.query(
        "INSERT INTO employee SET ?",

        data,
        (err, res) => {
          if (err) throw err;
          console.log(res);
          console.log(`${res.affectedRows} employee inserted!\n`);
          runApp();
          // Call updateProduct AFTER the INSERT completes
        }
      );
    });
}

function addDepartment() {
  console.log("Add Department");
  inquirer
    .prompt([
      {
        type: "message",
        name: "name",
        message: "Name of Department?",
      },
    ])
    .then((data) => {
      console.log(data);
      connection.query(
        "INSERT INTO department SET ?",

        data,
        (err, res) => {
          if (err) throw err;
          console.log(res);
          console.log(`${res.affectedRows} department inserted!\n`);
          runApp();
          // Call updateProduct AFTER the INSERT completes
        }
      );
    });
}
function updateEmployeeRole() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    const choices = res.map((employee) => ({
      name: employee.first_name + " " + employee.last_name + " " + employee.id,
      value: employee,
    }));
    inquirer.prompt([
      {
        type: "list",
        name: "employee",
        message: "which employee do you want to update?",
        choices: choices,
      },

      {
        type: "input",
        name: "role_id",
        message: "What is the new role id?",
      },
      
    ])
    .then( data => {
      console.log(data);

      connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
          {
            role_id: data.role_id,
          },
          {
            id: data.employee.id,
          },
        ],
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} products updated!\n`);
          // Call deleteProduct AFTER the UPDATE completes
          
          runApp();
        }
      );


    })
    

   
  });

  console.log("update employee role");
  
}

function runApp() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "name",
        message: "What would you like to do?",
        choices: [
          "View all Employees",
          "View all Departments",
          "View all Roles",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",

          
        ],
      },
    ])
    .then((data) => {
      console.log(data);
      switchSelect(data.name);
    });
}

//Function that calls ask***Question() depending on selection
const switchSelect = (choices) => {
  switch (choices) {
    case "View all Employees":
      console.log("inside  case statement");
      viewAllEmployees();
      // managerSelect = true;
      // console.log("Ask manager question, Line 63");
      // askManagerQuestion().then(({ office }) => {
      //   const manager = new Manager(name, id, email, office);
      //   employees.push(manager);
      //   askAnotherRole();

      break;

      case "View all Departments":
      console.log("inside  case statement");
      viewAllDepartments();
      // managerSelect = true;
      // console.log("Ask manager question, Line 63");
      // askManagerQuestion().then(({ office }) => {
      //   const manager = new Manager(name, id, email, office);
      //   employees.push(manager);
      //   askAnotherRole();

      break;

      case "View all Roles":
      console.log("inside  case statement");
      viewAllRoles();
      // managerSelect = true;
      // console.log("Ask manager question, Line 63");
      // askManagerQuestion().then(({ office }) => {
      //   const manager = new Manager(name, id, email, office);
      //   employees.push(manager);
      //   askAnotherRole();

      break;

      
    case "Add Employee":
      //  askInternQuestion().then(({ school }) => {
      //   const intern = new Intern(name, id, email, school);
      //    employees.push(intern);

      addEmployee();
      break;

      case "Add Department":
        //  askInternQuestion().then(({ school }) => {
        //   const intern = new Intern(name, id, email, school);
        //    employees.push(intern);
        addDepartment() ;
       
        break;

        case "Add Role":
        //  askInternQuestion().then(({ school }) => {
        //   const intern = new Intern(name, id, email, school);
        //    employees.push(intern);
        addRole() ;
       
        break;

      

    case "Update Employee Role":
      //  askInternQuestion().then(({ school }) => {
      //   const intern = new Intern(name, id, email, school);
      //    employees.push(intern);

      updateEmployeeRole();

      break;

    default:
  }
};

runApp();
