var apiKey = 'HUWV206VIKKM6UB0';
var myUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=" + apiKey;

$.getJSON(myUrl, callbackFuncWithData);


function callbackFuncWithData(data)
{
    console.log(data);
 // do some thing with data
}
