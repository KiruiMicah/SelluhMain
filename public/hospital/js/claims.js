firebase.auth().onAuthStateChanged((user) => {
    if(user){

        firebase.firestore().collection('users')
        .doc(user.uid).get().then((doc) => {
            let userType = doc.data().userType;

            if(userType == 'hospital'){

               // alert(userId)
            firebase.firestore().collection('claims')
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let patientId = doc.data().patientId
                    let status = doc.data().status;
                    let reason = doc.data().reasons

                    document.getElementById('reasons').innerHTML = reason
                   // PULL ALL CLAIMS;
                firebase.firestore().collection('users')
                .where("userType","==","user")
                .where("userId","==",patientId)
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        let userId = doc.data().userId;
                        let name = doc.data().name;
                        
                        let content = ``
                        
                        content += `<tr>` 
                        content += `<td>${name}</td>`    
                        content += `<td>${status}</td>`    
                        content += `<td><button data-bs-target="#userclaimsmodal" data-bs-toggle="modal">VIEW MORE<button/></td>`    
                        content += `</tr>`    

                        $("#claimsform").append(content);
                    })
                })
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