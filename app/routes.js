
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

	app.get('/getTradeRequests', (req, res) => {
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

	app.get('/getMyBooks', (req, res) => {
		dbAdapter.getMyBooks(req.userId).then(() => {
			res.json({
				"status": "success"
			});
		},(books) => {
			res.json({
				"status": "failure",
				"books" : books
			});
		});
	})



}

