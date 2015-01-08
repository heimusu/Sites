/*global $:false */
$(function(){
    $('.area').addClass('selected');
    $('#contents1').hide();
    $('#contents2').hide();
    $('#contents3').hide();

    $('.tabTest li').on('click', function(){
        $('.tabTest li').removeClass('selected');
        $(this).addClass('selected');
        $('.area').hide();
        if($('#tab1').hasClass('selected') == true){
            $('#contents1').show();
            $('#contents2').hide();
            $('#contents3').hide();
        }
        if($('#tab2').hasClass('selected') == true){
            $('#contents2').show();
            $('#contents1').hide();
            $('#contents3').hide();
        }
        if($('#tab3').hasClass('selected') == true){
            $('#contents1').hide();
            $('#contents2').hide();
            $('#contents3').show();
        }

    });
});



