const dev = process.env.NODE_ENV !== 'production';
const express = require('express')();
const app = require('http').createServer(express);
const next = require('next');

const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

module.exports = {
  nextApp,
  app,
  dev,
  nextHandler,
  express
};
