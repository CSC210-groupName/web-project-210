$(document).ready(function() {

	var parseJSON = function(response) {
		// probably want to check response.status here before continuing
		return response.text().then(function(text) {
			return text ? JSON.parse(text) : {};
		})
	}

	$('#get-button').click(function() {
		fetch('http://127.0.0.1:5000/get-example')
		.then(parseJSON).then(function(data) {
			$('#header').text(data.value);
		});
	});

	$('#post-button').click(function() {
		var url = 'http://127.0.0.1:5000/post-example',
			params = {
				method: 'post',
				body: JSON.stringify({
					p1:'p1val',
					p2:'p2val'
				})
			};
		fetch(url, params)
		.then(parseJSON).then(function(data) {
			$('#header').text('Post Success! p1: '+data.dataValue);
		});
	});

	$('#submit-button').click(function() {
		var userInput = $('#user-input').val(),
			passInput = $('#pass-input').val();
		if (userInput && passInput) {
			var url = 'http://127.0.0.1:5000/login',
			params = {
				method: 'post',
				body: JSON.stringify({
					username: userInput,
					password: passInput
				})
			};
			fetch(url, params)
			.then(parseJSON).then(function(data) {
				$('#login-result').text('Result: '+data.result);
			});
		} else {
			$('#login-result').text('Missing Required Fields');
		}
	});
});

