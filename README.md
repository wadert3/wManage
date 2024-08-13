# wManage

This was my first project when first learning the basics of Node.js and Electron and some very basic fundamentals of application development: 

 A simple buisness management tools designed to create and distribute orders as well as manage inventory and manager/employee communication

Install all electron dependencies. I used electron-forge with npx

Make project folder the wManage directory:
```
cd <# your wManage directory #>
npm install --save-dev @electron-forge/cli
npm exec --package=@electron-forge/cli -c "electron-forge import"
```
Install NPM Packages:
```
npm install mysql keytar jwt-decode jquery bulma
```
This project requires a running MySql Database
(I will include a template db file when project is more complete)
I used xampp for a simple setup
