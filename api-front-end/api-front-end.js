$(function () {

	key = "f4380caf-2694-4e63-94b2-3d14fbaaebf4"

	$("#champ-request").click(function () {
		$.getJSON(
			"https://na.api.pvp.net/api/lol/na/v1.2/champion",

			{
				api_key : key
			}

		).done(function (result) {

			var min = 0;
			var max = result.champions.length;
			var rand = Math.floor(Math.random() * (max - min + 1)) + min;
			var output = result.champions[rand].id;

			$("#champ-request-output").text(output);

		});
	});

	$("#champ-search").click(function () {
		$.getJSON(

			"https://na.api.pvp.net/api/lol/na/v1.2/champion/" + $("#champ-search-term").val(),
			{
				api_key : key
			}

		).done(function (result) {
			var output = result.active;

			$("#champ-search-output").text(output);

		});
	});

    $(".dropdown-menu li a").click(function() {

      $("#summoner-region:first-child").text($(this).text());
      $("#summoner-region:first-child").val($(this).text());

  	});

	$("#summoner-search").click(function () {
		$.getJSON(

			"https://" + $("#summoner-region:first-child").val() + ".api.pvp.net/api/lol/" + $("#summoner-region:first-child").val() + "/v1.4/summoner/by-name/" + $("#summoner-search-term").val(),
			{
				api_key : key
			}

		).done(function (result) {
			var standardized = $("#summoner-search-term").val().toLowerCase().replace(/\s+/g, '');
			var output = result[standardized].id;

			$("#summoner-search-output").text(output);
		});
	});

});