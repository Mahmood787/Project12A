import React, { useEffect, useState } from 'react'
import fire from '../pages/firebase'


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'

const  Login=()=>{
    const [user,setUser]= useState<any>("")
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [emailError,setEmailError]= useState('')
    const [passowrdError,setPasswordError]= useState('')
    const [hasAccount, setHasAccount]=useState(true)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  const clearInput=()=>{
    setEmail('')
    setPassword('')
  }
  const clearError=()=>{
    setEmailError('')
    setPasswordError('')
  }
  const handleLogin =()=>{
    clearError()
    fire.auth().signInWithEmailAndPassword(email,password)
    .catch((err)=>{
        switch (err.code){
            case "auth/invalid-email":
                case "auth/user-disabled":
                    case 'auth/user-not-found':
                        setEmailError(err.message)
                        break;
        case "auth/wrong-password":
            setPasswordError(err.message);
          break;
        } }) 
    handleClose()
}
  const handleSignup=()=>{
    clearError()
    fire.auth().createUserWithEmailAndPassword(email,password)
    .catch((err)=>{
      switch (err.code){
        case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message)
            break;
        case 'auth/weak-password':
          setPasswordError(err.message)
          break;
      }
    })
  }
  const handleLogout=()=>{
    fire.auth().signOut()
  }
  const authListner=()=>{
    clearInput()
    fire.auth().onAuthStateChanged(user=>{
      if(user){
        setUser(user)
      }else{
        setUser("")
      }
    })
  }
 
  useEffect(()=>{
    authListner()
  },[user])
  console.log(user)
    return(
      <section className="login">
          {user ? (<Button variant="outlined" color="primary" onClick={handleLogout}>
            Sign out
         </Button>):(<Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Sign in
         </Button>)}
         <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{hasAccount ? "Login": "Signup"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          {/* <p className="errorMsg">{emailError}</p> */}
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <p className="errorMsg">{passowrdError}</p>
        </DialogContent>
        <DialogActions style={{display: "flex",flexDirection: "column", alignItems: "baseline"}}>
        {hasAccount ? (
              <>
               <Button style={{textAlign:"left"}} onClick={handleLogin} color="primary">Signin </Button>
               <br/>
                <p>
                  Dont have account?
                </p>
                  <Button onClick={()=>setHasAccount(!hasAccount)}color="primary">Sign Up</Button>
              </>
            ):(
              <>
            
                <Button onClick={handleSignup} color="primary">Sign UP</Button>
                <p>Have Account?</p>
                <Button onClick={()=>setHasAccount(!hasAccount)} color="primary">Signin</Button>
              </>
            )}
        </DialogActions>
      </Dialog>
                
      </section>
    )
  }
  export default Login