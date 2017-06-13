
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
 
 

//click function for adding trains
$("#add-train-btn").on("click", function(event){
  event.preventDefault();
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#firstTrain-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
   var frequency = $("#frequency-input").val().trim();
   console.log(firstTrain);
//local object for holding train data
   var newTrain = {
     trainName: trainName,
     destination: destination,
     firstTrain: firstTrain,
     frequency: frequency,
     dateAdded: firebase.database.ServerValue.TIMESTAMP
   };
 //uploads train data to firebase  
   database.ref().push(newTrain);
   //Clear forms after submit button is clicked.
   $("#train-name-input").val("");
   $("#destination-input").val("");
   $("#firstTrain-input").val("");
   $("#frequency-input").val("");


});

   database.ref().on("child_added", function(snap){

//store info from database into varibles
    var trainNameNew = snap.val().trainName;
    var destinationNew  = snap.val().destination;
    var frequencyNew = snap.val().frequency;
    var firstTrainNew = snap.val().firstTrain;
    
    
    console.log(frequencyNew);

     
//calculates time of arrival and minutes until next train
    var firstTrainPretty = moment().diff(moment.unix(firstTrainNew), "minutes");
    var tReminder = moment().diff(moment.unix(firstTrainNew), "minutes") % frequencyNew;
    console.log(firstTrainPretty);
    var minutesAway = frequencyNew - tReminder;
    console.log(minutesAway);
    var nextArrival = moment().add(minutesAway, "m").format("hh:mm A");
    
    

     $("#train-table >tbody").append(
     "<tr>"+"<td>" + trainNameNew + "</td>" +
     "<td>" + destinationNew + "</td>" +
     "<td>" + frequencyNew + "</td>" +
     "<td>" + nextArrival+ "</td>" +
     "<td>" + minutesAway + "</td>"+"</tr>");








});
  