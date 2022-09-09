/*  */
let cat;
let inventoryPage = true;

 const invCategoriesTemp = ({catKey, name}) => `
 <div id="invCatHeadDisplayHead${catKey}" style="background:#242629; color: #bbbdc3;  font-family: 'Roboto Mono', monospace; font-size: 25px;">
 <h1 style="float: left;"> ${name} </h1>

     <a href="#" class=invCatContentBtn style="color: #bbbdc3;font-family: 'Roboto Mono', monospace;font-size: 25px;" onclick="inventory.expandCategory(${catKey})">
       <h1 style="float: right;">+</h1>
       </a>
       <a href="#" class=invCatContentBtn style="color: #bbbdc3;font-family: 'Roboto Mono', monospace;font-size: 25px;" onclick="inventory.toggle(2); inventory.setCat(${catKey});">
       <h1 class="invCatAddItemBtn" style="float: right; padding-right: 15px;"> Add Item </h1>
       </a>
     </div>
   <div class=invcatContent id=invCatContent${catKey} style="display: none;">
   <table class=invcatContentTab id=invCatTab${catKey} style=" width:100%; position: relative;">
   <tr><th>Item UPC</th><th>Item Name</th><th>Item Size</th><th>Item Price</th><th>Item Stock</th></tr>
   </table>
   </div>
   `;


   function toggle(popKey){
     let blur = document.getElementById('mainContentId');
     blur.classList.toggle('active');

     let popup = document.getElementById('popup' + popKey);
     popup.classList.toggle('active');
   }
//displayCategoriesMax();

function setCat(catKey){
  cat = catKey;
}
function setInventory(value){
  inventoryPage = value;
}


function createCategoryDropDown(name, catKey, append){
$(document).ready(function () {
    let catDiv = {
        class: "invCatDisplay",
        id: "cat" + catKey,
       css:{
         "padding": "10px",
          "margin": "25px",
           "background":"#242629",
           "overflow" : "hidden"
         }
        }
      let $div = $("<div>", catDiv);
        $div.html([
  { name: name, catKey:catKey},
  ].map(invCategoriesTemp).join(''));
  $(append).append($div);

  if (inventoryPage == false){
    $(".invCatAddItemBtn").hide();

  }
})
}



function insertCatRow(){
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
  $(".contentBody").load(location.href + " .contentBody");
  displayCategoriesMax();
  document.getElementById("categoryNameTxt").value = ""
}



function insertInvItem(){
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
  document.getElementById("invItemNameStock").value = "";
  document.getElementById("invItemNameItemPrice").value = "";
  document.getElementById("invItemNameItemSize").value = "";
  document.getElementById("invItemNameItemName").value = "";
  document.getElementById("invItemNameUPC").value = "";
}



function displayCategoriesQuery(result, append){
let catName;

for(let i = 1; i <= result; i++){
  $query1 = "SELECT categoryName FROM inv_categories WHERE categoryKey =" + i;
  connection.query($query1 , function(err, result, fields) {
  if(err){
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
        catName = result[0].categoryName;
        console.log("Category Loaded: " , result[0].categoryName);
        createCategoryDropDown(catName, i, append);
        createInvItemList(i);
      });
  }
}



function displayCategoriesMax(append){
  $query = "SELECT categoryKey FROM inv_categories order by categoryKey desc limit 1";

  connection.query($query, function(err, result, fields) {
  if(err){
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
        catKey = result[0].categoryKey;
        console.log("Max Cateogries: ", result[0].categoryKey);
        displayCategoriesQuery(catKey, append);
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
        let arr1 = result;
        console.log("Category ", catKey, " table loaded");
        createInventoryTable(arr1, catKey);
  });
}



function createInventoryTable(arr1, catKey){
let upa, itemName, itemSize, itemPrice, itemStock;

  for(let i = 0; i < arr1.length; i++){
     upa = arr1[i].UPC;
     itemName = arr1[i].ItemName;
     itemSize = arr1[i].ItemSize;
     itemPrice = arr1[i].ItemPrice;
     itemStock = arr1[i].ItemStock;
     table = "<tr><td>"+ upa + "</td><td>"+ itemName + "</td><td>"+ itemSize + "</td><td>"+ itemPrice + "</td><td>"+ itemStock + "</td></tr>";
     tableBody = $("#invCatTab" + catKey);
     tableBody.append(table);
          }
        }



function expandCategory(catKey){
let content = document.getElementById("invCatContent" + catKey)

  if (content.style.display === "inline-block") {
     content.style.display = "none";
   } else {
     content.style.display = "inline-block";
   }
}



function toggle2(catKey){
  console.log(catKey);
}

module.exports = {
  toggle,
  invCategoriesTemp,
  cat,
  setCat,
  createCategoryDropDown,
  insertCatRow,
  insertInvItem,
  displayCategoriesQuery,
  displayCategoriesMax,
  createInvItemList,
  createInventoryTable,
  expandCategory,
  setInventory
}
