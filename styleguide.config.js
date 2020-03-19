const path = require('path')
const { styles, theme } = require('./styleguide.styles')
module.exports = {
  title: "React easy auth",
  usageMode: 'collapse',
  styles,
  theme,
  showSidebar: false,
  getComponentPathLine: componentPath => {
    const name = componentPath
      .split('src\\components\\')
      .pop()
      .split('.js')[0]
    return `import { ${name} } from '@unicef/react-easyauth`
  }, 
  webpackConfig: {
    module: {
      rules: [
        // Babel loader, will use your project’s babel.config.js
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  },
  // styleguideComponents: {
  //   Logo: path.join(__dirname, 'src/assets/logo.png')
  // },
  sections: [
    {
      name: '',
      content: 'README.md'
    },
    {
      name: '',
      components: 'src/components/[A-Z]*.js',
    }
  ],
  //components: 'src/components/[A-Z]*.js', 
};
