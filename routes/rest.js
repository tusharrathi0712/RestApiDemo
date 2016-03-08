// Module dependencies.
var express = require('express');
var route = express();

//get list of users
route.get = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM user1',function(err,rows)
        {
            
            if(err)
            	
                console.log("Error Selecting : %s ",err );
     
            res.render('users',{data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};



route.add = function(req, res){
  	  res.render('add_users');
 
};




route.edit = function(req, res){
      var id = req.params.id;
       req.getConnection(function(err,connection){
       var query = connection.query('SELECT * FROM user1 WHERE id = ?',[id],function(err,rows)
        {
            if(err){   
            
            	console.log("Error Selecting : %s ",err );
            	
            }
           else{
        	   res.render('edit_users',{data:rows});
        	  
        
           }
        });
         });
};




/*Add the User*/
route.post = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            firstname    : input.firstname,
            lastname : input.lastname,
            email   : input.email,
            id   : input.id 
        
        };
        
        var query = connection.query("INSERT INTO user1 set ? ",data, function(err, rows)
        {
  
          if (err){
        	  res.render('added_failed');
              console.log("Error inserting : %s ",err );
          }
          
          else{
        	
          res.render('added_success');
      //  res.redirect('/users');
          console.log('user added successfully');
          }
        });
        
       // console.log(query.sql); get raw query
    
    });
};






/*Update the User*/
route.put = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
    	var data = {
                
                firstname    : input.firstname,
                lastname : input.lastname,
                email   : input.email,
                id   : input.id 
            
            };
        
        connection.query("UPDATE user1 set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err){
        	  res.render('added_failed');
              console.log("Error Updating : %s ",err );
          }
              else{
    	 
          res.render('updated_success');
         // res.redirect('/users');
          console.log('user Updated successfully');
       
          }});
    
    });
};




/*Delete the User*/
route.delete_user = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM user1  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err){
                 console.log("Error deleting : %s ",err );
             }
             else{
            	  res.render('delete_success');
               //   res.redirect('/users');
             console.log("user deleted successfully");
             }
        });
        
     });
};

module.exports=route;
