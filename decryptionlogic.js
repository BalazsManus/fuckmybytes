import { SHAPassgen } from './shared.js';
const textDecoder = new TextDecoder();


async function decrypt() {
    let key = await SHAPassgen(document.getElementById('Password').value)
    let content = document.getElementById('Content').value;
    content = await TRIPLEDESdecrypt(content, key);
    //content = await decompress(content);
    content = await DESdecrypt(content, key);
    //content = await decompress(content);
    content = await AESdecrypt(content, key);
    content = await fromBase64(content);
    content = await UTF8GetString(content);
    console.log('Final decrypted string is: ' + content);
}
async function TRIPLEDESdecrypt(str, key) {
    let out = CryptoJS.TripleDES.decrypt(str, key);
    console.log('3DES decrypted: ' + out.toString());
    return out.toString();
}
async function decompress(str) {
    let numbers = str.split(',').map(Number);
    let uint8Array = new Uint8Array(numbers);
    let out = LZUTF8.decompress(uint8Array, { outputEncoding: "ByteArray" });
    console.log('Decompressed string is: ' + out.toString());
    return out.toString();
}
async function DESdecrypt(str, key) {
    let out = CryptoJS.DES.decrypt(str, key);
    console.log('DES decrypted: ' + out.toString());
    return out.toString();
}
async function AESdecrypt(str, key) {
    let out = CryptoJS.AES.decrypt(str, key);
    console.log('AES decrypted: ' + out.toString());
    return out.toString();
}
async function fromBase64(str) {
    let out = atob(str);
    console.log('String is: ' + out.toString());
    return out.toString();
}
async function UTF8GetString(str) {
    let numbers = str.split(',').map(Number);
    let uint8Array = new Uint8Array(numbers);
    let out = await textDecoder.decode(uint8Array);
    console.log('String is: ' + out.toString());
    return out.toString();
}

window.decrypt = decrypt;