//var myUrl = "https://api.iextrading.com/1.0/ref-data/symbols" ;

//$(document).ready(function(){

//	document.getElementById("submit").addEventListener("click", function(e){
//        e.preventDefault()//prevent page refresh
//
//	    checkTicker();
//
//	});

    function checkTicker(){
        var stockTicker = $("#symbol").val();

        var myUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + stockTicker + "&interval=1min&apikey=HUWV206VIKKM6UB0"

        $.getJSON(myUrl, callbackFuncWithData);

        console.log(myUrl);

        //console.log('checkTicker() linked');
    }



    function callbackFuncWithData(data)
    {

        console.log("hi");
        console.log(data);

        if(data.hasOwnProperty("Error Message"))
        alert("Bad ticker!");
        else
        alert("Good ticker!");

     // do some thing with data
    }


//})
