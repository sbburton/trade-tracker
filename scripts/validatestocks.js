//var myUrl = "https://api.iextrading.com/1.0/ref-data/symbols" ;

var stockTicker = "FAILURE";

var myUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + stockTicker + "&interval=1min&apikey=HUWV206VIKKM6UB0"

var results = $.getJSON(myUrl, callbackFuncWithData);


function callbackFuncWithData(data)
{
    console.log(data);
 // do some thing with data
}
