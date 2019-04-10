import React, { Component } from "react";
import { Auth0Lock } from "auth0-lock"
import Button from 'react-bootstrap/Button';
import UserListView from "../../dummy-display/userListView";
import SlackButton from "../button/slackButton";

function login(email, password, callback) {
  

  const bcrypt = require('bcrypt');
  const postgres = require('pg');

  const conString =  'postgres://focustimer-labs11.herokuapp.com/api/users';
  postgres(conString, function (err, client, done) {
    if (err) return callback(err);

    const query = 'SELECT id, nickname, email, password FROM users WHERE email = $1';
    client.query(query, [email], function (err, result) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      done();

      if (err || result.rows.length === 0) return callback(err || new WrongUsernameOrPasswordError(email));

      const user = result.rows[0];

      bcrypt.compare(password, user.password, function (err, isValid) {
        if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));

        return callback(null, {
          user_id: user.id,
          nickname: user.nickname,
          email: user.email
        });
      });
    });
  });
}

function create(user, callback) {
  

  const bcrypt = require('bcrypt');
  const postgres = require('pg');

  const conString =  'postgres://focustimer-labs11.herokuapp.com/api/users';
  postgres(conString, function (err, client, done) {
    if (err) return callback(err);

    bcrypt.hash(user.password, 10, function (err, hashedPassword) {
      if (err) return callback(err);

      const query = 'INSERT INTO users(email, password) VALUES ($1, $2)';
      client.query(query, [user.email, hashedPassword], function (err, result) {
        // NOTE: always call `done()` here to close
        // the connection to the database
        done();

        return callback(err);
      });
    });
  });
}


function changePassword (email, newPassword, callback) {
  

  const bcrypt = require('bcrypt');
  const postgres = require('pg');

  const conString =  'postgres://focustimer-labs11.herokuapp.com/api/users';
  postgres(conString, function (err, client, done) {
    if (err) return callback(err);

    bcrypt.hash(newPassword, 10, function (err, hash) {
      if (err) return callback(err);

      const query = 'UPDATE users SET password = $1 WHERE email = $2';
      client.query(query, [hash, email], function (err, result) {
        // NOTE: always call `done()` here to close
        // the connection to the database
        done();

        return callback(err, result && result.rowCount > 0);
      });
    });
  });
}

function loginByEmail(email, callback) {
  

  const postgres = require('pg');

  const conString =  'postgres://focustimer-labs11.herokuapp.com/api/users';
  postgres(conString, function (err, client, done) {
    if (err) return callback(err);

    const query = 'SELECT id, nickname, email FROM users WHERE email = $1';
    client.query(query, [email], function (err, result) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      done();

      if (err || result.rows.length === 0) return callback(err);

      const user = result.rows[0];

      return callback(null, {
        user_id: user.id,
        nickname: user.nickname,
        email: user.email
      });
    });
  });
}

function remove(id, callback) {
  

  const postgres = require('pg');

  const conString =  'postgres://focustimer-labs11.herokuapp.com/api/users';
  postgres(conString, function (err, client, done) {
    if (err) return callback(err);

    const query = 'DELETE FROM users WHERE id = $1';
    client.query(query, [id], function (err) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      done();

      return callback(err);
    });
  });

}




// Auth0Lock options (testing purposes)
// var options = {
//   auth: {
//     redirectUrl:  'postgres://client.mjhacker.now.sh/'
//   }
// };

var options = {

};

// The lock function contains 2 arguments, the Client ID and the domain
var lock = new Auth0Lock(
    '2u1N0tM8yEP53wgkylA3xdP0WqNLq0xr',
    'mjhacker.auth0.com',
    options
  );

class Login extends Component {
        
    render() {
          console.log("PROCESS: ", process.env)
          lock.on("authenticated", function(authResult) {
            // Use the token in authResult to getUserInfo() and save it to localStorage
            lock.getUserInfo(authResult.accessToken, function(error, profile) {
              if (error) {
                // Handle error
                console.log(`Error: ${error}`);
                return;
              } else {
          
              console.log(authResult);
              alert("hello, " + profile.name);
                
              localStorage.setItem('accessToken', authResult.accessToken);
              localStorage.setItem('profile', JSON.stringify(profile));
              window.location.reload();
            }});
          });
          
          return (
            <div className="App">
              <header>
                <h1>Focus Timer</h1>
                <Button onClick={function() {
                  lock.show()
                  }} variant="primary">Login</Button>
              </header>
              
            </div>
          )
        } 
      }

export default Login;