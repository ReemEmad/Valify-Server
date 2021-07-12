if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage
  localStorage = new LocalStorage("./scratch")
}
const express = require("express")
const router = express.Router()
const axios = require("axios")
const qs = require("qs")

//LOGIN
router.post("/login", async (req, res) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }

  let obj = req.body

  try {
    let result = await axios.post(
      "https://valifystage.com/api/o/token/",
      qs.stringify(obj),
      config,
    )
    console.log(result.data)
    localStorage.setItem("token_server", result.data.access_token)
    console.log(localStorage.getItem("token_server"))
    res.status(200).send(result.data)
  } catch (err) {
    console.log(err.message)
    res.status(500).json(err)
  }
})

//EGYPTIAN NATIONAL ID VALIDATION

router.post("/upload", async (req, res) => {
  let token = localStorage.getItem("token_server")
  const config = {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  }
  let obj = req.body

  try {
    let result = await axios.post(
      "https://valifystage.com/api/v1/ocr/",
      obj,
      config,
    )
    console.log(result.data.result)
    res.status(200).send(result.data)
  } catch (err) {
    console.log(err.message)
    res.status(500).send(err)
  }
})

router.post("/uploadConfirm", async (req, res) => {
  let token = localStorage.getItem("token_server")
  const config = {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  }
  let obj = req.body
  try {
    let result = await axios.post(
      "https://valifystage.com/api/v1/face/match/",
      obj,
      config,
    )
    console.log(result.data)
    res.status(200).send(result.data)
  } catch (err) {
    console.log(err.message)
    res.status(err.response.status).send(err)
  }
})

module.exports = router