import React from "react";

const Item = ({ content, deletePost, id }) => {
    return (
        <div>
            <span>
                {content}
            </span>
            <button onClick={() => deletePost(id)}>削除</button>
        </div>
    );
};

export default Item;