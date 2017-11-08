require('babel/register');
const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();

app.use(serve('./src'));

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
