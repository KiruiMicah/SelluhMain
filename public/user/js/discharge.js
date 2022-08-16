firebase.auth().onAuthStateChanged((user) => {
    if(user){

        firebase.firestore().collection("users")
        .doc(user.uid).get().then((doc) => {

            let userType = doc.data().userType;
            let name = doc.data().name;
            let onStateChanged = doc.data().onStateChanged
            if(userType == 'user'){
                // PULL ALL CLAIMS;
                firebase.firestore().collection("claims")
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        let patientId = doc.data().patientId;
                        let diagnosis = doc.data().diagnosis;
                        let natureOfTreatment = doc.data().natureOfTreatment;
                        if(user.uid === patientId){
                            let accountCosts = doc.data().accountCosts;

                            if(onStateChanged == 'awaitingdischarge'){
                            document.getElementById('authmodal').style.display = 'none'
                           document.getElementById('editbiomodal').style.display = 'none'
                           document.getElementById('dischargemodal').style.display = 'block'
                           
                        document.getElementById('userName').innerHTML = name;
                        document.getElementById('userBill').innerHTML = accountCosts;
                        document.getElementById('diagnosis').innerHTML = diagnosis;
                        document.getElementById('natureoftreatment').innerHTML = natureOfTreatment;
                            }
                        
                        }
                        
                        
                        document.getElementById('acceptBill').onclick = () => {

                            firebase.firestore().collection('users')
                            .doc(user.uid).update({
                                onStateChanged:'discharged'
                            }).then(() => {
                                alert('Your visit has ended')
                                window.location.href = '../user/myaccount.html'
                            })
                        }

                        document.getElementById('denybill').onclick = () => {
                               firebase.firestore().collection('users')
                            .doc(user.uid).delete().then(() => {
                                alert('Await discharge')

                                
                            document.getElementById('authmodal').style.display = 'none'
                            document.getElementById('editbiomodal').style.display = 'none'
                            document.getElementById('dischargemodal').style.display = 'block'
                            })
                        }

                        
                     
                    })
                })
            }
            else {

                window.location.href = "/index.html"
            }
        })
    }
    else {
        window.location.href = "/index.html"
    }
})