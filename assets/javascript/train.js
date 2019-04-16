// Initialize Firebase
var config = {
    apiKey: "AIzaSyCYdkdQlfNzyzcs_egpdrhV7DhgWJ_wDrM",
    authDomain: "train-1934b.firebaseapp.com",
    databaseURL: "https://train-1934b.firebaseio.com",
    projectId: "train-1934b",
    storageBucket: "",
    messagingSenderId: "1029492358486"
};
  
firebase.initializeApp(config);

var clearInputs = function() {
    $("#train").val("");
    $("#city").val("");
    $("#first-leaves").val("");
    $("#leaves-every").val("");

};

var createTrain = firebase.database();

$("#add-button").on("click",function() {

    var train = $("#train").val().trim();
    var city = $("#city").val().trim();
    var firstLeaves = $("#first-leaves").val().trim();
    var leavesEvery = $("#leaves-every").val().trim();

    var addTrain = {
        name: train, 
        destination: city, 
        firstTrain: firstLeaves, 
        frequency: leavesEvery
    }

    console.log(addTrain.name);
    console.log(addTrain.destination);
    console.log(addTrain.firstTrain);
    console.log(addTrain.frequency);


    createTrain.ref().push(addTrain);

    clearInputs();

    return false;


});

createTrain.ref().on("child_added", function(childSnapshot) {

    var trainName = childSnapshot.val().name;
    var cityName = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().firstTrain;
    var trainFreq = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(cityName);
    console.log(trainFirst);
    console.log(trainFreq);

    var firstTimeConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("Current time: "+ moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in time: " + diffTime);

    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("Minutes till train: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));


    $("#train-sched > tbody").append("<tr> <td>" + trainName + "</td> <td>" + cityName + "</td> <td>" + trainFreq + "</td> <td>" + moment(nextTrain).format("hh:mm") + "</td> <td>" + tMinutesTillTrain + "</td> </tr>");

});

