firebase.auth().onAuthStateChanged((user) => {

    if(user) {

       
        // CHECK THE USERTYPE
        firebase.firestore().collection("users")
        .doc(user.uid).get().then((doc) => {

            let userType = doc.data().userType;
            let username = doc.data().name;
            let email = doc.data().email;
            if(userType == "user") {
                
            // PULL ALL APPROVED REQUESTS THAT MATCH THE SAID UID
            firebase.firestore().collection("policyrequests")
            .where("userId","==",user.uid)
            .where("status","==","complete")
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    let name = doc.data().fullName;
                    let startDate = doc.data().startDate;
                    let endDate = doc.data().endDate;
                    // alert(startDate)
                    let companyId = doc.data().companyId;
                    let carValue = doc.data().carValue;
                    let carPlate = doc.data().carPlate;
                    let coverType = doc.data().coverType
                    let policyBalance = doc.data().policyBalance;
                // PULL ALL USERS TO CHECK APPEND INSURANCE NAME
                firebase.firestore().collection("users")
                .where("userId","==",companyId)
                .get().then((querySnapshot) => {
                    let content = '';
                    querySnapshot.forEach((doc) => {
                        let companyName = doc.data().name;
                      
                content += `    <div class="mypolicycardmodal">
                    <div class="policycardlogo">
                        <img src="/Resources/Images/pacis.png" alt="" class="img-fluid">
                        <h5>${companyName}</h5>
                    </div>

                    <div class="mypolicycardpersonalinfo">
                        <h5>Name: <span>${username}</span></h5>
                        <h5>Email: <span>${email}</span></h5>
                    
                    </div>

                    <div class="mypolicycardinsurancedetails">
                        <h5>Policy Type: <span>${coverType}</span></h5>
                        <h5>Policy Number:<span>KJHGI74F65788878JHTGYU</span></h5>
                        <h5>In-patient Balance: <span>${policyBalance}</span></h5>
                    </div>
                    </div> `

                    })
                $("#maininsurancepolicycarrier").append(content);   
                });
                });
            });
            }
        });
    }

    else {
        window.location.href = "/"
    }
})