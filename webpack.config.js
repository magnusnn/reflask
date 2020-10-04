const path = require("path");

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
    output: {
        path: path.resolve(__dirname, "backend/static/dist"),
        filename: "[name].bundle.js",
    },
    devServer: {
        writeToDisk: true,
    }
};
