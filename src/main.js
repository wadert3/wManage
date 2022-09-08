window.$ = window.jQuery = require('jquery');
let mysql = require('mysql');
const inventory = require("../src/JS/inventory.js");
const logIn = require("../src/JS/indexlog.js");
const profileData = require("../src/JS/profileHandling.js");


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


profileData.getProfile()
  .then(() => {


      profileData.testAccount();
      profileData.queryPermissionsId();



$(document).ready(function(){




   $(".mainContent").load("PAGES/home.html", function() {
       $(".welcomeBanner").html("Welcome " + profileData.pfData.name);
   });

   $("#navBarPfpBtn").click(function(){



     $(".mainContent").load("PAGES/profile.html", function() {
       document.getElementById('pfpictureBanner').src = profileData.pfData.picture;
       document.getElementById('pfnameBanner').innerText = profileData.pfData.nickname;
     });

       $(".navBarTopBtn").css('background-color', '#242629');
       $(".navBarBtmBtnI").css('background-color', '#242629');

       $("#navBarPfpBtn").css('background-color', '#2c2f33');

       });

   $("#pageHead").click(function(){

     $(".mainContent").load("PAGES/home.html", function() {
         $(".welcomeBanner").html("Welcome " + profileData.pfData.name);
     });

     $(".navBarTopBtn").css('background-color', '#242629');
     $("#notificationsBtn").css('background-color', '#242629');

   });

      $("body").on("click", "#inventoryBtn", function(){
      inventory.displayCategoriesMax();
    $('.mainContent').load('PAGES/inventory.html');
    $(".navBarTopBtn").removeClass("selected");
    $(".navBarBtmBtnI").removeClass("selected");

    $("#inventoryBtn").addClass("selected");


});


      $("body").on("click", "#employeesBtn", function(){

        $('.mainContent').load('PAGES/employees.html');

        $(".navBarTopBtn").css('background-color', '#242629');
        $("#notificationsBtn").css('background-color', '#242629');

        $("#employeesBtn").css('background-color', '#2c2f33');

        });

      $("body").on("click", "#newOrdersBtn", function(){

        $('.mainContent').load('PAGES/newOrders.html');

        $(".navBarTopBtn").css('background-color', '#242629');
        $("#notificationsBtn").css('background-color', '#242629');

        $("#newOrdersBtn").css('background-color', '#2c2f33');


        });

      $("body").on("click", "#openOrdersBtn", function(){

          $('.mainContent').load('PAGES/openOrders.html');

          $(".navBarTopBtn").css('background-color', '#242629');
          $("#notificationsBtn").css('background-color', '#242629');

          $("#openOrdersBtn").css('background-color', '#2c2f33');

          });

      $("body").on("click", "#pastOrdersBtn", function(){

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
