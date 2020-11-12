const fs = require("fs");
const ipsPath = "./public/auto-ips.json";
const ips = require(ipsPath);

const [wlan_ip, bat_ip] = process.argv.slice(2);

console.log("setting wlan_ip:", wlan_ip);
console.log("setting bat_ip:", bat_ip);
ips.wlan_ip = wlan_ip;
ips.bat_ip = bat_ip;

fs.writeFile(ipsPath, JSON.stringify(ips), (err) => {
  if (err) {
    console.log("Error writing file", err);
  } else {
    console.log("Successfully wrote file");
  }
});
