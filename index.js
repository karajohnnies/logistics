//KARAGIANNAKIS VASILEIOS CS3

// Import the mssql package
var sql = require("mssql");
var express = require('express');
var session = require('express-session');


var app = express();
const bodyParser = require("body-parser");
const path = require('path');
app.set("view engine", "ejs"); 
var h="HELLLOOOOOOO";
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname));


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


var config = {
  server: "karajohnnies.database.windows.net", // Use your SQL server name
  database: "Karajohnnies", // Database to connect to
  user: "Karajohnnies", // Use your username
  password: "Pologti125", // Use your password
  port: 1433,
  // Since we're on Windows Azure, we need to set the following options
  options: {
      encrypt: true,
      enableArithAbort: true

  }
};
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  sql.connect(config, function (err) {
      if (err) console.log(err);
      var request = new sql.Request();


      if (username && password) {

          request.query("select * from TableLogin where UserName = '" + username + "' and Password = '" + password + "'", function (err, recordset) {
       
              try {
                  if (recordset.recordset[0].UserName != undefined && recordset.recordset[0].Password != undefined) {
                      var str1 = recordset.recordset[0].UserName;
                      var str2 = recordset.recordset[0].Password;

                      str1 = str1.replace(/\s/g, '');
                      str2 = str2.replace(/\s/g, '');

                      //console.log(str1.length);
                     // console.log(username.length);

                      if (str1 == username && str2 == password) {

                         response.redirect('/compapp');

                      }
                  } else {

                    response.redirect('/');

                  }

                  sql.close();
              } catch (err) {
                  sql.close();                             
                            //response.send('Please enter Username and Password!');
                            response.redirect('/');




              }
          });
      } else {
          response.send('Please enter Username and Password!');
          sql.close();
      }
  });
});


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


app.post('/test', function (req, res) {
   
  var config = {
    server: "karajohnnies.database.windows.net", // Use your SQL server name
    database: "Karajohnnies", // Database to connect to
    user: "Karajohnnies", // Use your username
    password: "Pologti125", // Use your password
    port: 1433,
    // Since we're on Windows Azure, we need to set the following options
    options: {
          encrypt: true,
          enableArithAbort: true
   
      }
   };

  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      request.query('select * from TableCompany', function (err, recordset) {
        var background
          if (err) console.log(err)
          //res.send(recordset[1]);
          console.table(recordset.recordset);
          console.log(recordset.recordset[0]);
          let h ='<link rel="stylesheet" href="style.css">'+'<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins">'+'<div style="background:Peru;">'+'<h1 style = "font-family: Poppins,sans-serif; background:Peru;color:white;margin-top:0px;padding-top:18px;margin-left:77px;"><b>Suppliers</b><h1 style="background:#1d2d44"><div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div><hr>'
          let btnH = '<a href="/compapp" class="w3-bar-item w3-button w3-hover-white" style="margin-left:60px; ; margin-bottom:10px; border-radius:5px;color:white; onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white"><b>Home</b></a></div>'
          let InsertTexts='<form style="margin-left:50px; "action="/Insert" method="POST"><label for="CompName">Company Name:</label><input type="text"style="margin:15px;" id="CompName" name="CompName" required><label for="CompEmail">Company Email:</label>'+
          '<input type="text"style="margin:15px;" id="CompEmail" name="CompEmail" required>'+'<label for="CompAddr">Company Address:</label>'+
          '<input type="text" style="margin:15px;"id="CompAddr" name="CompAddr" required>'+
          '<Button class="myButton" type="submit" value="">Insert Entry</button></form>'

          let SearchTexts='<form style="margin-left:50px;"action="/Search" method="POST"><label for="CompName">Company:</label><input type="text"style="margin:15px;" id="CompName" name="SearchWord" required>'+
          '<Button class="myButton" type="submit" value="">Search Entry</button></form>'
          let clear ='<form style="margin-left:50px;"action="/test" method="POST">'+
          '<Button class="myButton" type="submit" value="">Refresh all</button></form><hr style="border-top: 1px solid #1d2d44;">'

          let str = '<table style="margin-left:60px;box-shadow: 8px -9px 0px 0px rgba(0,0,0,0.75);border:5px solid white;border-radius: 5px">';

          let row='<tr style="font-size:20px" >'+'<td style="width:150px;padding:6px; padding-bottom:12px;"><b>ID</b></td>'+
          '<td style="width:150px; padding:6px;padding-bottom:12px;"><b>Company </b></td>' 
          +'<td style="width:150px; padding:6px;padding-bottom:12px;"><b>Email</b></td>' +
          '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Adresss</b></td>';          
          for(let j=0;j<recordset.recordset.length;j++){
            if(j%2==0){ background="#ffe0a6";}
            else {background="white";}
            row=row+'<tr style="border:3px solid #1d2d44 padding:3px;">'+'<td style="width:150px; padding:3px; border-left:4px solid #1d2d44; background:'+background+'">'+(j+1)+'</td>'+'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;">'+recordset.recordset[j].Company+'</td>' 
      +'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Email+'</td>' +
      '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Address+'</td>' +
			'<td style="width:150px; padding:3px; border-bottom:1px solid #1d2d44;">'+'<form action="/test3" method="POST"><Button class="myButton"" type="submit" name="fname1" id="user_id"value="'+
			recordset.recordset[j].Id+'">Delete Entry</button></form>'+'</td>';//or input instead of button
          }
          str=str+row+'</table><br><br>';
          // send records as backa response
          //res.send(recordset.recordset[0].Company);
          res.send(h+btnH+InsertTexts+SearchTexts+clear+str);
          sql.close();
      });
  });
});
app.post('/Insert', function (req, res) {

  var CompName =  req.body.CompName;
  var CompMail =  req.body.CompEmail;
  var CompAddr =  req.body.CompAddr;

   var config = {
     server: "karajohnnies.database.windows.net", // Use your SQL server name
     database: "Karajohnnies", // Database to connect to
     user: "Karajohnnies", // Use your username
     password: "Pologti125", // Use your password
     port: 1433,
     // Since we're on Windows Azure, we need to set the following options
     options: {
           encrypt: true,
           enableArithAbort: true
       }
    };
    sql.connect(config, function (err) {
     
      var request = new sql.Request();

      request.query("insert into TableCompany(Company,Email,Address) values ('"+CompName+"','"+CompMail+"','"+CompAddr+"')", function (err, recordset) {
       if (err) console.log(err);

       sql.close();
   // connect to your database
   sql.connect(config, function (err) {
   
       if (err) console.log(err);
        var request = new sql.Request();
       request.query('select * from TableCompany', function (err, recordset) {
         var background
           if (err) console.log(err)
           //res.send(recordset[1]);
           console.table(recordset.recordset);
           console.log(recordset.recordset[0]);
           let h ='<link rel="stylesheet" href="style.css">'+'<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins">'+'<div style="background:Peru;">'+'<h1 style = "font-family: Poppins,sans-serif; background:Peru;color:white;margin-top:0px;padding-top:18px;margin-left:77px;"><b>Suppliers</b><h1 style="background:#1d2d44"><div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div><hr>'
          let btnH = '<a href="/compapp" class="w3-bar-item w3-button w3-hover-white" style="margin-left:60px; ; margin-bottom:10px; border-radius:5px;color:white; onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white"><b>Home</b></a></div>'
          let InsertTexts='<form style="margin-left:50px; "action="/Insert" method="POST"><label for="CompName">Company Name:</label><input type="text"style="margin:15px;" id="CompName" name="CompName" required><label for="CompEmail">Company Email:</label>'+
          '<input type="text"style="margin:15px;" id="CompEmail" name="CompEmail" required>'+'<label for="CompAddr">Company Address:</label>'+
          '<input type="text" style="margin:15px;"id="CompAddr" name="CompAddr" required>'+
          '<Button class="myButton" type="submit" value="">Insert Entry</button></form>'

          let SearchTexts='<form style="margin-left:50px;"action="/Search" method="POST"><label for="CompName">Company:</label><input type="text"style="margin:15px;" id="CompName" name="SearchWord" required>'+
          '<Button class="myButton" type="submit" value="">Search Entry</button></form>'
          let clear ='<form style="margin-left:50px;"action="/test" method="POST">'+
          '<Button class="myButton" type="submit" value="">Refresh all</button></form><hr style="border-top: 1px solid #1d2d44;">'

          let str = '<table style="margin-left:60px;box-shadow: 8px -9px 0px 0px rgba(0,0,0,0.75);border:5px solid white;border-radius: 5px">';

          let row='<tr style="font-size:20px" >'+'<td style="width:150px;padding:6px; padding-bottom:12px;"><b>ID</b></td>'+
          '<td style="width:150px; padding:6px;padding-bottom:12px;"><b>Company </b></td>' 
          +'<td style="width:150px; padding:6px;padding-bottom:12px;"><b>Email</b></td>' +
          '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Adresss</b></td>';          
          for(let j=0;j<recordset.recordset.length;j++){
            if(j%2==0){ background="#ffe0a6";}
            else {background="white";}
            row=row+'<tr style="border:3px solid #1d2d44 padding:3px;">'+'<td style="width:150px; padding:3px; border-left:4px solid #1d2d44; background:'+background+'">'+(j+1)+'</td>'+'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;">'+recordset.recordset[j].Company+'</td>' 
      +'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Email+'</td>' +
      '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Address+'</td>' +
			'<td style="width:150px; padding:3px; border-bottom:1px solid #1d2d44;">'+'<form action="/test3" method="POST"><Button class="myButton"" type="submit" name="fname1" id="user_id"value="'+
			recordset.recordset[j].Id+'">Delete Entry</button></form>'+'</td>';//or input instead of button
          }
          str=str+row+'</table><br><br>';
          // send records as backa response
          //res.send(recordset.recordset[0].Company);
          res.send(h+btnH+InsertTexts+SearchTexts+clear+str);
          sql.close();
          });
        });
       });
      });
     });


app.post('/Search', function (req, res) {
      var SearchWord =  req.body.SearchWord;  
       var config = {
         server: "karajohnnies.database.windows.net", // Use your SQL server name
         database: "Karajohnnies", // Database to connect to
         user: "Karajohnnies", // Use your username
         password: "Pologti125", // Use your password
         port: 1433,
         // Since we're on Windows Azure, we need to set the following options
         options: {
               encrypt: true,
               enableArithAbort: true
           }
        };
        sql.connect(config, function (err) {
         
            var request = new sql.Request();
            //"select * from TableCompany where Company like '%" + SearchWord + "%'"

           request.query("select * from TableCompany where Company like '%" + SearchWord + "%'", function (err, recordset) {
             var background
               if (err) console.log(err)
               //res.send(recordset[1]);
               console.table(recordset.recordset);
               console.log(recordset.recordset[0]);
               let h ='<link rel="stylesheet" href="style.css">'+'<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins">'+'<div style="background:Peru;">'+'<h1 style = "font-family: Poppins,sans-serif; background:Peru;color:white;margin-top:0px;padding-top:18px;margin-left:77px;"><b>Suppliers</b><h1 style="background:#1d2d44"><div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div><hr>'
          let btnH = '<a href="/compapp" class="w3-bar-item w3-button w3-hover-white" style="margin-left:60px; ; margin-bottom:10px; border-radius:5px;color:white; onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white"><b>Home</b></a></div>'
          let InsertTexts='<form style="margin-left:50px; "action="/Insert" method="POST"><label for="CompName">Company Name:</label><input type="text"style="margin:15px;" id="CompName" name="CompName" required><label for="CompEmail">Company Email:</label>'+
          '<input type="text"style="margin:15px;" id="CompEmail" name="CompEmail" required>'+'<label for="CompAddr">Company Address:</label>'+
          '<input type="text" style="margin:15px;"id="CompAddr" name="CompAddr" required>'+
          '<Button class="myButton" type="submit" value="">Insert Entry</button></form>'

          let SearchTexts='<form style="margin-left:50px;"action="/Search" method="POST"><label for="CompName">Company:</label><input type="text"style="margin:15px;" id="CompName" name="SearchWord" required>'+
          '<Button class="myButton" type="submit" value="">Search Entry</button></form>'
          let clear ='<form style="margin-left:50px;"action="/test" method="POST">'+
          '<Button class="myButton" type="submit" value="">Refresh all</button></form><hr style="border-top: 1px solid #1d2d44;">'

          let str = '<table style="margin-left:60px;box-shadow: 8px -9px 0px 0px rgba(0,0,0,0.75);border:5px solid white;border-radius: 5px">';

          let row='<tr style="font-size:20px" >'+'<td style="width:150px;padding:6px; padding-bottom:12px;"><b>ID</b></td>'+
          '<td style="width:150px; padding:6px;padding-bottom:12px;"><b>Company </b></td>' 
          +'<td style="width:150px; padding:6px;padding-bottom:12px;"><b>Email</b></td>' +
          '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Adresss</b></td>';          
          for(let j=0;j<recordset.recordset.length;j++){
            if(j%2==0){ background="#ffe0a6";}
            else {background="white";}
            row=row+'<tr style="border:3px solid #1d2d44 padding:3px;">'+'<td style="width:150px; padding:3px; border-left:4px solid #1d2d44; background:'+background+'">'+(j+1)+'</td>'+'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;">'+recordset.recordset[j].Company+'</td>' 
      +'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Email+'</td>' +
      '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Address+'</td>' +
			'<td style="width:150px; padding:3px; border-bottom:1px solid #1d2d44;">'+'<form action="/test3" method="POST"><Button class="myButton"" type="submit" name="fname1" id="user_id"value="'+
			recordset.recordset[j].Id+'">Delete Entry</button></form>'+'</td>';//or input instead of button
          }
          str=str+row+'</table><br><br>';
          // send records as backa response
          //res.send(recordset.recordset[0].Company);
          res.send(h+btnH+InsertTexts+SearchTexts+clear+str);
          sql.close();
              });
            });
          });


  app.post('/test3', function (req, res) {
   
    var fname =  req.body.fname1;
     var config = {
       server: "karajohnnies.database.windows.net", // Use your SQL server name
       database: "Karajohnnies", // Database to connect to
       user: "Karajohnnies", // Use your username
       password: "Pologti125", // Use your password
       port: 1433,
       // Since we're on Windows Azure, we need to set the following options
       options: {
             encrypt: true,
             enableArithAbort: true
      
         }
      };
     // connect to your database
     sql.connect(config, function (err) {
     
         var request = new sql.Request();

         request.query("delete from TableCompany where Id ="+fname, function (err, recordset) {
          console.log(fname);
          if (err) console.log(err);

          sql.close();
        
        sql.connect(config, function (err) {
          var request = new sql.Request();

         request.query('select * from TableCompany', function (err, recordset) {
             
             if (err) console.log(err)
             //res.send(recordset[1]);
             console.table(recordset.recordset);
             console.log(recordset.recordset[0]);
             let h ='<link rel="stylesheet" href="style.css">'+'<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins">'+'<div style="background:Peru;">'+'<h1 style = "font-family: Poppins,sans-serif; background:Peru;color:white;margin-top:0px;padding-top:18px;margin-left:77px;"><b>Suppliers</b><h1 style="background:#1d2d44"><div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div><hr>'
          let btnH = '<a href="/compapp" class="w3-bar-item w3-button w3-hover-white" style="margin-left:60px; ; margin-bottom:10px; border-radius:5px;color:white; onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white"><b>Home</b></a></div>'
          let InsertTexts='<form style="margin-left:50px; "action="/Insert" method="POST"><label for="CompName">Company Name:</label><input type="text"style="margin:15px;" id="CompName" name="CompName" required><label for="CompEmail">Company Email:</label>'+
          '<input type="text"style="margin:15px;" id="CompEmail" name="CompEmail" required>'+'<label for="CompAddr">Company Address:</label>'+
          '<input type="text" style="margin:15px;"id="CompAddr" name="CompAddr" required>'+
          '<Button class="myButton" type="submit" value="">Insert Entry</button></form>'

          let SearchTexts='<form style="margin-left:50px;"action="/Search" method="POST"><label for="CompName">Company:</label><input type="text"style="margin:15px;" id="CompName" name="SearchWord" required>'+
          '<Button class="myButton" type="submit" value="">Search Entry</button></form>'
          let clear ='<form style="margin-left:50px;"action="/test" method="POST">'+
          '<Button class="myButton" type="submit" value="">Refresh all</button></form><hr style="border-top: 1px solid #1d2d44;">'

          let str = '<table style="margin-left:60px;box-shadow: 8px -9px 0px 0px rgba(0,0,0,0.75);border:5px solid white;border-radius: 5px">';

          let row='<tr style="font-size:20px" >'+'<td style="width:150px;padding:6px; padding-bottom:12px;"><b>ID</b></td>'+
          '<td style="width:150px; padding:6px;padding-bottom:12px;"><b>Company </b></td>' 
          +'<td style="width:150px; padding:6px;padding-bottom:12px;"><b>Email</b></td>' +
          '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Adresss</b></td>';          
          for(let j=0;j<recordset.recordset.length;j++){
            if(j%2==0){ background="#ffe0a6";}
            else {background="white";}
            row=row+'<tr style="border:3px solid #1d2d44 padding:3px;">'+'<td style="width:150px; padding:3px; border-left:4px solid #1d2d44; background:'+background+'">'+(j+1)+'</td>'+'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;">'+recordset.recordset[j].Company+'</td>' 
      +'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Email+'</td>' +
      '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Address+'</td>' +
			'<td style="width:150px; padding:3px; border-bottom:1px solid #1d2d44;">'+'<form action="/test3" method="POST"><Button class="myButton"" type="submit" name="fname1" id="user_id"value="'+
			recordset.recordset[j].Id+'">Delete Entry</button></form>'+'</td>';//or input instead of button
          }
          str=str+row+'</table><br><br>';
          // send records as backa response
          //res.send(recordset.recordset[0].Company);
          res.send(h+btnH+InsertTexts+SearchTexts+clear+str);
          sql.close();
         });
     });
    });
   });
  });
//###########   STAFF   #########//

  app.post('/staff', function (req, res) {
    var config = {
      server: "karajohnnies.database.windows.net", // Use your SQL server name
      database: "Karajohnnies", // Database to connect to
      user: "Karajohnnies", // Use your username
      password: "Pologti125", // Use your password
      port: 1433,
      // Since we're on Windows Azure, we need to set the following options
      options: {
            encrypt: true,
            enableArithAbort: true
        }
     };
    // connect to your database
    sql.connect(config, function (err) {   
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
  
        request.query('select * from TableStaff', function (err, recordset) {
          var background
            if (err) console.log(err)
            //res.send(recordset[1]);
            console.table(recordset.recordset);
            console.log(recordset.recordset[0]);
            let h ='<link rel="stylesheet" href="style.css">'+'<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins">'+'<div style="background:Peru;">'+'<h1 style = "font-family: Poppins,sans-serif; background:Peru;color:white;margin-top:0px;padding-top:18px;margin-left:77px;"><b>Staff</b><h1 style="background:#1d2d44"><div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div><hr>'
            let btnH = '<a href="/compapp" class="w3-bar-item w3-button w3-hover-white" style="margin-left:60px; ; margin-bottom:10px; border-radius:5px;color:white; onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white"><b>Home</b></a></div>'
            let InsertTexts='<form style="margin-left:50px; "action="/staffInsert" method="POST"><label for="CompName">First Name:</label><input type="text"style="margin:15px;" id="CompName" name="StaffName" required><label for="CompEmail">Second Name:</label>'+
            '<input type="text"style="margin:15px;" id="CompEmail" name="StaffSecondName" required>'
            +'<label for="CompAddr">Role</label>'+'<input type="text" style="margin:15px;"id="CompAddr" name="Role" required>'+
            '<label for="staffMail">Mail</label>'+'<input type="text" style="margin:15px;"id="staffMail" name="Mail" required>'+
            '<label for="staffPhone">Phone</label>'+'<input type="text" style="margin:15px;"id="staffPhone" name="Phone" required>'+
            '<Button class="myButton" type="submit" value="">Insert Entry</button></form>'
  
            let SearchTexts='<form style="margin-left:50px;"action="/staffsearch" method="POST"><label for="CompName">Second Name:</label><input type="text"style="margin:15px;" id="CompName" name="SearchWord" required>'+
            '<Button class="myButton" type="submit" value="">Search Entry</button></form>'
            let clear ='<form style="margin-left:50px;"action="/staff" method="POST">'+
            '<Button class="myButton" type="submit" value="">Refresh all</button></form><hr style="border-top: 1px solid #1d2d44;">'
  
            let str = '<table style="margin-left:60px;box-shadow: 8px -9px 0px 0px rgba(0,0,0,0.75);border:5px solid white;border-radius: 5px">';
  
            let row='<tr style="font-size:20px" >'+'<td style="width:150px;padding:4px; padding-bottom:12px;"><b>ID</b></td>'+
            '<td style="width:150px; padding:6px;padding-bottom:12px;"><b>First Name </b></td>' 
            +'<td style="width:150px; padding:6px;padding-bottom:12px;"><b>Second Name</b></td>' +
            '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Role</b></td>' +
            '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Mail</b></td>' +
            '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Phone</b></td>';          
            for(let j=0;j<recordset.recordset.length;j++){
              if(j%2==0){ background="#ffe0a6";}
              else {background="white";}
              row=row+'<tr style="border:3px solid #1d2d44 padding:3px;">'+'<td style="width:150px; padding:3px; border-left:4px solid #1d2d44; background:'+background+'">'+(j+1)+'</td>'+'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;">'+recordset.recordset[j].StaffFirstName+'</td>' 
        +'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].StaffSecondName+'</td>' +
        '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Role+'</td>' +
        '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Mail+'</td>' +
        '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Phone+'</td>' +
        '<td style="width:150px; padding:3px; border-bottom:1px solid #1d2d44;">'+'<form action="/staffdelete" method="POST"><Button class="myButton"" type="submit" name="fname1" id="user_id"value="'+
        recordset.recordset[j].Id+'">Delete Entry</button></form>'+'</td>';//or input instead of button
            }
            str=str+row+'</table><br><br>';
            // send records as backa response
            //res.send(recordset.recordset[0].Company);
            res.send(h+btnH+InsertTexts+SearchTexts+clear+str);
            sql.close();
        });
    });
  });
  app.post('/staffInsert', function (req, res) {
    var StaffName =  req.body.StaffName;
    var StaffSecondName =  req.body.StaffSecondName;
    var Role =  req.body.Role;
    var Mail =  req.body.Mail;
    var Phone =  req.body.Phone;

    
    var config = {
      server: "karajohnnies.database.windows.net", // Use your SQL server name
      database: "Karajohnnies", // Database to connect to
      user: "Karajohnnies", // Use your username
      password: "Pologti125", // Use your password
      port: 1433,
      // Since we're on Windows Azure, we need to set the following options
      options: {
            encrypt: true,
            enableArithAbort: true
     
        }
     };
     sql.connect(config, function (err) {
     
      var request = new sql.Request();

      request.query("insert into TableStaff(StaffFirstName,StaffSecondName,Role,Mail,Phone) values ('"+StaffName+"','"+StaffSecondName+"','"+Role+"','"+Mail+"','"+Phone+"')", function (err, recordset) {
       if (err) console.log(err);

       sql.close();
      
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
  
        request.query('select * from TableStaff', function (err, recordset) {
          var background
            if (err) console.log(err)
            //res.send(recordset[1]);
            console.table(recordset.recordset);
            console.log(recordset.recordset[0]);
            let h ='<link rel="stylesheet" href="style.css">'+'<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins">'+'<div style="background:Peru;">'+'<h1 style = "font-family: Poppins,sans-serif; background:Peru;color:white;margin-top:0px;padding-top:18px;margin-left:77px;"><b>Staff</b><h1 style="background:#1d2d44"><div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div><hr>'
            let btnH = '<a href="/compapp" class="w3-bar-item w3-button w3-hover-white" style="margin-left:60px; ; margin-bottom:10px; border-radius:5px;color:white; onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white"><b>Home</b></a></div>'
            let InsertTexts='<form style="margin-left:50px; "action="/staffInsert" method="POST"><label for="CompName">Company Name:</label><input type="text"style="margin:15px;" id="CompName" name="StaffName" required><label for="CompEmail">Company Email:</label>'+
            '<input type="text"style="margin:15px;" id="CompEmail" name="StaffSecondName" required>'
            +'<label for="CompAddr">Company Address:</label>'+'<input type="text" style="margin:15px;"id="CompAddr" name="Role" required>'+
            '<label for="staffMail">Company Address:</label>'+'<input type="text" style="margin:15px;"id="staffMail" name="Mail" required>'+
            '<label for="staffPhone">Company Address:</label>'+'<input type="text" style="margin:15px;"id="staffPhone" name="Phone" required>'+
            '<Button class="myButton" type="submit" value="">Insert Entry</button></form>'
  
            let SearchTexts='<form style="margin-left:50px;"action="/staffsearch" method="POST"><label for="CompName">Staff Second:</label><input type="text"style="margin:15px;" id="CompName" name="SearchWord" required>'+
            '<Button class="myButton" type="submit" value="">Search Entry</button></form>'
            let clear ='<form style="margin-left:50px;"action="/staff" method="POST">'+
            '<Button class="myButton" type="submit" value="">Refresh all</button></form><hr style="border-top: 1px solid #1d2d44;">'
  
            let str = '<table style="margin-left:60px;box-shadow: 8px -9px 0px 0px rgba(0,0,0,0.75);border:5px solid white;border-radius: 5px">';
  
            let row='<tr style="font-size:20px" >'+'<td style="width:150px;padding:4px; padding-bottom:12px;"><b>ID</b></td>'+
            '<td style="width:150px; padding:6px;padding-bottom:12px;"><b>First Name </b></td>' 
            +'<td style="width:150px; padding:6px;padding-bottom:12px;"><b>Second Name</b></td>' +
            '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Role</b></td>' +
            '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Mail</b></td>' +
            '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Phone</b></td>';          
            for(let j=0;j<recordset.recordset.length;j++){
              if(j%2==0){ background="#ffe0a6";}
              else {background="white";}
              row=row+'<tr style="border:3px solid #1d2d44 padding:3px;">'+'<td style="width:150px; padding:3px; border-left:4px solid #1d2d44; background:'+background+'">'+(j+1)+'</td>'+'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;">'+recordset.recordset[j].StaffFirstName+'</td>' 
        +'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].StaffSecondName+'</td>' +
        '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Role+'</td>' +
        '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Mail+'</td>' +
        '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Phone+'</td>' +
        '<td style="width:150px; padding:3px; border-bottom:1px solid #1d2d44;">'+'<form action="/staffdelete" method="POST"><Button class="myButton"" type="submit" name="fname1" id="user_id"value="'+
        recordset.recordset[j].Id+'">Delete Entry</button></form>'+'</td>';//or input instead of button
            }
            str=str+row+'</table><br><br>';
            // send records as backa response
            //res.send(recordset.recordset[0].Company);
            res.send(h+btnH+InsertTexts+SearchTexts+clear+str);
            sql.close();
        });
    });
  });
});
});



app.post('/staffdelete', function (req, res) {
  var fname =  req.body.fname1;

  var config = {
    server: "karajohnnies.database.windows.net", // Use your SQL server name
    database: "Karajohnnies", // Database to connect to
    user: "Karajohnnies", // Use your username
    password: "Pologti125", // Use your password
    port: 1433,
    // Since we're on Windows Azure, we need to set the following options
    options: {
          encrypt: true,
          enableArithAbort: true
   
      }
   };
   sql.connect(config, function (err) {
     
    var request = new sql.Request();

    request.query("delete from TableStaff where Id ="+fname, function (err, recordset) {
     console.log(fname);
     if (err) console.log(err);

     sql.close();
  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      request.query('select * from TableStaff', function (err, recordset) {
        var background
          if (err) console.log(err)
          //res.send(recordset[1]);
          console.table(recordset.recordset);
          console.log(recordset.recordset[0]);
          let h ='<link rel="stylesheet" href="style.css">'+'<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins">'+'<div style="background:Peru;">'+'<h1 style = "font-family: Poppins,sans-serif; background:Peru;color:white;margin-top:0px;padding-top:18px;margin-left:77px;"><b>Staff</b><h1 style="background:#1d2d44"><div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div><hr>'
          let btnH = '<a href="/compapp" class="w3-bar-item w3-button w3-hover-white" style="margin-left:60px; ; margin-bottom:10px; border-radius:5px;color:white; onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white"><b>Home</b></a></div>'
          let InsertTexts='<form style="margin-left:50px; "action="/staffInsert" method="POST"><label for="CompName">First Name:</label><input type="text"style="margin:15px;" id="CompName" name="StaffName" required><label for="CompEmail">Second Name:</label>'+
          '<input type="text"style="margin:15px;" id="CompEmail" name="StaffSecondName" required>'
          +'<label for="CompAddr">Role</label>'+'<input type="text" style="margin:15px;"id="CompAddr" name="Role" required>'+
          '<label for="staffMail">Mail</label>'+'<input type="text" style="margin:15px;"id="staffMail" name="Mail" required>'+
          '<label for="staffPhone">Phone</label>'+'<input type="text" style="margin:15px;"id="staffPhone" name="Phone" required>'+
          '<Button class="myButton" type="submit" value="">Insert Entry</button></form>'

          let SearchTexts='<form style="margin-left:50px;"action="/staffsearch" method="POST"><label for="CompName">Second Name:</label><input type="text"style="margin:15px;" id="CompName" name="SearchWord" required>'+
          '<Button class="myButton" type="submit" value="">Search Entry</button></form>'
          let clear ='<form style="margin-left:50px;"action="/staff" method="POST">'+
          '<Button class="myButton" type="submit" value="">Refresh all</button></form><hr style="border-top: 1px solid #1d2d44;">'

          let str = '<table style="margin-left:60px;box-shadow: 8px -9px 0px 0px rgba(0,0,0,0.75);border:5px solid white;border-radius: 5px">';

          let row='<tr style="font-size:20px" >'+'<td style="width:150px;padding:4px; padding-bottom:12px;"><b>ID</b></td>'+
          '<td style="width:150px; padding:6px;padding-bottom:12px;"><b>First Name </b></td>' 
          +'<td style="width:150px; padding:6px;padding-bottom:12px;"><b>Second Name</b></td>' +
          '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Role</b></td>' +
          '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Mail</b></td>' +
          '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Phone</b></td>';          
          for(let j=0;j<recordset.recordset.length;j++){
            if(j%2==0){ background="#ffe0a6";}
            else {background="white";}
            row=row+'<tr style="border:3px solid #1d2d44 padding:3px;">'+'<td style="width:150px; padding:3px; border-left:4px solid #1d2d44; background:'+background+'">'+(j+1)+'</td>'+'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;">'+recordset.recordset[j].StaffFirstName+'</td>' 
      +'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].StaffSecondName+'</td>' +
      '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Role+'</td>' +
      '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Mail+'</td>' +
      '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Phone+'</td>' +
      '<td style="width:150px; padding:3px; border-bottom:1px solid #1d2d44;">'+'<form action="/staffdelete" method="POST"><Button class="myButton"" type="submit" name="fname1" id="user_id"value="'+
      recordset.recordset[j].Id+'">Delete Entry</button></form>'+'</td>';//or input instead of button
          }
          str=str+row+'</table><br><br>';
          // send records as backa response
          //res.send(recordset.recordset[0].Company);
          res.send(h+btnH+InsertTexts+SearchTexts+clear+str);
          sql.close();
      });
  });
});
});
});

app.post('/staffsearch', function (req, res) {
  var SearchWord =  req.body.SearchWord;

  var config = {
    server: "karajohnnies.database.windows.net", // Use your SQL server name
    database: "Karajohnnies", // Database to connect to
    user: "Karajohnnies", // Use your username
    password: "Pologti125", // Use your password
    port: 1433,
    // Since we're on Windows Azure, we need to set the following options
    options: {
          encrypt: true,
          enableArithAbort: true
   
      }
   };

  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();
      request.query("select * from TableStaff where StaffSecondName like '%" + SearchWord + "%'", function (err, recordset) {

        var background
          if (err) console.log(err)
          //res.send(recordset[1]);
          console.table(recordset.recordset);
          console.log(recordset.recordset[0]);
          let h ='<link rel="stylesheet" href="style.css">'+'<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins">'+'<div style="background:Peru;">'+'<h1 style = "font-family: Poppins,sans-serif; background:Peru;color:white;margin-top:0px;padding-top:18px;margin-left:77px;"><b>Staff</b><h1 style="background:#1d2d44"><div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div><hr>'
          let btnH = '<a href="/compapp" class="w3-bar-item w3-button w3-hover-white" style="margin-left:60px; ; margin-bottom:10px; border-radius:5px;color:white; onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white"><b>Home</b></a></div>'
          let InsertTexts='<form style="margin-left:50px; "action="/staffInsert" method="POST"><label for="CompName">First Name:</label><input type="text"style="margin:15px;" id="CompName" name="StaffName" required><label for="CompEmail">Second Name:</label>'+
          '<input type="text"style="margin:15px;" id="CompEmail" name="StaffSecondName" required>'
          +'<label for="CompAddr">Role</label>'+'<input type="text" style="margin:15px;"id="CompAddr" name="Role" required>'+
          '<label for="staffMail">Mail</label>'+'<input type="text" style="margin:15px;"id="staffMail" name="Mail" required>'+
          '<label for="staffPhone">Phone</label>'+'<input type="text" style="margin:15px;"id="staffPhone" name="Phone" required>'+
          '<Button class="myButton" type="submit" value="">Insert Entry</button></form>'

          let SearchTexts='<form style="margin-left:50px;"action="/staffsearch" method="POST"><label for="CompName">Second Name:</label><input type="text"style="margin:15px;" id="CompName" name="SearchWord" required>'+
          '<Button class="myButton" type="submit" value="">Search Entry</button></form>'
          let clear ='<form style="margin-left:50px;"action="/staff" method="POST">'+
          '<Button class="myButton" type="submit" value="">Refresh all</button></form><hr style="border-top: 1px solid #1d2d44;">'

          let str = '<table style="margin-left:60px;box-shadow: 8px -9px 0px 0px rgba(0,0,0,0.75);border:5px solid white;border-radius: 5px">';

          let row='<tr style="font-size:20px" >'+'<td style="width:150px;padding:4px; padding-bottom:12px;"><b>ID</b></td>'+
          '<td style="width:150px; padding:6px;padding-bottom:12px;"><b>First Name </b></td>' 
          +'<td style="width:150px; padding:6px;padding-bottom:12px;"><b>Second Name</b></td>' +
          '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Role</b></td>' +
          '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Mail</b></td>' +
          '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Phone</b></td>';          
          for(let j=0;j<recordset.recordset.length;j++){
            if(j%2==0){ background="#ffe0a6";}
            else {background="white";}
            row=row+'<tr style="border:3px solid #1d2d44 padding:3px;">'+'<td style="width:150px; padding:3px; border-left:4px solid #1d2d44; background:'+background+'">'+(j+1)+'</td>'+'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;">'+recordset.recordset[j].StaffFirstName+'</td>' 
      +'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].StaffSecondName+'</td>' +
      '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Role+'</td>' +
      '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Mail+'</td>' +
      '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Phone+'</td>' +
      '<td style="width:150px; padding:3px; border-bottom:1px solid #1d2d44;">'+'<form action="/staffdelete" method="POST"><Button class="myButton"" type="submit" name="fname1" id="user_id"value="'+
      recordset.recordset[j].Id+'">Delete Entry</button></form>'+'</td>';//or input instead of button
          }
          str=str+row+'</table><br><br>';
          // send records as backa response
          //res.send(recordset.recordset[0].Company);
          res.send(h+btnH+InsertTexts+SearchTexts+clear+str);
          sql.close();
      });
  });
});

//###############  GOOODS ##############

app.post('/goods', function (req, res) {
   
  var config = {
    server: "karajohnnies.database.windows.net", // Use your SQL server name
    database: "Karajohnnies", // Database to connect to
    user: "Karajohnnies", // Use your username
    password: "Pologti125", // Use your password
    port: 1433,
    // Since we're on Windows Azure, we need to set the following options
    options: {
          encrypt: true,
          enableArithAbort: true
   
      }
   };

  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      request.query('select * from TableProduct', function (err, recordset) {
        var background
          if (err) console.log(err)
          //res.send(recordset[1]);
          console.table(recordset.recordset);
          console.log(recordset.recordset[0]);
          let h ='<link rel="stylesheet" href="style.css">'+'<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins">'+'<div style="background:Peru;">'+'<h1 style = "font-family: Poppins,sans-serif; background:Peru;color:white;margin-top:0px;padding-top:18px;margin-left:77px;"><b>Goods</b><h1 style="background:#1d2d44"><div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div><hr>'
          let btnH = '<a href="/compapp" class="w3-bar-item w3-button w3-hover-white" style="margin-left:60px; ; margin-bottom:10px; border-radius:5px;color:white; onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white"><b>Home</b></a></div>'
          let InsertTexts='<form style="margin-left:50px; "action="/goodsinsert" method="POST"><label for="CompName">Product:</label><input type="text"style="margin:15px;" id="CompName" name="StaffName" required><label for="CompEmail">Quantity:</label>'+
          '<input type="text"style="margin:15px;" id="CompEmail" name="StaffSecondName" required>'
          +'<label for="CompAddr">Supplier</label>'+'<input type="text" style="margin:15px;"id="CompAddr" name="Role" required>'+
          '<Button class="myButton" type="submit" value="">Insert Entry</button></form>'

          let SearchTexts='<form style="margin-left:50px;"action="/goodssearch" method="POST"><label for="CompName">Product Name:</label><input type="text"style="margin:15px;" id="CompName" name="SearchWord" required>'+
          '<Button class="myButton" type="submit" value="">Search Entry</button></form>'
          let clear ='<form style="margin-left:50px;"action="/goods" method="POST">'+
          '<Button class="myButton" type="submit" value="">Refresh all</button></form><hr style="border-top: 1px solid #1d2d44;">'

          let str = '<table style="margin-left:60px;box-shadow: 8px -9px 0px 0px rgba(0,0,0,0.75);border:5px solid white;border-radius: 5px">';

          let row='<tr style="font-size:20px" >'+'<td style="width:150px;padding:4px; padding-bottom:12px;"><b>ID</b></td>'+
          '<td style="width:150px; padding:6px;padding-bottom:12px;"><b>Product</b></td>' 
          +'<td style="width:150px; padding:6px;padding-bottom:12px;"><b>Quantity</b></td>' +
          '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Supplier</b></td>' ;
       
          for(let j=0;j<recordset.recordset.length;j++){
            if(j%2==0){ background="#ffe0a6";}
            else {background="white";}
            row=row+'<tr style="border:3px solid #1d2d44 padding:3px;">'+'<td style="width:150px; padding:3px; border-left:4px solid #1d2d44; background:'+background+'">'+(j+1)+'</td>'+'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;">'+recordset.recordset[j].Product+'</td>' 
      +'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Quantity+'</td>' +
      '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Supplier+'</td>' +
      '<td style="width:150px; padding:3px; border-bottom:1px solid #1d2d44;">'+'<form action="/staffdelete" method="POST"><Button class="myButton"" type="submit" name="fname1" id="user_id"value="'+
      recordset.recordset[j].Id+'">Delete Entry</button></form>'+'</td>';//or input instead of button
          }
          str=str+row+'</table><br><br>';
          // send records as backa response
          //res.send(recordset.recordset[0].Company);
          res.send(h+btnH+InsertTexts+SearchTexts+clear+str);
          sql.close();
      });
  });
});

app.post('/goodsinsert', function (req, res) {
  var StaffName =  req.body.StaffName;
  var StaffSecondName =  req.body.StaffSecondName;
  var Role =  req.body.Role;
  //var Mail =  req.body.Mail;
  //var Phone =  req.body.Phone;

  
  var config = {
    server: "karajohnnies.database.windows.net", // Use your SQL server name
    database: "Karajohnnies", // Database to connect to
    user: "Karajohnnies", // Use your username
    password: "Pologti125", // Use your password
    port: 1433,
    // Since we're on Windows Azure, we need to set the following options
    options: {
          encrypt: true,
          enableArithAbort: true
   
      }
   };
   sql.connect(config, function (err) {
   
    var request = new sql.Request();

    request.query("insert into TableProduct(Product,Quantity,Supplier) values ('"+StaffName+"','"+StaffSecondName+"','"+Role+"')", function (err, recordset) {
     if (err) console.log(err);

     sql.close();
    
  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      request.query('select * from TableProduct', function (err, recordset) {
        var background
          if (err) console.log(err)
          //res.send(recordset[1]);
          console.table(recordset.recordset);
          console.log(recordset.recordset[0]);
          let h ='<link rel="stylesheet" href="style.css">'+'<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins">'+'<div style="background:Peru;">'+'<h1 style = "font-family: Poppins,sans-serif; background:Peru;color:white;margin-top:0px;padding-top:18px;margin-left:77px;"><b>Goods</b><h1 style="background:#1d2d44"><div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div><hr>'
          let btnH = '<a href="/compapp" class="w3-bar-item w3-button w3-hover-white" style="margin-left:60px; ; margin-bottom:10px; border-radius:5px;color:white; onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white"><b>Home</b></a></div>'
          let InsertTexts='<form style="margin-left:50px; "action="/goodsinsert" method="POST"><label for="CompName">Product:</label><input type="text"style="margin:15px;" id="CompName" name="StaffName" required><label for="CompEmail">Quantity:</label>'+
          '<input type="text"style="margin:15px;" id="CompEmail" name="StaffSecondName" required>'
          +'<label for="CompAddr">Supplier</label>'+'<input type="text" style="margin:15px;"id="CompAddr" name="Role" required>'+
          '<Button class="myButton" type="submit" value="">Insert Entry</button></form>'

          let SearchTexts='<form style="margin-left:50px;"action="/goodssearch" method="POST"><label for="CompName">Product Name:</label><input type="text"style="margin:15px;" id="CompName" name="SearchWord" required>'+
          '<Button class="myButton" type="submit" value="">Search Entry</button></form>'
          let clear ='<form style="margin-left:50px;"action="/goods" method="POST">'+
          '<Button class="myButton" type="submit" value="">Refresh all</button></form><hr style="border-top: 1px solid #1d2d44;">'

          let str = '<table style="margin-left:60px;box-shadow: 8px -9px 0px 0px rgba(0,0,0,0.75);border:5px solid white;border-radius: 5px">';

          let row='<tr style="font-size:20px" >'+'<td style="width:150px;padding:4px; padding-bottom:12px;"><b>ID</b></td>'+
          '<td style="width:150px; padding:6px;padding-bottom:12px;"><b>Product</b></td>' 
          +'<td style="width:150px; padding:6px;padding-bottom:12px;"><b>Quantity</b></td>' +
          '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Supplier</b></td>' ;
       
          for(let j=0;j<recordset.recordset.length;j++){
            if(j%2==0){ background="#ffe0a6";}
            else {background="white";}
            row=row+'<tr style="border:3px solid #1d2d44 padding:3px;">'+'<td style="width:150px; padding:3px; border-left:4px solid #1d2d44; background:'+background+'">'+(j+1)+'</td>'+'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;">'+recordset.recordset[j].Product+'</td>' 
      +'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Quantity+'</td>' +
      '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Supplier+'</td>' +
      '<td style="width:150px; padding:3px; border-bottom:1px solid #1d2d44;">'+'<form action="/staffdelete" method="POST"><Button class="myButton"" type="submit" name="fname1" id="user_id"value="'+
      recordset.recordset[j].Id+'">Delete Entry</button></form>'+'</td>';//or input instead of button
          }
          str=str+row+'</table><br><br>';
          // send records as backa response
          //res.send(recordset.recordset[0].Company);
          res.send(h+btnH+InsertTexts+SearchTexts+clear+str);
          sql.close();
      });
  });
});
});
});


app.post('/goodssearch', function (req, res) {
  
  var SearchWord =  req.body.SearchWord;

  var config = {
    server: "karajohnnies.database.windows.net", // Use your SQL server name
    database: "Karajohnnies", // Database to connect to
    user: "Karajohnnies", // Use your username
    password: "Pologti125", // Use your password
    port: 1433,
    // Since we're on Windows Azure, we need to set the following options
    options: {
          encrypt: true,
          enableArithAbort: true
   
      }
   };

  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();
      request.query("select * from TableProduct where Product like '%" + SearchWord + "%'", function (err, recordset) {

        var background
          if (err) console.log(err)
          //res.send(recordset[1]);
          console.table(recordset.recordset);
          console.log(recordset.recordset[0]);
          let h ='<link rel="stylesheet" href="style.css">'+'<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins">'+'<div style="background:Peru;">'+'<h1 style = "font-family: Poppins,sans-serif; background:Peru;color:white;margin-top:0px;padding-top:18px;margin-left:77px;"><b>Goods</b><h1 style="background:#1d2d44"><div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div><hr>'
          let btnH = '<a href="/compapp" class="w3-bar-item w3-button w3-hover-white" style="margin-left:60px; ; margin-bottom:10px; border-radius:5px;color:white; onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white"><b>Home</b></a></div>'
          let InsertTexts='<form style="margin-left:50px; "action="/goodsinsert" method="POST"><label for="CompName">Product:</label><input type="text"style="margin:15px;" id="CompName" name="StaffName" required><label for="CompEmail">Quantity:</label>'+
          '<input type="text"style="margin:15px;" id="CompEmail" name="StaffSecondName" required>'
          +'<label for="CompAddr">Supplier</label>'+'<input type="text" style="margin:15px;"id="CompAddr" name="Role" required>'+
          '<Button class="myButton" type="submit" value="">Insert Entry</button></form>'

          let SearchTexts='<form style="margin-left:50px;"action="/goodssearch" method="POST"><label for="CompName">Product Name:</label><input type="text"style="margin:15px;" id="CompName" name="SearchWord" required>'+
          '<Button class="myButton" type="submit" value="">Search Entry</button></form>'
          let clear ='<form style="margin-left:50px;"action="/goods" method="POST">'+
          '<Button class="myButton" type="submit" value="">Refresh all</button></form><hr style="border-top: 1px solid #1d2d44;">'

          let str = '<table style="margin-left:60px;box-shadow: 8px -9px 0px 0px rgba(0,0,0,0.75);border:5px solid white;border-radius: 5px">';

          let row='<tr style="font-size:20px" >'+'<td style="width:150px;padding:4px; padding-bottom:12px;"><b>ID</b></td>'+
          '<td style="width:150px; padding:6px;padding-bottom:12px;"><b>Product</b></td>' 
          +'<td style="width:150px; padding:6px;padding-bottom:12px;"><b>Quantity</b></td>' +
          '<td style="width:180px; padding:6px;padding-bottom:12px;"><b>Supplier</b></td>' ;
       
          for(let j=0;j<recordset.recordset.length;j++){
            if(j%2==0){ background="#ffe0a6";}
            else {background="white";}
            row=row+'<tr style="border:3px solid #1d2d44 padding:3px;">'+'<td style="width:150px; padding:3px; border-left:4px solid #1d2d44; background:'+background+'">'+(j+1)+'</td>'+'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;">'+recordset.recordset[j].Product+'</td>' 
      +'<td style="width:200px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Quantity+'</td>' +
      '<td style="width:250px; padding:3px; border-bottom:1px solid #1d2d44;"">'+recordset.recordset[j].Supplier+'</td>' +
      '<td style="width:150px; padding:3px; border-bottom:1px solid #1d2d44;">'+'<form action="/staffdelete" method="POST"><Button class="myButton"" type="submit" name="fname1" id="user_id"value="'+
      recordset.recordset[j].Id+'">Delete Entry</button></form>'+'</td>';//or input instead of button
          }
          str=str+row+'</table><br><br>';
          // send records as backa response
          //res.send(recordset.recordset[0].Company);
          res.send(h+btnH+InsertTexts+SearchTexts+clear+str);
          sql.close();
      });
  });
});
app.get('/compapp',function(req,res){
  //var h ="Hello";
  res.render(__dirname+'/compapp.ejs',{h:h});
});
var server = app.listen(5000, function () {
  console.log('Server is running..');
});
