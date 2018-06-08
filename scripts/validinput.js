document.addEventListener("DOMContentLoaded", function() {

	console.log('validinput.js connected');

	document.getElementById("submit").addEventListener("click", function(e){
    e.preventDefault()//prevent page refresh

		var symbol = $("#symbol").val()
		var company = $("#company").val()
		var price = $("#price").val()
		var client = $("#clientName").val()
		var date = $("#date").val()
		var broker = $("#broker").val()
		var status = $("#status").val()

		console.log(symbol, company, price, client, broker, status);

	});

});