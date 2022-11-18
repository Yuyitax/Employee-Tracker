const {prompt} = require("inquirer");
const db = require("./db");
require ("console.table"); // To show tables in command line


init();

function init () {
    loadMainPrompts();
}

function loadMainPrompts () {
    prompt([
        {
            type: "list", 
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                  name: "View all employees",
                  value: "VIEW_EMPLOYEES"
                },
                {
                  name: "View all employees by department",
                  value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                },
                {
                    name: "View all employees by manager",
                    value: "VIEW_EMPLOYEES_BY_MANAGER"
                },
                {
                    name: "Add employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Remove employee",
                    value: "REMOVE_EMPLOYEE"
                },
                {
                    name: "Update employee's role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Update employee's manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                },
                {
                    name: "View all roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Remove role",
                    value: "REMOVE_ROLE"
                },
                {
                    name: "View all departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Add department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Remove department",
                    value: "REMOVE_DEPARTMENT"
                },
                {
                    name: "View budget by department",
                    value: "VIEW_BUDGET_BY_DEPARTMENT"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                },

            ]
        }
    ]).then (res => {
        let choice = res.choice;
        switch (choice) {
            case "VIEW_EMPLOYEES": 
                viewEmployees();
                break;
            case "VIEW_EMPLOYEES_BY_DEPARTMENT": 
                viewEmployeesByDepartment();
                break;
            case "VIEW_EMPLOYEES_BY_MANAGER": 
                viewEmployeesByManager();
                break;
            case "ADD_EMPLOYEE": 
                addEmployee();
                break;
            case "REMOVE_EMPLOYEE": 
                removeEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE": 
                updateEmployeeRole();
                break;
            case "UPDATE_EMPLOYEE_MANAGER": 
                updateEmployeeManager();
                break;
            case "VIEW_DEPARTMENTS": 
                viewDepartments();
                break;
            case "ADD_DEPARTMENT": 
                addDepartment();
                break;
            case "REMOVE_DEPARTMENT": 
                removeDepartment();
                break;
            case "VIEW_BUDGET_BY_DEPARTMENT": 
                viewBudgetByDepartment();
                break;
            case "VIEW_ROLES": 
                viewRoles();
                break;
            case "ADD_ROLE": 
                addRole();
                break;
            case "REMOVE_ROLE": 
                removeRole();
                break;
            default: 
                quit();
        }
    })
}


function viewEmployees () {
    db.findAllEmployees()
        .then (([rows])=> {
            let employees = rows; 
            console.log("\n"); // Add a line for spacing (new line)
            console.table(employees);
        })
        .then (() => loadMainPrompts())
}

function viewEmployeesByDepartment () {
    db.findAllDepartments()
        .then (([rows])=> {
            let departments = rows;
            const departmentChoices = departments.map (({id, name})=> ({
                name: name,
                value: id
            }));
            prompt ([
                {
                    type: "list",
                    name: "departmentId",
                    message: "Which department would you like to see employees for?",
                    choices: departmentChoices
                }
            ])
           .then (res => db.findAllEmployeesByDepartment(res.departmentId)) 
           .then (([rows])=> {
            let employees = rows;
            console.log("\n");
            console.table(employees);
           })
           .then (() => loadMainPrompts())
        })
}

function viewEmployeesByManager () {
    db.findAllEmployees ()
    .then (([rows])=> {
        let managers = rows;
        //.map is a search function to find what we are asking for
        const managerChoices = managers.map (({id, first_name, last_name})=> ({
            name: `${first_name} ${last_name}`, 
            value: id
        }));
        prompt ([
            {
                type: "list",
                name: "managerId",
                message: "Which employee would you like to see managers for?",
                choices: managerChoices
            }
        ])
        .then (res => db.findAllEmployeesByManager(res.managerId))
        .then (([rows])=> {
            let employees= rows;
            console.log("\n");
            if (employees.length === 0) {
                console.log("The selected employee has no manager")
            } else {
                console.table(employees)
            }
        })
        .then (() => loadMainPrompts())
    })
}

function removeEmployee () {
    db.findAllEmployees () 
    .then (([rows])=> {
        let employees = rows;
        const employeeChoices = employees.map (({id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
        prompt ([
            {
                type: "list",
                name: "employeeId",
                message: "Which employee would you like to remove?",
                choices: employeeChoices
            }
        ])
        .then (res => db.removeEmployee(res.employeeId))
        .then (()=> console.log("Removed employee from database"))
        .then (() => loadMainPrompts())
    })
}

function updateEmployeeRole () {
    db.findAllEmployees ()
    .then (([rows])=> {
        let employees = rows;
        const employeeChoices = employees.map (({id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
        prompt ([
            {
                type: "list",
                name: "employeeId",
                message: "Which employee's role would you like to update?",
                choices: employeeChoices 
            }
        ])
        .then (res => {
            let employeeId = res.employeeId;
            db.findAllRoles() 
            .then (([rows])=>{
                let roles = rows;
                const roleChoices = roles.map (({id, title})=>({
                    name: title, 
                    value: id
                }));
                prompt ([
                    {
                        type: "list",
                        name: "roleId",
                        message: "Which role should be assigned to selected employee?",
                        choices: roleChoices 
                    }
                ])
                .then (res => db.updateEmployeeRole(employeeId, res.roleId))
                .then (() => console.log("Updated employee's role"))
                .then (() => loadMainPrompts())
            });
        });
    })
}

function updateEmployeeManager () {
    db.findAllEmployees ()
    .then (([rows])=> {
        let employees = rows;
        const employeeChoices = employees.map (({id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
        prompt ([
            {
                type: "list",
                name: "employeeId",
                message: "Which employee's manager would you like to update?",
                choices: employeeChoices 
            }
        ])
        .then (res => {
            let employeeId = res.employeeId;
            db.findAllPossibleManagers(employeeId) 
            .then (([rows])=> {
                let managers = rows;
                const managerChoices = managers.map (({id, first_name, last_name})=>({
                    name: `${first_name} ${last_name}`,
                    value: id
                }));
                prompt ([
                    {
                        type: "list",
                        name: "managerId",
                        message: "Which employee do you want to set as manager for the selected employee?",
                        choices: managerChoices 
                    }
                ])
                .then (res => db.updateEmployeeManager(employeeId, res.managerId))
                .then (() => console.log("Updated employee's manager"))
                .then (() => loadMainPrompts())
            });
        });
    })
}

function viewRoles () {
    db.findAllRoles()
    .then (([rows])=> {
        let roles = rows;
        console.log("\n"); 
        console.table(roles)
    })
    .then (() => loadMainPrompts())
}

function addRole () {
    db.findAllDepartments()
    .then (([rows])=> {
        let departments = rows;
        const departmentChoices = departments.map(({id, name})=>({
            name: name,
            value: id
        }));
        prompt([
            {
                name: "title",
                message: "What is the name for this role?"
            },
            {
                name: "salary",
                message: "What is the salary for this role?"
            },
            {
                type: "list",
                name: "department_id",
                message: "Which department does the role belong to?",
                choices: departmentChoices
            }
        ])
        .then (role => {
            db.createRole(role)
            .then(() => console.log(`Added ${role.title} to the database`))
            .then (() => loadMainPrompts())
        })
    })
}

// WRITE 7 MORE FUNCTIONS INCLUDING QUIT