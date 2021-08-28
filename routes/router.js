

module.exports = (app)=>{
    require('./../components/admin/routes/router')(app);
    require('./../components/api/users/routes/router')(app);
    require('./../components/api/products/routes/router')(app);
    require('./../components/api/orders/routes/router')(app);
    require('./../components/api/notification/routes/router')(app);
    require('./../components/api/meals/routes/router')(app);
}