var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
  
    //Port
    port: 3306,
  
    //username
    user: "root",
  
    //password
    password: "southpadre1",
    database: "track_employee"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Now connected to port 3306")
    start();
  });

function start() {
    inquirer
      .prompt([
        {
            type: 'list',
            name: "request",
            message: "What would you like to do?",
            choices: [
                //Done
                'View all employees',
                'View all employees by department',
                'View all employees by Manager',
                'Add Employee',
                'Remove Employee',

                'Update employee role',
                'Update employee Manager',
                //Done
                'View all roles',
                //Done
                'Add role',
                //Done
                'Remove role',
                //Done
                'View departments',
                //Done
                'Add departments',
                //Done
                'Remove departments'
            ],           
        }
    ])
    .then(answers => {
        switch (answers.request) {
        case "View all employees":
            getEmployees();
            break;
        
        case "View all roles":
            getRoles();
            break;
        
        case "View departments":
            getDepartments();
            break;
        
        case "Add departments":
            addDepartment();
            break;

        case "Remove departments":
            removeDepartment();
            break;

        case "Add role":
            addRole();
            break;
        case "Remove role":
            removeRole();
            break;

        case "Update employee role":
            updateRole();
            break;
        }
    })       
}

function getEmployees() {
connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.position, role.pay, department.Name 
FROM employee 
LEFT JOIN role ON role_id = role.ID 
LEFT JOIN department ON department_id = department.ID`, function(err, res) {
    if (err) throw err;
    console.table(res);
    newRequest()
})
}

function getRoles() {
connection.query("SELECT role.ID, role.position, role.pay, department.Name FROM role LEFT JOIN department ON department_id = department.id", function(err, res) {
    if (err) throw err;
    console.table(res);
    newRequest();
})
}

function getDepartments() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        newRequest();
    })
}

function newRequest() {
    inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'Continue',
                message: "Continue?",
            }
        ])
        .then(data => {
            switch (data.Continue) {
                case false:
                    console.log("Woohoo!");
                    connection.end();
                    break;

                    case true:
                        start()
            }
        })
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: "newdepartment",
                message: "Type the name of the new department",
            }
        ])
        .then(data => {
            connection.query(
                `INSERT INTO department (Name)
                VALUES ("${data.newdepartment}")`,
                function(err) {
                    if (err) throw err;
                    console.log("Added!")
                }
            );
            console.log("Table update")
            getDepartments();
        })
}

function removeDepartment() {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        var departmentList = [];
        for (var i = 0; i < res.length; i++) {
            choicesList.push(res[i].Name);
        };
        
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "baddepartment",
                    message: "Which department would you like to delete?",
                    choices: departmentList,
                    
                }
            ])
            .then(data => {
                connection.query(
                    `DELETE FROM department
                    WHERE Name = "${data.baddepartment}";`
                    
                    , function (err, res) {
                        if (err) throw err;
                        console.log("table update");
                        getDepartments()
                        
                    }
                )
            })
    })
}

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "newposition",
                message: "What is the new role position you would like to add?"
            },
            {
                type: "input",
                name: "newpay",
                message: "How much is the pay for the new role?"
            },
            {
                type: "input",
                name: "managingdepartment",
                message: "what is the department ID the role belongs to?"
            }
        ])
        .then(data => {
            connection.query(`INSERT INTO role (position, pay, department_ID)
            VALUES ("${data.newposition}", ${data.newpay}, ${data.managingdepartment})`, function(err, res) {
                if (err) throw err;
                console.log("Role added!")
            });
            console.log("table update");
            getRoles();

        })
}

function removeRole() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        var roleList = [];
        for (var i = 0; i < res.length; i++) {
            roleList.push(res[i].position);
        };
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "badrole",
                    message: "Which role would you like to delete?",
                    choices: roleList,
                    
                }
            ])
            .then(data => {
                connection.query(
                    `DELETE FROM role
                    WHERE position = "${data.badrole}";`
                    
                    , function (err, res) {
                        if (err) throw err;
                        console.log("table update");
                        getDepartments()
                        
                    }
                )
            })
    }
    )}

function updateRole() {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.position, role.pay, department.Name 
    FROM employee 
    LEFT JOIN role ON role_id = role.ID 
    LEFT JOIN department ON department_id = department.ID`, function(err, res) {
        if (err) throw err;
        var employeeList = [];
        for (var i = 0; i < res.length; i++) {
            employeeList.push(`${res[i].id}: ${res[i].last_name} ${res[i].first_name}`)
        }



        inquirer
            .prompt([
                {
                    type: "list",
                    name: "changedEmpRole",
                    message: "Please select the employee whose role is to be updated",
                    choices: employeeList,
                },
                {
                    type: 'input',
                    name: "newEmpRole",
                    message: 'What is their new role ID?',

                }
            ])
            .then(data => {
                connection.query(`UPDATE employee 
                SET role_id = ${data.newEmpRole} 
                WHERE id = ${data.changedEmpRole.split(':')[0]}`, function(err, res) {
                    if (err) throw err;
                    console.log("success!")
                });
                getEmployees();
            });
    })
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: "first_name",
                message: "Enter the employee's first name"
            }, 
            {
                type: 'input',
                name: "last_name",
                message: "Enter the employee's last name"
            },
            {
                type: 'input',
                name: "boss",
                message: "Enter the employee's boss ID"
            }
        ])
        .then(data => {
            console.log(data.first_name, data.last_name, data.boss);
            connection.query(

            )
        })
}