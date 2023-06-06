import CommentItem from "./CommentItem";

const CommentList = ({comments, user}) => {

    return (
        <div>
            {comments.map((comment) => (
                    <CommentItem comment = {comment} user = {user}/>
            ))}
        </div>
    )
}

export default CommentList