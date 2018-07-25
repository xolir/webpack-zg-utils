# Webpack ZG utils

## Installation
```
npm install webpack-zg-utils
yarn add webpack-zg-utils
```

## Usage
Inside your webpack.config file add following:

```
  plugins: [
    new moduleSerializer([
      { extension: 'js', outputFile: './dist/js/js.txt'},
      { extension: 'css', outputFile: './dist/css/css.txt'}
    ]),
  ]
```

Module serializer will match all files with given extension and add their paths to output file. 