
 // Initialize Firebase
 
  var config = {
    apiKey: "AIzaSyC4xB7FwisZ8_d6wG1MZ_0DdPBxG7NRdaU",
    authDomain: "trainscheduler-9b72f.firebaseapp.com",
    databaseURL: "https://trainscheduler-9b72f.firebaseio.com",
    projectId: "trainscheduler-9b72f",
    storageBucket: "trainscheduler-9b72f.appspot.com",
    messagingSenderId: "386027099971"
  };
  firebase.initializeApp(config);

 var database = firebase.database();
 var trainName ="";
 var destination ="";
 var firstTrain ="";
 var frequency ="";
 


$("#add-train-btn").on("click", function(event){
  event.preventDefault();
   trainName = $("#train-name-input").val().trim();
   destination = $("#destination-input").val().trim();
   firstTrain = moment($("#firstTrain-input").val().trim(), "HH:mm").format("X");
   frequency = ($("#frequency-input").val().trim());
   console.log(firstTrain);

   var newTrain = {
     trainName: trainName,
     destination: destination,
     firstTrain: firstTrain,
     frequency: frequency,
     dateAdded: firebase.database.ServerValue.TIMESTAMP
   };
   database.ref().push(newTrain);
   //Clear forms after submit button is clicked.
   $("#train-name-input").val("");
   $("#destination-input").val("");
   $("#firstTrain-input").val("");
   $("#frequency-input").val("");


});

   database.ref().on("child_added", function(snap){


    var trainNameNew = snap.val().trainName;
    var destinationNew  = snap.val().destination;
    var firstTrainNew = moment((snap.val().firstTrain),"hh:mm");
    var frequencyNew = (snap.val().frequency);
    var nextArrival = "";
    var minutesAway = "";
    console.log(firstTrainNew);

    var now = moment();
//I HATE MOMENT.JS
    var firstTrainPretty = moment(firstTrainNew).format("HH:mm a");
     console.log(firstTrainPretty);

     var difference = now.diff(moment(firstTrainPretty), "minutes");
     console.log("DIFFERENCE IN TIME: " + difference);
     
    
    

     $("#train-table >tbody").append(
     "<tr>"+"<td>" + trainNameNew + "</td>" +
     "<td>" + destinationNew + "</td>" +
     "<td>" + frequencyNew + "</td>" +
     "<td>" + nextArrival+ "</td>" +
     "<td>" + minutesAway + "</td>"+"</tr>");








});
  