const express = require("express");
const { Op } = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
  users_table,
  users_requests_table,
  listed_products,
  orders_table,
} = require("./models");

const secretKey = process.env.SECRET_KEY;

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json());

const db = require("./models");

const port = 8080;

app.get("/getlistedproducts", async (req, res) => {
  try {
    const listedProducts = await listed_products.findAll();

    res.json(listedProducts);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/getlistedproducts/:companyname", async (req, res) => {
  const { companyname } = req.params;

  try {
    const listedCompanyProducts = await listed_products.findAll({
      where: { distributor: companyname },
    });

    res.json(listedCompanyProducts);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/getdrinksproducts", async (req, res) => {
  try {
    const drinksProducts = await listed_products.findAll({
      where: { category: "Pije" },
    });
    res.json(drinksProducts);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/getfruitsandvegetablesproducts", async (req, res) => {
  try {
    const fruitsandvegetablesProducts = await listed_products.findAll({
      where: { category: "Fruta dhe Perime" },
    });
    res.json(fruitsandvegetablesProducts);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/gethousekeepproducts", async (req, res) => {
  try {
    const fruitsandvegetablesProducts = await listed_products.findAll({
      where: { category: "Shtepiake" },
    });
    res.json(fruitsandvegetablesProducts);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/getfoodproducts", async (req, res) => {
  try {
    const fruitsandvegetablesProducts = await listed_products.findAll({
      where: { category: "Ushqimore" },
    });
    res.json(fruitsandvegetablesProducts);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/gethygeneproducts", async (req, res) => {
  try {
    const fruitsandvegetablesProducts = await listed_products.findAll({
      where: { category: "Higjenë" },
    });
    res.json(fruitsandvegetablesProducts);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/getcompanyproducts/:companyname", async (req, res) => {
  const companyname = req.params.companyname;
  try {
    const companyProducts = await listed_products.findAll({
      where: { distributor: companyname },
    });
    res.json(companyProducts);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/addnewproduct", async (req, res) => {
  try {
    const { name, category, price, weight, distributor, photo } =
      req.body.newProduct;

    await listed_products.create({
      name: name,
      category: category,
      price: price,
      weight: weight,
      distributor: distributor,
      photo: photo,
    });
    res.json({
      title: "success",
      message: "Produkti u shtua me sukses",
    });
  } catch (error) {
    console.error("Database query error:", error);
    res.json({ title: "error", message: "Një problem u shkaktua" });
  }
});

app.post("/deleteproduct/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedRequest = await listed_products.destroy({
      where: { id: productId },
    });

    if (!deletedRequest) {
      res.json({ title: "error", message: "Produkti nuk u fshi me sukses" });
    }

    res.json({ title: "success", message: "Produkti u fshi me sukses" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/editproduct/:productId", async (req, res) => {
  const { productId } = req.params;
  const { name, category, price, weight, distributor, photo, outOfStock } =
    req.body.editedProduct;

  const productToEdit = await listed_products.findByPk(productId);

  if (!productId) {
    res.json({ title: "error", message: "Produkti nuk ekziston" });
  }

  productToEdit.name = name;
  productToEdit.category = category;
  productToEdit.price = price;
  productToEdit.weight = weight;
  productToEdit.distributor = distributor;
  productToEdit.photo = photo;
  productToEdit.outOfStock = outOfStock;

  await productToEdit.save();
  res.json({ title: "success", message: "Produkti u editua me sukses" });
});

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

app.get("/getdistributors", async (req, res) => {
  try {
    const distributors = await users_table.findAll({
      where: { companyType: "distributor" },
    });
    if (!distributors) {
      console.log("No Distributors Available on List");
    } else {
      res.send(distributors);
    }
  } catch (error) {
    console.log(error);
    res.json({ title: "error", message: "Error Occurred" });
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

    const {
      id,
      companyType,
      companyname,
      namesurname,
      emailAddress,
      companyLogo,
    } = user;

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
        companyname: user.companyname,
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
        companyname: user.companyname,
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
        companyname,
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

app.post("/changeprofiledetails/:userId", async (req, res) => {
  const { userId } = req.params;
  const { namesurname, companyname, phoneNumber, emailAddress } = req.body;

  const alreadyUserPhoneNumber = await users_table.findAll({
    where: {
      phoneNumber: phoneNumber,
    },
  });

  if (alreadyUserPhoneNumber.length > 0) {
    console.log("wow");
    res.json({
      title: "error",
      message: "Numri i vendosur është i përdorur më parë",
    });
  } else {
    const userToEdit = await users_table.findByPk(userId);
    userToEdit.namesurname = namesurname;
    userToEdit.companyname = companyname;
    userToEdit.phoneNumber = phoneNumber;
    userToEdit.emailAddress = emailAddress;
    await userToEdit.save();
    res.json({
      title: "success",
      message: "Të dhënat u ndryshuan me sukses",
    });
  }
});

app.post("/changepassword/:userId", async (req, res) => {
  const { userId } = req.params;
  const { newPassword } = req.body;

  const userToEdit = await users_table.findByPk(userId);

  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  try {
    userToEdit.password = hashedPassword;

    await userToEdit.save();

    res.json({
      title: "success",
      message: "Fjalëkalimi u ndryshua me sukses",
    });
  } catch (error) {
    res.json({
      title: "error",
      message: "Ka ndodhur një problem gjatë ndryshimit të fjalëkalimit",
    });
  }
});

app.post("/sendorder", async (req, res) => {
  try {
    const { name, price, totalPrice, weight, quantity, photo, distributor } =
      req.body.product;

    const { clientId } = req.body;

    await orders_table.create({
      productName: name,
      productPrice: price,
      productTotalPrice: totalPrice,
      productWeight: weight,
      productQuantity: quantity,
      productPhoto: photo,
      productDistributor: distributor,
      productClient: clientId,
    });
    res.json({
      title: "success",
      message: "Porosia u bë me sukses",
    });
  } catch (error) {
    console.log(error);
    res.json({ title: "error", message: "Porosia nuk mund të realizohet" });
  }
});

app.get("/getorders/:pranuesId", async (req, res) => {
  const { pranuesId } = req.params;
  try {
    const listedOrders = await orders_table.findAll({
      where: { productClient: pranuesId },
    });
    res.send(listedOrders);
  } catch (error) {
    console.log(error);
  }
});

db.sequelize.sync().then((req) => {
  app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
  });
});
