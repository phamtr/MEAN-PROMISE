const crypto = require('crypto').randomBytes(256).toString('hex');
module.exports=
{
   uri: 'mongodb://truong:truong@ds247178.mlab.com:47178/angular-2-app',
    secret: crypto,
    db: 'angular-2-app'
  /* uri: 'mongodb://localhost:27017/mean-angular-2',
   secret: crypto,
   db: 'mean-angular-2'*/
}