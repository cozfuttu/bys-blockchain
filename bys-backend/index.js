const express = require("express");
var cors = require("cors");
var CryptoJS = require("crypto-js");
var bodyParser = require("body-parser");
const ethers = require("ethers");
const app = express();
const port = 3000;

const secret = "aaaaaaaaaaaaaaaa";
const walletPrivateKey = "941a2d9d67465202f5ee3fc0cf123043c728b2d4ec6aa84d2b0071f8ae4e7768";
const contractAddress = "0x37Dd428Eb636fCbbF6101b6E253EC9075F4b3aD4";

const contractAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "ogrenciNo",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "isim",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "yas",
        type: "uint256",
      },
    ],
    name: "OgrenciEklendi",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "ogrenciNo",
        type: "uint256",
      },
    ],
    name: "OgrenciSilindi",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_ogrenciNo",
        type: "uint256",
      },
    ],
    name: "ogrenciBilgileriGetir",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_ogrenciNo",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_isim",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_yas",
        type: "uint256",
      },
    ],
    name: "ogrenciEkle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "ogrenciListesi",
    outputs: [
      {
        internalType: "uint256",
        name: "ogrenciNo",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "isim",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "yas",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ogrenciSayisi",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_ogrenciNo",
        type: "uint256",
      },
    ],
    name: "ogrenciSil",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tumOgrenciBilgileriniGetir",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "ogrenciNo",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "isim",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "yas",
            type: "uint256",
          },
        ],
        internalType: "struct OkulKontrati.Ogrenci[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const wallet = new ethers.Wallet(walletPrivateKey);
const signer = wallet.connect(ethers.getDefaultProvider("goerli"));
const contract = new ethers.Contract(contractAddress, contractAbi, signer);

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  res.send("test");
});

app.get("/contract", async (req, res) => {
  const ogrenciSayisi = await contract.ogrenciSayisi();
  res.json({ ogrenciSayisi: ogrenciSayisi.toString() });
});

app.post("/saveUser", (req, res) => {
  const studentData = req.body;
  var encrypted = CryptoJS.AES.encrypt(JSON.stringify(studentData), secret);
  console.log("encrypted string: ", encrypted.toString());
  var decrypted = CryptoJS.AES.decrypt(encrypted, secret);
  console.log("decrypted string: ", decrypted.toString(CryptoJS.enc.Utf8));
  res.json({ status: "ok", encrypted: encrypted.toString() });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
