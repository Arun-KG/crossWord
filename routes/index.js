var express = require("express");
var router = express.Router();

const crosWord = require("./../modules/CrossWord");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", (req, res, next) => {
  let cw = new crosWord({
    matrix: [
      ["S", "S", "S", "S"],
      ["C", "S", "S", "S"],
      ["S", "A", "S", "S"],
      ["S", "S", "R", "S"]
    ],
    key: "CAR"
  });

  console.log();
  res.status(200).json(cw.solvedMatrix());
});

module.exports = router;
