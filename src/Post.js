import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/avatar'

function Post({ username, caption, imageUrl}) {
    
    return (
        <div className="post">
            {/* Instagram has a avatar + image at the header   */}
            <div className="post__header">
                <Avatar
                    className="post__header_avatar"
                    src={imageUrl}
                    alt="PrafulPrasad"
                />
                <h3>{username}</h3>
            </div>
            


            {/* image */}

            <img 
            className="post__image"
            src={imageUrl}
            alt=""
            />

            {/* username + caption */}
            <div className="post__caption">
                <p className="caption__username">
                    {username}
                </p>
                {caption}
            </div>
        </div>
    )
}

export default Post
