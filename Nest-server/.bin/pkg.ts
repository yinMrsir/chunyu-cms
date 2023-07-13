const fs = require('fs');
const shell = require('shelljs');

createPackage().then(() => installPackage());

async function createPackage() {
  return new Promise((resolve, reject) => {
    const writerStream = fs.createWriteStream('./ncc_build/package.json');
    writerStream.write(`{
      "name": "chunyu-server",
      "bin": "index.js",
      "scripts": {
        "pkg": "pkg . -o app --debug"
      },
      "pkg": {
        "assets": "Comismsh.ttf",
        "targets": [ "node16-linux-x64", "node16-win-x64", "node16-macos-x64" ]
      },
      "devDependencies": {
        "pkg": "^5.8.1"
      }
    }`);

    writerStream.end();

    writerStream.on('finish', () => {
      console.log('ncc_build/package.json创建完成');
      resolve(true);
    });

    writerStream.on('error', (err) => {
      reject(err.stack);
    });
  });
}

/** 安装依赖包 */
async function installPackage() {
  shell.cd('ncc_build');
  // 默认使用yarn安装
  let action = 'yarn';
  // 如果yarn未安装，就使用npm
  !shell.which(action) && (action = 'npm');
  shell.exec(`${action} install`, (code) => {
    if (code !== 0) {
      console.log(`Error: 安装失败, 请进入ncc_build后执行:npm install`);
    } else {
      console.log(`安装pkg包完成.`);
      shell.exec(`${action === 'yarn' ? 'yarn' : 'npm run'} pkg`);
    }
  });
}
