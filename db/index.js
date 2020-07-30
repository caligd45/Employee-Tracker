const connection = require("./connection")
class DB{
    constructor(connection) {
        this.connection = connection
    }
    findAllEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name;"
        )
    }
    // find all departments and roles here
    createEmployee(employee) {
        return this.connection.query(
            "INSERT INTO employee SET ? ", employee
        )
    }
    //create depart and create role goes here
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]
        )
    }
}
module.exports = new DB(connection)