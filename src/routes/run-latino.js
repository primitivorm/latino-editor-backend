const express = require("express");
const router = express.Router();
const exec = require("child_process").exec;

router.post("/", async (req, res, next) => {
  const body = req.body;
  console.log("body", body);
  exec(`latino.exe -e "${body.codigo}"`, (error, stdout, stderr) => {
    if (error !== null) {
      console.log(`exec error: ${error}`);
      console.log(`stderr: ${stderr}`);
      res.send({ error: error });
    }
    console.log(`stdout: "${stdout}"`);
    res.send({ salida: stdout });
  });
});

exports.routes = router;
