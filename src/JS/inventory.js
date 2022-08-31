window.$ = window.jQuery = require('jquery');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password: null,
  database: 'wMng-db'
 });

var cat;

 const invCategoriesTemp = ({catKey, name}) => `
 <div id="invCatHeadDisplayHead${catKey}" style="background:#242629; color: #bbbdc3;  font-family: 'Roboto Mono', monospace; font-size: 25px;">
 <h1 style="float: left;"> ${name} </h1>

     <a href="#" class=invCatContentBtn style="color: #bbbdc3;font-family: 'Roboto Mono', monospace;font-size: 25px;" onclick="expandCategory(${catKey})">
       <h1 style="">+</h1>
       </a>
       <a href="#" class=invCatContentBtn style="color: #bbbdc3;font-family: 'Roboto Mono', monospace;font-size: 25px;" onclick="toggle(2);setCat(${catKey});">
       <h1> Add Item </h1>
       </a>
     </div>
   <div class=invcatContent id=invCatContent${catKey} style="display: none;">
   <table class=invcatContentTab id=invCatTab${catKey} style=" width:100%; position: relative;">
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



function setCat(catKey){
  cat = catKey;
}

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
  //let catSubmitBtn = document.getElementById("catSubmitBtn");
      //catSubmitBtn.addEventListener('click', event => {insertCatRow();});

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





function insertInvItem(){
//  let invSubmitBtn = document.getElementById("invSubmitBtn");
//      invSubmitBtn.addEventListener('click', event => {insertInvItem();});

  const x = document.getElementById("invItemNameStock").value;
  const y = document.getElementById("invItemNameItemPrice").value;
  const z = document.getElementById("invItemNameItemSize").value;
  const a = document.getElementById("invItemNameItemName").value;
  const b = document.getElementById("invItemNameUPC").value;



  $query = "INSERT INTO `inventory`(`UPC`, `ItemName`, `ItemSize`, `ItemPrice`, `ItemStock`, `CategoryID`) VALUES ('" + b + "','"+ a +"','"+ z +"','"+ y + "','"+ x +"','"+ cat +"')";

  connection.query($query, function(err, rows, fields) {
  if(err){
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
    console.log("Query succesfully executed", rows);
  });




  $("#invCatTab" + cat).load(location.href + " #invCatTab" + cat);
  createInvItemList(cat);
}


function displayCategoriesQuery(result){
var catName;

for(let i = 1; i <= result; i++){
  $query1 = "SELECT categoryName FROM inv_categories WHERE categoryKey =" + i;
//  $query = "SELECT * FROM inventory WHERE categoryID =" + i;
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
        var arr1 = result;
        console.log(arr1);
        createInventoryTable(arr1, catKey);

  });

}


function createInventoryTable(arr1, catKey){
var upa, itemName, itemSize, itemPrice, itemStock;

  for(let i = 0; i < arr1.length; i++){

     upa = arr1[i].UPC;
     console.log(upa);
     itemName = arr1[i].ItemName;
     itemSize = arr1[i].ItemSize;
     itemPrice = arr1[i].ItemPrice;
     itemStock = arr1[i].ItemStock;

     table = "<tr><td>"+ upa + "</td><td>"+ itemName + "</td><td>"+ itemSize + "</td><td>"+ itemPrice + "</td><td>"+ itemStock + "</td></tr>";

     tableBody = $("#invCatTab" + catKey);
     tableBody.append(table);

      console.log("invCatTab" + catKey)

          }

        }



function expandCategory(catKey){
var content = document.getElementById("invCatContent" + catKey)

  if (content.style.display === "inline-block") {
     content.style.display = "none";
   } else {
     content.style.display = "inline-block";
   }
}


function toggle2(catKey){

}
