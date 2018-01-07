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
			//var lastRow = $("<tr/>");//.apprendTo(table1.find('tbody:last'));
			//var trainNameTable =  (snapshot.val().trainName);
			//var destinationTable =  (snapshot.val().destination);
			//var minutesFreqTable =  (snapshot.val().minutesFreq);
			//var firstTimeTable =  (snapshot.val().firstTime);

			//console.log(trainNameTable);
			//console.log(destinationTable);
			//var trainNombre =  (snapshot.val().trainName);
			//lastRow.append($("<td/>").trainNameTable);
			//lastRow.append($("<td/>").destinationTable);
			//lastRow.append($("<td/>").minutesFreqTable);
			//lastRow.append($("<td/>").firstTimeTable);
			//lastRow.append($("<td/>").sfirstTimeTable);
			//table1.append(lastRow);						
			
			$("#table1").append("<tr><td>" + snapshot.val().trainName + "</td><td>" +  snapshot.val().destination + "</td><td>" + snapshot.val().firstTime + "</td><td>" +  snapshot.val().minutesFreq +"</td><td>" +  snapshot.val().minutesFreq + "</td></tr>");
			//$("#table1").append("<td>" + snapshot.val().destination + "</td>");
			//$("#table1").append("<td>" + snapshot.val().minutesFreq + "</td>");
			//$("#table1").append("<td>" + snapshot.val().firstTime + "</td>");
			//$("#table1").append("<td>" + snapshot.val().firstTime + "</td>");
			//$("#table1").append("</tr>")
		})

	










	});	
	//document
}
//window 