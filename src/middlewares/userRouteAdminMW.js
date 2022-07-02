const userRouteAdminMW = (req, res, next) => {
    //por session.  tiene que ser admin el usuario.
  req.session.idUser = 1;
  
  
  if (req.session.idUser == undefined || req.session.idUser <=0) {
    //no esta logueado.
    res.render("users/login", { titulo: "Mundo Mascota DH-Login" });
  } else {
    //si esta logueado , ejecutamos next() para seguir con la ejecucion.
    next();
  }
  
  
  
};

module.exports = userRouteAdminMW;
