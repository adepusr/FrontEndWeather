var dateval;

function today()
{
	var generate=document.getElementById("datebox1");
		generate.innerHTML='';
	generate=document.getElementById("datebox2");
		generate.innerHTML='';
	generate=document.getElementById("chartContainer");
		generate.innerHTML='';
	var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
   if (month.length < 2) 
		month = '0' + month;
   if (day.length < 2) 
		day = '0' + day;
	var date=[year, month, day].join('');
		todaydata(date);
}
function todaydata(dt)
{
	var ourRequest = new XMLHttpRequest();
	var url='http://adepusr.xyz:8080/Resource/forecast/'+dt;
	ourRequest.open('GET', url);
	ourRequest.onload = function() {
	if (ourRequest.status >= 200 && ourRequest.status < 500) {
			console.log(ourRequest.status);	
			var data=JSON.parse(ourRequest.responseText);
			console.log(data);
			todayHTML(data);
  	}else {
    console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function() {
  console.log("Connection error");
};
ourRequest.send();
}
function todayHTML(Data) {
  	var Container = document.getElementById("todayd").innerHTML;
	var compiled=Handlebars.compile(Container);
	var generatedHTML=compiled(Data);
	var a= document.getElementById("location");
	a.innerHTML=generatedHTML;
}

function todayweather(dt)
{
var ourRequest = new XMLHttpRequest();
var url='http://adepusr.xyz:8080/Resource/historical/'+dt;
ourRequest.open('GET', url);
ourRequest.onload = function() {
  if (ourRequest.status >= 200 && ourRequest.status < 500) {
console.log(ourRequest.status);	
	  var data=JSON.parse(ourRequest.responseText);
	console.log(data);
          createHTML(data);
	  chartGen(data);	  
  } else {
    console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function() {
  console.log("Connection error");
};

ourRequest.send();
}
function createHTML(Data) {
  var Container = document.getElementById("handl_today").innerHTML;
	var compiled=Handlebars.compile(Container);
	var generatedHTML=compiled(Data);
	var a= document.getElementById("location");
	a.innerHTML=generatedHTML;
}


function perticularday()
{
	var generate=document.getElementById("datebox2");
generate.innerHTML='';
	generate=document.getElementById("chartContainer");
generate.innerHTML='';
createDate();
}

function createDate()
{

var generate=document.getElementById("datebox1");
generate.innerHTML='<br/><label>DATE: </lable><input type="text" id="dp" onclick="picker()"/><button id="datesubmit" onclick="datesubmit()">Go...!</button>';
}

function picker()
{
	$("#dp").datepicker();
}

function datesubmit()
{

dateval=document.getElementById("dp").value;
if(dateval==null)
	alert("Enter valid date");
else
	{
		var d= new Date(dateval);
		console.log(d);
		month=''+(d.getMonth()+1);
		day = '' + d.getDate(),
        	year = d.getFullYear();
	    	if (month.length < 2) 
			month = '0' + month;
    		if (day.length < 2) 
			day = '0' + day;
		var date=[year, month, day].join('');
		todayweather(date);
	}
}

