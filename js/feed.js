$(function(){
    // $.get('http://heimusu.hatenablog.com/rss')

    var url = '';
    if(/www.heimusu.com/.test(window.location.href)){
        url = 'php/rss.php';
    }
    else {
        url = '//localhost:3000/php/rss.php';
    }


    $.get(url)
    .done(function(entry){
        // console.log(entry);

        // DOMの動的生成
        var FeedContents =
          '<div class="card">' +
            '<a href="' + entry[0]['link'] + '" class="article-link"></a>' +
            '<span class="thumb-image"></span>' +
            '<div class="card-title"><a href="' + entry[0]['link'] + '">' + entry[0]['title'] + '</a></div>'+
            '<p class="card-description">' + entry[0]['description'] + '...' + '</p>' +
          '</div>' +
          '<div class="card">' +
            '<a href="' + entry[1]['link'] + '" class="article-link"></a>' +
            '<span class="thumb-image"></span>' +
            '<div class="card-title"><a href="' + entry[1]['link'] + '">' + entry[1]['title'] + '</a></div>'+
            '<p class="card-description">' + entry[1]['description'] + '...' + '</p>' +
          '</div>' +
          '<div class="card">' +
            '<a href="' + entry[2]['link'] + '" class="article-link"></a>' +
            '<span class="thumb-image"></span>' +
            '<div class="card-title"><a href="' + entry[2]['link'] + '">' + entry[2]['title'] + '</a></div>'+
            '<p class="card-description">' + entry[2]['description'] + '...' + '</p>' +
          '</div>' +
          '<div class="card">' +
            '<a href="' + entry[3]['link'] + '" class="article-link"></a>' +
            '<span class="thumb-image"></span>' +
            '<div class="card-title"><a href="' + entry[3]['link'] + '">' + entry[3]['title'] + '</a></div>'+
            '<p class="card-description">' + entry[3]['description'] + '...' + '</p>' +
          '</div>';

        $('#topicsContents').append(FeedContents);

    })
    .fail(function(err){
        alert('load rss error!');
        console.log(err);
    });
});
