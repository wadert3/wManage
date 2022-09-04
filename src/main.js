window.$ = window.jQuery = require('jquery');
let mysql = require('mysql');
const inventory = require("../src/JS/inventory.js");
const logIn = require("../src/JS/indexlog.js");

let connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password: null,
  database: 'wMng-db'
 });
 connection.connect(function(err) {
     if(err){
         console.log(err.code);
         console.log(err.fatal);
     }
 })






logIn.getProfileData().then(() => {
console.log(logIn.pfData);

$(document).ready(function(){

   $(".mainContent").load("PAGES/home.html", function() {
       $(".welcomeBanner").html("Welcome " + logIn.pfData.name);
   });

   $("#navBarPfpBtn").click(function(){
     $(".mainContent").load("PAGES/profile.html", function() {
       document.getElementById('pfpictureBanner').src = logIn.pfData.picture;
       document.getElementById('pfnameBanner').innerText = logIn.pfData.name;
     });

       $(".navBarTopBtn").css('background-color', '#242629');
       $(".navBarBtmBtnI").css('background-color', '#242629');

       $("#navBarPfpBtn").css('background-color', '#2c2f33');

       });

   $("#pageHead").click(function(){
     $(".mainContent").load("PAGES/home.html", function() {
         $(".welcomeBanner").html("Welcome " + logIn.pfData.name);
     });

     $(".navBarTopBtn").css('background-color', '#242629');
     $("#notificationsBtn").css('background-color', '#242629');

   });


    $("#inventoryBtn").click(function(){
       $('.mainContent').load('PAGES/inventory.html');

       $(".navBarTopBtn").css('background-color', '#242629');
       $("#notificationsBtn").css('background-color', '#242629');

       $("#inventoryBtn").css('background-color', '#2c2f33');
     inventory.displayCategoriesMax();

    });

    $("#employeesBtn").click(function(){
        $('.mainContent').load('PAGES/employees.html');

        $(".navBarTopBtn").css('background-color', '#242629');
        $("#notificationsBtn").css('background-color', '#242629');

        $("#employeesBtn").css('background-color', '#2c2f33');

        });

      $("#newOrdersBtn").click(function(){
        $('.mainContent').load('PAGES/newOrders.html');

        $(".navBarTopBtn").css('background-color', '#242629');
        $("#notificationsBtn").css('background-color', '#242629');

        $("#newOrdersBtn").css('background-color', '#2c2f33');


        });

      $("#openOrdersBtn").click(function(){
          $('.mainContent').load('PAGES/openOrders.html');

          $(".navBarTopBtn").css('background-color', '#242629');
          $("#notificationsBtn").css('background-color', '#242629');

          $("#openOrdersBtn").css('background-color', '#2c2f33');

          });

        $("#pastOrdersBtn").click(function(){
          $('.mainContent').load('PAGES/pastOrders.html');

          $(".navBarTopBtn").css('background-color', '#242629');
          $("#notificationsBtn").css('background-color', '#242629');

          $("#pastOrdersBtn").css('background-color', '#2c2f33');

          });

        $("#notificationsBtn").click(function(){
            $('.mainContent').load('PAGES/notifications.html');

            $(".navBarTopBtn").css('background-color', '#242629');
            $("#notificationsBtn").css('background-color', '#242629');

            $("#notificationsBtn").css('background-color', '#2c2f33');

            });



          });

})
