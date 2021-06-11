var prediction = "";

 Webcam.set({ 
     height : 300,
     width : 350,
     image_format : 'png',
     png_quality : 100
 });

 var camera = document.getElementById("camera");

 Webcam.attach('#camera');

  function takeSnapshot(){
      Webcam.snap(function(data_uri){
      document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
      });
  }


  console.log('ml5 version : ', ml5.version);

  var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/aL8bP-S0h/model.json",modelLoaded);

  function modelLoaded() {
      console.log("Model is Loaded !!");
  }

  function speak() {
    var synth = window.speechSynthesis;
    var speakdata = "The prediction is " + prediction;
    var utterthis = new SpeechSynthesisUtterance(speakdata);
    synth.speak(utterthis);
  }
  function check() {
    var img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results) {
    if (error) {
        console.error(error);
    } else {
      console.log(results);
      document.getElementById("gesture_name").innerHTML = results[0].label;
      prediction = results[0].label;
      speak();
      if (results[0].label == "amazing") {
          document.getElementById("gesture_icon").innerHTML = "&#128076;";
      }
      if (results[0].label == "best") {
          document.getElementById("gesture_icon").innerHTML = "&#128077;";
      }
      if (results[0].label == "victory") {
          document.getElementById("gesture_icon").innerHTML = "&#9996;";
      }
    }
}