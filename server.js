const dev = process.env.NODE_ENV !== 'production';
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const next = require('next');
const chalk = require('chalk');
const editJsonFile = require('edit-json-file');
const { RSA } = require('hybrid-crypto-js');
const { Crypt } = require('hybrid-crypto-js');

// Increase amount of entropy
const entropy = 'Random string, integer or float';
const crypt = new Crypt({ entropy });
const rsa = new RSA({ entropy });

const generateKey = () => new Promise((resolve, reject) => {
  rsa.generateKeyPairAsync().then((keyPair) => {
    resolve(keyPair);
  });
});

const { join } = require('path');
const { parse } = require('url');
const EmailCtrl = require('./assets/email/mailCrtl');
const upload = require('./upload');
const uploadImage = require('./uploadImage');
const uploadCategorie = require('./uploadCategorie');

const {
  getPublicKeyNameFun,
  dispatchFun,
  getPublicKeyFun,
  joinToPublicKey,
  logout,
  login,
  register,
  dateNow,
  validate,
  checkout,
  recovery,
  changePass,
  contactMoto,
  changePassProfil,
} = require('./socketOn/socketFunctions');

const publicsKeyJson = editJsonFile(`${__dirname}/assets/JsonDBU/publicsKey.json`, { autosave: true });
const users = editJsonFile(`${__dirname}/assets/JsonDBU/users.json`, { autosave: true });
const validateCodes = editJsonFile(`${__dirname}/assets/JsonDBU/validateCodes.json`, { autosave: true });
const globalSettings = editJsonFile(`${__dirname}/assets/JsonDBU/globalSettings.json`, { autosave: true });
const articlesJournal = editJsonFile(`${__dirname}/assets/JsonDBU/articlesJournal.json`, { autosave: true });
const faqJournal = editJsonFile(`${__dirname}/assets/JsonDBU/faqJournal.json`, { autosave: true });

const {
  dispatchFunAdmin,
  getPublicKeyFunAdmin,
  joinToPublicKeyAdmin,
} = require('./socketOnAdmin/socketFunctionsAdmin');

const publicsKeyJsonAdmin = editJsonFile(`${__dirname}/assets/JsonDBU/publicsKeyAdmin.json`, { autosave: true });
const providers = editJsonFile(`${__dirname}/assets/JsonDBU/providers.json`, { autosave: true });

const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const keys = editJsonFile(`${__dirname}/assets/JsonDBU/keys.json`, { autosave: true });

const updateKeys = async () => {
  const { privateKey, publicKey } = await generateKey();
  keys.set('publicKey', publicKey);
  keys.set('privateKey', privateKey);
};

// updateKeys();

const productJSON = editJsonFile(`${__dirname}/assets/JsonDBU/product.json`, { autosave: true });
const ordersJSON = editJsonFile(`${__dirname}/assets/JsonDBU/orders.json`, { autosave: true });
const salesJSON = editJsonFile(`${__dirname}/assets/JsonDBU/sales.json`, { autosave: true });
const billingJSON = editJsonFile(`${__dirname}/assets/JsonDBU/billing.json`, { autosave: true });

const database = {
  productJSON,
  ordersJSON,
  salesJSON,
  billingJSON,
  users,
  publicsKeyJson,
  globalSettings,
  articlesJournal,
  faqJournal,
};

// socket.io server
io.on('connection', (socket) => {
  console.log(`${dateNow()} ║ ✅ conect session ${chalk.blue(socket.id)}`);
  socket
    .on('dispatch', (data) => dispatchFun(io, data, socket, publicsKeyJson, users))
    .on('getPublicKey', (data) => getPublicKeyFun(io, socket, publicsKeyJson, productJSON.read(), articlesJournal.read(), faqJournal.read(), globalSettings.read()))
    .on('joinToPublicKey', (data) => joinToPublicKey(io, socket, data, publicsKeyJson, users, productJSON.read(), articlesJournal.read(), faqJournal.read(), globalSettings.read()))
    .on('logout', () => logout(io, socket, publicsKeyJson))
    .on('login', (data) => login(io, socket, data, users, publicsKeyJson))
    .on('register', (data) => register(io, socket, data, users, publicsKeyJson, validateCodes))
    .on('recovery', (data) => recovery(io, socket, data, users, publicsKeyJson, validateCodes))
    .on('changePass', (data) => changePass(io, socket, data, users, publicsKeyJson, validateCodes))
    .on('changePassProfil', (data) => changePassProfil(io, socket, data, users, publicsKeyJson, validateCodes))

    .on('validate', (data) => validate(io, socket, data, users, publicsKeyJson, validateCodes))
    .on('checkout', (data) => checkout(io, socket, data, users, publicsKeyJson, database))
    .on('contactMotorcycle', (data) => contactMoto(io, socket, data, users, publicsKeyJson, validateCodes))
    //
    .on('dispatchAdmin', (data) => dispatchFunAdmin(io, data, socket, publicsKeyJsonAdmin))
    .on('getPublicKeyAdmin', (data) => getPublicKeyFunAdmin(io, socket, data, publicsKeyJsonAdmin, providers, database))
    .on('joinToPublicKeyAdmin', (data) => joinToPublicKeyAdmin(io, socket, data, publicsKeyJsonAdmin, providers, database))
    //
    .on('editProduct', (data) => {
      const { product, value } = data;
      const productsTemp = productJSON.get(product);
      const newProductList = productJSON.set(product, {
        ...productsTemp,
        ...value,
      });
      socket.emit('dispatch', { state: 'productList', value: newProductList.data }); // publicsKey[room].profilInfo
    })
    //
    .on('editVisibilityProduct', async (data) => {
      const { product, value } = data;
      const newProductList = productJSON.set(`${product}.visibility`, value);
      await socket.emit('dispatch', { state: 'productList', value: newProductList.data }); // publicsKey[room].profilInfo
    })
    //
    .on('addProudct', async (data) => {
      const { product, value } = data;
      const newProductList = productJSON.set(product, value);
      await socket.emit('dispatch', { state: 'productList', value: newProductList.data }); // publicsKey[room].profilInfo
    })
    //
    .on('delProduct', (data) => {
      const newProductList = productJSON.set(`${data}.hidden`, true);
      socket.emit('dispatch', { state: 'productList', value: newProductList.data }); // publicsKey[room].profilInfo
    })
    //
    .on('globalSettings', async (data) => {
      const { key, value } = data;
      const newList = globalSettings.set(key, value);
      await socket.emit('dispatch', { state: 'globalSettings', value: newList.data }); // publicsKey[room].profilInfo
    })
    // faqJournal
    .on('faqJournal', async (data) => {
      const { key, value } = data;
      const newList = faqJournal.set(`list.${key}`, value);
      await socket.emit('dispatch', { state: 'faqJournal', value: newList.data }); // publicsKey[room].profilInfo
      await socket.emit('faqJournal', true); // publicsKey[room].profilInfo
    })

  // .on('faqJournalAll', async (data) => {
  //   const { value } = data;
  //   const newList = faqJournal.set('list', value);
  //   await socket.emit('dispatch', { state: 'faqJournal', value: newList.data }); // publicsKey[room].profilInfo
  // })

    .on('faqJournalOrder', async (data) => {
      const { value } = data;
      const newList = faqJournal.set('order', value);
      await socket.emit('dispatch', { state: 'faqJournal', value: newList.data }); // publicsKey[room].profilInfo
    })

    // articlesJournal
    .on('articlesJournal', async (data) => {
      const { key, value } = data;
      const newList = articlesJournal.set(`list.${key}`, value);
      await socket.emit('dispatch', { state: 'articlesJournal', value: newList.data }); // publicsKey[room].profilInfo
      await socket.emit('articlesJournal', true); // publicsKey[room].profilInfo
    })

  // .on('articlesJournalAll', async (data) => {
  //   const { value } = data;
  //   const newList = articlesJournal.set('list', value);
  //   await socket.emit('dispatch', { state: 'articlesJournal', value: newList.data }); // publicsKey[room].profilInfo
  // })

    .on('articlesJournalOrder', async (data) => {
      const { value } = data;
      const newList = articlesJournal.set('order', value);
      await socket.emit('dispatch', { state: 'articlesJournal', value: newList.data }); // publicsKey[room].profilInfo
    })
    //
    .on('newProvider', async (data) => {
      const { key, value } = data;
      const providersJSON = await providers.read();
      const exist = !!providersJSON.list[key]?.name;
      if (!exist) {
        const newList = await providers.set(`list.${key}`, {
          ...value, orders: [], date: new Date(), visible: 'true'
        });
        await socket.emit('dispatch', { state: 'providers', value: { ...newList.data } });
        await socket.emit('newProvider', { ok: true });
      } else {
        await socket.emit('newProvider', { err: 'error' }); // publicsKey[room].profilInfo
      }
    })
    //
    .on('editProvider', async (data) => {
      const { key, value } = data;
      const providersJSON = await providers.read();
      const exist = !!providersJSON.list[key]?.name;
      if (!exist) {
        await socket.emit('editProvider', {
          err: 'error', exist: !exist, key, value
        }); // publicsKey[room].profilInfo
      } else {
        const newList = await providers.set(`list.${key}`, { ...value, orders: providersJSON.list[key].orders });
        await socket.emit('dispatch', { state: 'providers', value: { ...newList.data } });
        await socket.emit('editProvider', { ok: true });
      }
    })
    //
    .on('deleteProvider', async (data) => {
      const { key } = data;
      const providersJSON = await providers.read();
      const exist = !!providersJSON.list[key]?.name;
      if (!exist) {
        await socket.emit('deleteProvider', {
          err: 'error', exist: !exist
        }); // publicsKey[room].profilInfo
      } else {
        const newList = await providers.set(`list.${key}.visible`, 'false');
        await socket.emit('dispatch', { state: 'providers', value: { ...newList.data } });
        await socket.emit('deleteProvider', { ok: true });
      }
    })
    //
    .on('setOrderProvider', async (data) => {
      const { newProviderList } = data;

      const providersJSON = await providers.get('list');
      const newList = await providers.set('list', {
        ...providersJSON,
        ...newProviderList
      });
      await socket.emit('dispatch', { state: 'providers', value: { ...newList.data } });
      await socket.emit('setOrderProvider', { ok: true });
    })
    //
    .on('sendMail', async (data) => {
      const {
        to, objet, message, res, ...rest
      } = data;

      const resultsMail = await EmailCtrl.sendEmail({
        email: to, // <- adresse e-mail de l'utilisateur
        subject: objet,
        // corps du message ...  vous ne pouvez pas utiliser javascript dans le corps mais css
        message
      });

      console.log(resultsMail, 'resultMail');

      await socket.emit(res, {
        ok: true, message, ...rest, mailCheck: resultsMail
      });
    })
    //
    .on('setOrder', async (data) => {
      const { idBilling, orderData } = data;
      const order = await database.ordersJSON.get(`list.${idBilling}`);
      const response = await database.ordersJSON.set(`list.${idBilling}`, { ...order, ...orderData });
      await socket.emit('dispatch', { state: 'orders', value: response.data });
      await socket.emit('setOrder', { ok: true });
    })
    //
    .on('disconnecting', () => {
      const [publickey, elements] = getPublicKeyNameFun(io, socket);
      const index = elements.indexOf(socket.id);
      const temp = elements.splice(index, 1);

      const user = publicsKeyJson.get(publickey);
      if (user !== undefined) {
        return publicsKeyJson.set(`${publickey}.sessions`, temp);
      }

      const admin = publicsKeyJsonAdmin.get(publickey);
      if (admin !== undefined) {
        return publicsKeyJsonAdmin.set(`${publickey}.sessions`, temp);
      }
    })
    //
    .once('disconnect', () => {
      console.log(`${dateNow()} ║ ❌ Disconnected: ${chalk.blue(socket.id)}`);
    })
    .on('error', (err) => {
      console.log('received error from client:', socket.id);
    });
});

nextApp.prepare().then(() => {
  app.get((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    if (pathname === '/service-worker') {
      const filePath = join(__dirname, '.next', pathname);
      app.serveStatic(req, res, filePath);
    } else {
      nextHandler(req, res, parsedUrl);
    }
  });

  app.use('/upload', upload);
  app.use('/uploadimage', uploadImage);
  app.use('/uploadCategorie', uploadCategorie);

  app.get('/service-worker', (req, res) => {
    const filePath = join(__dirname, '.next/static/service-worker');
    res.sendFile(filePath);
  });

  app.get('/static/products/:photoName', (req, res) => {
    const filePath = join(__dirname, '/public/static/products/', req.params.photoName);
    res.sendFile(filePath);
  });

  app.get('/static/images/:photoName', (req, res) => {
    const filePath = join(__dirname, '/public/static/images/', req.params.photoName);
    res.sendFile(filePath);
  });

  app.get('/static/categorie/:photoName', (req, res) => {
    const filePath = join(__dirname, '/public/static/categorie/', req.params.photoName);
    res.sendFile(filePath);
  });

  app.get('*', (req, res) => nextHandler(req, res));
  app.post('*', (req, res) => nextHandler(req, res));
  app.put('*', (req, res) => nextHandler(req, res));
  app.delete('*', (req, res) => nextHandler(req, res));

  server.listen(dev ? process.env.DEV_PORT : process.env.PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${dev ? process.env.DEV_PORT : process.env.PORT}`);
  });
});
