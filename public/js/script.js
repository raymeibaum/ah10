$(function() {
	var $startRecord = $('#start'),
			$playButton = $('#play'),
			$submitButton = $('button#submit'),
			$language = $('select#language'),
			$country = $('select#country');
			$form = $('form');

	var blob;

	navigator.mediaDevices.getUserMedia({audio: true}).then(function(stream) {
		var chunks = [];
		const recorder = new MediaRecorder(stream);
		recorder.ondataavailable = function(e) {
			chunks.push(e.data);

			if (recorder.state == 'inactive') {
				blob = new Blob(chunks, {type: 'audio/webm'});
				const messageUrl = URL.createObjectURL(blob);
				updateAudioElement(messageUrl);
				$playButton.attr("disabled", false);
				$playButton.on('click', playAudio);
				$form.on('submit', submitWorldlyMessage);
			}
		}
		$startRecord.on('mousedown mouseup', function(e) {
			e.stopPropagation();
			if (e.type === "mousedown") {
				recorder.start(1000);
				$startRecord.addClass('active');
			} else if (e.type === "mouseup") {
				recorder.stop();
				$startRecord.removeClass('active');
			}
		});
	})

	function updateAudioElement(blobUrl) {
	    const audio = document.getElementById('audio');;
	    audio.src = blobUrl;
	}

	function playAudio(event) {
		event.preventDefault();
		document.getElementById("audio").play();
	}


	function submitWorldlyMessage(event) {
		event.preventDefault();
		// console.log(blob);
		const country = event.target[0].value;
		const language = event.target[1].value
		const url = '/api/messages';

		const data = {
			country: country,
			language: language,
			message: 'messageAudioFile'
		};

		$.post(url, data, function(response) {
			console.log(response);
		})
	}
});

function playOrPauseMessage() {
		console.log('message triggered')
		var audio = document.getElementById("sound1");
		if (audio.paused) {
			audio.play();
		}
		else {
			audio.pause();
		}
	}
