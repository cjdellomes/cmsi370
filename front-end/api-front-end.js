$(function () {

	key = "f4380caf-2694-4e63-94b2-3d14fbaaebf4" // JD: 1, 7

	$("#champ-request").click(function () { // JD: 1 ...etc. etc. etc.
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

			).done(function (result2) { // JD: 5, 6

				var output2 = result2.name + " " + result2.title;

				$("#champ-request-output").text(output2);

			});

		});
	});

    $("#summoner-dropdown li a").click(function() {
        // JD: 8
      $("#summoner-region:first-child").text($(this).text());
      $("#summoner-region:first-child").val($(this).text());

  	});

	$("#summoner-search").click(function () {

		$.getJSON(
            // JD: 2
			"https://" + $("#summoner-region:first-child").val() + ".api.pvp.net/api/lol/" + $("#summoner-region:first-child").val() + "/v1.4/summoner/by-name/" + $("#summoner-search-term").val(),
			{
				api_key : key
			}

		).done(function (result) {

			var standardized = $("#summoner-search-term").val().toLowerCase().replace(/\s+/g, '');
			var output = result[standardized].id;

			$.getJSON(
                // JD: 2
				"https://" + $("#summoner-region:first-child").val() + ".api.pvp.net/api/lol/" + $("#summoner-region:first-child").val() + "/v2.5/league/by-summoner/" + output + "/entry",
				{
					api_key : key
				}

			).done(function (result2) { // JD: 5, 6

				$("#summoner-search-output").text("") // JD: 7

				var queue = result2[output][0].queue; // JD: 9
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

	$("#recent-match-dropdown li a").click(function() { // JD: 10
        // JD: 8
      $("#recent-match-region:first-child").text($(this).text());
      $("#recent-match-region:first-child").val($(this).text());

  	});

  	$("#recent-match-search").click(function() { // JD: 10

  		$.getJSON(
            // JD: 2
  			"https://" + $("#recent-match-region:first-child").val() + ".api.pvp.net/api/lol/" + $("#recent-match-region:first-child").val() + "/v1.4/summoner/by-name/" + $("#recent-match-search-term").val(),
  			{
  				api_key : key
  			}

  		).done(function (result) {

  			var standardized = $("#recent-match-search-term").val().toLowerCase().replace(/\s+/g, '');
			var output = result[standardized].id;

  			$.getJSON(
                // JD: 2
  				"https://" + $("#recent-match-region:first-child").val() + ".api.pvp.net/api/lol/" + $("#recent-match-region:first-child").val() + "/v1.3/game/by-summoner/" + output + "/recent",
  				{
  					api_key : key
  				}

  			).done(function (result2) { // JD: 5, 6

  				$("#recent-match-output").text("");

  				var gameMode = result2.games[0].gameMode; // JD: 9
  				var subType = result2.games[0].subType;

  				$("#recent-match-output").append(gameMode + " " + subType + "<br />");

  				var win = result2.games[0].stats.win;
  				$("#recent-match-output").append("Game Won: " + win + "<br />");

  				var kills = result2.games[0].stats.championsKilled;
  				var assists = result2.games[0].stats.assists;
  				var deaths = result2.games[0].stats.numDeaths;
  				var ratio = (kills + assists) / deaths;

  				$("#recent-match-output").append(kills + " kills, "  + deaths + " deaths, " + assists + " assists, <br />");
  				$("#recent-match-output").append("Kill, Death, Assist Ratio: " + ratio + "<br />");

  				var creeps = result2.games[0].stats.minionsKilled;
  				var goldEarned = result2.games[0].stats.goldEarned;
  				$("#recent-match-output").append("Creeps: " + creeps);
  				$("#recent-match-output").append("<br />Gold: " + goldEarned);


  				$("#recent-match-output").append("<br />Summoner Spells: ");
  				var summonerSpell1 = result2.games[0].spell1;
  				var summonerSpell2 = result2.games[0].spell2;
  				$.getJSON(

  					"https://global.api.pvp.net/api/lol/static-data/na/v1.2/summoner-spell/" + summonerSpell1,
  					{
  						api_key : key
  					}

  				).done(function (result3) {

  					summonerSpell1 = result3.name;
  					$("#recent-match-output").append(summonerSpell1 + " ");

  				});
  				$.getJSON(

  					"https://global.api.pvp.net/api/lol/static-data/na/v1.2/summoner-spell/" + summonerSpell2,
  					{
  						api_key : key
  					}

  				).done(function (result3) {

  					summonerSpell2 = result3.name;
  					$("#recent-match-output").append(summonerSpell2 + " ");

  				});

				items = [result2.games[0].stats.item0]; // JD: 9
				items.push(result2.games[0].stats.item1);
				items.push(result2.games[0].stats.item2);
				items.push(result2.games[0].stats.item3);
				items.push(result2.games[0].stats.item4);
				items.push(result2.games[0].stats.item5);

				for (var i = 0; i < items.length; i++){ // JD: 11
					$.getJSON(

						"https://global.api.pvp.net/api/lol/static-data/na/v1.2/item/" + items[i],
						{
							api_key : key
						}

					).done(function (result3) {

						$("#recent-match-output").append("<br /> Item: "+ result3.name);

					});
				}

				var champ = result2.games[0].championId;
  				$.getJSON(

					"https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + champ,
					{
						api_key : key
					}

				).done(function (result3) { // JD: 5, 6 (squared because it is yet one more level deeper!)

					champ = result3.name + " " + result3.title;
					$("#recent-match-output").append("<br /> Champion: " + champ);

				});

  			});

  		});
  	});

	$("#free-champ-request").click(function () {
		$.getJSON(

			"https://na.api.pvp.net/api/lol/na/v1.2/champion",
			{
				api_key : key
			}

		).done(function (result) {
			$("#free-champ-request-output").text("");
			output = result.champions
			for (var i = 0; i < output.length; i++){ // JD: 11
				if (output[i].freeToPlay == true) { // JD: 12
					$.getJSON(

						"https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + output[i].id,
						{
							api_key : key
						}

					).done(function (result2) { // JD: 5, 6

						var output2 = result2.name + " " + result2.title;

						$("#free-champ-request-output").append(output2 + "<br />");

					});
				}
			}
		});
	});

	$("#shard-request-dropdown li a").click(function () {
        // JD: 8
      $("#shard-request-region:first-child").text($(this).text());
      $("#shard-request-region:first-child").val($(this).text());

  	});

  	$("#shard-request").click(function () {
  		$.getJSON(

  			"http://status.leagueoflegends.com/shards/" + $("#shard-request-region:first-child").val(),
  			{
  				api_key : key
  			}

  		).done(function (result) {
            // JD: 8
  			$("#shard-request-output").text("");
  			$("#shard-request-output").text(result.name);

  			for (var i = 0; i < result.services.length; i++) {
  				$("#shard-request-output").append("<br />" + result.services[i].name + ": " + result.services[i].status);
  			}

  		});
  	});

});