
firebase.auth().onAuthStateChanged((user) => {
    
    if(user) {

        // CHECK THE USERTYPE

        firebase.firestore().collection("users")
        .doc(user.uid).get().then((doc) => {

            let userType = doc.data().userType;

            if(userType === "user") {
                // alert("we good to go")

                $("#firstBatch").html('')
                // PULL ALL THE INSURANCE COMPANIES
                firebase.firestore().collection("insurancecompanies")
                .onSnapshot((querySnapshot) => {
                    let content = '';
                    querySnapshot.forEach((doc) => {

                        let name = doc.data().name;
                        let userId = doc.data().userId;

                        let allPoliciesId = "../user/policies.html" + "?" + userId


                        content += `<div class="policycard">`  
                        content += `<img src="../Resources/Images/pacis.png" alt="">`   
                        content += `<h5>${name}</h5>`    
                        content += `<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, explicabo.</p>`    
                        content += `<a href="${allPoliciesId}">View Policy</a>` 
                        content += `</div>`    
                    });
                    $("#firstBatch").append(content);
                });
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

