//Current the in use
currTheme = 0;

//Gamestyle
var gs = "smb"

//Item type
item = "block"

//Sounds
var warning = new Audio("./sounds/warning.wav");
var ok = new Audio("./sounds/ok.wav");
var removeSFX = new Audio("./sounds/gs/" + gs + "/" + item + "remove.wav")

//Music
var music = new Audio("./sounds/gs/" + gs + "/theme.mp3")
music.loop = true

//Blue square
const bsBg = document.getElementById("bsBg")
const bluesquare = document.getElementById("bluesquare")

//Grid base element
const gridBase = document.getElementById("base");

//If the grid was submited or not
var gridSubmited = false

//Block variables, in case you want to change them to a GIF or another format
var brick = "./images/blocks/" + gs +"/brick.png"
var stone = "./images/blocks/" + gs +"/stone.png"
var coin = "./images/blocks/" + gs +"/coin.png"
var dirt = "./images/blocks/" + gs +"/dirt.png"
var ground = "./images/blocks/" + gs +"/ground.png"
var question = "./images/blocks/" + gs +"/question.png"
var mario = "./images/blocks/" + gs +"/mario.png"

//Control dialogs
function showDiag(type,html,acceptaction) {
	const diag = document.getElementById("dialogbox");
	//Checks if a dialog is currently openned or not
	if(diag.style.display == "none") {
		//SFX
		warning.play();
		//Fade
		$("#dialogbox").fadeIn();
		$("#darken").fadeIn();
		//Checks what type of button will be used, valid values: ok, choice, y/n, cancel
		var button = "";
		if(type == "ok") button = "<button onclick='showDiag()' style='width: 100%;height: 32px;position: absolute;bottom: 0px; left: 0px'>Ok</button>";
		else if(type == "choice") button = "<button onclick=" + acceptaction + " style='width: 50%;height: 32px;position: absolute;bottom: 0px; left: 0px'>Accept</button><button onclick='showDiag()' style='width: 50%;height: 32px;position: absolute;bottom: 0px;left: 50%'>Cancel</button>";
		else if(type == "y/n") button = "<button onclick=" + acceptaction + " style='width: 50%;height: 32px;position: absolute;bottom: 0px; left: 0px'>Yes</button><button onclick='showDiag()' style='width: 50%;height: 32px;position: absolute;bottom: 0px;left: 50%'>No</button>";
		else if(type == "cancel") button = "<button onclick='showDiag()' style='width: 100%;height: 32px;position: absolute;bottom: 0px; left: 0px'>Cancel</button>";
		//HTML
		diag.innerHTML = "<div id='limit'>" +html + "</div>" + button;
	} else {
		//SFX
		ok.play();
		//Fade
		$("#dialogbox").fadeOut();
		$("#darken").fadeOut();
}
}

//Submit grid code
function submitGrid() {
	const err = document.getElementById("err");
	//Sounds
	var grid = new Audio("./sounds/grid.wav");
	var error = new Audio("./sounds/error.wav");
	//Get width and height input elements
	var width = document.getElementById("gridWidth");
	var height = document.getElementById("gridHeight");
	//If the width or height is equal to 0, play error SFX and return
	if(width.value == 0 || height.value == 0) {
		//If width or height is equal to 0, show error and return
		error.play()
		err.style.display = "block";
		return;
	};
	//Width
	var gridWidth = `<td><div class='clickElm' onclick='if(this.innerHTML === "") { this.innerHTML = bsBg.innerHTML;var placeSFX = new Audio("./sounds/gs/" + gs + "/" + item + ".wav"); placeSFX.play();} else {this.innerHTML = "";var removeSFX = new Audio("./sounds/gs/" + gs + "/" + item + "remove.wav"); removeSFX.play()}'></div></td>`
	//Repeat the TD elements by the amount of width and add it inside of a TR tag
	var gridHeight = `<tr>${gridWidth.repeat(width.value)}</tr>`
	//Repeat the TR and TD elements by the amount of height and save it to the grid base
	base.innerHTML = `<tbody>${gridHeight.repeat(height.value)}</tbody>`

	//SFX
	grid.play();
	//Close dialog
	showDiag();
	gridSubmited = true
}

//Saving
function download() {
	var levelname = document.getElementById("name");
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(gridBase.innerHTML));
	element.setAttribute('download', levelname.value + '.snetlvl');


	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
	showDiag();
}

//Loading
function loadData() {
	gridSubmited = true;
	var file = document.getElementById("level").files[0];
	if (file) {
		var reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		reader.onload = function (evt) {
			gridBase.innerHTML = evt.target.result;
		}
		reader.onerror = function (evt) {
			gridBase.innerHTML = "Error reading save file. It's maybe corrupted or invalid. Look at the console for more log.";
		gridSubmited = false;
		}
	}
}

//Changing themes
function changeTheme(id) {
	currTheme = id
	var styleId = document.getElementById("pageTheme");
	if(id == 0) styleId.innerHTML = "button {background: radial-gradient(circle, rgba(255,239,107,1) 50%, rgba(255,167,0,1) 100%);border: 1px solid black;border-radius: 5px;color: black;}button:hover {border: 2px solid white;color: blue;}#bg {background: linear-gradient(45deg, #ffffbf 0%, #ffdc73 100%);}input {background: #ffffbf;border: 1px solid black;border-radius: 3px;}#dialogbox {background: linear-gradient(180deg, rgba(255,250,124,1) 0%, rgba(255,179,64,1) 100%);border: 2px solid black;border-radius: 5px;}#base div {border: 1px solid black;}#toolbar td {border: 1px solid black;}#bsBg {border: 1px solid black;}* {color: black;}"
	else if(id == 1) styleId.innerHTML = "button {background: radial-gradient(circle, #e495ff 50%, #bf00ff 100%);border: 1px solid black;border-radius: 5px;color: black;}button:hover {border: 2px solid white;color: blue;}#bg {background: linear-gradient(45deg, #fbecff 0%, #e28aff 100%);}input {background: #fbecff;border: 1px solid black;border-radius: 3px;}#dialogbox {background: linear-gradient(180deg,#f5ceff 0%, #d942ff 100%);border: 2px solid black;border-radius: 5px;}#base div {border: 1px solid black;}#toolbar td {border: 1px solid black;}#bsBg {border: 1px solid black;}* {color: black;}"
	else if(id == 2) styleId.innerHTML = "button {background: radial-gradient(circle, #ffffff 50%, #dddddd 100%);border: 1px solid black;border-radius: 5px;color: black;}button:hover {border: 2px solid blue;color: blue;}#bg {background: linear-gradient(45deg, #ffffff 0%, #bbbbbb 100%);}input {background: #ffffff;border: 1px solid black;border-radius: 3px;}#dialogbox {background: linear-gradient(180deg, #ffffff 0%, #bbbbbb 100%);border: 2px solid black;border-radius: 5px;}#base div {border: 1px solid black;}#toolbar td {border: 1px solid black;}#bsBg {border: 1px solid black;}* {color: black;}"
	else if(id == 3) styleId.innerHTML = "button {background: radial-gradient(circle, #1f0028 50%, #000000 100%);border: 1px solid white;border-radius: 5px;color: white;}button:hover {border: 2px solid yellow;color: yellow;}#bg {background: linear-gradient(45deg, #15001c 0%, #000000 100%);}input {background: #000000;border: 1px solid white;border-radius: 3px;color: white}#dialogbox {background: linear-gradient(180deg, #23002f 0%, #000000 100%);border: 2px solid white;border-radius: 5px;}#base div {border: 1px solid white;}#toolbar td {border: 1px solid white;}#bsBg {border: 1px solid white;}* {color: white;}"
	if(getCookie("stc")) document.cookie = "theme=" + id + "; expires=Thu, 18 Dec 9999 12:00:00 UTC";

}

if(getCookie("stc")) changeTheme(getCookie("theme"))
//For saving the current theme to cookies
function saveThemeToCookies() {
	if($('#stc:checked').length) {
		document.cookie = "stc=true; expires=Thu, 18 Dec 9999 12:00:00 UTC";
		document.cookie = "theme=" + currTheme + "; expires=Thu, 18 Dec 9999 12:00:00 UTC"
	}
	else  {
		document.cookie = "stc=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	}
}

//Get cookie
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
