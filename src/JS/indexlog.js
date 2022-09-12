


async function getProfileData() {
  const profile = await window.electronAPI.getProfile();
  document.getElementById('pfpicture').src = profile.picture;
  document.getElementById('pfname').innerText = profile.name;
  return profile;

};



document.getElementById('logout').onclick = () => {
  window.electronAPI.logOut();
};


module.exports = {
  getProfileData,

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
