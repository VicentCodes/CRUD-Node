const express = require('express');
const router = express.Router();
const Producto = require('../models/datos.js');
const { checkSessionActive } = require("../middlewares/checkSessionActive.js");
const Users = require("../models/Users.js");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const crypto = require("crypto");

// Generate a secret key for the session
const secretKey = crypto.randomBytes(32).toString("hex");

// Session configuration
router.use(
  session({
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
  })
);

// Middleware to check the session
function createSessionCheck(req, res, next) {
  const token = req.session.token;

  if (!token) {
    return res.redirect("/login");
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.redirect("/login");
    }

    req.usuario = decoded;
    next();
  });
}

// Route for the login form
router.get("/login", checkSessionActive, async (req, res) => {
  try {
    if (req.session.token) {
      return res.redirect("/");
    }
    const users = await Users.find();
    res.render("login.ejs", { users });
  } catch (error) {
    res.status(500).send("Error fetching user data");
  }
});

// Route to process the login form
router.post("/vice", async (req, res) => {
  const { username, userpassword } = req.body;
  req.session.username = username;

  try {
    const user = await Users.findOne({ username });

    if (!user || userpassword !== user.pass) {
      return res.status(500).render("login", { error: "Incorrect username or password" });
    }

    // Token creation
    const usuario = { id: 1, nombre: "Example" };
    const token = jwt.sign(usuario, secretKey, { expiresIn: "1h" });
    req.session.token = token;

    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error logging in");
  }
});

// Main route, displays data
router.get('/', createSessionCheck, async (req, res) => {
  const datos = await Producto.find();
  res.render('index.ejs', {
    datos , username: req.session.username
  });
});

// Route to register a new user
router.post("/register", async (req, res) => {
  const valor = new Users(req.body);
  await valor.save();
  res.redirect('/');
});

// Route to add a new product
router.post('/add',createSessionCheck, async (req, res) => {
  const valor = new Producto(req.body);
  await valor.save();
  res.redirect('/');
});

// Route to delete a product
router.get('/del/:id',createSessionCheck, async (req, res) => {
  const { id } = req.params;
  await Producto.findByIdAndRemove({ _id: id });
  res.redirect('/');
});

// Route to update a product
router.post('/update/:id',createSessionCheck, async (req, res) => {
  try {
    const { id } = req.params;
    const { producto, precio, iva } = req.body;

    await Producto.findByIdAndUpdate(id, {
      producto,
      precio,
      iva
    }, { new: true });
    res.redirect('/');
    
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

// Route to log out
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/login");
    }
    res.redirect("/login");
  });
});

module.exports = router;
