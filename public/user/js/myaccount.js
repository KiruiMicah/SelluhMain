firebase.auth().onAuthStateChanged((user) => {

    if(user) {

        // CHECK THE USERTYPE
        firebase.firestore().collection("users")
        .doc(user.uid).get().then((doc) => {

            let userType = doc.data().userType;

            if(userType === "user") {
               
                let phoneNumber = doc.data().phoneNum

                document.getElementById('userphoneNumber').value = phoneNumber
                // SEND AUTH CODE;
                // generate code;
                var code = Math.floor(Math.random()*10000);
            
                document.getElementById('randomcode').value = code
                document.getElementById('userId').value = user.uid

                // PULL ALL HOSPITALS
                firebase.firestore().collection("hospitals")
                .onSnapshot((querySnapshot) => {
                    let content = ``;
                    querySnapshot.forEach((doc) => {
                        let name = doc.data().name;
                        let hospitalId = doc.data().userId;
       
                    content += `<option value="${hospitalId}">${name}</option>`    

                    });

                    $("#allhospitals").append(content);

                });


                // DECODE URI COMPONENT;
                var queryString = decodeURIComponent(window.location.search);
                var carried = queryString.substring(1);
                var twillioCode = carried.slice(-5);
                

                // CHECK THE SUBMIT BUTTON AND UPDATE USER STATUS;
                document.getElementById("codesubmitbutton").onclick = () => {

                document.getElementById("codesubmitbutton").style.display = 'none'
                document.getElementById("submitting").style.display = 'block'
                    
                    let activeHospital = document.getElementById('allhospitals').value;
                    let userCode = parseInt(document.getElementById("code").value);
                    let timeStamp = firebase.firestore.Timestamp.fromDate(new Date());
                    
                   
                    if(userCode == twillioCode) {

                        // UPDATE USERS STATE
                            firebase.firestore().collection("users")
                            .doc(user.uid).update({
                                onStateChanged:"active",
                                timeStamp:timeStamp,
                                acttiveHospitalId:activeHospital
                            }).then(() => {
                                alert("Your visit has been started!")
                                window.location.href = "../user/myaccount.html"
                            }).catch((error) => {

                                alert(error.message);
                            })
                    }
                    else {
                        alert('Check the authentication code!')
                        window.location.href = "../user/myaccount.html"
                    }
                }


                // UPDATE USERS PROFILE;
                firebase.firestore().collection('users')
                // .where('userId','==',user.uid)
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        
                        let userName = doc.data().name;
                        let email = doc.data().email;
                        let phoneNum = doc.data().phoneNum;
                        let userId = doc.data().userId;

                        if(userId === user.uid){
                        document.getElementById('username').value = userName;
                        document.getElementById('userphone').value = phoneNum;
                        document.getElementById('useremail').value = email;
                        }
                       
                    })
                })

                // update the db;
                document.getElementById('updatebtn').onclick = () => {

                    document.getElementById('updatebtn').style.display = 'none'
                    document.getElementById('updating').style.display = 'block'

                    let userName = document.getElementById('username').value;
                    let phoneNum = document.getElementById('userphone').value;
                    let email = document.getElementById('useremail').value;

                    firebase.firestore().collection('users')
                    .doc(user.uid).update({
                        email:email,
                        name:userName,
                        phoneNum:phoneNum
                    }).then(() => {
                        alert('User details successfully updated!')
                        window.location.href = "../user/myaccount.html"
                    }).catch((error) => {
                        alert(error.message);
                    document.getElementById('updatebtn').style.display = 'block'
                    document.getElementById('updating').style.display = 'none'
                    })

                }




                
      
            }
            else {
                window.location.href = "/"
            }
        })
    }
    else {
        window.location.href = "/"
    }
})


// document.getElementById("myAccountProfile").onchange = function(){

//     let url = URL.createObjectURL(this.files[0]);

//     console.log(url)

//     document.getElementById("myaccountimg").src = "url(" + url + ")"
    
// }