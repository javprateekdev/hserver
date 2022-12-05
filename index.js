const express = require("express");
const app = express();
const cors = require('cors');


const mysql = require("mysql");
const con= mysql.createConnection({
    host: "housethat.in",
    user: "u406919292_tool",
    password: "Abcd@321",
    database: "u406919292_compare",
});

con.connect((err)=>{
    if(err)
    {
        console.warn("error in connection")
    }
});
app.use(cors());
app.use(express.json());
app.get("/data", (req, resp) => {
  con.query("select * from project", (err, result) => {
    if (err) { resp.send("error in api") }
    else { resp.send(result) }
  })
});

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>console.log(`Server is running succesfully on PORT ${PORT}`))