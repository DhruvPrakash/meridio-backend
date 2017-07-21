
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
		dbAdapter.postBook(req.body.userId, req.body.isbn, req.body.latitude, req.body.longitude, req.body.imageUrl, req.body.title, req.body.genre, req.body.description, req.body.author).then(() => {
			res.json({
				"status": "success"
			});
		}, () => {
			res.json({
				"status": "failure"
			});
		});
	});

	app.post('/createTradeRequest', (req, res) => {
		dbAdapter.createTradeRequest(req.fromUserId, req.requestorWantsBookId).then(() => {
			res.json({
				"status": "success"
			});
		}, () => {
			res.json({
				"status": "failure"
			});
		});
	});

	app.post('/getTradeRequests', (req, res) => {
		dbAdapter.getTradeRequests(req.fromUserId, req.toUserId).then((tradeRequests) => {
			res.json({
				"status": "success",
				"tradeRequests" : tradeRequests
			});
		}, () => {
			res.json({
				"status": "failure"
			});
		});
	});

	app.post('/updateTradeRequest', (req, res) => {
		dbAdapter.updateTradeRequest(req.id, req.status, req.acceptorWantsBookId).then(() => {
			res.json({
				"status": "success"
			});
		},() => {
			res.json({
				"status": "failure"
			});
		});
	});

	app.post('/getMyBooks', (req, res) => {
		dbAdapter.getMyBooks(req.userId).then((books) => {
			res.json({
				"status": "success",
				"books" : books
			});
		},() => {
			res.json({
				"status": "failure"
			});
		});
	});

	app.post('/deleteBook', (req,res) => {
		dbAdapter.deleteBook(req.bookId).then(() => {
			res.json({
				"status": "success"
			});
		},() => {
			res.json({
				"status": "failure",
			});
		});
	})



}

