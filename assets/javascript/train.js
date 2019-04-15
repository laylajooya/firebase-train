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

var createTrain = firebase.database();

$("#add-button").on("click",function() {

    var train = $("#train").val().trim();
    var city = $("#city").val().trim();
    var firstLeaves = $("#first-leaves").val().trim();
    var leavesEvery = $("#leaves-every").val().trim();
    var addTrain = {name: train, destination: city, firstTrain: firstLeaves, frequency: leavesEvery};

createTrain.ref().push(addTrain);

});

createTrain.ref().on("child_added", function(childSnapshot, prevChildKey) {

    var trainName = childSnapshot.val().name;
    var cityName = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().firstTrain;
    var trainFreq = childSnapshot.val().frequency;

});

