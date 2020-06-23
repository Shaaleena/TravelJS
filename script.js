"use strict";
var httpRequest=false;

var zip=document.getElementById("zip");
if(zip.addEventListener){
  zip.addEventListener("keyup", checkInput, false); //event listener when user presses key on the keyboard
} else if(zip.attachEvent){
  zip.attachEvent("onkeyup", checkInput);
};

function getRequestObject(){
  try{
    httpRequest=new XMLHttpRequest();
  }
  catch(requestError){ //if the browser doesn't support Ajax, catch makes the city state fields and labels visible so can complete them manually
    document.getElementsById("csset").style.visibility="visible";
    var zip=document.getElementById("zip").value;
    if(zip.addEventListener){
      zip.removeEventListener("keyup", checkInput, false);
    }else if(zip.attachEvent){
      zip.detachEvent("onkeyup", checkInput);
    }
    return false;
  }
  return httpRequest;
}

  function checkInput(){ //function checks id user have entered five digitz in the zip input area
    var zip=document.getElementById("zip").value;
    if(zip.length===5){
      getLocation();//
    }else{
      document.getElementById("city").value="";
      document.getElementById("state").value="";
    }
  }

  function getLocation(){//function retrieves data from zippopotam.us website
    var zip=document.getElementById("zip").value;
    if(!httpRequest){
      httpRequest=getRequestObject();
    }
    httpRequest.abort();
    httpRequest.open("get", "http://api.zippopotam.us/us/"+ zip, true);
    httpRequest.send();
    httpRequest.onreadystatechange=displayData;
  }

  function displayData(){//function returns JSON object from zippopotam.us and assigns values to the city and state fields
    if(httpRequest.readyState===4 && httpRequest.status===200){
      var resultData=JSON.parse(httpRequest.responseText);
      var city=document.getElementById("city");
      var state = document.getElementById("state");
      city.value=resultData.places[0]["place name"];
      state.value=resultData.places[0]["state abbreviation"];
      document.getElementById("zip").blur();
      document.getElementById("csset").style.visibility="visible";
    }
  }
