$(function () {

	$("#search-button").click(function () {
		$.getJSON(
			"https://na.api.pvp.net/api/lol/na/v1.2/champion",

			{
				id : $("#search-term").val(),
				api_key : "f4380caf-2694-4e63-94b2-3d14fbaaebf4"
			}

		).done(function (result) {

			var ouput = result.id

			$("body").append("<p>Test</p>");

		});
	});

});