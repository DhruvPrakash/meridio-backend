

function mysql_real_escape_string (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}

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

        postBook: (userId, isbn, latitude, longitude, imageUrl, title, genre, desc, author) => {
            let promise = new Promise((resolve, reject) => {

                imageUrl = mysql_real_escape_string(imageUrl);
                desc = mysql_real_escape_string(desc);
                author = mysql_real_escape_string(author);
                title = mysql_real_escape_string(title);
                let columnNames = 'user_id, isbn, latitude, longitude, image_url, title, genre, description, author';
                let columnValues = `${userId}, '${isbn}', '${latitude}', '${longitude}', '${imageUrl}', '${title}', '${genre}', '${desc}', '${author}'`;
                let postBookQuery = `INSERT INTO books (${columnNames}) VALUES (${columnValues})`;

                connection.query(postBookQuery, (err, rows) => {
                    if(err) {
                        console.log(err);
                        console.log("Error in posting book");
                        return reject();
                    } else {
                        return resolve();
                    }
                })
            });
            

            return promise;
        }, 

        createTradeRequest: (fromUserId, requestorWantsBookId) => {
            let promise = new Promise((resolve, reject) => {
                
                let getUserIdQueryForThisBook = `SELECT user_id from BOOKS where id = ${requestorWantsBookId}`;
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
                        let toUserId = rows[0].user_id;
                        let columnNames = 'from_user_id, acceptor_wants_book_id, to_user_id';
                        let columnValues = `${fromUserId}, ${requestorWantsBookId}, ${toUserId}`;
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
                
            });
            return promise;
        },



        //TODO: Check the resolve value.. 
        getTradeRequests: (toUserId, fromUserId) => {
            let promise = new Promise((resolve, reject) => {
                let columnNames, columnValues, getTradeRequestsQuery;
                if(!!toUserId) {
                    columnNames = 'to_user_id';
                    columnValues = `${toUserId}`;
                } else if (!!fromUserId) {
                    columnNames = 'from_user_id';
                    columnValues = `${fromUserId}`;
                }
                getTradeRequestsQuery = `SELECT * from trade_requests where ${columnNames} = (${columnValues})`;
                

                connection.query(getTradeRequestsQuery, (err, rows) => {
                    if(err) {
                        console.log("Error in getting trade requests");
                        return reject();
                    } else {
                        return resolve(rows);
                    }
                });
            });
            return promise;
        },

        updateTradeRequest: (id, status, acceptorWantsBookId) => {
            // change status of trade request
            // remove the two exchanged books from the books table
            let promise = new Promise((resolve, reject) => {
                let updateTradeRequestQuery = `UPDATE * from trade_requests set status = '${status}', acceptor_wants_book_id = ${acceptorWantsBookId} 
                    where id = ${id}`;
                let getBookIdRequestedQuery = `SELECT requestor_wants_book_id from trade_requests where id = ${id}`;
                
                connection.query(updateTradeRequestQuery, (err, rows) => {
                    if(err) {
                        console.log("Error in updating trade requests");
                        return reject();
                    } else {
                        //remove the two books from the books table
                        //get the book id requested off me
                        connection.query(getBookIdRequestedQuery, (err, rows) => {
                            if(err) {
                                console.log("Error in getting the books corresponding to trade request");
                                return reject();
                            } else {
                                let requestorWantsBookId = rows[0].requestor_wants_book_id;
                                let removeBooksQuery = `DELETE * from books where id = ${requestorWantsBookId} OR id = ${acceptorWantsBookId}`;
                                connection.query(removeBooksQuery, (err, rows) => {
                                    if(err) {
                                        console.log("Error in deleting the books corresponding to the trade request");
                                        return reject();
                                    } else {
                                        return resolve();
                                    }
                                })
                            }
                        })
                    }
                });
            });
            return promise;
        },

        getMyBooks: (userId) => {
            let promise = new Promise((resolve, reject) => {
                let columnNames = 'user_id';
                let columnValues = `${userId}`;
                let getBooksQuery = `SELECT id as bookId, isbn, image_url as imageUrl, genre, description, author from books where ${columnNames} = (${columnValues})`;

                connection.query(getBooksQuery, (err, rows) => {
                    if(err) {
                        console.log("Error is getting books");
                        return reject();
                    } else {
                        return resolve(rows);
                    }
                });
            });
            return promise;
        },

        deleteBook: (bookId) => {
            //check if book belongs to me? nope not doing this
            let promise = new Promise((resolve, reject) => {
                let deleteBookQuery = `DELETE from books where id = ${bookId}`;

                connection.query(deleteBookQuery, (err, rows) => {
                    if(err) {
                        console.log("Error in removing books");
                        return reject();
                    } else {
                        return resolve();
                    }
                });
            });
            return promise;
        }
    }

    //TODO: booksAroundMe, interface documentation and testing
}
