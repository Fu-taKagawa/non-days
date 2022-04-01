import Item from "./Item";

const List = ({ posts, deletePost}) => {
    console.log(posts)
    return (
        <ul>
            {posts.map((post) => {
                return (
                <Item
                    key={post.id}
                    id={post.id}
                    deleteTodo={deletePost}
                    content={post.content}
                />
                );
            })}
            
        </ul>
    );
};

export default List;