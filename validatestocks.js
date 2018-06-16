// create a new stock object

var stocks = new Stocks('HUWV206VIKKM6UB0');

var options = {
  symbol: 'AAPL',
  interval: 'weekly',
  amount: 1
};

var result = await stocks.timeSeries(options);

//search stocks
const list=document.querySelector('#stockTable');
const searchBar=document.forms['search-stocks'].querySelector('input');

searchBar.addEventListener('keyup',function(e){

