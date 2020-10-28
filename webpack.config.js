const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        main: "./frontend/src/index.js",
    },
    module: {
        rules: [
            {
                test: /\.js|.jsx$/,
                use: "babel-loader",
                resolve: {
                    extensions: [".js", ".jsx"]
                },
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                loader: "file-loader",

                options: {
                    name: "[name].[ext]",
                    outputPath: ".frontend/static/dist",
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [new HTMLWebpackPlugin({ template: "./frontend/src/index.html" })],
    output: {
        path: path.resolve(__dirname, "backend/static/dist"),
        filename: "[name].bundle.js",
    },
    devServer: {
        contentBase: [
            path.join(__dirname, "backend/static/dist"),
        ],
        port: 3000,
        watchOptions: {
            poll: true,
            ignored: ['assets/**', 'node_modules/**']
        },
        sockPort: 3000,
    },
};
