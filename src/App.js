import React, {useState, useEffect} from 'react'
import './App.css';
import Post from './Post'
import {auth, db} from './firebase'

// MODAL FUNCTIONS ________________________-
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
// MODAL FUNCTIONS ________________________-


function App() {
  const [posts, setPosts] = useState([ ]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false)

  // MODAL CODE-----------------------
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Noooo
      </p>
    </div>
  );
  // MODAL CODE-----------------------

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        // user has logged in..
        console.log(authUser)
        setUser(authUser)
        
      }
      else{
        // user has logged out..
        setUser(null);
      }

    })
    return () =>{
      //perform some cleanup actions before firing again
      unsubscribe()
    }
  }, [user, username])

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

  const signUp = (event) =>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) =>{
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))
    setOpen(false);
  }


  return (
    <div className="App">


        <div className="app__header">
            <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
                />
            <button type="button" onClick={handleOpen}>
              CLICKMEMF
            </button>
            <Modal
              open={open}
              onClose={handleClose}
            >
            <div style={modalStyle} className={classes.paper}>
              <center>
              <img 
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
                
              />
              </center>
              
              <form className = "app__signUp">
                
                <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) =>setUsername(e.target.value)}
                />
                <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
                />
                <Input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) =>setPassword(e.target.value)}
                />
                {user? (
                  <Button >Log Out</Button>
                ) : (
                <Button type="submit" onClick={signUp}>Sign Up</Button>)
                }
              </form>
            </div>
            </Modal>
            
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
