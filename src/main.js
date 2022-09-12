window.$ = window.jQuery = require('jquery');
let mysql = require('mysql');
const inventory = require("../src/JS/inventory.js");
const logIn = require("../src/JS/indexlog.js");
const profileData = require("../src/JS/profileHandling.js");
const orderCreation = require("../src/JS/createOrder.js");

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





$(document).ready(function(){

  profileData.testAccount();



   $(".mainContent").load("PAGES/home.html", function() {
       $(".welcomeBanner").html("Welcome " + profileData.pfData.name);
   });
   $("body").on("click", "#navBarPfpBtn", function(){


     $(".mainContent").load("PAGES/profile.html", function() {
       document.getElementById('pfpictureBanner').src = profileData.pfData.picture;
       document.getElementById('pfnameBanner').innerText = profileData.pfData.nickname;
     });

     $(".navBarTopBtn").removeClass("selected");
     $(".navBarBtmBtnI").removeClass("selected");

     $("#navBarPfpBtn").addClass("selected");

       });

      $("body").on("click", "#pageHead", function(){

     $(".mainContent").load("PAGES/home.html", function() {
         $(".welcomeBanner").html("Welcome " + profileData.pfData.name);
     });

     $(".navBarTopBtn").removeClass("selected");
     $(".navBarBtmBtnI").removeClass("selected");

   });

      $("body").on("click", "#inventoryBtn", function(){
        inventory.setInventory(true);
    $('.mainContent').load('PAGES/inventory.html');
          inventory.displayCategoriesMax(".contentBody");
    $(".navBarTopBtn").removeClass("selected");
    $(".navBarBtmBtnI").removeClass("selected");

    $("#inventoryBtn").addClass("selected");


});


      $("body").on("click", "#employeesBtn", function(){

        $('.mainContent').load('PAGES/employees.html');

        $(".navBarTopBtn").removeClass("selected");
        $(".navBarBtmBtnI").removeClass("selected");

        $("#employeesBtn").addClass("selected");

        });

      $("body").on("click", "#newOrdersBtn", function(){

        $('.mainContent').load('PAGES/newOrders.html');
        inventory.setInventory(false);
        inventory.displayCategoriesMax("#createOrderContentLeft");

        $("body").on("click", "tr", function(){

          let id = $(this).attr('id');

          if(id != undefined){
          console.log(id);

          let itemID = $('#' + id).attr('class');
          console.log(itemID);
          orderCreation.addToOrderList(itemID);


          }
          });




        $(".navBarTopBtn").removeClass("selected");
        $(".navBarBtmBtnI").removeClass("selected");

        $("#newOrdersBtn").addClass("selected");

        });

      $("body").on("click", "#openOrdersBtn", function(){

          $('.mainContent').load('PAGES/openOrders.html');

          $(".navBarTopBtn").removeClass("selected");
          $(".navBarBtmBtnI").removeClass("selected");

          $("#openOrdersBtn").addClass("selected");

          });

      $("body").on("click", "#pastOrdersBtn", function(){

          $('.mainContent').load('PAGES/pastOrders.html');

          $(".navBarTopBtn").removeClass("selected");
          $(".navBarBtmBtnI").removeClass("selected");

          $("#pastOrdersBtn").addClass("selected");

          });

          $("body").on("click", "#notificationsBtn", function(){


            $('.mainContent').load('PAGES/notifications.html');

            $(".navBarTopBtn").removeClass("selected");
            $(".navBarBtmBtnI").removeClass("selected");

            $("#notificationsBtn").addClass("selected");

            });



          });
        })
