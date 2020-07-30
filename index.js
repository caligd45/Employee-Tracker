const { prompt } = require ("inquirer")
const db = require ("./db")
require ("console.table")

async function mainPrompts(){
    const { choice } = await prompt ([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "Vew all employees",
                    value: "VIEW_EMPLOYEES"
                },{
                    name: "View all roles",
                    value: "VIEW_ROLES"
                },{
                    name: "View all departments",
                    value: "VIEW_DEPARTMENTS"
                },{
                    name: "Add employee",
                    value: "ADD_EMPLOYEE"
                },{
                    name: "Add role",
                    value: "ADD_ROLE"
                },{
                    name: "Add department",
                    value: "ADD_DEPARTMENT"
                },{
                    name: "Update employee roles",
                    values: "UPDATE_EMPLOYEE_ROLES"
                },{
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ])
    switch(choice){
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        case "VIEW_ROLES":
            return viewRoles();
        case "VIEW_DEPARTMENTS":
            return viewDepartments();
        case "ADD_EMPLOYEE":
            return addEmployee();
        case "ADD_ROLE":
            return addRole();
        case "ADD_DEPARTMENT":
            return addDepartment();
        case "UPDATE_EMPLOYEE_ROLE":
            return updateEmployeeRole();
        default: return quit()
    }

}
async function viewEmployees(){
    const employees = await db.findAllEmployees()
    console.log("\n")
    console.table(employees)
    mainPrompts()
}
async function viewRoles() {
    const roles = await db.findAllRoles()
    console.log("\n")
    console.table(roles)
    mainPrompts()
}
async function viewDepartments() {
    const departments = await db.findAllDepartments()
    console.log("\n")
    console.table(departments)
    mainPrompts()
}
async function addEmployee() {
    const role = await db.findAllRoles()
    const employees = await db.findAllEmployees()
    const employee = await prompt([
        {
            name: "first_name",
            message: "What is the employees first name?"
        },{
            name: "last_name",
            message: "What is the employees last name?"
        }
    ])
    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }))
    const { roleId } = await prompt ({
        type: "list",
        name: "roleId",
        message: "What is the employee role?",
        choices: roleChoices
    }) 
    employee.role_id = roleId
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${fist_name} ${last_name}`,
        vale: id
    }))
    managerChoices.unshift({ name:"none", value: null })
    const { managerId } = await prompt({
        type: "list",
        name: "managerId",
        message: "Who is the employees manager?",
        choices: managerChoices
    })
    employee.manager_id = managerId
    await db.createEmployee(employee)
    console.log("added employee to database!")
    mainPrompts()
}
//add department and add roles will go here
async function addDepartment() {
    const department = await prompt([{
        name: "name",
        message: "What is the name of the department?"
    }])
    await db.createDepartment(department)
    console.log("Added department to database!")
    mainPrompts()
}
// async function addRoles() {
//     const 
// }

function quit(){
    console.log("Quitting application")
    process.exit()
}