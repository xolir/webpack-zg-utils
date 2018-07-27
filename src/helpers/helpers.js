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

  module.exports.splitAssetsByExtension = splitAssetsByExtension;
  module.exports.findByExtension = findByExtension;
