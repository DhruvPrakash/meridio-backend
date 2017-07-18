

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
        },

        postBook: (userId, isbn, lat, long, imageUrl, title, genre, desc) => {
            let promise = new Promise((resolve, reject) => {
                let columnNames = 'user_id, isbn, lat, long, imageUrl, title, genre, description';
                let columnValues = `${userId}, '${isbn}', '${lat}', '${lat}', '${long}', '${imageUrl}', '${title}', '${genre}', '${desc}'`;
                let postBookQuery = `INSERT INTO books ($(columnNames)) VALUES (${columnValues})`;

                connection.query(postBookQuery, (err, rows) => {
                    if(err) {
                        console.log("Error in posting book");
                        return reject();
                    } else {
                        return resolve();
                    }
                })
            });

            return promise;
        }, 

        createTradeRequest: (userId, wantsBookId) => {
            let promise = new Promise((resolve, reject) => {
                
                let getUserIdQueryForThisBook = `SELECT user_id from USERS where id = ${wantsBookId}`;
                //in posted books get the userID who is associated with this book id
                connection.query(getUserIdQueryForThisBook, (err, rows) => {
                    if (err) {
                        console.log("Error in the get user id query");
                        return reject();
                    } else if (rows.length === 0) {
                        console.log("No such user is present");
                        return reject();
                    } else {
                        //got the user_id.. now make a trade request to this user
                        let acceptor_id = rows[0].user_id;
                        let columnNames = 'requestor_id, wantsBookId, acceptor_id';
                        let columnValues = `${requestor_id}, ${wantsBookId}, ${acceptor_id}`;
                        let createTradeRequestQuery = `INSERT INTO trade_requests (${columnNames}) VALUES (${columnValues})`;
                        connection.query(createTradeRequestQuery, (err, rows) => {
                            if(err) {
                                console.log("Error is creating a trade request");
                                return reject();
                            } else {
                                return resolve();
                            }
                        });
                    }
                });
                
            })
        },


        getTradeRequests: (userId) => {
            let promise = new Promise((resolve, reject) => {
                let columnNames = 'acceptor_id';
                let columnValues = `${acceptor_id}`;
                let createTradeRequestQuery = `SELECT * from trade_requests where ${columnNames} = (${columnValues})`;

                connection.query(createTradeRequestQuery, (err, rows) => {
                    if(err) {
                        console.log("Error is creating a trade request");
                        return reject();
                    } else {
                        return resolve(rows[0]);
                    }
                });
            })
        } 
    }
}
