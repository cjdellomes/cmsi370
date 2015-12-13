$(function () {

    key = "f4380caf-2694-4e63-94b2-3d14fbaaebf4"; // JD: 1, 7 fixed

    $("#champ-request").click(function () { // JD: 1 ...etc. etc. etc. fixed
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

                var output2 = $("<p></p>").text(result2.name + " " + result2.title);

                $("#champ-request-output").append(output2);

            });

        });
    });

    $("#summoner-dropdown li a").click(function() {
        // JD: 8 fixed
        $("#summoner-region:first-child").text($(this).text());
        $("#summoner-region:first-child").val($(this).text());

    });

    $("#summoner-search").click(function () {

        $.getJSON(
            // JD: 2 fixed
            "https://" + $("#summoner-region:first-child").val() + ".api.pvp.net/api/lol/" + $("#summoner-region:first-child").val()
            + "/v1.4/summoner/by-name/" + $("#summoner-search-term").val(),
            {
                api_key : key
            }

        ).done(function (result) {

            var standardized = $("#summoner-search-term").val().toLowerCase().replace(/\s+/g, '');
            var output = result[standardized].id;

            $.getJSON(
                // JD: 2 fixed
                "https://" + $("#summoner-region:first-child").val() + ".api.pvp.net/api/lol/" + $("#summoner-region:first-child").val()
                + "/v2.5/league/by-summoner/" + output + "/entry",
                {
                    api_key : key
                }

            ).done(function (result2) { // JD: 5, 6

                $("#summoner-search-output").text(""); // JD: 7 fixed

                var resultData = result2[output][0];
                var resultDataEntry = resultData.entries[0];

                var queue = resultData.queue; // JD: 9 fixed
                var name = resultData.name;
                var tier = resultData.tier;
                var division = resultDataEntry.division;
                var leaguePoints = resultDataEntry.leaguePoints;
                var wins = resultDataEntry.wins;
                var losses = resultDataEntry.losses;
                var output2 = $("<p></p>").text(queue + " " + name);
                output2.append("<br>");
                output2.append(tier + " " + division + " " + leaguePoints + "lp");
                output2.append("<br>");
                output2.append(wins + " wins and" + losses + " losses");
                $("#summoner-search-output").append(output2);

            });

        });

    });

    $("#recent-match-dropdown li a").click(function () { // JD: 10 fixed
        // JD: 8
        $("#recent-match-region:first-child")
            .text($(this).text())
            .val($(this).text());

    });

    $("#recent-match-search").click(function () { // JD: 10 fixed

        $.getJSON(
            // JD: 2
            "https://" + $("#recent-match-region:first-child").val() + ".api.pvp.net/api/lol/" + $("#recent-match-region:first-child").val()
            + "/v1.4/summoner/by-name/" + $("#recent-match-search-term").val(),
            {
                api_key : key
            }

        ).done(function (result) {

            var standardized = $("#recent-match-search-term").val().toLowerCase().replace(/\s+/g, '');
            var output = result[standardized].id;

            $.getJSON(
                // JD: 2 fixed
                "https://" + $("#recent-match-region:first-child").val() + ".api.pvp.net/api/lol/" + $("#recent-match-region:first-child").val()
                + "/v1.3/game/by-summoner/" + output + "/recent",
                {
                    api_key : key
                }

            ).done(function (result2) { // JD: 5, 6

                //$("#recent-match-output").text("");

                var resultData = result2.games[0];

                var gameMode = resultData.gameMode; // JD: 9 fixed
                var subType = resultData.subType;

                //$("#recent-match-output").append(gameMode + " " + subType + "<br />");

                var win = resultData.stats.win;
                //$("#recent-match-output").append("Game Won: " + win + "<br />");

                var kills = resultData.stats.championsKilled;
                var assists = resultData.stats.assists;
                var deaths = resultData.stats.numDeaths;
                var ratio = (kills + assists) / deaths;

                //$("#recent-match-output").append(kills + " kills, "  + deaths + " deaths, " + assists + " assists <br />");
                //$("#recent-match-output").append("Kill, Death, Assist Ratio: " + ratio + "<br />");

                var creeps = resultData.stats.minionsKilled;
                var goldEarned = resultData.stats.goldEarned;
                //$("#recent-match-output").append("Creeps: " + creeps);
                //$("#recent-match-output").append("<br />Gold: " + goldEarned);


                //$("#recent-match-output").append("<br />Summoner Spells: ");
                var summonerSpell1 = resultData.spell1;
                var summonerSpell2 = resultData.spell2;

                var toPrint = $("<p></p>").text(gameMode + " " + subType);
                toPrint.append("<br>");
                toPrint.append("Game Won: " + win);
                toPrint.append("<br>");
                toPrint.append(kills + " kills, "  + deaths + " deaths, " + assists + " assists");
                toPrint.append("<br>");
                toPrint.append("Kill, Death, Assist Ratio: " + ratio);
                toPrint.append("<br>");
                toPrint.append("Creeps: " + creeps);
                toPrint.append("<br>");
                toPrint.append("Gold: " + goldEarned);
                toPrint.append("<br>");
                toPrint.append("SummonerSpells: ");
                
                $.getJSON(

                    "https://global.api.pvp.net/api/lol/static-data/na/v1.2/summoner-spell/" + summonerSpell1,
                    {
                        api_key : key
                    }

                ).done(function (result3) {

                    summonerSpell1 = result3.name;
                    toPrint.append(summonerSpell1 + " ");

                });
                $.getJSON(

                    "https://global.api.pvp.net/api/lol/static-data/na/v1.2/summoner-spell/" + summonerSpell2,
                    {
                        api_key : key
                    }

                ).done(function (result3) {

                    summonerSpell2 = result3.name;
                    toPrint.append(summonerSpell2 + " ");

                });

                items = [resultData.stats.item0]; // JD: 9 fixed
                items.push(resultData.stats.item1);
                items.push(resultData.stats.item2);
                items.push(resultData.stats.item3);
                items.push(resultData.stats.item4);
                items.push(resultData.stats.item5);

                for (var i = 0; i < items.length; i++) { // JD: 11 fixed
                    $.getJSON(

                        "https://global.api.pvp.net/api/lol/static-data/na/v1.2/item/" + items[i],
                        {
                            api_key : key
                        }

                    ).done(function (result3) {

                        toPrint.append("<br>");
                        toPrint.append("Item: "+ result3.name);

                    });
                }

                var champ = resultData.championId;
                $.getJSON(

                    "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + champ,
                    {
                        api_key : key
                    }

                ).done(function (result3) { // JD: 5, 6 (squared because it is yet one more level deeper!)

                    champ = result3.name + " " + result3.title;
                    toPrint.append("<br /> Champion: " + champ);

                });

                $("#recent-match-output").append(toPrint);

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
            for (var i = 0; i < output.length; i++) { // JD: 11 fixed
                if (output[i].freeToPlay) { // JD: 12 fixed
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
        // JD: 8 fixed
        $("#shard-request-region:first-child")
        .text($(this).text())
        .val($(this).text());

    });

    $("#shard-request").click(function () {
        $.getJSON(

            "http://status.leagueoflegends.com/shards/" + $("#shard-request-region:first-child").val(),
            {
                api_key : key
            }

        ).done(function (result) {
            // JD: 8 fixed
            $("#shard-request-output").text("");
            $("#shard-request-output").text(result.name);

            for (var i = 0; i < result.services.length; i++) {
                $("#shard-request-output").append("<br />" + result.services[i].name + ": " + result.services[i].status);
            }

        });
    });

});