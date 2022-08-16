firebase.auth().onAuthStateChanged((user) => {


    if (user) {

        const activeClientData = [];
        // CHECK THE USERTYPE
        firebase.firestore().collection("users")
            .doc(user.uid).get().then((doc) => {

                let userType = doc.data().userType;
                let userName = doc.data().name;

                if (userType === "hospital") {

                    document.getElementById("searchClient").onclick = () => {   
                        document.getElementById("searchClient").style.display = "none"
                        document.getElementById("searching").style.display = "block"    
                        let searchValueInput = document.getElementById("searchValue").value;    
                        if (searchValueInput == "") {
                            document.getElementById("searchClient").style.display = "block"
                            document.getElementById("searching").style.display = "none"
                        }   
                        // PULL ALL USERS WITH HEALTH POLICY WITH STATUS OF COMPLETE;   
                        firebase.firestore().collection("policyrequests")
                            .where("status", "==", "complete")
                            .where("policyType", "==", "health")
                            .onSnapshot((querySnapshot) => {
                                querySnapshot.forEach((doc) => {    
                                    let coverPlan = doc.data().coverPlan;
                                    let gender = doc.data().gender;
                                    let userId = doc.data().userId;
                                    let companyId = doc.data().companyId;
                                    let policyRequestId = doc.data().policyRequest; 
                                firebase.firestore().collection("users")
                                    .where("name", "==", searchValueInput)
                                    .where("userId", "==", userId)
                                    .get().then((querySnapshot) => {
                                        querySnapshot.forEach((doc) => {    
                                            let clientsName = doc.data().name;
                                            let onStateChanged = doc.data().onStateChanged
                                            let clientUserId = doc.data().userId;   
                                            firebase.firestore().collection("insurancecompanies")
                                                .where("userId", "==", companyId)
                                                .onSnapshot((querySnapshot) => {
                                                    let content = '';
                                                    querySnapshot.forEach((doc) => {    
                                                        let insuranceCompanyName = doc.data().name; 
                                                        let tobeCarriedId = companyId + "?" + clientUserId + "?" + policyRequestId  
                                                        // let userToBe = clientUserId + "?" + companyId + "?" + policyRequestId;  
                                                        content += `<tr>`
                                                        content += `<td>${clientsName}</td>`
                                                        content += `<td>${insuranceCompanyName}</td>`
                                                        content += `<td>0746453734</td>`
                                                        content += `<td><button style="display:none;" id="viewmoreClients" onclick=viewmore(\`${tobeCarriedId}\`) class="btn btn-success">View More</button></td>`
                                                        content += `</tr>`
                                                    }); 
                                                    $("#allclientsbodyholder").append(content); 
                                                });
                                        })

                                    });

                                });

                                // console.log(activeClientData)
                            });

                    }


                    // CREATE AND ACTIVE COLLECTION OF PATIENTS
                    // let activeClientId = firebase.firestore().collection("activeClients").doc();
                    // activeClientId.set({
                    //  activeClientUid:clientUserId,
                    //  hospitalWhereActive:user.uid,
                    //  insuranceCompanyName:companyId,
                    //  timeStamp:timeStamp,
                    //  activeClientId:activeClientId.id,
                    //  policyRequestId:policyRequestId
                    // }).then(() => {
                    //     alert("Auth State Changed")
                    // }).catch((error) => {

                    //     alert(error.message)
                    // })

                    // UPDATE ACTIVE CLIENT ON SNAPSHOT

                    // PULL ALL USERS WITH HEALTH POLICY WITH STATUS OF COMPLETE;

                    firebase.firestore().collection("policyrequests")
                        .where("status", "==", "complete")
                        .where("policyType", "==", "health")
                        .onSnapshot((querySnapshot) => {
                            querySnapshot.forEach((doc) => {

                                let coverPlan = doc.data().coverPlan;
                                let gender = doc.data().gender;
                                let userId = doc.data().userId;
                                let companyId = doc.data().companyId;
                                let policyRequestId = doc.data().policyRequest;

                                firebase.firestore().collection("users")
                                    .where("onStateChanged", "==", "active")
                                    .where("acttiveHospitalId", "==", user.uid)
                                    .where("userId", "==", userId)
                                    .onSnapshot((querySnapshot) => {
                                        querySnapshot.forEach((doc) => {

                                            let clientsName = doc.data().name;
                                            //    let onStateChanged = doc.data().onStateChanged
                                            let clientUserId = doc.data().userId;


                                            firebase.firestore().collection("insurancecompanies")
                                                .where("userId", "==", companyId)
                                                .get().then((querySnapshot) => {
                                                    let content = '';
                                                    querySnapshot.forEach((doc) => {

                                                        let insuranceCompanyName = doc.data().name;


                                                        let tobeCarriedId = companyId + "?" + clientUserId + "?" + policyRequestId;
                                                        

                                                        // activeClientData.push(tobeCarriedId);

                                                    content += `<tr>`     
                                                    content += `<td>${clientsName}</td>`        
                                                    content += `<td>${insuranceCompanyName}</td>`        
                                                    content += `<td>9878IHUIY67T76</td>`        
                                                    content += `<td><button onClick=viewmore(\`${tobeCarriedId}\`) class="btn btn-outline-success">View More<button/></td>`        
                                                    content += `</tr>`    

                                                    });

                                                    $("#allclientsbodyholder").append(content);

                                                });
                                        })

                                    });

                            });


                        });

                    window.viewmore = (value) => {
                        
                       
                       let activeClientuserDetails = value.split("?");

                       let activeClientUserId = activeClientuserDetails[1]
                       let activeClientRequestId = activeClientuserDetails[2]

                    //    console.log(activeClientUserId)
                        // UPDATE STATE OF THE USER TO ACTIVE AND VISITING;
                        firebase.firestore().collection("users")
                        // .where("onStateChanged", "==", "active")
                        .doc(activeClientUserId).update({
                            onStateChanged: "activeandprocessing",
                        }).then(() => {

                            window.location.href = "activeclients.html" + "?" + value;
                        })

                        

                    }
                } else {
                    window.location.href = "/index.html"
                }
            })

    } else {
        window.location.href = "/index.html"
    }
})