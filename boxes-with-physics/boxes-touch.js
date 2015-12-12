(function ($) {

    var drawingArea = {
        marginLeft: $("#drawing-area").css("marginLeft"),
        marginTop: $("#drawing-area").css("marginTop"),
        width: $("#drawing-area").width(),
        height: $("#drawing-area").height()
    };
    /**
     * Tracks a box as it is rubberbanded or moved across the drawing area.
     */
    var trackDrag = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            // Don't bother if we aren't tracking anything.
            if (touch.target.movingBox) {
                // Reposition the object.
                touch.target.movingBox.offset({
                    left: touch.pageX - touch.target.deltaX,
                    top: touch.pageY - touch.target.deltaY
                });
            }
        });

        // Don't do any touch scrolling.
        event.preventDefault();
    };

    /**
     * Concludes a drawing or moving sequence.
     */
    var endDrag = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            if (touch.target.movingBox) {
                // Change state to "not-moving-anything" by clearing out
                // touch.target.movingBox.
                touch.target.movingBox = null;
            }
        });
    };

    /**
     * Indicates that an element is unhighlighted.
     */
    var unhighlight = function () {
        $(this).removeClass("box-highlight");
    };

    /**
     * Begins a box move sequence.
     */
    var startMove = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            // Highlight the element.
            $(touch.target).addClass("box-highlight");

            // Take note of the box's current (global) location.
            var jThis = $(touch.target),
                startOffset = jThis.offset();

            // Set the drawing area's state to indicate that it is
            // in the middle of a move.
            touch.target.movingBox = jThis;
            touch.target.deltaX = touch.pageX - startOffset.left;
            touch.target.deltaY = touch.pageY - startOffset.top;

            touch.target.startX = startOffset.left;
            touch.target.startY = startOffset.top;
        });

        // Eat up the event so that the drawing area does not
        // deal with it.
        event.stopPropagation();
    };

    /**
     * Sets up the given jQuery collection as the drawing area(s).
     */
    var setDrawingArea = function (jQueryElements) {
        // Set up any pre-existing box elements for touch behavior.
        jQueryElements
            .addClass("drawing-area")
            
            // Event handler setup must be low-level because jQuery
            // doesn't relay touch-specific event properties.
            .each(function (index, element) {
                element.addEventListener("touchmove", trackDrag, false);
                element.addEventListener("touchend", endDrag, false);
            })

            .find("div.box").each(function (index, element) {
                element.addEventListener("touchstart", startMove, false);
                element.addEventListener("touchend", unhighlight, false);
                element.velocity = {x : 0, y : 0};
                element.acceleration = {x : 0, y : 0};
            });
    };

    var lastTimestamp = 0;
    var FRAME_RATE = 10;
    var MS_BETWEEN_FRAMES = 1000 / FRAME_RATE;

    var topBoundary = $("#drawing-area").offset().top;
    var bottomBoundary = topBoundary + drawingArea.height;
    var leftBoundary = $("#drawing-area").offset().left;
    var rightBoundary = leftBoundary + drawingArea.width;

    var updateBoxPositions = function (timestamp){
        var timePassed = timestamp -lastTimestamp;
        if (timePassed > MS_BETWEEN_FRAMES){
            $("#console").text(timePassed);

            $("div.box").each(function (index, element){
                var offset = $(element).offset();
                offset.left += element.velocity.x * timePassed;
                offset.top += element.velocity.y * timePassed;

                element.velocity.x += element.acceleration.x * timePassed;
                element.velocity.y += element.acceleration.y * timePassed;

                $(element).offset(offset);

                if(offset.top < topBoundary) {
                    offset.top = topBoundary;
                    element.velocity.y *= -0.5;
                }

                if(offset.top + element.height > bottomBoundary) {
                    offset.top = element.height - drawingArea.height;
                    element.velocity.y *= -0.5;
                }

                if(offset.left < leftBoundary) {
                    offset.left = leftBoundary;
                    element.velocity.x *= -0.5;
                }

                if(offset.left > rightBoundary) {
                    offset.left = rightBoundary;
                    element.velocity.x *= -0.5;
                }
                
            });

            lastTimestamp = timestamp;
        }

        window.requestAnimationFrame(updateBoxPositions);
    };

    $.fn.boxesTouch = function () {
        var element = $("#drawing-area");
        var elementOffest = element.offset();

        setDrawingArea(this);
        window.requestAnimationFrame(updateBoxPositions);

        window.addEventListener('devicemotion', function (event){
            $("#console").text("x: " + event.accelerationIncludingGravity.x +
                "y: " + event.accelerationIncludingGravity.y +
                "z: " + event.accelerationIncludingGravity.z);

            $("div.box").each(function (index, element) {
                element.acceleration.x = event.accelerationIncludingGravity.x / 1000000;
                element.acceleration.y = -(event.accelerationIncludingGravity.y / 1000000);
            });
        });
    };
}(jQuery));