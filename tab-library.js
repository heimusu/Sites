(function(){

    var tabs = window.tabs || {};
    tabs = {
        //初期化
        init: function(){
            var options = {parent:this};
            this.tabChange.init(options);
        },
        //初期化2
        tabChange: function(options){
            $.extend(this,options);
            this.$tab = $('.js_tab');
            this.setEvent();
        },
        //イベント発火で動作する
        setEvent: function(){
            var _self = this;
            this.$tab.on('click',function(e){
                if( $(e.currentTarget).hasClass('selected')){
                    return;
                }
                _self.changeTab($(e.currentTarget));
                _self.render($(e.currentTarget));
            });
        },
        //アクティブタブの切り替え
        changeTab: fucntion($target){
            $('.js_tab').each(fucntion(){
                var $el = $(this);
                $el.removeClass('selected');
            });
            $(this).addClass('selected');
        },
        //アクティブタブに応じたレンダリング

    }

)
