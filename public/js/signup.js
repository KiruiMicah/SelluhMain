document.getElementById("userSignUpbtn").onclick = () => {

 
    // GET ALL HTML ELEMENTS

    let userFullName = document.getElementById("userFullName").value;
    let userPhoneNum = document.getElementById("userPhoneNum").value;
    let userTownOfResidence = document.getElementById("countyofresidence").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let timestamp = firebase.firestore.Timestamp.fromDate(new Date());

    if(userFullName == "") {
        alert("Name is required!")
    }
    else if(userPhoneNum == "") {
        alert("Phone number is required!")
    }
    else if(userTownOfResidence == "") {
        alert("County of residence is required!")
    }
    // else if(password.length != 8) {
    //     alert("Password but be atleast 8 characters")
    // }
    else {
        document.getElementById("signingup").style.display = "block"
        document.getElementById("userSignUpbtn").style.display = "none"

            // SIGNUP USER

    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((userCredential) => {

        let user = userCredential.user;

        let uid = user.uid
        
        
        // SEND ALL OTHER USER INFORMATION TO THE DATABASE

        firebase.firestore().collection("users").doc(user.uid)
        .set({
            name:userFullName,
            phoneNum:userPhoneNum,
            town:userTownOfResidence,
            timestamp:timestamp,
            email:email,
            userId:uid,
            userType:"user"
        }).then(() => {
            window.location.href = "/"
           
        }).catch((error) => {

            console.log(error.message)
            document.getElementById("signingup").style.display = "none"
            document.getElementById("userSignUpbtn").style.display = "block"
        })
        
    }).catch((error) => {
        document.getElementById('signuperrormessage').innerHTML = error.message
        document.getElementById("signingup").style.display = "none"
        document.getElementById("userSignUpbtn").style.display = "block"

        setTimeout(() => {
        document.getElementById('signuperrormessage').style.display = 'none'
        }, 5000);
    })
    }
  


}