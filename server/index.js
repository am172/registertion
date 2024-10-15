const express = require("express")
const mongoose = require('mongoose')
const EmployeeModel = require('./models/Employee.js')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/employee");

app.post('/login', (req, res) => {
    const {email, password} = req.body;


    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password == password) {
                res.json("Success")
            } else {
                res.json("the password is incorrect")
            }
        } else {
            res.json("no record existed")
        }
    })
})

app.post('/register', (req, res) => {
    console.log(req.body); // لطباعة البيانات المستلمة
    EmployeeModel.create(req.body)
        .then(employee => res.json(employee))
        .catch(err => res.json(err));
});
app.listen(3001, ()=>{
    console.log("elserver tammam");
    
})