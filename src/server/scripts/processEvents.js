let wsdcConfig = require('../handlers/wsdc');
let fDB = require('../handlers/fireDB');

let wsdc = wsdcConfig();
let fireDB = fDB();
let finish = () => {
	process.exit('Finished!');
};
wsdc.getEvents()
	.then(results => {
		let promises = [];
		results.forEach((event, index) => {
			promises.push(fireDB.writeEventToFirebase(event.getKey(), event));
		});
		return Promise.all(promises);
	})
	.then(() => {
		finish();
	})
	.catch(error => {
		console.log('Error: ', error);
		finish();
	});
