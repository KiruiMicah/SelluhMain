firebase.auth().onAuthStateChanged((user) => {
    if(user) {

        // PULL ALL USERS WITH A PURCHASED POLICY INORDER TO CHECK BALANCE;

        // DECODE URI COMPONENT;
        let queryString = decodeURIComponent(window.location.search);
        let recievedData = queryString.split('?');
        // console.log(recievedData);

        let companyId = recievedData[1];
        let userId = recievedData[2];
        let policyRequestId = recievedData[3];

        const visitingData = [];

        visitingData.push(companyId, userId, policyRequestId);
        // console.log(policyRequestId);

        firebase.firestore().collection("policyrequests")
        .doc(policyRequestId).get().then((doc) => {
            
            let coverType = doc.data().coverType;
            let principlememberDob = doc.data().principlememberDob;
            let policyBalance = doc.data().policyBalance;
            let dependants = doc.data().dependants;
            let firstdependants = doc.data().dependants;
            let secondependants = doc.data().secondDependantArray;
            let thirdependant = doc.data().thirdDependantArray;
            let fourthdependant = doc.data().fourthDependantArray;
            let fifthdependant = doc.data().fifthDependantArray;
            let sixthdependant = doc.data().sixthDependantArray;
            let seventhdependant = doc.data().seventhDependantArray;
            let holdername = doc.data().holdername();
            // BAKANCES;
            if(policyBalance >= 2000){
                document.getElementById('activebalance').innerHTML = 'Active'
                document.getElementById('activebalance1').innerHTML = 'Active'
                document.getElementById('activebalance2').innerHTML = 'Active'
            }
            
            // let firstName = dependants[0]
            let secondName = firstdependants[0]
            let thirdName = secondependants[0]
            let fourthName = thirdependant[0]
            let fifthName = fourthdependant[0]
            let sixthName = fifthdependant[0]
            let seventhName = sixthdependant[0]

            let seconddob = firstdependants[3]
            let thirddob = secondependants[3]
            let fourthdob = thirdependant[3]
            let fifthdob = fourthdependant[3]
            let sixthdob = fifthdependant[3]
            let seventhdob = sixthdependant[3]
            
            alert(holdername)
            let content = ``;
            // content += `<option value="${firstName}">${firstName}</option>`
            content += `<option value="${holdername}">${holdername}</option>`
            content += `<option value="${secondName}">${secondName}</option>`
            content += `<option value="${thirdName}">${thirdName}</option>`
            content += `<option value="${fourthName}">${fourthName}</option>`
            content += `<option value="${fifthName}">${fifthName}</option>`
            content += `<option value="${sixthName}">${sixthName}</option>`
            content += `<option value="${seventhName}">${seventhName}</option>`

            $("#patienttobehospitalised").append(content);


            // PULL ALL BENEFICIARIES DETAILS;
            content = ``
            content += `<tr>`
            content += `<td>${secondName}</td>`        
            content += `<td>${seconddob}</td>`        
            content += `<td>40</td>`        
            content += `</tr> `   
            
            content += `<tr>`
            content += `<td>${thirdName}</td>`        
            content += `<td>${thirddob}</td>`        
            content += `<td>40</td>`        
            content += `</tr> ` 


            content += `<tr>`
            content += `<td>${fourthName}</td>`        
            content += `<td>${fourthdob}</td>`        
            content += `<td>40</td>`        
            content += `</tr> ` 

    
            $("#allbeneficiaries").append(content);    

            // PULL USERS;

            firebase.firestore().collection("users")
            .doc(userId).get().then((doc) => {
                
                let name = doc.data().name;
                // alert(name);
                let content = '';
            content += `<td>${name}</td>`   
            content += `<td>${coverType}</td>`    
            content += `<td>JY8Y7890</td>`    
            content += `<td>${principlememberDob}</td>`    

            $("#clientDetails").append(content);


            })
            
        });

        document.getElementById('startvisit').onclick = () => {

        document.getElementById('startingvisit').style.display = 'block';    
        document.getElementById('startvisit').style.display = 'none';    
            let value = visitingData;

            let activeclientId = visitingData[1];
            let visitingTimeStamp = firebase.firestore.Timestamp.fromDate(new Date());
            let activeClient = document.getElementById('patienttobehospitalised').value;
            // UPDATE CLIENT TO VISITING;
            firebase.firestore().collection('users')
            .doc(activeclientId).update({
                onStateChanged: 'activeandvisiting',
                visitingTimeStamp:visitingTimeStamp,
                activeClient:activeClient
            }).then(() => {
                alert('updated');
                window.location.href = "visitingclient.html" + "?" + value;
            }).catch((error) => {
                alert(error.message);
                document.getElementById('startingvisit').style.display = 'none';    
                document.getElementById('startvisit').style.display = 'block';    
            })
              
        }
    }
    else {
        window.location.href = "/login.html"
    }
})