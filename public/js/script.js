$(function() {
	var $startRecord = $('#start'),
	 		$stopRecord = $('#stop');

	navigator.mediaDevices.getUserMedia({audio: true}).then(function(stream) {
		const chunks = [];
		const recorder = new MediaRecorder(stream);
		recorder.ondataavailable = function(e) {
			chunks.push(e.data);

			if (recorder.state == 'inactive') {
				const blob = new Blob(chunks, {type: 'audio/webm'});
				createAudioElement(URL.createObjectURL(blob));
			}
		}
		$startRecord.on('click', function(e) {
			recorder.start(1000);
			$startRecord.toggle();
			$stopRecord.toggle();
		})

		$stopRecord.on('click', function(e) {
			recorder.stop();
			$startRecord.toggle();
			$stopRecord.toggle();
		})
	})
});

function createAudioElement(blobUrl) {
    const downloadEl = document.createElement('a');
    downloadEl.style = 'display: block';
    downloadEl.innerHTML = 'download';
    downloadEl.download = 'audio.webm';
    downloadEl.href = blobUrl;
    const audioEl = document.createElement('audio');
    audioEl.controls = true;
    const sourceEl = document.createElement('source');
    sourceEl.src = blobUrl;
    sourceEl.type = 'audio/webm';
    audioEl.appendChild(sourceEl);
    document.body.appendChild(audioEl);
    document.body.appendChild(downloadEl);
}
