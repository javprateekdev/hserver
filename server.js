const express = require("express");
const app = express();
const cors = require('cors');


const mysql = require("mysql");



var pool = mysql.createPool({
  connectionLimit:4,
  host: "housethat.in",
  user: "u406919292_tool",
  password: "Abcd@321",
  database: "u406919292_compare",
});

pool.getConnection((err,connection)=> {
  if(err)
  throw err;
  console.log('Database connected successfully');
  connection.release();
});

app.use(express.json());
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went rely wrong",
  });
});
app.use(cors());
app.use(express.json());
app.get("/data", (req, resp) => {
  pool.query("select * from project", (err, result) => {
    if (err) { resp.send("error in api") }
    else { resp.send(result) }
  })
});

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>console.log(`Server is running succesfully on PORT ${PORT}`))
