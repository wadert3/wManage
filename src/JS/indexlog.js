//const inventory = require("../src/JS/inventory.js");
let names, nicknames, picture;
let arr;

class prof {
  constructor(name, nickname, picture) {
    this.name = name;
    this.nickname = nickname;
    this.picture = picture;
  }
}

const pfData = new prof(names, nicknames, picture);




async function getProfileData() {
  const profile = await window.electronAPI.getProfile();
  names = profile.name;
  nicknames = profile.nickname;
  picture = profile.picture;
  console.log(names, nicknames);
  document.getElementById('pfpicture').src = profile.picture;
  document.getElementById('pfname').innerText = nicknames;
  pfData.name = names;
  pfData.nickname = nicknames;
  pfData.picture = picture;

//  document.getElementById('success').innerText = 'You successfully used OpenID Connect and OAuth 2.0 to authenticate.';
};



document.getElementById('logout').onclick = () => {
  window.electronAPI.logOut();
};






module.exports = {
  getProfileData,
  pfData,
}
//const foobar = await profile.then(result => result.data);
//  console.log(profile.nickname);
/*
document.getElementById('secured-request').onclick = async () => {
  try {
    const response = await window.electronAPI.getPrivateData();
    const messageJumbotron = document.getElementById('message');
    messageJumbotron.innerText = response;
    messageJumbotron.style.display = 'block';
  } catch(error) {
    console.error('Error connecting to te API: ' + error);
  }
};
*/
