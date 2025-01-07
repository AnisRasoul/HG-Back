const { ChargilyClient, verifySignature } = require("@chargily/chargily-pay");
const bodyParserMiddleware = require("../middleware/bodyParserMiddleware");
const express = require("express");
const app = express();
const client = new ChargilyClient({
  api_key: process.env.CHARGILY_API,
  mode: "test",
});

exports.checkWebHook = async (req, res) => {
  app.use(bodyParserMiddleware);
  const signature = req.get("signature") || "";
  const payload = req.rawBody;

  if (!signature) {
    console.log("Signature header is missing");
    res.sendStatus(400);
    return;
  }

  try {
    if (!verifySignature(payload, signature, process.env.CHARGILY_API)) {
      console.log("Signature is invalid");
      res.sendStatus(403);
      return;
    }
  } catch (error) {
    console.log(
      "Something happened while trying to process the request to the webhook"
    );
    res.sendStatus(403);
    return;
  }
  const event = req.body;
  console.log(event);
  res.sendStatus(200);
};

exports.createPayment = async (req, res) => {
  const { amount, currency, success_url } = req.body;
  const payment = await client.createCheckout({
    amount,
    currency,
    success_url,
  });

  res.json(payment);
};
