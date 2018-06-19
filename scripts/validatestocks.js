// create a new stock object

var stocks = new Stocks('HUWV206VIKKM6UB0');

var options = {
  symbol: 'AAPL',
  interval: 'weekly',
  amount: 1
};

var result = await stocks.timeSeries(options);

