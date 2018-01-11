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

	    //create variables
	    var trainName = "";
	    var destination = "";	
	    var firstTime;
	    var minutesFreq = 0;
	    var firstTimeHour;
	    var firstTimeMinute;

	    //a function to listen train info through submmit
		$("#run-input").on("click",function(event){
			//prevent the form from trying to submit itself.
			event.preventDefault();

			//grab the train Name from the input box
			trainName = $("#trainNameId").val().trim();
			console.log(trainName);
			
			//grab the destination from the input box
			destination = $("#destinationId").val().trim();
			console.log(destination);	
			
			//firstTime = $("#firstTimeId").val().trim();
			//console.log(firstTime);	

			//get the frequency in minutes from the input box
			minutesFreq = $("#minutesFreqId").val().trim();
			console.log(minutesFreq);

			//get the hour of first time Train from the input box
			firstTimeHour = $("#firstTimeHourId").val().trim();
			console.log(firstTimeHour);

			//get the minutes of first time Train from the input box
			firstTimeMinute = $("#firstTimeMinuteId").val().trim();
			console.log(firstTimeMinute);

			//build the first time train
			firstTime = firstTimeHour + ":" + firstTimeMinute


			//add train info to firebase with push method
			firebase.database().ref().push({
				trainName: trainName,
				destination: destination,
				firstTime: firstTime,
				minutesFreq: minutesFreq,
				dateAdded: firebase.database.ServerValue.TIMESTAMP
			});

		});






		// 3. Create Firebase event for adding train travel to the database and a row in the html when a user adds an entry
		firebase.database().ref().on("child_added",function(snapshot){

			console.log(snapshot.val().firstTime);
			//storage firstime train from firebase
			var first = snapshot.val().firstTime;
			console.log(first);

			// First Time (pushed back 1 year)
			var firstCoverted = moment(first, "hh:mm").subtract(1, "years");
			console.log(firstCoverted);

			//storage frequency train from firebase
			var tFrequency = snapshot.val().minutesFreq;

			// current time
			var currentTime = moment();

			// Difference between the times
			var diffTime = moment().diff(moment(firstCoverted), "minutes");

			// Time apart (remainder)
			var tRemainder = diffTime % tFrequency;

			// Minute Until Train
			var tMinutesTillTrian = tFrequency - tRemainder;

			// Next Train
			var nextTrain = moment().add(tMinutesTillTrian, "minutes");

			// Next Train in hh:mm format
			var nextTrainScreen = moment(nextTrain).format("hh:mm");

			//var nextTime = moment(firstTimeMoment.add(lapse)).format();
			$("#table1").append("<tr><td>" + snapshot.val().trainName + "</td><td>" +  snapshot.val().destination + "</td><td>" + snapshot.val().minutesFreq + "</td><td>" +  nextTrainScreen +"</td><td>" +  tMinutesTillTrian + "</td></tr>");

		})

	










	});	
	//document
}
//window 