import * as fs from 'fs';

function deleteFolderRecursive(path: string) {

  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {

    fs.readdirSync(path).forEach((file: string) => {
      const curPath: string = `${path}/${file}`;

      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });

    console.log(`Deleting directory "${path}"...`);
    fs.rmdirSync(path);
  }
};

console.log('Cleaning "dist"...');
deleteFolderRecursive(`${__dirname}/dist`);
console.log('Successfully cleaned "dist"!');