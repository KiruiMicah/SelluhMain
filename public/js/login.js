document.getElementById("userLogInbtn").onclick = () => {
    
  
    // GET ALL HTML ELEMENTS
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(email == "") {
        alert("Email required!")
    }
    // else if(password.length != 8) {
    //     alert("Password should be atleast eight characters!")
    // }
    else {
        document.getElementById("loggingin").style.display = "block"
        document.getElementById("userLogInbtn").style.display = "none"

            // SIGN IN USER
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((userCredential) => {

        let user = userCredential.user;
        
        // CHECK USERTYPE
        firebase.firestore().collection("users")
        .doc(user.uid).get().then((doc) => {

            let userType = doc.data().userType;
            
      
            if(userType === "user"){
                window.location.href = "../user/dashboard.html"
            }

            else if( userType === "hospital"){
                window.location.href = "../hospital/dashboard.html"
            }

        })
    }).catch((error) => {
        
        document.getElementById("logginginerroralerts").innerHTML = error.message
        document.getElementById("loggingin").style.display = "none"
        document.getElementById("userLogInbtn").style.display = "block"
        
        setTimeout(() => {
            document.getElementById("logginginerroralerts").style.display = "none"
        }, 5000)
    })
    }

}