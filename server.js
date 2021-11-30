const express = require("express");
const path = require('path');
const app = express();

const port = process.env.PORT || 8019;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

const urlencodedParser = express.urlencoded({ extended: false });

  app.get('/', (req, res) => {
    res.set({ 'Content-Type': 'text/html; charset=UTF-8' });
    res.send('<h1>Filon</h1>');
  });

app.get("/login", (req, res) => {
  res.send('Filon')
});

app.get("/fetch", function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.sendFile(__dirname + "/index.html");
});

app.post("/fetch", urlencodedParser, function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  if (!request.body) return response.sendStatus(400);
  console.log(request.body);
  response.send(`${request.body.userName} - ${request.body.userAge}`);
});

const task = (x) => {
  return new Promise((resolve, reject) => {
    if (x < 13) resolve('yes');
    else reject('no');
  });
};

app.get("/login", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send("Filon");
});

app.get("/login/ru", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end('<h1 style="font-weight:bold;font-size:14px;"> Филон </h1>');
});


app.get('/promise', (req, res) => {
    res.send(task.toString());
  });

 app.get('/promise/:val', async (req, res) => {
    try {
      const val = req.params.val;
      const result = await task(parseInt(val));
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  });

app.listen(port, () => {
  console.log(`Example listening at http://localhost:${port}`);
});
