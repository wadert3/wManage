var connection = mysql.createConnection({
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


  
