const path = require('path');
const fs = require('fs');

const splitAssetsByExtension = assets => (
  assets.reduce((accumulator, asset) => {
    const fileExtension = asset.split('.').pop();

    accumulator[fileExtension] ?
      accumulator[fileExtension].push(asset) :
      accumulator[fileExtension] = [asset];

    return accumulator;
  }, {})
);

const findByExtension = (array, value) => (
  array.find(element => element.extension === value)
);

class moduleSerializer {
  constructor(fileMap) {
    this.fileMap = fileMap;
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      const assetsMap = splitAssetsByExtension(Object.keys(compilation.assets));

      Object.keys(assetsMap).map((assetKey) => {
        const fileMapByKey = findByExtension(this.fileMap, assetKey);

        if (fileMapByKey) {
          const fileName = fileMapByKey.outputFile;
          const outputNames = assetsMap[assetKey];
          const diskFile = path.resolve(fileName);

          fs.exists(diskFile, (fileExists) => {
            if (!fileExists) fs.writeFile(diskFile); 
            fs.readFile(path.resolve(fileName), 'utf8', (error, file) => {
              const output = outputNames
                .filter(outputName => !file.split('\n').includes(outputName))
                .reduce((accumulator, outputName) => accumulator.concat(`${outputName}\n`), '');
    
              fs.writeFile(path.resolve(fileName), file.concat(output));
            });
          });
        }
      });

      callback();
    });
  }
}

module.exports = moduleSerializer;
module.exports.splitAssetsByExtension = splitAssetsByExtension;
module.exports.findByExtension = findByExtension;