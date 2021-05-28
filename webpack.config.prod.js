const merge = require("webpack-merge");
const baseConfig = require("@mendix/pluggable-widgets-tools/configs/webpack.config.prod");

const customConfig = {
    module: {
        rules: [
            {
                test: /\.(svg)$/,
                loader: "url-loader"
            }
        ]
    }
};

module.exports = [merge(baseConfig[0], customConfig), merge(baseConfig[1], customConfig)];
