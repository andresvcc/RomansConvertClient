const dev = process.env.NODE_ENV !== 'production';
const express = require('express')();
const app = require('http').createServer(express);
const next = require('next');

const nextApp = next({ dev });

module.exports = {
  nextApp,
  app,
  dev
};
