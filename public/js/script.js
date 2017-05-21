$(function() {
	var $startRecord = $('#start'),
			$playButton = $('#play'),
			$form = $('form');

	var messageUrl;

	navigator.mediaDevices.getUserMedia({audio: true}).then(function(stream) {
		var chunks = [];
		const recorder = new MediaRecorder(stream);
		recorder.ondataavailable = function(e) {
			chunks.push(e.data);

			if (recorder.state == 'inactive') {
				const blob = new Blob(chunks, {type: 'audio/webm'});
				messageUrl = URL.createObjectURL(blob);
				console.log(messageUrl);
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
});

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
}

function getAllMessages() {
	$.get('/api/messages', function(res){
	})
}



