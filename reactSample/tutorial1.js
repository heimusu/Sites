var CommentForm = React.createClass({
    handleSubmit: function(e){
        e.preventDefault();
        var author = React.findDOMNode(this.refs.author).value.trim();
        var text = React.findDOMNode(this.refs.text).value.trim();
        //React.findDOMNode(this.refs.author).value='';
        //React.findDOMNode(this.refs.text).value='';
        if(!text || !author){
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        React.findDOMNode(this.refs.author).value='';
        React.findDOMNode(this.refs.text).value='';
    },
    render: function(){
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your Name" ref="author"/>
                <input type="text" placeholder="Say something..." ref="text"/>
                <input type="submit" value="post" />
            </form>
        );
    }
});


var CommentBox = React.createClass({
    getInitialState: function(){
        return {data: []};
    },
    loadCommentsFromServer: function(){
        $.ajax({
            url:this.props.url,
            dataType:'json',
            cache:false,
            success: function(data){
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleCommentSubmit: function(comment){
        var comments = this.state.data;
        //var newComments = comments.concat([comment]);
        comments.push(comment);
        this.setState({data: comments}, function(){
            $.ajax({
                url:this.props.url,
                dataType:'json',
                type:'POST',
                data: comment,
                success: function(data){
                    this.setState({data: data});
                }.bind(this),
                error: function(xhr, status, err){
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        });
    },
    componentDidMount: function(){
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function(){
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data = {this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
});


var Comment = React.createClass({
    render: function(){
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function(){
        var commentNodes = this.props.data.map(function(comment){
            return (
                <Comment author={comment.author}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});


React.render(
    <CommentBox url="./comments.json" pollInterval={2000}/>,
    document.getElementById('content')
);
