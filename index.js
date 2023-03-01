const express = require('express')
const app = express()
const port = 5000
const mdb = require("./mongocon");
const path = require("path");
mdb();

app.use((req, res, next)=>{

  var sethead = process.env.FRONT;

  res.setHeader("Access-Control-Allow-Origin", sethead);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.join(__dirname, "./Client/build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "./Client/build/index.html"));
})

app.use(express.json());
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})