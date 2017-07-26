
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
		dbAdapter.createTradeRequest(req.body.fromUserId, req.body.requestorWantsBookId).then(() => {
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
		dbAdapter.getTradeRequests(req.body.fromUserId, req.body.toUserId).then((tradeRequests) => {
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
		dbAdapter.updateTradeRequest(req.body.id, req.body.status, req.body.acceptorWantsBookId).then(() => {
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
		dbAdapter.getBooks(req.body.userId).then((books) => {
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
		dbAdapter.deleteBook(req.body.bookId).then(() => {
			res.json({
				"status": "success"
			});
		},() => {
			res.json({
				"status": "failure",
			});
		});
	});

	app.post('/booksAvailableWithRequestor', (req,res) => {
		dbAdapter.getBooks(req.body.userId).then((books) => {
			res.json({
				"status": "success",
				"books" : books
			});
		}, () => {
			res.json({
				"status": "failure"
			});
		});
	});

app.post('/booksAroundMe', (req, res) => {
		dbAdapter.booksAroundMe(req.body.userId, req.body.latitude, req.body.longitude).then((books) => {
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

}

