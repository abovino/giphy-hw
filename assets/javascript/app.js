$(document).on('ready', function(){
	
	//Initial array of feels
	var feels = ['happy', 'excited', 'scared', 'angry', 'indifferent', 'sick'];
	var paused = [];
	var animate = [];

	function displayFeelButtons() {
		$('#gifButtons').empty();

		//Add buttons
		for (var i = 0; i < feels.length; i++) {
			var a = $('<button>');
			a.addClass('feels');
			a.addClass('btn btn-primary')
			a.attr('data-feels', feels[i]);
			a.text(feels[i]);
			$('#gifButtons').append(a);
		}
	}

	$(document).on('click', 'button', function() {
		//Clear data
		var clear = $('#gifs');
		clear.empty();
		paused = [];
		animate = [];

		var p = $(this).attr('data-feels');
		var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + p + '&api_key=dc6zaTOxFJmzC&limit=10';

		$.ajax({
			url: queryURL,
			method: 'GET'
		})

		.done(function(response){
			var results = response.data;

			for (var i = 0; i < results.length; i++) {
				var newGifs = $('<div class="item">')
				var rating = results[i].rating;
				var p = $('<p>').text('Rating: ' + rating);
				var feelGif = $('<img>').attr('data-num', i);
				var pausedURL = results[i].images.fixed_height_still.url;
				var animateURL = results[i].images.fixed_height.url;
				paused.push(pausedURL);
				animate.push(animateURL);
				feelGif.attr('src', pausedURL);
				newGifs.append(p);
				newGifs.append(feelGif);
				clear.prepend(newGifs);
			}
		});
	});

	$(document).on('click', 'img', function() {
		var num = $(this).attr('data-num');
		var currentURL = $(this).attr('src');

		if (currentURL == paused[num]) {
			$(this).attr('src', animate[num]);
		} else {
			$(this).attr('src', paused[num]);
		}
	});

	$('#addGif').on('click', function() {
		var userQuery = $('#gif-input').val();
		feels.push(userQuery);
		displayFeelButtons();
		return false;
	});

	displayFeelButtons();
});