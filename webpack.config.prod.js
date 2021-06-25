const merge = require("webpack-merge");
const commonConfig = require("@mendix/pluggable-widgets-tools/configs/webpack.config.prod");

const prodConfig = {
    module: {
        rules: [
            {
                test: /\.(svg)$/,
                loader: "url-loader"
            }
        ]
    }
};
const previewProdConfig = {}

module.exports = [merge(commonConfig[0], prodConfig), merge(commonConfig[1], previewProdConfig), commonConfig[2]];
