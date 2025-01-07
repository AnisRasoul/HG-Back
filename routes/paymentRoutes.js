const express = require("express");
const {
  createPayment,
  checkWebHook,
} = require("../controllers/paymentController");
const { verifySignature } = require("@chargily/chargily-pay");
const crypto = require("crypto");
const bodyParserMiddleware = require("../middleware/bodyParserMiddleware");
const router = express.Router();
const app = express();

app.use(bodyParserMiddleware);
router.post("/checkout", createPayment);
router.post("/webhook", bodyParserMiddleware, checkWebHook);

module.exports = router;
