const chai = require("chai");
const expect = chai.expect;
const url = "http://localhost:3000";
const app = require("../index");

const request = require("supertest")(url);

describe("GraphQL Resolver Endpoint", () => {
	// stop server after use
	after(() => {
		app.closeServer();
	});

	// Test with the right parameters
	// should return prices e.g 6537849.98
	it("Should return a Markup Price", done => {
		request
			.post("/graphiql")
			.send({
				query:
					' { calculatePrice(type:"buy", margin : 0.2, exchangeRate :300) }'
			})
			.expect(200)
			.end((err: any, res: any) => {
				if (err) {
					return done(err);
				}
				expect(res.body.data.calculatePrice).to.not.equal(0);
				done();
			});
	});

	// Test with higher margin
	// should return 'Margin cannot be greater than 1'
	it("Should retun Margin cannot be greater than 1", done => {
		request
			.post("/graphiql")
			.send({
				query:
					' { calculatePrice(type:"buy", margin : 5, exchangeRate :300) }'
			})
			.expect(200)
			.end((err: any, res: any) => {
				if (err) {
					return done(err);
				}
				expect(res.body.data.calculatePrice).to.equal(
					"Margin cannot be greater than 1"
				);
				done();
			});
	});

	// Test with lesser margin
	// should retun 'Margin cannot be lesser or equal to 0'
	it("Should return Margin cannot be lesser or equal to 0", done => {
		request
			.post("/graphiql")
			.send({
				query:
					' { calculatePrice(type:"buy", margin : 0, exchangeRate :300) }'
			})
			.expect(200)
			.end((err: any, res: any) => {
				if (err) {
					return done(err);
				}
				expect(res.body.data.calculatePrice).to.equal(
					"Margin cannot be lesser or equal to 0"
				);
				done();
			});
	});

	// Test with Invalid action type
	// Should return 'Invalid action type'
	it("Should return Invalid action type", done => {
		request
			.post("/graphiql")
			.send({
				query:
					' { calculatePrice(type:"buys", margin : 0.3, exchangeRate :300) }'
			})
			.expect(200)
			.end((err: any, res: any) => {
				if (err) {
					return done(err);
				}
				expect(res.body.data.calculatePrice).to.equal(
					"Invalid action type"
				);
				done();
			});
	});

	// Test with wrong exchange rate
	// Should return 'Exchange rate cannot be lesser or equal to 0'
	it("Should return Exchange rate cannot be lesser or equal to 0", done => {
		request
			.post("/graphiql")
			.send({
				query:
					' { calculatePrice(type:"buy", margin : 0.3, exchangeRate :-240) }'
			})
			.expect(200)
			.end((err: any, res: any) => {

				if (err) {
					return done(err);
				}

				expect(res.body.data.calculatePrice).to.equal(
					"Exchange rate cannot be lesser or equal to 0"
				);
				done();
			});
	});

	// Test with wrong margin type
	// Should return 400 bad request
	it("Should return 400 Bad request", done => {
		request
			.post("/graphiql")
			.send({
				query:
					' { calculatePrice(type:"buy", margin : "0.3", exchangeRate : 240) }'
			})
			.expect(400)
			.end((err: any, res: any) => {
				if (err) {
					return done(err);
				}
				done();
			});
	});

	// Test with wrong exchange type
	// Should return 400 bad request
	it("Should return 400 Bad request", done => {
		request
			.post("/graphiql")
			.send({
				query:
					' { calculatePrice(type:"buy", margin : 0.3, exchangeRate : 240.8) }',
			})
			.expect(400)
			.end((err: any, res: any) => {
				if (err) {
					return done(err);
				}
				done();
			});
	});
});
