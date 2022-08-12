window.$ = window.jQuery = require('jquery');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password: null,
  database: 'wMng-db'
 });

 const invCategoriesTemp = ({catKey, name}) => `
 <div id="invCatHeadDisplayHead${catKey}" style="  flex: 0 0 auto; color: #bbbdc3;  font-family: 'Roboto Mono', monospace; font-size: 25px; padding:0;">
 <h1 style="float: left;"> ${name} </h1>

     <a href="#" class=invCatContentBtn style="color: #bbbdc3;font-family: 'Roboto Mono', monospace;font-size: 25px;float: right;" onclick="expandCategory(${catKey})">
       <h1 style="top:0;">+</h1>
       </a>

     </div>
   <div class=invcatContent id=invCatContent${catKey} style="display: none; overflow: hidden;">
   <table class=invcatContentTab id=invCatTab${catKey} style="  position: relative;">
   <tr><th>Item UPC</th><th>Item Name</th><th>Item Size</th><th>Item Price</th><th>Item Stock</th></tr>
   </table>
   </div>
   `;

 connection.connect(function(err) {
     if(err){
         console.log(err.code);
         console.log(err.fatal);
     }
 })

displayCategoriesMax();



function createCategoryDropDown(name, catKey){
$(document).ready(function () {
    var catDiv = {
        class: "invCatDisplay",
        id: "cat" + catKey,
       css:{
           "padding": "10px",
             "margin": "25px",
           "background":"#242629",
         }
        }

      var $div = $("<div>", catDiv);

        $div.html([
  { name: name, catKey:catKey},
  ].map(invCategoriesTemp).join(''));

        $(".mainContent").append($div);


})




}






function insertCatRow(){
  let catSubmitBtn = document.getElementById("catSubmitBtn");
      catSubmitBtn.addEventListener('click', event => {insertCatRow();});

  const x = document.getElementById("categoryNameTxt").value;

  $query = "INSERT INTO `inv_categories` (`categoryName`) VALUES ('" + x + "')";

  connection.query($query, function(err, rows, fields) {
  if(err){
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
    console.log("Query succesfully executed", rows);
  });
}



function displayCategoriesQuery(result){
var catName, upc, itemName, itemSize, itemPrice, itemStock;

for(let i = 1; i <= result; i++){
  $query1 = "SELECT categoryName FROM inv_categories WHERE categoryKey =" + i;
  $query = "SELECT * FROM inventory WHERE categoryID =" + i;
  connection.query($query1 , function(err, result, fields) {
  if(err){
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }

        catName = result[0].categoryName;
        console.log(result);
        createCategoryDropDown(catName, i);
        createInvItemList(i);
      });








  }
}



function displayCategoriesMax(){
  $query = "SELECT categoryKey FROM inv_categories order by categoryKey desc limit 1";

  connection.query($query, function(err, result, fields) {
  if(err){
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
        var catKey = result[0].categoryKey;
        console.log(result);
        displayCategoriesQuery(catKey);
  });
}



function createInvItemList(catKey){

  $query = "SELECT * FROM `inventory` WHERE CategoryID = " + catKey;

  connection.query($query, function(err, result, fields) {
  if(err){
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
        var a = result;
        console.log(result);
        createInventoryTable(a, catKey);
  });


}


function createInventoryTable(itemArr, catKey){

for(let i = 1; i <= itemArr.length; i++){

  $(document).ready(function () {
      var itemTableRow = {
          class: "invCatTable",
          id: "table" + catKey,
          }

        var $table = $("<tr>", itemTableRow);

          $table.html();

          $("#invCatTab" + catKey).append($table);
        })
  }
}

function expandCategory(catKey){
var content = document.getElementById("invCatContent" + catKey)

  if (content.style.display === "block") {
     content.style.display = "none";
   } else {
     content.style.display = "block";
   }
}
