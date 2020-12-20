import React, {useState, useEffect} from 'react'
import './App.css';
import Post from './Post'
import {db} from './firebase'

function App() {
  const [posts, setPosts] = useState([ ]);

  //UseEffect runs a piece of code based on a specific condition like useState hook

  useEffect(() => {
    //This code runs at page load,  the snapshot will take snapshot of database
    db.collection('posts').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);
  return (
    <div className="App">


        <div className="app__header">
            <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
                />
        </div>
        <h1>Hello Praful.😅</h1>

        {
          //key={id} will make sure to render only that post which is new and
          posts.map(({id,post}) => (
            <Post key={id} username = {post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          ))
        }
        {/* Here we use props, props enables us to push dynamic data to these templates */}
        
        
    </div>
  );
}

export default App;
