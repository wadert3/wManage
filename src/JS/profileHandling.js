let name, nickname, picture, email, accountId, can_see_inventory, can_see_employees, can_see_past_orders, can_see_open_orders, can_create_order, can_change_privialages, can_create_inventory_items, can_create_inventory_categories, is_admin;
let arr;


class userProfile {
  constructor(names, nicknames, picture, email, accountId, can_see_inventory, can_see_employees, can_see_past_orders, can_see_open_orders, can_create_order, can_change_privialages, can_create_inventory_items, can_create_inventory_categories, is_admin) {
    this.name = name;
    this.nickname = nickname;
    this.picture = picture;
    this.email = email;
    this.accountId = accountId;
    this.can_see_inventory = can_see_inventory;
    this.can_see_employees = can_see_employees;
    this.can_see_past_orders = can_see_past_orders;
    this.can_see_open_orders = can_see_open_orders;
    this.can_create_order = can_create_order;
    this.can_change_privialages = can_change_privialages;
    this.can_create_inventory_items = can_create_inventory_items;
    this.can_create_inventory_categories = can_create_inventory_categories;
    this.is_admin = is_admin;
  }
}


const pfData = new userProfile();

async function getProfile() {
  const profile  = await logIn.getProfileData();
  pfData.name =  profile.name;
  pfData.nickname =  profile.nickname;
  pfData.picture =  profile.picture;
  pfData.email =  profile.email;
  console.log("Profile Grabbed", profile);


};

function testAccount() {
  $query = "SELECT email FROM `accounts` WHERE email = '" + pfData.email + "'";

  connection.query($query, function(err, result, fields) {
  if(err){
      console.log(err);
    }

    if (result.length > 0){
    console.log("Account in db");
  } else if(result.length == 0){
    console.log("Account not in DB");
    createAccount();
  }
  });
}

function createAccount() {
  $query = "INSERT INTO `accounts` (`username`, `name`, `picture`, `email`) VALUES (' " + pfData.nickname + " ','" + pfData.name + "','" + pfData.picture + "','" + pfData.email + "')";

  connection.query($query, function(err, rows, fields) {
    if(err){
        console.log(err);
      }
      console.log("Account Created", rows)
      });
}

function queryPermissionsId() {
  let x;
  console.log("SELECT id FROM `accounts` WHERE email = '" + pfData.email + "'");
  $query =  "SELECT id FROM `accounts` WHERE email = '" + pfData.email + "'";
  connection.query($query, function(err, result, fields) {

    if(err){
        console.log(err);
      }
      console.log(result);
      x = result[0].id;

      console.log("SELECT * FROM `permissions` WHERE accountId = '" + x + "'");
      $query =  "SELECT * FROM `permissions` WHERE accountId = '" + x + "'";
        connection.query($query, function(err, result, fields) {
          if(err){
              console.log(err);
            }
            console.log(result[0]);

            pfData.accountId = result[0].accountId;
            pfData.can_see_inventory = result[0].can_see_inventory;
            pfData.can_see_employees = result[0].can_see_employees;
            pfData.can_see_past_orders = result[0].can_see_past_orders;
            pfData.can_see_open_orders = result[0].can_see_open_orders;
            pfData.can_create_order = result[0].can_create_order;
            pfData.can_change_privialages = result[0].can_change_privialages;
            pfData.can_create_inventory_items = result[0].can_create_inventory_items;
            pfData.can_create_inventory_categories = result[0].can_create_inventory_categories;
            pfData.is_admin = result[0].is_admin;
            loadNav();
            console.log(pfData);
          });


  });


}


function loadNav() {
  let topBtn = $(".navBarTopBtnPrnt");
  if (pfData.is_admin > 0){
    console.log(pfData.is_admin);


        $.get("PAGES/navNewOrder.html", function(html) {
          topBtn.append(html);
        });
        $.get("PAGES/navOpenOrders.html", function(html) {
          topBtn.append(html);
        });
        $.get("PAGES/navPastOrders.html", function(html) {
          topBtn.append(html);
        });
        $.get("PAGES/navEmployees.html", function(html) {
          topBtn.append(html);
        });
        $.get("PAGES/navInventory.html", function(html) {
          topBtn.append(html);
        });


} else {
    if(pfData.can_create_order > 0){
      $.get("PAGES/navNewOrder.html", function(html) {
        topBtn.append(html);
      });
    }
    if(pfData.can_see_past_orders > 0){
      $.get("PAGES/navPastOrders.html", function(html) {
        topBtn.append(html);
      });
    }
    if(pfData.can_see_open_orders > 0){
      $.get("PAGES/navOpenOrders.html", function(html) {
        topBtn.append(html);
      });
    }
    if(pfData.can_see_inventory > 0){
      $.get("PAGES/navInventory.html", function(html) {
        topBtn.append(html);
      });
    }
    if(pfData.can_see_employees > 0){
      $.get("PAGES/navEmployees.html", function(html) {
        topBtn.append(html);
      });
    }


  }
}

module.exports = {
  getProfile,
  queryPermissionsId,
  pfData,
  testAccount,
  loadNav
}
