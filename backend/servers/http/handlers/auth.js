import express from "express";
import asyncHandler from "express-async-handler";

export default ({}, config) => {
  function router() {
    const router = express.Router();

    router.post("/login", asyncHandler(login));
    router.post("/register", asyncHandler(register));

    return router;
  }

  async function login(req, res) {
    res.status(200).json({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
      status: true,
    });
  }

  async function register(req, res) {
    res.status(200).json({
      status: true,
    });
  }

  return {
    router,
  };
};
