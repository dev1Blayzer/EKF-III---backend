const fs = require("fs");

const versionNumber = process.argv[2] + "";

console.log(`Updating release number to ${versionNumber}`);

for (const fileName of [
  `${process.cwd()}/package.json`,
  `${process.cwd()}/package-lock.json`,
]) {
  const packageFileJSON = require(fileName);
  packageFileJSON.version = versionNumber;

  fs.writeFile(fileName, JSON.stringify(packageFileJSON), function(err) {
    if (err) return console.log(err);
    console.log(`Updating to v${versionNumber} in ${fileName}`);
  });
}
