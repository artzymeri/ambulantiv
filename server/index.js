const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;


const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(bodyParser.json());

db = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'ambulantiv'
})

const port = 8080;

app.post('/requestregister', (req, res)=> {
    const {namesurname, companyname, phoneNumber, emailAddress, password, companyType} = req.body
    const sqlInsert = 'INSERT into users_request_table (namesurname, companyname, phoneNumber, emailAddress, password, companyType) VALUES (?, ?, ?, ?, ?, ?)';
    const sqlSelect = 'SELECT * FROM users_table WHERE phoneNumber = ?';
    db.query(sqlSelect, [phoneNumber], (error, result)=>{
         if(result.length > 0) {
            res.status(500).json({
                title: "error",
                message: "Numri i paraqitur është përdorur më parë",
              });
         }else{
            db.query(sqlInsert, [namesurname, companyname, phoneNumber, emailAddress, password, companyType], (error, result)=> {
                if(error){
                    console.log(error)
                }else{
                    res.json({
                        title: "success",
                        message: "Kërkesa për regjistrim u dërgua me sukses",
                      });
                    console.log('Register Request Successful!')
                }
            })
         }
    })
});

app.post('/register' , (req, res)=>{
    const sqlInsert = 'INSERT INTO users_table (namesurname, companyname, phoneNumber, emailAddress, password, companyType) VALUES (?, ?, ?, ?, ?, ?)';
    const {namesurname, companyname, phoneNumber, emailAddress, password, companyType} = req.body.registerInfo;

    const hashedPassword = bcrypt.hashSync(password, 10); 

    db.query(sqlInsert, [namesurname, companyname, phoneNumber, emailAddress, hashedPassword, companyType], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            console.log(result);
        }
    })
});

app.post('/login', (req, res) => {
    const { loginInfo } = req.body;

    const sqlSelect = 'SELECT namesurname, companyname, phoneNumber, emailAddress, password, companyType, role FROM users_table WHERE phoneNumber = ?';
    db.query(sqlSelect, [loginInfo.phoneNumber], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            res.status(500).json({ message: 'An error occurred' });
        }

        if (results.length === 0 || !bcrypt.compareSync(password, results[0].password)) {
            res.json({ message: 'Invalid credentials' });
        } else {
            const userId = results[0].id;
            const phoneNumberOfUser = results[0].phoneNumber;
            const companyLogo = results[0].companyLogo;
            const namesurname = results[0].namesurname;
            const emailAddressOfUser = results[0].emailAddress;
            const companyType = results[0].companyType;

            if (results[0].role === 'admin') {
                const adminToken = jwt.sign({ phoneNumber : phoneNumberOfUser, role: 'admin' }, secretKey, { expiresIn : '1h' } )
                res.json({adminToken});
            } else if (results[0].role === 'distributorAdmin') {
                const distributorAdminToken = jwt.sign({ phoneNumber : loginInfo.phoneNumber, role: 'distributor' }, secretKey, { expiresIn : '1h' } )
                res.json({distributorAdminToken, phoneNumberOfUser, companyLogo, namesurname, emailAddressOfUser, companyType, userId });
            } else if (results[0].role === 'distributorUser') {
                const distributorUserToken = jwt.sign({ phoneNumber : loginInfo.phoneNumber, role: 'distributor' }, secretKey, { expiresIn : '1h' } )
                res.json({distributorUserToken, phoneNumberOfUser, companyLogo, namesurname, emailAddressOfUser, companyType, userId });
            }
            else {
                const pranuesToken = jwt.sign({ username: username, role: 'pranues' }, secretKey, { expiresIn : '1h' });
                res.json({pranuesToken});
            }
        }
    });
});

app.listen(port, ( )=>{
    console.log(`Server is running in http://localhost:${port}`)
});