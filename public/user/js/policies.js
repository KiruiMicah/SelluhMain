firebase.auth().onAuthStateChanged((user) => {
    
    if(user){

        // CHECK THE USERTYPE
        firebase.firestore().collection("users")
        .doc(user.uid).get().then((doc) => {

            let userType = doc.data().userType;

            if(userType === "user") {

                let userId = user.uid;
                // GET CARRIED ID

                let queryString = decodeURIComponent(window.location.search)
                let carriedId = queryString.substring(1)

                // PULL ALL COMPANIES FROM THE DATABASE
                firebase.firestore().collection("policies")
                .where("companyUserId","==",carriedId)
                .get().then((querySnapshot) => {
                    let content = '';
                    querySnapshot.forEach((doc) => {

                        let policyName = doc.data().policyName;
                        let policyDesc = doc.data().policyDesc;
                        let companyUserId = doc.data().companyUserId;

                        
                        let insurancePolicyName = policyName.toLowerCase();

                        // alert(insurancePolicyName)
                        if(insurancePolicyName == "health") {
                            insurancePolicyName = "../user/healthpolicyforms.html" + "?" + companyUserId
                        }
                        // else if(insurancePolicyName == "motor") {
                        //     insurancePolicyName = "/user/motor.html" + "?" + companyUserId
                        // }
                        // else if(insurancePolicyName == "wiba") {
                        //     insurancePolicyName = "/user/wiba.html" + "?" + companyUserId
                        // }
                        // else if(insurancePolicyName == "life assurance") {
                        //     // insurancePolicyName = "/users page/wiba.html" + "?" + companyUserId
                        // }
                        // else if(insurancePolicyName == "property") {
                        //     insurancePolicyName = "/user/property.html" + "?" + companyUserId
                        // }

                         if(policyName.toLowerCase() == "health") {
                            
                            content += `<div class="allpolicycard">`   
                           content += `<img src="../Resources/Images/pacis.png" alt="">` 
                           content += `<h5>${policyName}</h5>`  
                           content += `<a href="${insurancePolicyName}">Fill Policy Forms</a>` 
                           content += `</div> `
                         }
                                
                        
                    });

                    $("#firstbatchpolicy").append(content);
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