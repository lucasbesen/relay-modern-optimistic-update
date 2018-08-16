import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import { schema } from './data/schema';

const PORT = 3000;

const compiler = webpack({
  mode: 'development',
  entry: [
    'whatwg-fetch',
    path.resolve(__dirname, 'client', 'App.js')
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /\/node_modules\//,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  output: {
    filename: 'App.js',
    path: '/',
  },
});
const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  publicPath: '/client/',
  stats: {colors: true},
});

app.use('/', express.static(path.resolve(__dirname, 'public')));

app.use('/graphql', graphQLHTTP({
  schema: schema,
  pretty: true,
}));

app.listen(PORT, () => {
  console.log(`Running on port:${PORT}`);
});
