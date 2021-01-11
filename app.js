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
  console.log( `\n` +`connected as id ${connection.threadId}` + `\n`);
});

function viewAllEmployees() {
  console.log("inside viewALLEmployees");

  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.log("Here are the employees: ");
    console.table(res);
    runApp();
  });
}

function viewAllDepartments(){
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.log("Here is the departments:  ");
    console.table(res);
    runApp();
  });
};

function viewAllRoles(){
  
    connection.query("SELECT * FROM role1", (err, res) => {
      if (err) throw err;
      console.log("Here are the roles:  ");
      console.table(res);
      runApp();
    });
  };

//function to add an Employee to the Employee table
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
        }
      );
    });
}

//function to add a Department to the Department table
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
        }
      );
    });
}

//function to add a Role to the Role table
function addRole(){
  console.log("Add Role");
inquirer
  .prompt([
    {
      type: "message",
      name: "title",
      message: "Name of Role?",
    },
    {
      type: "message",
      name: "salary",
      message: "What is the salary?",
    },
    {
      type: "message",
      name: "department_id",
      message: "What is the department id?",
    },
  ])
  .then((data) => {
    console.log(data);
    connection.query(
      "INSERT INTO role1 SET ?",

      data,
      (err, res) => {
        if (err) throw err;
        console.log(res);
        console.log(`${res.affectedRows} role1 inserted!\n`);
        runApp();
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
      viewAllEmployees();
      break;

      case "View all Departments":
      viewAllDepartments();
      break;

      case "View all Roles":
      viewAllRoles();
      break;
    
    case "Add Employee":
      addEmployee();
      break;

      case "Add Department":
        addDepartment() ;
        break;

        case "Add Role":
        addRole() ;
        break;

    case "Update Employee Role":
      updateEmployeeRole();
      break;
    default:
  }
};
runApp();
