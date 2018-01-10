window.onload = function() {
	$(document).ready(function() {

		  // Initialize Firebase
	    var config = {
	      apiKey: "AIzaSyDeY5kK96TNBjKKDnzH6-1ZqNNAQOJB_M0",
	      authDomain: "train-schedule-mem.firebaseapp.com",
	      databaseURL: "https://train-schedule-mem.firebaseio.com",
	      projectId: "train-schedule-mem",
	      storageBucket: "train-schedule-mem.appspot.com",
	      messagingSenderId: "413248838329"
	    };
	    firebase.initializeApp(config);

	    var trainName = "";
	    var destination = "";	
	    var firstTime;
	    var minutesFreq = 0;	    


		$("#run-input").on("click",function(event){

			event.preventDefault();

			trainName = $("#trainNameId").val().trim();
			console.log(trainName);

			destination = $("#destinationId").val().trim();
			console.log(destination);	
			
			firstTime = $("#firstTimeId").val().trim();
			console.log(firstTime);	

			minutesFreq = $("#minutesFreqId").val().trim();
			console.log(minutesFreq);

			firebase.database().ref().push({
				trainName: trainName,
				destination: destination,
				firstTime: firstTime,
				minutesFreq: minutesFreq,
				dateAdded: firebase.database.ServerValue.TIMESTAMP
			});

		});







		firebase.database().ref().on("child_added",function(snapshot){

			console.log(snapshot.val().firstTime);
			var first = snapshot.val().firstTime;
			console.log(first);

			var firstCoverted = moment(first, "hh:mm").subtract(1, "years");
			console.log(firstCoverted);

			var tFrequency = snapshot.val().minutesFreq;

			// current time
			var currentTime = moment();

			var diffTime = moment().diff(moment(firstCoverted), "minutes");

			var tRemainder = diffTime % tFrequency;

			var tMinutesTillTrian = tFrequency - tRemainder;

			var nextTrain = moment().add(tMinutesTillTrian, "minutes");

			var nextTrainScreen = moment(nextTrain).format("hh:mm");

			//var nextTime = moment(firstTimeMoment.add(lapse)).format();
			$("#table1").append("<tr><td>" + snapshot.val().trainName + "</td><td>" +  snapshot.val().destination + "</td><td>" + snapshot.val().minutesFreq + "</td><td>" +  nextTrainScreen +"</td><td>" +  tMinutesTillTrian + "</td></tr>");

		})

	










	});	
	//document
}
//window 