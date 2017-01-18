$(function(){
    // $.get('http://heimusu.hatenablog.com/rss')
    $.get('../php/feed.php')
    .done(function(data){
        console.log(data);
    })
    .fail(function(err){
        alert('load rss error!');
        console.log(err);
    });
});
