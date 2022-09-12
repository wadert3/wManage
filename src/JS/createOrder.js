const itemsObject ={};

class orderListItem {
  constructor(itemID, UPC, itemName, itemSize, itemPrice, itemStock, categoryKey) {
    this.itemID = itemID;
    this.UPC = UPC;
    this.itemName = itemName;
    this.itemPrice = itemPrice;
    this.itemStock = itemStock;
    this.categoryKey = categoryKey;
  }
}

const orderItemsListTemp = ({orderItem, }) => `

  `;

function run(){
  let elements = document.getElementsByTagName('tr');
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function() {
      addToOrderList(elements[i]);

    });
  }
}

function addToOrderList(itemId) {
console.log(itemId);

$query = "SELECT * FROM `inventory` WHERE itemID = " + itemId;

connection.query($query, function(err, result, fields) {
if(err){
    console.log("An error ocurred performing the query.");
    console.log(err);
    return;
  }
  console.log(result);


    itemsObject['item' + itemId] = {
      itemID : result[0].ItemID,
      UPC : result[0].UPC,
      itemName : result[0].ItemName,
      itemPrice : result[0].ItemPrice,
      itemStock : result[0].ItemStock,
      categoryKey : result[0].CategoryID,
    }

console.log(itemsObject['item' + itemId]);


});
}

module.exports = {
run,
addToOrderList
}
