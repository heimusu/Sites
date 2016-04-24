<!--ツイート入力フォーム -->
<tweetForm>
    <div class='inputForm radius-10' style='text-align:center; background-color:#CBE6F3; margin-top:60px;'>
        <input class='form-control' type='text' id='tweet' name='tweet' style='width:40%; margin:5px;' maxlength="140" placeholder='今何してる？' onkeyup='checkValue()'>
        <button class='btn' style="margin:10px;" onclick="tweet()">ツイート</button>
        <span> { count }</span>
    </div>

    <script>
        var self = this;
        this.count = 140;
        checkValue = function(){
            self.count = 140 - (document.getElementsByName('tweet')[0].value.length);
            self.update();
        }

        tweet = function(){
            var tweet = document.getElementsByName('tweet')[0].value;
            //送信
            request.post(endpoint + '/postTweet')
                .send({text: tweet})
                // .set('Authorization', 'Bearer ' + Cookies.get('access_token'))
                // .set('Content-Type', 'application/json')
                .end(function(err, res) {
                    if (err) {
                        alert('Oh no! tweet error.');
                    }
                    // else if(セッション認証切れ){
                    //     alert('セッションが期限切れです');
                    //     Cookies.expire('access_token');
                    //     window.location.href('/login');
                    // }
                    else {
                        console.log('success');
                        location.reload();
                    }
                });
        }
    </script>

</tweetForm>
