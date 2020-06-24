"use strict";
var httpRequest=false;
var list=[];
var formValidity=true; //global variable

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

  function generateList(){ //function that creating the list of items
    var listItems = document.getElementsByTagName("li");
    for (var i=listItems.length-1;i>=0;i--){
      document.getElementsByTagName("ol")[0].removeChild(listItems[i]);
    }
    for(var i=0;i<list.length;i++){ //loops through existing li elements and removes them all
      var newItem="<span class='first'>first</span>"+"<span class='last'>last</span>"+list[i];
      var newListItem = document.createElement("li"); //creates new li element for each array element
      newListItem.innerHTML=newItem;
      document.getElementsByTagName("ol")[0].appendChild(newListItem);
      var firstButtons=document.querySelectorAll(".first");
      var lastFirstButton=firstButtons[firstButtons.length-1];
      var lastButtons=document.querySelectorAll(".last");
      var lastLastButton=lastButtons[lastButtons.length-1];
      if(lastFirstButton.addEventListener){ //adds event listenere to the "first" and "last" buttons
        lastFirstButton.addEventListener("click", moveToTop,false);
        lastLastButton.addEventListener("click", moveToBottom, false);
    } else if(lastFirstButton.attachEvent){
      lastFirstButton.attachEvent("onclick", moveToTop);
      lastLastButton.attachEvent("onclick", moveToBottom);
    }
  }
  }

  function addItem(){ //adds the value to the end of the list array using push method
    var newItem=document.getElementById("city");
    var nextNewItem=document.getElementById("state");
    list.push(newItem.value+", "+nextNewItem.value);
    var zipCodefield=document.getElementById("zip");
    zipCodefield.focus();
    zipCodefield.value="";
    newItem.value="";
    nextNewItem.value="";
    generateList();
  }

  function moveToTop(evt) { //function that moves item on the top when First button clicked
    if(evt===undefined){
      evt=window.event;
    }
    var callerElement=evt.target||evt.srcElement;
    var listItems=document.getElementsByTagName("li");
    var parentItem=callerElement.parentNode;
    for(var i=0;i<list.length;i++){
      if(parentItem.innerHTML.search(list[i])!== -1){
        var itemToMove=list.splice(i,1);
        list.unshift(itemToMove);
      }
    }
    generateList();
  }
  function moveToBottom(evt){ //function that moves item at the bottom when Last button clicked
    if(evt === undefined){
        evt=window.event;
    } var callerElement=evt.target||evt.srcElement;
    var listItems=document.getElementsByTagName("li");
    var parentItem=callerElement.parentNode;
    for(var i=0;i<list.length;i++){
      if(parentItem.innerHTML.search(list[i])!== -1){
        var itemToMove=list.splice(i,1);
        list.push(itemToMove);
      }
    }
    generateList();
  }
  function createEventListener(){ //event listener for adding item button
    var addButton=document.getElementById("button-1");
    if(addButton.addEventListener){
      addButton.addEventListener("click", addItem, false);
    } else if(addButton.attachEvent){
      addButton.attachEvent("onclick", addItem);
    }
  }

  if (window.addEventListener){
   window.addEventListener("load", createEventListener, false);
 } else if(window.attachEvent){
   window.attachEvent("onload", createEventListener);
 }
