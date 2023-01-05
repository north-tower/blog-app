import './Post.css';
import Avatar from "@mui/material/Avatar";
import { VerifiedUser } from '@mui/icons-material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RepeatIcon from '@mui/icons-material/Repeat';
import { deepOrange, deepPurple } from '@mui/material/colors';
import  PublishIcon from '@mui/icons-material/Publish';
import { forwardRef } from 'react';



const Post = forwardRef(({
    displayName,
    verified,
    timestamp,
    text,
    image,
}, ref) => 
{
    
    return(
        <div className="post">
            <div className='post__avatar'>
                <Avatar sx={{ bgcolor: deepOrange[500] }} >{displayName.charAt(0)}
                </Avatar>
            </div>
            <div className='post__body'>
                <div className='post__header'>
                    <div className='post__headerText'>
                        <h3>
                           {displayName}{" "}
                            <span >
                                 {verified && <VerifiedUser className='post__badge' />}
                                         
                            </span>

                            <span className='time'>
                                {timestamp}  
                            </span>
                           
                            
                        </h3>
                    </div>
                    <div className='post__headerDescription'>
                        <p>{text}</p>
                    </div>
                </div>
                <img src={image}></img>
                <div className="post__footer">
                    <ChatBubbleOutlineIcon fontSize="small" />
                    <RepeatIcon fontSize="small" />
                    <FavoriteBorderIcon fontSize="small" />
                    <PublishIcon fontSize="small" />
                </div>
            </div>
        </div>
    )
});

export default Post;