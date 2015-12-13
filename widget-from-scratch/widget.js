(function ($) {
    var draggable;
    var trashImg = $("<img />", {
        id: "trash",
        src: "http://vignette3.wikia.nocookie.net/mysims/images/d/d5/Trashcan.jpg/revision/latest?cb=20090313211444",
        alt: "trash",
        width: "100",
        height: "150"
    });
    trashImg.appendTo("#trash");

    var handle = function (event) {
        draggable.offset({left: event.pageX, top: event.pageY});
    }

    $.fn.widget = function () {
        this.mousedown(function (event) {
            var target = event.target;
            draggable = $(event.target).clone()
            .addClass("drag-image")
            .offset({left: event.pageX, top: event.pageY});

            $("body")
            .append(draggable)
            .mousemove(handle);

            draggable.mouseup(function (event) {
                draggable.remove();
            });
        });
    };
    $(".draggables").widget();
}(jQuery));