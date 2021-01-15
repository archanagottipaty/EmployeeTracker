DROP DATABASE IF EXISTS employeetracker;
CREATE DATABASE employeetracker;
USE employeetracker;

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
  );
  
  CREATE TABLE role1 (
	id INT AUTO_INCREMENT NOT NULL,
	title VARCHAR(30) NULL,
	salary DECIMAL,
	department_id INT,
	PRIMARY KEY (id)
  );
  
  CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

INSERT INTO employee(first_name, last_name,role_id, manager_id) values ("archana", "gottipaty", 123,134);
INSERT INTO employee(first_name, last_name,role_id, manager_id) values ("a", "g", 2,1);

INSERT INTO role1(title, salary,department_id) values ("manager", 150000,1);
INSERT INTO role1(title, salary,department_id) values ("manager", 150,2);


INSERT INTO department(name) values ("physics");
INSERT INTO department(name) values ("chemistry");
INSERT INTO department(name) values ("biology");



SELECT * FROM employee INNER JOIN role1 on employee.role_id = role1.id && role1.title = "manager"
  
  
  

