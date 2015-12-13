(function ($) {
    var draggable;
    var target;
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

    var trash = function(event) {
        var trashPosition = $("#trash").offset();
        var clonePosition = $(this).offset();
        if (clonePosition.left > trashPosition.left && clonePosition.left < trashPosition.left + 100 && 
        clonePosition.top > trashPosition.top && clonePosition.top < clonePosition.top + 150) {
            console.log("Trashed");
            target.remove();
            draggable.remove();
        }
        else{
            draggable.remove();
        }
    }

    $.fn.widget = function () {
        this.mousedown(function (event) {
            target = $(event.target);
            draggable = target.clone()
                .addClass("drag-image")
                .offset({left: event.pageX, top: event.pageY});

            $("body")
                .append(draggable)
                .mousemove(handle);

            draggable.mouseup(trash);
        });
    };

    $(".draggables").widget();

}(jQuery));