// webpack.config.js
const path = require("path")
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Require the plugin module
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require the plugin module
const glob = require('glob'); // Require the glob module

module.exports = {
    mode: "development",
    entry: "./src/assets/js/app.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public/js")
    },
    module: {
        rules: [
            {
                test: /\.ejs$/, // Match any EJS file
                use: [
                    // Use one of these loaders
                    // 'html-loader', // Load and resolve the HTML file
                    // or
                    {
                        loader: 'ejs-loader', // Load and compile the EJS file
                        options: {
                            variable: 'data', // Specify a variable name for the data object
                            esModule: false, // Disable the ES module syntax
                        },
                    },
                ],
            },
            {
                test: /\.css$/, // Match any CSS file
                use: [
                    // Use one of these loaders
                    'style-loader', // Inject the CSS into the DOM
                    // or
                    MiniCssExtractPlugin.loader, // Extract the CSS into a file
                    'css-loader', // Load and resolve the CSS file
                    'postcss-loader', // Process the CSS file with postcss
                ],
            },
        ],
    },
    plugins: [
        // ...
        ...glob.sync('./src/views/**/*.ejs').map((file) => {
            // Create a new instance of the plugin for each EJS file
            return new HtmlWebpackPlugin({
                template: file, // Specify the template file
                filename: file.replace('./src/views/', ''), // Specify the output file name
            });
        }),
        new MiniCssExtractPlugin(), // Create a new instance of the plugin
    ],
}
