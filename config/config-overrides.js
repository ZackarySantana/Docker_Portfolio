const path = require('path');

module.exports = function override(config, env) {
    config = {
        ...config,
        resolve: {
            alias: {
                Components: path.resolve(__dirname, 'src/components/'),
                Pages: path.resolve(__dirname, 'src/pages/'),
                Login: path.resolve(__dirname, 'src/components/login/'),
                Styles: path.resolve(__dirname, 'src/styles/'),
            },
        }
    }
    return config;
}