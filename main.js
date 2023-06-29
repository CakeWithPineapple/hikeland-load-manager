const express = require('express');
const request = require('request');
const app = express();
const port = 2;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

global.devices = ['http://localhost:3000', 'https://youtube.com', 'https://blobfish.net'];
	global.currentDeviceIndex = 0;

	function balanceLoad(){
		const currentDevice = global.devices[global.currentDeviceIndex];
		global.currentDeviceIndex = (global.currentDeviceIndex + 1) % global.devices.length;
		return currentDevice;
	}

app.get('/', (req, res) => {
	// request('https://www.w3.org/', (error, response, body) => {
	// 	if(!error && response.statusCode == 200) {
	// 		res.send(body);
	// 	} else {
	// 		res.send(error);
	// 	}
	// })

	
	

	

	const currentDevice = balanceLoad();

	request(currentDevice, (error, response, body) => {
		if(!error && response.statusCode === 200) {
			res.send(body);
		} else {
			res.send(error);
		}
	})
})

app.get('/api/v1/find/domains/normal/homepage', (req, res) => {
	res.redirect('/api/v1/loader/domains/normal/pages.home/homepage');
})

app.get('/api/v1/loader/domains/normal/pages.home/homepage', (req, res) => {
	res.redirect('/');
});

app.get('/api/v1/find', (req, res) => {
	const subdomain = req.subdomains[0];
	
	console.log(`Your subdomain is ${subdomain}`);
	
	if(subdomain === 'cloud'){
		res.redirect('/api/v1/find/domains/cloud/homepage');
	}
})

app.get('/api/v1/find/domains/cloud/homepage', (req, res) => {
	res.redirect('/api/v1/loader/domains/cloud/pages.home/homepage');
})

app.get('/api/v1/loader/domains/cloud/pages.home/homepage', (req,res) => {
	res.redirect('https://www.natgeojunior.nl/de-blobvis');
})


app.listen(port, () => {
    console.log('Hello World! http://localhost:${port}')
})
