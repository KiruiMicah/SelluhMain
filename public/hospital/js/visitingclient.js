firebase.auth().onAuthStateChanged((user) => {
    if(user) {

        // DECODE URI COMPNONENT;

        // CHECK THE USERTYPE;
        firebase.firestore().collection("users")
        .doc(user.uid).get().then((doc) => {

            let userType = doc.data().userType;
            let hospitalName = doc.data().name;

            if(userType === "hospital") {

                let queryString = decodeURIComponent(window.location.search);

                let receivedData = queryString.substring(1).split(",");
                
               
                let companyId = receivedData[0];
                
                let userId = receivedData[1];
                
                let policyRequestId = receivedData[2]


                firebase.firestore().collection("users")
                .where("onStateChanged","==","activeandvisiting")
                .where("userId","==",userId)
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let name = doc.data().name;
                        let timeStamp = doc.data().visitingTimeStamp;
                        let visitingTime = timeStamp.toDate(new Date).toDateString();
                        let date = visitingTime.toString()
                        let activeClient = doc.data().activeClient;
        
                        document.getElementById('nameOfClient').innerHTML = name;
                        document.getElementById('hospitalName').innerHTML = hospitalName;
                        document.getElementById("cooppatientsName").innerHTML = activeClient;
                    document.getElementById("patientsname").innerHTML = activeClient;
                        // / pull insurance
                        firebase.firestore().collection("users")
                        .doc(companyId).get().then((doc) => {
                        
                        let companyName = doc.data().name
                        let content = '';
                        content += `<tr>` 
                        content += `<td>${name}</td>`    
                        content += `<td>${companyName}</td>`    
                        content += `<td>${date}</td>`    
                        content += `<td>VISITING</td>`    
                        content += `<td><button onClick="dishargeClient(\`${receivedData}\`)" data-bs-target="#claimform" data-bs-toggle="modal" class="btn btn-outline-primary">Discharge</button></td>`    
                        content += `<td><button onClick="preAuthModal(\`${receivedData}\`)"data-bs-target="#preauthforms" data-bs-toggle="modal" class="btn btn-outline-primary">Ind Pre-Auth </button></td>`    
                        content += `<td><button onClick="corporatePreAuth(\`${receivedData}\`)" data-bs-target="#corporatePreAuth" data-bs-toggle="modal" class="btn btn-outline-primary">Coop Pre-Auth</button></td>`
                        content += `</tr>` 
        
                        $("#visitingClientData").append(content);
                        })  
                    })
                })

                // PULL ALL POLICY REQUESTS
                firebase.firestore().collection('policyrequests')
                .where("userId","==",userId)
                .where("status","==","complete")
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let policyRequest = doc.data().policyRequest
                        let policyBalance = parseInt(doc.data().policyBalance); 

                                        // display disharge modal;
        
                window.dishargeClient = (value) => {
        
                    document.getElementById("submitClaimBtn").onclick = () => {
        
                        // GET ELEMNTS FROM MODAL;
                    let receivedData = value.split(",");
                    let insuranceId = receivedData[0];
                    let userId = receivedData[1];
                   
                    
                    let diagnosis = document.getElementById('diagnosis').value;
                    let timeSufferedAilment = document.getElementById('timeSufferedAilment').value;
                    let natureOfTreatment = document.getElementById('natureOfTreatment').value;
                    let dischargeTime = firebase.firestore.Timestamp.fromDate(new Date());
                    let consulatationFee = parseInt(document.getElementById('consulatationFee').value) ;
                    let labTestsFee = document.getElementById('labTestsFee').value;
                    let medicineFee = document.getElementById('medicineFee').value;

                    // convert to number;
                    let consulationAmount = parseInt(consulatationFee);
                    let labTestsAmount = parseInt(labTestsFee);
                    let medicineAmount = parseInt(medicineFee);

                    let totalCosts = consulationAmount + labTestsAmount + medicineAmount

                    let newBalance = policyBalance  - totalCosts
                        // CREATE A NEW COLLECTION OF CLIAMS AND LOG OUT USER;

                    if(diagnosis === '') {
                        alert('Please add diagnosis')
                    }
                    else if(natureOfTreatment === ''){
                        alert('Please add nature of treatment!')
                    }
                    else if(timeSufferedAilment === ''){
                        alert('Period of ailment')
                    }
                    else if(consulatationFee === ''){
                        alert('Please add consulation fee')
                    }
                    else if(labTestsFee === ''){
                        alert('Please add labtest fee')
                    }
                    else if(medicineFee === ''){
                        alert('Please add medicine fee')
                    }
                    else {
                        document.getElementById('submittingClaim').style.display = 'block';
                        document.getElementById('submitClaimBtn').style.display = 'none';

                        let claimId = firebase.firestore().collection('claims').doc();
                        claimId.set({
                            hospitalId:user.uid,
                            insuranceId:insuranceId,
                            patientId:userId,
                            diagnosis:diagnosis,
                            timeSufferedAilment:timeSufferedAilment,
                            natureOfTreatment:natureOfTreatment,
                            dischargeTime:dischargeTime,
                            claimId:claimId.id,
                            accountCosts:totalCosts,
                            timeStamp: firebase.firestore.Timestamp.fromDate(new Date()),
                            status:'pending',
                            reason:'',
                            patientsCosts:[{
                                consulationAmount:consulationAmount,
                                labTestsAmount:labTestsAmount,
                            medicineAmount:medicineAmount,
                            
                            
                        }]
                        }).then(() => {
                            
                            alert('Claim form submitted...')
                            // AWAIT DISHARGE!
                            firebase.firestore().collection('users')
                            .doc(userId).update({
                                onStateChanged:'awaitingdischarge'
                            }).then(() => {
                                // update balance
                                firebase.firestore().collection('policyrequests')
                                .doc(policyRequest).update({
                                    policyBalance:policyBalance
                                }).then(() => {
                                       alert('Patient awaiting discharge!')
                                // window.location.href = 'visitingclient.html'
                                document.getElementById('submittingClaim').style.display = 'none';
                                document.getElementById('submitClaimBtn').style.display = 'block';
                                }).catch((error) => {
                                    alert(error.message)
                                })
                            })
                            .then(() => {
                             
                            }).catch((error) => {
                                alert(error.message);
                            })
                            
                        }).catch((error) => {
                            alert(error.message);
                            
                            document.getElementById('submittingClaim').style.display = 'none';
                            document.getElementById('submitClaimBtn').style.display = 'block';
                        })
                    }

                    }
                }
                    })
                })
        



                // pre-auth forms;
                window.preAuthModal = (value) => {

                    // alert(value)
                    let companyId = value.split(',')[0]
                    let patientsId = value.split(',')[1]
                    let policyId = value.split(',')[2]

                //    invoke the database;
                // get companydetails;
                firebase.firestore().collection('users')
                .doc(user.uid).get().then((doc) => {

                    let hosiName = doc.data().name;
                    
                    // document.getElementById("hosiName").innerHTML = hosiName;

                    // alert(companyId)
                // get userdetails;
                firebase.firestore().collection('users')
                
                .doc(companyId).get().then((doc) => {

                    
                    let phoneNum = doc.data().phoneNum;
                    
                    
                  
                    document.getElementById("userphonenumber").innerHTML = phoneNum;
                })

                    // set a preauth collection

                    document.getElementById('individualSubmit').onclick = () => {
                        // alert('clicked')
                        
                        let clinicalSummary = document.getElementById('clinicalSummary').value
                        let timeStamp = firebase.firestore.Timestamp.fromDate(new Date());

                          let preAuthDoc = firebase.firestore().collection("preauths").doc();
                    preAuthDoc.set({
                        preAuthDocId:preAuthDoc.id,
                        hospitalId:user.uid,
                        patientsId:patientsId,
                        clinicalSummary:clinicalSummary,
                        timeStamp:timeStamp,
                        status:'pending',
                        preAuthType:'individual',
                        reason:''
                    }).then(() => {
                        alert('Preauthentication sent')
                         window.location.href = "visitingclient.html" + "?" + companyId + ',' + userId + ',' + policyRequestId
                    }).catch((error) => {
                        console.log(error.message)
                    })
                    }

                })

                }

                  // Cooperate-preAuth
                    window.corporatePreAuth = (value) => {

                          let companyId = value.split(',')[0]
                          let patientsId = value.split(',')[1]
                          let policyId = value.split(',')[2]

                firebase.firestore().collection('users')
                .doc(user.uid).get().then((doc) => {

                    let hosiName = doc.data().name;
                    
                   
                    document.getElementById("hosiiName").innerHTML = hosiName;

                    
                // get userdetails;
                firebase.firestore().collection('users')
                .doc(companyId).get().then((doc) => {

                    let patientsName = doc.data().name;
                    let phoneNum = doc.data().phoneNum;
                    
                    document.getElementById("patientssname").innerHTML = patientsName;
                    document.getElementById("userphonenumber").innerHTML = phoneNum;
                })

                    // set a preauth collection

                    document.getElementById('coopsubmitpreauth').onclick = () => {

                        // alert('clicked')
                        let clinicalSummary = document.getElementById('clinicalSummary').value
                        let timeStamp = firebase.firestore.Timestamp.fromDate(new Date());

                          let preAuthDoc = firebase.firestore().collection("preauths").doc();
                    preAuthDoc.set({
                        preAuthDocId:preAuthDoc.id,
                        hospitalId:user.uid,
                        patientsId:patientsId,
                        clinicalSummary:clinicalSummary,
                        timeStamp:timeStamp,
                        status:'pending',
                        preAuthType:'individual',
                        reason:''
                    }).then(() => {
                        alert('Preauthentication sent')
                        window.location.href = "visitingclient.html" + "?" + companyId + ',' + userId + ',' + policyRequestId
                    }).catch((error) => {
                        console.log(error.message)
                    })
                    }

                })
                            
                        
                    }
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