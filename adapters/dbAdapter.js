

module.exports = (connection) => {
    return {

        setUserSession: (name, sessionToken, emailId) => {
            let promise = new Promise((resolve, reject) => {
                let columnNames = 'name, session, email_id';
                let columnValues = `'${name}', '${sessionToken}', '${emailId}'`;
                let checkExistsQueryString = `SELECT id FROM users WHERE email_id = '${emailId}'`;
                let updateSessionQueryString = `UPDATE users SET session = '${sessionToken}' WHERE email_id = '${emailId}'`;
                let createUserQueryString = `INSERT INTO users (${columnNames}) VALUES (${columnValues})`;

                
                connection.query(checkExistsQueryString, (err, rows) => {
                    
                    if(err) {
                        
                        console.log("Error in initial check of user's existence");
                        return reject();

                    } else if(rows.length === 0) { //new user
                        
                        connection.query(createUserQueryString, (err, rows) => {
                            if (!err) {
                                //user created successfully, now return the userId for this user:
                                connection.query(checkExistsQueryString, (err, rows) => {
                                    
                                    if(!err) {
                                        return resolve(rows[0].id);
                                    } else {
                                        console.log("Error in fetching created user's id")
                                        return reject();
                                    }

                                });
                            } else {
                                console.log("Error in creating the user!");
                                return reject();
                            }
                        });

                    } else { //existing user
                        return resolve(rows[0].id);
                    }
                
                });
            });

            return promise;
        }
    }
}
