

module.exports = (connection) => {
    return {

        setUserSession: (username, sessionToken, emailId) => {
            let promise = new Promise((resolve, reject) => {
                let columnNames = 'username, session, email_id';
                let columnValues = `'${username}', '${sessionToken}, '${emailId}'`;
                let checkExistsQueryString = `SELECT user_id FROM users WHERE emailId = '${emailId}'`;
                let updateSessionQueryString = `UPDATE users SET session = '${sessionToken}' WHERE email_id = '${emailId}'`;
                let createUserQueryString = `INSERT INTO users (${columnNames}) VALUES (${columnValues})`;

                connection.query(checkExistsQueryString, (err, rows) => {

                })

            });
        }
    }
}
