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

			"https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + $("#champ-search-term").val(),
			{
				api_key : key
			}

		).done(function (result) {

			var output = result.name + " " + result.title;

			$("#champ-search-output").text(output);

		});
	});

    $("#summoner-dropdown li a").click(function() {

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

	$("#rank-dropdown li a").click(function() {

      $("#rank-region:first-child").text($(this).text());
      $("#rank-region:first-child").val($(this).text());

  	});

	$("#rank-search").click(function () {
		$.getJSON(

			"https://" + $("#rank-region:first-child").val() + ".api.pvp.net/api/lol/" + $("#rank-region:first-child").val() + "/v2.5/league/by-summoner/" + $("#rank-search-term").val() + "/entry",
			{
				api_key : key
			}

		).done(function (result) {

			var output = result[$("#rank-search-term").val()][0].tier + " " + result[$("#rank-search-term").val()][0].entries[0].division + " " + result[$("#rank-search-term").val()][0].entries[0].leaguePoints + " lp";
			$("#rank-search-output").text(output);

		});
	});

});