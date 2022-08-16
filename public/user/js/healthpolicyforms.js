firebase.auth().onAuthStateChanged((user) => {

    if(user) {

        
            // CLICK CONTROLS;

            var personaldetailscontrols = document.getElementById('personaldetailscontrols');
            var policydetailscontrols = document.getElementById('policydetailscontrols');
            var familydetailscontrols = document.getElementById('familydetailscontrols');
            var medicalhistorycontrols = document.getElementById('medicalhistorycontrols');


            // MEDICAL FORMS;

            var personaldetailsholder = document.getElementById('personaldetailsholder');
            var policyldetailsholder = document.getElementById('policyldetailsholder');
            var familystatusholder = document.getElementById('familystatusholder');
            var medicalhistoryholder = document.getElementById('medicalhistoryholder');


            // CLICK EVENTS;

            personaldetailscontrols.onclick = () => {
                personaldetailsholder.style.display = 'block'
                policyldetailsholder.style.display = 'none'
                familystatusholder.style.display = 'none'
                medicalhistoryholder.style.display = 'none'
            }

            policydetailscontrols.onclick = () => {
                policyldetailsholder.style.display = 'block'
                familystatusholder.style.display = 'none'
                medicalhistoryholder.style.display = 'none'
                personaldetailsholder.style.display = 'none'

            }

            familydetailscontrols.onclick = () => {
                familystatusholder.style.display = 'block'
                policyldetailsholder.style.display = 'none'
                medicalhistoryholder.style.display = 'none'
                personaldetailsholder.style.display = 'none'
            }

            medicalhistorycontrols.onclick = () => {
                medicalhistoryholder.style.display = 'block'
                familystatusholder.style.display = 'none'
                policyldetailsholder.style.display = 'none'
                personaldetailsholder.style.display = 'none'
            }

        // CHECK THE USERTYPE
        firebase.firestore().collection("users")
        .doc(user.uid).get().then((doc) => {

            let userType = doc.data().userType;

            if(userType === "user") {


                // ONCHANGE FUNCTION
                // CREATE A FILES ARRAY
                // const healthPolicyFiles = [];
                // let uploadFile = document.getElementById("file");
                // uploadFile.onchange = function(event) {

                //     let uploadsTask = event.target.files;

                //     for(var i = 0; i < uploadsTask.length; i++) {

                //         let uploadFiles = uploadFile.files[i];

                //         uploadFileAsPromise(uploadFiles);
                //     }
                // }

                // FUNCTION TO UPLOAD FILES;

                // function uploadFileAsPromise(uploadFiles) {

                //     // Get file type;
                //     console.log(uploadFiles);
                //     let getType = uploadFiles.type.split("/");
                //     let fileType = getType[1]

                //     if(fileType != "pdf") {
                //         alert("Files must be in pdf format")
                //     }
                //     else {

                //         let content = '';
                //         content +=  `<h6 style="font-size: 10px;">${uploadFiles.name}</h6>`
 
                //         $("#healthpolicyfilename").append(content);
                //         // CREATE A ROOT REF;
                //         let fileRef = firebase.storage().ref();
                //         // PUT FILE
                //         let uploadTask = fileRef.child("healthpolicyimages/").child(uploadFiles.name).put(uploadFiles);

                //         uploadTask.on('state_changed', (snapshot) => {

                //             let progress = Math.floor(snapshot.bytesTransferred/snapshot.totalBytes)*100;

                //             document.getElementById("progress").innerHTML = "Uploading...  " + progress + "%";

                //             if("Uploading...  " +  progress + "%" == "Uploading...  100%") {
                //                 document.getElementById("progress").style.display = "none"
                //             }
                //         },(err) => {
                //             alert(err.message);
                //         }, () => {

                //             uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

                //                 healthPolicyFiles.push(downloadURL);
                //                 console.log(healthPolicyFiles);
                //                 document.getElementById("uploadtext").style.display = "block"
                //                 alert("Files uploaded")
                //             })
                //         })
                //     }
                //     }

              
                document.getElementById('testing').onclick = () => {

                   let queryString = decodeURIComponent(window.location.search)
                    let carriedId = queryString.substring(1);
                    // alert(carriedId)
                    // INDIVIDUAL POLICY DETAILS;
                    let principlememberDob = document.getElementById('dob').value;
                    let holdername = document.getElementById('holdername').value;
                    // POLICY DETAILS;
                    let coverplan = document.getElementById('coverplan').value;
                    let coverType = document.getElementById('coverType').value;
                    // let inpatientandoutpatienttype = document.getElementById('inpatientandoutpatienttype').value;
                    let selectinpatientlimit = document.getElementById('selectinpatientlimit').value;
                    // let selectoutpatientlimit = document.getElementById('selectoutpatientlimit').value;
                    // let startdate = document.getElementById('startdate').value;
                    let enddate = document.getElementById('enddate').value;


                    

                    // FIRST DEPENDANT DETAILS;
                    var firstDependantArray = []
                    var secondDependantArray = []
                    var thirdDependantArray = []
                    var fourthDependantArray = []
                    var fifthDependantArray = []
                    var sixthDependantArray = []
                    var seventhDependantArray = []

                    var firstdependant = [...document.querySelectorAll('.firstdependant')];
                            
                            firstdependant.forEach((event) => {
                                var data = event.value;
                                console.log(data)
                                firstDependantArray.push(data);
                            })

                    // SECOND DEPENDANT DETAILS;
                     var secondependant = [...document.querySelectorAll('.secondependant')];
                            secondependant.forEach((event) => {
                                var data = event.value;
                                 console.log(data)
                                 secondDependantArray.push(data)
                            })
                    
                    //  THIRD DEPENDANT
                     var thriddependant = [...document.querySelectorAll('.thriddependant')];
                            thriddependant.forEach((event) => {
                                var data = event.value;
                                 console.log(data)
                                 thirdDependantArray.push(data)
                            })

                    // FOURTH DEPENDANT
                     var fourthdependant = [...document.querySelectorAll('.fourthdependant')];
                            fourthdependant.forEach((event) => {
                                var data = event.value;
                                 console.log(data)
                                 fourthDependantArray.push(data)
                            })       

                    // FIFITH DEPENDANT
                     var fifthdependant = [...document.querySelectorAll('.fifthdependant')];
                            fifthdependant.forEach((event) => {
                                var data = event.value;
                                 console.log(data)
                                 fifthDependantArray.push(data)
                            })
                    
                    // SIXTH DEPENDANT
                    
                     var sixthdependant = [...document.querySelectorAll('.sixthdependant')];
                    sixthdependant.forEach((event) => {
                        var data = event.value;
                         console.log(data)
                         sixthDependantArray.push(data)
                    })

                    // SEVENTH DEPENDANT;

                    var sevethdependant = [...document.querySelectorAll('.sevethdependant')];
                            sevethdependant.forEach((event) => {
                                var data = event.value;
                                console.log(data)
                                seventhDependantArray.push(data)
                        })


                let policyRequest =  firebase.firestore().collection("policyrequests").doc();
                   policyRequest.set({
                       userId:user.uid,
                       policyRequest:policyRequest.id,
                       dependants: firstDependantArray, secondDependantArray, thirdDependantArray,  fourthDependantArray, fifthDependantArray, sixthDependantArray, seventhDependantArray,
                       status: "pending",
                       companyId:carriedId,
                       policyType: "health",
                       coverType:coverType,
                       selectinpatientlimit:selectinpatientlimit,
                       principlememberDob:principlememberDob,
                       coverplan:coverplan,
                       holdername:holdername
                   }).then(() => {
                       alert("request sent!")

                    window.location.href = "../user/payment.html" + "?" + user.uid + "?" + policyRequest.id + "?" + carriedId
                   }).catch((error) => {
                       
                        alert(error.message)
                        // document.getElementById("healthBtn").style.display = "block";
                        // document.getElementById("submitting").style.display = "none";
                   })
                }
 

                // document.getElementById("healthBtn").onclick = () => {

                //    let queryString = decodeURIComponent(window.location.search)
                //     let carriedId = queryString.substring(1);
                //     // alert(carriedId)

                //     // GET ALL HTML ELEMENTS

                //     // PERSONAL DETAILS
                //     let holdername = document.getElementById('holdername').value;
                //     let phonenumber = document.getElementById('phonenumber').value;
                //     let worknumber = document.getElementById('worknumber').value;
                //     let pin = document.getElementById('pin').value;
                //     let postaladress = document.getElementById('postaladress').value;
                //     let postalcode = document.getElementById('postalcode').value;
                //     let town = document.getElementById('town').value;
                //     let email = document.getElementById('email').value;
                //     let IdNo = document.getElementById('IdNo').value;
                //     let maritalstatus = document.getElementById('maritalstatus').value;
                //     let weight = document.getElementById('weight').value;
                //     let height = document.getElementById('height').value;
                //     let gender = document.getElementById('gender').value;           
                //     let dob = document.getElementById('holdername').value;

                    



                //         document.getElementById("healthBtn").style.display = "none";
                //         document.getElementById("submitting").style.display = "block";
                //                     // SEND REQUEST TO FIREBASE

                    
                // }
            }
            else {

                window.location.href = "/login.html"

            }
        })
    }
    else {
        window.location.href = "/login.html"
    }
})