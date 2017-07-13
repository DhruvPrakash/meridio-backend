
module.exports = (app, dbAdapter) => {

	app.post('/setUserSession', (req, res) => {
		dbAdapter.setUserSession(req.body.name, req.body.sessionToken, req.body.emailId).then((userId) => {
			res.json({
				"status" : "success",
				"userId" : userId
			});
		}, () => {
			res.json({
				"status": "failure"
			});
		});
	});

	app.post('/postBook', (req, res) => {
		dbAdapter.postBook(req.userId, req.isbn, req.lat, req.long, req.imageUrl, req.title, req.genre, req.desc).then(() => {
			res.json({
				"status": "success"
			});
		}, () => {
			res.json({
				"status": "failure"
			});
		});
	});
	
	
}

