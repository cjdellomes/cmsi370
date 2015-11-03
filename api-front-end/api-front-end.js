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

			$.getJSON(

				"https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + output,
				{
					api_key : key
				}

			).done(function (result2) {

				var output2 = result2.name + " " + result2.title;

				$("#champ-request-output").text(output2);

			});

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

			$.getJSON(

				"https://" + $("#summoner-region:first-child").val() + ".api.pvp.net/api/lol/" + $("#summoner-region:first-child").val() + "/v2.5/league/by-summoner/" + output + "/entry",
				{
					api_key : key
				}

			).done(function (result2) {

				$("#summoner-search-output").text("")

				var queue = result2[output][0].queue;
				var name = result2[output][0].name;
				var tier = result2[output][0].tier;
				var division = result2[output][0].entries[0].division;
				var leaguePoints = result2[output][0].entries[0].leaguePoints;
				var wins = result2[output][0].entries[0].wins;
				var losses = result2[output][0].entries[0].losses;
				$("#summoner-search-output").append(queue + " " + name + "<br />")
				$("#summoner-search-output").append(tier + " " + division + " " + leaguePoints + " lp" + "<br />")
				$("#summoner-search-output").append(wins + " wins and " + losses + " losses")

			});

		});

	});

	$("#recent-match-dropdown li a").click(function() {

      $("#recent-match-region:first-child").text($(this).text());
      $("#recent-match-region:first-child").val($(this).text());

  	});

  	$("#recent-match-search").click(function() {

  		$.getJSON(

  			"https://" + $("#recent-match-region:first-child").val() + ".api.pvp.net/api/lol/" + $("#recent-match-region:first-child").val() + "/v1.4/summoner/by-name/" + $("#recent-match-search-term").val(),
  			{
  				api_key : key
  			}

  		).done(function (result) {

  			var standardized = $("#recent-match-search-term").val().toLowerCase().replace(/\s+/g, '');
			var output = result[standardized].id;

  			$.getJSON(

  				"https://" + $("#recent-match-region:first-child").val() + ".api.pvp.net/api/lol/" + $("#recent-match-region:first-child").val() + "/v1.3/game/by-summoner/" + output + "/recent",
  				{
  					api_key : key
  				}

  			).done(function (result2) {

  				$("#recent-match-output").text("");

  				var gameMode = result2.games[0].gameMode;
  				var subType = result2.games[0].subType;

  				$("#recent-match-output").append(gameMode + " " + subType + "<br />");

  				var win = result2.games[0].stats.win;

  				if (win == false){
  					$("#recent-match-output").append("Game Lost <br />");
  				}
  				else {
  					$("recent-match-output").append("Game Won <br />");
  				}

  				var champ = result2.games[0].championId;
  				$.getJSON(

					"https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + champ,
					{
						api_key : key
					}

				).done(function (result3) {

					champ = result3.name + " " + result3.title;
					$("#recent-match-output").append(champ);


				});

  				var kills = result2.games[0].stats.championsKilled;
  				var assists = result2.games[0].stats.asssists;
  				var deaths = result2.games[0].stats.numDeaths;
  				var kda = (kills + assists) / deaths;

  				$("#recent-match-output").append(kills + " kills, " + assists + " assists, " + deaths + " deaths <br />")
  				$("#recent-match-output").append("Kill, Death, Assist Ratio: " + kda + "<br />")

  				var summonerSpell1 = result2.games[0].spell1;
  				var summonerSpell2 = result2.games[0].spell2;

  				
  				var creeps = result2.games[0].stats.minionsKilled;
  				var goldEarned = result2.games[0].stats.goldEarned;

  				/*$("#recent-match-output").append(gameMode + " " + subType + "<br />")
				$("#recent-match-output").append(champ + " " + )
				$("#recent-match-output").append(wins + " wins and " + losses + " losses")*/

  			});

  		});
  	});

});