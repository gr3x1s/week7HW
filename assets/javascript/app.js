//creates firebase link
var trainData = new Firebase("train-time-70216.firebaseapp.com");

$('#submitButton').on('click', function(){
	//gets input
	var trainName = $('#trainNameInput').val().trim();
	var destination = $('#destinationInput').val().trim();
	var firstTime = moment($('#timeInput').val().trim(), "HH:mm").format("");
	var frequency = $('#frequencyInput').val().trim();


	var newTrains = {
		name: trainName,
		tdestination: destination,
		tFirst: firstTime,
		tfreq: frequency,
	}

	trainData.push(newTrains);
	alert("Train successfully added!");

	//clear
	$('#trainNameInput').val("");
	$('#destinationInput').val("");
	$('#timeInput').val("");
	$('#frequencyInput').val("");

	return false;
});

trainData.on("child_added", function(childSnapshot, prevChildKey){

	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().tdestination;
	var firstTime = childSnapshot.val().tFirst;
	var frequency = childSnapshot.val().tfreq;
	var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	var currentTime = moment();
	var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
	var tRemainder = timeDiff % frequency;
	var tMinutesTillTrain = frequency - tRemainder;
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	var nextTrainConverted = moment(nextTrain).format("hh:mm a");
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});