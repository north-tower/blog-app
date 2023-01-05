import './TextBox.css';
import {Avatar,Button} from "@mui/material";
import { useState, useEffect } from 'react';
import { auth, db} from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { deepOrange, deepPurple } from '@mui/material/colors';

function TextBox(){
    const [ textMessage,setTextMessage ] = useState("");
    const [ textImage, setTextImage] = useState("");
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const navigate = useNavigate();
    const date = new Date(timestamp);
    const [user, loading, error] = useAuthState(auth);
    const [userName, setUserName] = useState("");
    
    const fetchUserName = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          setUserName(data.name);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
      };

      useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
      }, [user, loading]);
    const dateFormat = date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString();
    const sendPost = e => {
        e.preventDefault();

        db.collection('posts').add({
            displayName:userName,
            username:"Tets",
            verified:true,
            image:textImage,
            text:textMessage,
            timestamp:dateFormat,

        });
        setTextMessage("");
    setTextImage("");
    }
    return (
        <div className='textBox'>
            <form>
                <div className='textBox__input'>
                <Avatar sx={{ bgcolor: deepOrange[500] }} >{userName.charAt(0)}
                </Avatar>
                    <input
                    onChange={(e) => setTextMessage(e.target.value)} 
                    value={textMessage} placeholder="What's happening">
                    </input>
                </div>
                
                <input 
                value={textImage}
                onChange={(e) => setTextImage(e.target.value)}
                className='textBox__imageInput' placeholder='Enter image url'></input>
                <Button  onClick={sendPost} type='submit' className='textBox__textButton'>Post</Button>
            </form>
           
        </div>
    )
}

export default TextBox;