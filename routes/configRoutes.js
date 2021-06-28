const usersR = require('./users')

exports.configRoutes = (app) =>{
    app.use("/users",usersR)
}
exports.originAllow = (app) => {
    // מאפשר לקבל בקשות מדומיין אחר
    app.all('*', function (req, res, next) {
      if (!req.get('Origin')) return next();
      // במציאות היינו מחלפים את הכוכבית לשמות דומיינים שנרצה
      // שיוכלו לשגר לנו מטען בכל סוג של בקשה
      res.set('Access-Control-Allow-Origin', '*');
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
      res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,x-auth-token');
      next();
    });
  }