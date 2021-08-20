module.exports = function override(config, env) {
    config = {
        ...config,
        resolve: {
            alias: {
                components: path.resolve(__dirname, 'src/components/'),
                pages: path.resolve(__dirname, 'src/pages/'),
                login: path.resolve(__dirname, 'src/components/login/'),
                styles: path.resolve(__dirname, 'src/styles/'),
            },
        }
    }
    return config;
}