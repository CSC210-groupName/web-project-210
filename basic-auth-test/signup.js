$(document).ready(function() {

	var parseJSON = function(response) {
		// probably want to check response.status here before continuing
		return response.text().then(function(text) {
			return text ? JSON.parse(text) : {};
		})
	}

	$('#submit-button').click(function() {
		var userInput = $('#user-input').val(),
			passInput = $('#pass-input').val();
		if (userInput && passInput) {
			var url = 'http://127.0.0.1:5000/signup',
			params = {
				method: 'post',
				body: JSON.stringify({
					username: userInput,
					password: passInput
				})
			};
			fetch(url, params)
			.then(parseJSON).then(function(data) {
				$('#signup-result').text('Result: '+data.result);
			});
		} else {
			$('#signup-result').text('Missing Required Fields');
		}
	});
});

