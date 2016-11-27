$(function(){
    $("#modal-open").click(
        function(){
            $(this).blur();
            if($("#modal-overlay")[0]) return false;

            $("body").append('<div id="modal-overlay"></div>');
            $("#modal-overlay").fadeIn("slow");

            centeringModalSyncer() ;

            $("#modal-content").fadeIn("slow");

            $("#modal-close,#modal-overlay").unbind().click(
                function(){
                    $("#modal-content,#modal-overlay").fadeOut("slow",function(){
                        $('#modal-overlay').remove();
                    });
                }
            );
        }
    );
});

function centeringModalSyncer(){
    var w = $(window).width();
    var h = $(window).height();
    var cw = $("#modal-content").outerWidth({margin:true});
    var ch = $("#modal-content").outerHeight({margin:true});

    var pxLeft = ((w - ch) / 2);
    var pxTop = ((h - ch) / 2);

    $("#modal-content").css({"left":pxLeft + "px"});
    $("#modal-content").css({"top":pxTop + "px"});
}
