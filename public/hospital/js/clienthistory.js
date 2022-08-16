firebase.auth().onAuthStateChanged((user) => {

    if(user){
        // check the userType;

        firebase.firestore().collection("users")
        .doc(user.uid).get().then((doc) => {

            let userType = doc.data().userType;

            if(userType == "hospital"){

                // pull data of discharged clients;
                firebase.firestore().collection("claims")
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        let patientId = doc.data().patientId;
                        let hospitalId = doc.data().hospitalId;
                        let dischargeTime = doc.data().dischargeTime;
                        let claimId = doc.data().claimId;

                        let newDate = dischargeTime.toDate().toLocaleDateString();
                        let newTime = dischargeTime.toDate().toLocaleTimeString()
                     
                    
                        // pull user with specific id;
                        firebase.firestore().collection("users")
                        .where("userId","==",patientId)
                        .get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {

                                let name = doc.data().name;

                            let content = ''
                        content += `<tr>`     
                        content += `<td>${name}</td>`    
                        content += `<td>${newDate}</td>`    
                        content += `<td>${newTime}</td>`    
                        content += `<td>View more</td>`    
                        content += `</tr>`    
                            
                            $("#clientshistory").append(content);
                            })
                        })

                    
                    })
                })
            }
            else {
                window.location.href = "/login.html"
            }
        })
    }

    else {

    }
})