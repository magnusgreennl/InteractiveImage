const merge = require("webpack-merge");
const commonConfig = require("@mendix/pluggable-widgets-tools/configs/webpack.config.dev");

const devConfig = {
    module: {
        rules: [
            {
                test: /\.(svg)$/,
                loader: "url-loader"
            }
        ]
    }
};
const previewDevConfig = {}

module.exports = [merge(commonConfig[0], devConfig), merge(commonConfig[1], previewDevConfig), commonConfig[2]];