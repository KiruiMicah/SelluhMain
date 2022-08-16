firebase.auth().onAuthStateChanged((user) =>  {
    if(user){

        firebase.firestore().collection('users')
        .doc(user.uid).get().then((doc) => {

            let userType = doc.data().userType;

            if(userType === 'hospital'){

                // PULL ALL PRE-AUTHS
                firebase.firestore().collection("preauths")
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let patientsId = doc.data().patientsId;
                        let preAuthType = doc.data().preAuthType;
                        let status = doc.data().status;
                        let reason = doc.data().reason;

                        // alert(reason)
                        document.getElementById('preauthreasons').innerHTML = reason
                        // PULL ALL USERS;

                        firebase.firestore().collection('users')
                        .where('userType',"==",'user')
                        .where('userId',"==",patientsId)
                        .get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {

                                let name = doc.data().name;

                                let content = ``;
                                content += `<tr>`    
                                content += `<td>${name}</td>`   
                                content += `<td>${preAuthType}</td>`    
                                content += `<td>${status}</td>`    
                                content += `<td> <button data-bs-target="#preauthformsmodal" data-bs-toggle="modal">VIEW MORE</button> </td>`    
                                content += `</tr>`   

                                $("#preauthforms").append(content);
                            })
                        })

                    })
                })
            }
        })
    }
    else {
        window.location.href = "/index.html"
    }
})