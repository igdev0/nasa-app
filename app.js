const express = require('express');
const app = express();
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware');
const bodyParser = require('body-parser');

app.set('PORT', process.env.NODE_ENV || 8080);

app.use(webpackDevMiddleware(compiler, {
	open: true,
	hot: true,
	publicPath: webpackConfig.output.publicPath
}))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res) => {
	res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
})


app.listen(app.get('PORT'), ()=> {

	console.log(`the app is listening on port: ${app.get('PORT')}`);
})