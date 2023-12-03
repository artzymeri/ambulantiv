const express = require("express");
const { Op } = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { users_table, users_requests_table } = require("./models");

const secretKey = process.env.SECRET_KEY;

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json());

const db = require("./models");

const port = 8080;

app.get("/getrequests", async (req, res) => {
  try {
    const registerRequests = await users_requests_table.findAll();

    res.json(registerRequests);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/getusers", async (req, res) => {
  try {
    const users = await users_table.findAll();

    res.json(users);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.delete("/deleteregisterrequest/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;

    const deletedRequest = await users_requests_table.destroy({
      where: { id: requestId },
    });

    if (!deletedRequest) {
      return res.status(404).json({
        title: "error",
        message: "Kërkesa për regjistrim nuk u gjet",
      });
    }

    res.json({
      title: "success",
      message: "Kërkesa për regjistrim u fshi me sukses!",
    });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.delete("/deleteuser/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;

    const deletedRequest = await users_table.destroy({
      where: { id: requestId },
    });

    if (!deletedRequest) {
      return res.status(404).json({
        title: "error",
        message: "Kërkesa për regjistrim nuk u gjet",
      });
    }

    res.json({
      title: "success",
      message: "Kërkesa për regjistrim u fshi me sukses!",
    });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/requestregister", async (req, res) => {
  try {
    const {
      namesurname,
      companyname,
      phoneNumber,
      emailAddress,
      password,
      companyType,
    } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const existingUser = await users_requests_table.findOne({
      where: { phoneNumber: phoneNumber },
    });

    if (existingUser) {
      return res.json({
        title: "error",
        message: "Numri i paraqitur është përdorur më parë",
      });
    }

    await users_requests_table.create({
      namesurname,
      companyname,
      phoneNumber,
      emailAddress,
      password: hashedPassword,
      companyType,
    });

    res.json({
      title: "success",
      message: "Kërkesa për regjistrim u dërgua me sukses",
    });
    console.log("Register Request Successful!");
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const {
      namesurname,
      companyname,
      phoneNumber,
      emailAddress,
      password,
      companyType,
    } = req.body;

    await users_table.create({
      namesurname,
      companyname,
      phoneNumber,
      emailAddress,
      password,
      companyType,
    });

    res.json({
      title: "success",
      message: "Registration successful!",
    });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await users_table.findOne({
      where: { phoneNumber: phoneNumber },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.json({
        title: "error",
        message: "Numri apo fjalëkalimi është gabim",
      });
    }

    const { id, companyType, namesurname, emailAddress, companyLogo } = user;

    if (companyType === "admin") {
      const adminToken = jwt.sign(
        { phoneNumber: user.phoneNumber, role: "admin" },
        secretKey,
        {
          expiresIn: "1h",
        }
      );
      res.json({
        title: "success",
        message: "Kyçja u bë me sukses",
        adminToken,
        phoneNumberOfUser: user.phoneNumber,
        companyLogo,
        namesurname,
        emailAddressOfUser: emailAddress,
        companyType,
        userId: id,
      });
    } else if (companyType === "distributor") {
      const distributorToken = jwt.sign(
        { phoneNumber: user.phoneNumber, role: "distributor" },
        secretKey,
        {
          expiresIn: "1h",
        }
      );
      res.json({
        title: "success",
        message: "Kyçja u bë me sukses",
        distributorToken,
        phoneNumberOfUser: user.phoneNumber,
        companyLogo,
        namesurname,
        emailAddressOfUser: emailAddress,
        companyType,
        userId: id,
      });
    } else if (companyType === "pranues") {
      const pranuesToken = jwt.sign(
        { phoneNumber: user.phoneNumber, role: "pranues" },
        secretKey,
        {
          expiresIn: "1h",
        }
      );
      res.json({
        title: "success",
        message: "Kyçja u bë me sukses",
        pranuesToken,
        phoneNumberOfUser: user.phoneNumber,
        companyLogo,
        namesurname,
        emailAddressOfUser: emailAddress,
        companyType,
        userId: id,
      });
    }
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

db.sequelize.sync().then((req) => {
  app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
  });
});
