
var apiKey = 'HUWV206VIKKM6UB0';
var stocks = new Stocks(apiKey);

console.log(stocks);

function Stocks (apiKey) {
  this.apiKey = apiKey;
}

Stocks.prototype = {
  /** Constants */
  DEFAULT_URL: 'https://www.alphavantage.co/query?',
  API_KEY_URL: 'https://www.alphavantage.co/support/#api-key',

  INTERVALS: [
    '1min', '5min', '15min', '30min', '60min', 'daily', 'weekly', 'monthly'
  ],
  PERFORMANCES: [
    'real-time', '1day', '5day', '1month', '3month', 'year-to-date', '1year',
    '3year', '5year', '10year'
  ],

  /** Private functions */
  _createUrl: function (params) {
    params.apikey = this.apiKey;

    var encoded = Object.keys(params).map(
      key => `${key}=${params[key]}`
    ).join('&');

    return this.DEFAULT_URL + encoded;
  },

  _doRequest: function (params) {
    if (typeof this.apiKey === 'undefined') {
      this._throw(0, 'error');
    }

    return new Promise((resolve, reject) => {
      var url = this._createUrl(params);

      fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (typeof data['Error Message'] !== 'undefined') {
          this._throw(9, 'error');
        }

        resolve(data);
      });
    });
  },

  _throw: function (code, type) {
    if (type === 'error') {
      throw new Error(`${code}: ${this.MESSAGES[code]}`);
    } else if (type === 'warning') {
      console.warn(`${code}: ${this.MESSAGES[code]}`);
    }
  },

  _checkOptions: function (options, type) {
    if (typeof options === 'undefined') {
      this._throw(1, 'error');
    } else if (typeof options.symbol === 'undefined') {
      this._throw(2, 'error');
    } else if (typeof options.interval === 'undefined' ||
               !this.INTERVALS.includes(options.interval)) {
      this._throw(3, 'error');
    } else if (typeof options.start !== 'undefined' &&
               typeof options.amount !== 'undefined') {
      this._throw(4, 'error');
    }

    if (typeof options.amount === 'undefined' &&
        typeof options.start === 'undefined') {
      this._throw(8, 'warning');
    }

    if (typeof options.start === 'object' &&
        typeof options.end === 'undefined') {
      this._throw(10, 'warning');
      options.end = Date.now();
    }

    if (type === 'technical') {
      if (typeof options.indicator === 'undefined') {
        this._throw(5, 'error');
      } else if (typeof options.time_period === 'undefined') {
        this._throw(6, 'error');
      }
    }
  },

  _convertData: function (data, amount) {
    // Strip meta data
    var key = Object.keys(data).find(
      key => key.indexOf('Time Series') !== -1 ||
      key.indexOf('Technical') !== -1
    );
    data = data[key];

    var newData = [];

    // Process all elements
    for (key in data) {
      if (typeof amount !== 'undefined' && newData.length === amount) break;

      // Smoothen up the keys and values in each sample
      let newSample = {};
      for (var sampleKey in data[key]) {
        let newSampleKey = sampleKey.replace(/.+. /, '');
        newSample[newSampleKey] = Number(data[key][sampleKey]);
      }

      // Convert date to local time (dates from AV should be EDT)
      newSample['date'] = new Date(
        Date.parse(key) + (240 - new Date().getTimezoneOffset()) * 60000
      );

      // Insert in new data
      newData.push(newSample);
    }

    return newData;
  },

  _getBetween: function (data, start, end) {
    // Can be optimized by calculating index of start and end dates in list
    return data.filter(sample => start <= sample.date && sample.date <= end);
  },

  /** Public functions */
  timeSeries: async function (options = {}) {
    this._checkOptions(options, 'timeseries');

    if (this.INTERVALS.slice(0, 5).includes(options.interval)) {
      var interval = options.interval;
      options.interval = 'intraday';
    }

    var params = {
      function: `TIME_SERIES_${options.interval}`,
      symbol: options.symbol,
      outputsize: 'full'
    };

    if (options.interval === 'intraday') {
      params.interval = interval;
    }

    if (this.INTERVALS.indexOf(options.interval) <= 5 && options.amount <= 100) {
      params.outputsize = 'compact';
    }

    // Get result
    var result = await this._doRequest(params);
    var converted = this._convertData(result, options.amount);

    if (typeof options.start !== 'undefined') {
      converted = this._getBetween(converted, options.start, options.end);
    }

    return converted;
  },

  technicalIndicator: async function (options = {}) {
    this._checkOptions(options, 'technical');

    var params = {
      function: options.indicator,
      symbol: options.symbol,
      interval: options.interval,
      time_period: options.time_period
    };

    // Get result
    var result = await this._doRequest(params);
    var converted = this._convertData(result, options.amount);

    if (typeof options.start !== 'undefined') {
      converted = this._getBetween(converted, options.start, options.end);
    }

    return converted;
  },

  sectorPerformance: async function (options = {}) {
    if (typeof options.timespan === 'undefined' ||
               !this.PERFORMANCES.includes(options.timespan)) {
      this._throw(7, 'error');
    }

    var params = {
      function: 'SECTOR'
    };

    var result = await this._doRequest(params);

    var found = Object.keys(result).find(key => {
      let noSpace = key.replace(/ /g, '').toLowerCase();
      return noSpace.includes(options.timespan);
    });

    result = result[found];
    for (var j in result) {
      result[j] = parseFloat(result[j]);
    }

    return result;
  }
};

