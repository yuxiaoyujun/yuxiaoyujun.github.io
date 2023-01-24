const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	mode: "production",
	entry: "./main.js", // 相对路径
	output: {
		path: path.resolve(__dirname, "doc/"), //所有文件的输出路径，绝对路径
		// __dirname: nodejs的变量，代表当前文件的文件夹目录
		filename: "main[hash:15].js", //打包入口文件js的文件名，所以如果指定了js/xxx.js，那么入口js文件都会被打包到js目录下
		clean: true
		// 自动清空上次打包的内容
		// 原理：在打包前，将path整个目录清空，在进行打包输出
	},
	performance: {
		hints: false
	},
	module: {
		rules: [
			// loader的配置
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"]
			},
			{
				// 处理图片
				test: /\.(png|jpg|webp|svg)$/,
				type: "asset",
				parser: {
					dataUrlCondition: {
						// 位将小于10kb的图片转为base64
						maxSize: 10 * 1024
					}
				},
				generator: {
					// 输出图片名称及目录，hash：唯一id，10代表hash值只取前十位，ext：文件扩展名
					filename: "static/images/[hash:10][ext]"
				}
			}
		]
	},
	optimization: {
		minimizer: [new CssMinimizerPlugin({})]
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "index.html")
		})
	],
	devServer: {
		host: "localhost", // 服务器域名
		port: 8081, // 端口
		compress: true, //
		// static: path.join(__dirname,'dist','index.html')  //路径
		open: true
	}
};
