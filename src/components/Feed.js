import "./Feed.css"
import TextBox from "./TextBox";
import Post from "./Post";
import { useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Navbar from "./Navbar";

function Feed(){
    const [posts, setPosts] = useState([]);

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
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
    
  
    useEffect(() => {
        db.collection("posts").onSnapshot((snapshot) =>
          setPosts(snapshot.docs.map((doc) => doc.data()))
        );
      }, []);


    return(
        <div className="feed">
            <div className="feed__header">
                {/* <Navbar /> */}
                <button className='feedBox__feedButton' onClick={logout}>
                        Logout
                </button>
            </div>
            <TextBox />

            <FlipMove>
            {posts.map(post => (
                <Post 
                key={post.text}
                displayName={post.displayName}
                verified={post.verified}
                text={post.text}
                timestamp={post.timestamp}
                image={post.image}
                
                />
            ))}
            </FlipMove>
        </div>
    )
}

export default Feed;