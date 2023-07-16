import CryptoJS from "crypto-js";

const [_, __, key, password] = process.argv;

const encrypted = CryptoJS.AES.encrypt(key, password);
console.log(encrypted.toString(CryptoJS.format.OpenSSL));
