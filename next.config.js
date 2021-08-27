const path = require('path');

module.exports = {
  extends: ['eslint:recommended', 'next'],
  sassOptions: {
    includePaths: [path.join(__dirname, '/assets/scss/nextjs-material-dashboard-pro')],
  },
  env: {
    ROOT: __dirname,
  }
};
