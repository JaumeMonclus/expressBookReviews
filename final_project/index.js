const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const public_users = require('./router/general.js').general;



const app = express();

const users = {
    "admin": "1234",
    "maria": "abcd"
  };

  const JWT_SECRET = "tu_clave_secreta_super_segura";

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req, res, next) {
    const user = req.body.user;
    const password = req.body.password;

    if (user === "admin" && password === "1234") {
        next(); // Autenticado correctamente
    } else {
        res.status(401).send("Unauthorized");
    }
});

app.get('/customer/auth/test', (req, res) => {
    res.send("✅ ¡Acceso autorizado! Bienvenido a la ruta protegida.");
});
 
app.post('/customer/login', (req, res) => {
    const { user, password } = req.body;
  
    // Validar que estén presentes
    if (!user || !password) {
      return res.status(400).send("Faltan usuario o contraseña");
    }
  
    // Verificar si el usuario existe y la contraseña coincide
    if (users[user] && users[user] === password) {
      // Crear el token JWT
      const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "1h" });
  
      // Enviar el token al cliente
      return res.status(200).json({
        message: "✅ Login exitoso",
        token: token
      });
    } else {
      return res.status(401).send("❌ Usuario o contraseña inválidos");
    }
  });
  


  

const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
