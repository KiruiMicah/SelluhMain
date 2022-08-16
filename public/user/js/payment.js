firebase.auth().onAuthStateChanged((user) => {

    
    if(user) {

            firebase.firestore().collection("users").doc(user.uid)
      .get().then((doc) => {
        
        let userType = doc.data().userType;
  
        if(userType == "user") {
        // pull all requests;

        firebase.firestore().collection('policyrequests')
        .where("status","==","pending")
        .where("userId","==",user.uid)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                let currentYear = new Date().getFullYear();
                let principleDob = doc.data().principlememberDob.split('-')[0]
                let firstdependants = doc.data().dependants;
                let selectinpatientlimit = parseInt(doc.data().selectinpatientlimit);
                let policyRequest = doc.data().policyRequest;
                let secondependants = doc.data().secondDependantArray;
                let threedependants = doc.data().thirdDependantArray;
                let fourthdependants = doc.data().fourthDependantArray;
                let fivedependants = doc.data().fifthDependantArray;
                let sixthdependants = doc.data().sixthDependantArray;
                let seventhdependants = doc.data().seventhDependantArray;
                let coverplan = doc.data().coverplan;
                let companyId = doc.data().companyId
                // PRINCIPLE MEMEBERS AGE;

                // alert(policyRequest)
                let principleMemberAge = currentYear - principleDob;


                // WHERE COVERPLAN IS FAMILY

                if(coverplan == 'Family') {
                // PRINCIPLE MEMEBERS PREMIUM;
                if(selectinpatientlimit === 500000 && principleMemberAge >=18 && principleMemberAge <= 29) {
                    var principlePremium = 19018
                   
                }
                else if(selectinpatientlimit === 500000 && principleMemberAge >= 30 && principleMemberAge <= 40){
                    var principlePremium = 21957
                    
                }
                else if(selectinpatientlimit === 500000 && principleMemberAge >= 41 && principleMemberAge <= 50){
                    var principlePremium = 23157
                    
                }
              else if(selectinpatientlimit === 500000 && principleMemberAge >= 51 && principleMemberAge <= 64) {
                    var principlePremium = 25473
                    
              }

                if(selectinpatientlimit === 1000000 && principleMemberAge >=18 && principleMemberAge <= 29) {
                    var principlePremium = 22776
                   
                }
                else if(selectinpatientlimit === 1000000 && principleMemberAge >= 30 && principleMemberAge <= 40){
                    var principlePremium = 23957
                    
                }
                else if(selectinpatientlimit === 1000000 && principleMemberAge >= 41 && principleMemberAge <= 50){
                    var principlePremium = 24860
                    
                }
              else if(selectinpatientlimit === 1000000 && principleMemberAge >= 51 && principleMemberAge <= 64) {
                    var principlePremium = 32374
                    
              }

                if(selectinpatientlimit === 2000000 && principleMemberAge >=18 && principleMemberAge <= 29) {
                    var principlePremium = 26503
                    
                }
                else if(selectinpatientlimit === 2000000 && principleMemberAge >= 30 && principleMemberAge <= 40){
                    var principlePremium = 27703
                    
                }
                else if(selectinpatientlimit === 2000000 && principleMemberAge >= 41 && principleMemberAge <= 50){
                    var principlePremium = 34860
                   
                }
              else if(selectinpatientlimit === 2000000 && principleMemberAge >= 51 && principleMemberAge <= 64) {
                    var principlePremium = 43391
                    
              }

            if(selectinpatientlimit === 3000000 && principleMemberAge >=18 && principleMemberAge <= 29) {
                var principlePremium = 30778
                
            }
            else if(selectinpatientlimit === 3000000 && principleMemberAge >= 30 && principleMemberAge <= 40){
                var principlePremium = 33373
                
            }
            else if(selectinpatientlimit === 3000000 && principleMemberAge >= 41 && principleMemberAge <= 50){
                var principlePremium = 41279
                
            }
            else if(selectinpatientlimit === 3000000 && principleMemberAge >= 51 && principleMemberAge <= 64) {
                var principlePremium = 45242
                
            }

            if(selectinpatientlimit === 5000000 && principleMemberAge >=18 && principleMemberAge <= 29) {
                var principlePremium = 35980
                
            }
            else if(selectinpatientlimit === 5000000 && principleMemberAge >= 30 && principleMemberAge <= 40){
                var principlePremium = 38789
                
            }
            else if(selectinpatientlimit === 5000000 && principleMemberAge >= 41 && principleMemberAge <= 50){
                var principlePremium = 43140
                
            }
            else if(selectinpatientlimit === 5000000 && principleMemberAge >= 51 && principleMemberAge <= 64) {
                var principlePremium = 57420
                
            }

            

                // FIRST DEPENDANT PREMIUM;
            if(selectinpatientlimit === 500000 && principleMemberAge >=18 && principleMemberAge <= 29) {
               
                 var spousePremium = 11377
            }
            else if(selectinpatientlimit === 500000 && principleMemberAge >= 30 && principleMemberAge <= 40){
               
                var spousePremium = 13136
            }
            else if(selectinpatientlimit === 500000 && principleMemberAge >= 41 && principleMemberAge <= 50){
               var spousePremium = 16248
            }
            else if(selectinpatientlimit === 500000 && principleMemberAge >= 51 && principleMemberAge <= 64) {
                var spousePremium = 18940
            }


                if(selectinpatientlimit === 1000000 && principleMemberAge >=18 && principleMemberAge <= 29) {
                   
                   var spousePremium = 14774
               }
               else if(selectinpatientlimit === 1000000 && principleMemberAge >= 30 && principleMemberAge <= 40){
                   
                   var spousePremium = 17057
               }
               else if(selectinpatientlimit === 1000000 && principleMemberAge >= 41 && principleMemberAge <= 50){
                  
                   var spousePremium = 18295
               }
             else if(selectinpatientlimit === 1000000 && principleMemberAge >= 51 && principleMemberAge <= 64) {
                  
                   var spousePremium = 26926
             }

            
            if(selectinpatientlimit === 2000000 && principleMemberAge >=18 && principleMemberAge <= 29) {
                
                var spousePremium = 19710
            }
            else if(selectinpatientlimit === 2000000 && principleMemberAge >= 30 && principleMemberAge <= 40){
               
                var spousePremium = 21660
            }
            else if(selectinpatientlimit === 2000000 && principleMemberAge >= 41 && principleMemberAge <= 50){
                
                var spousePremium = 26505
            }
            else if(selectinpatientlimit === 2000000 && principleMemberAge >= 51 && principleMemberAge <= 64) {
                
                var spousePremium = 35940
            }

            if(selectinpatientlimit === 3000000 && principleMemberAge >=18 && principleMemberAge <= 29) {
              
                var spousePremium = 25931
            }
            else if(selectinpatientlimit === 3000000 && principleMemberAge >= 30 && principleMemberAge <= 40){
                
                var spousePremium = 28626
            }
            else if(selectinpatientlimit === 3000000 && principleMemberAge >= 41 && principleMemberAge <= 50){
               
                var spousePremium = 33695
            }
            else if(selectinpatientlimit === 3000000 && principleMemberAge >= 51 && principleMemberAge <= 64) {
               
                var spousePremium = 37224
            }


            if(selectinpatientlimit === 5000000 && principleMemberAge >=18 && principleMemberAge <= 29) {
               
                var spousePremium = 30284
            }
            else if(selectinpatientlimit === 5000000 && principleMemberAge >= 30 && principleMemberAge <= 40){
                
                var spousePremium = 33805
            }
            else if(selectinpatientlimit === 5000000 && principleMemberAge >= 41 && principleMemberAge <= 50){
                
                var spousePremium = 36190
            }
            else if(selectinpatientlimit === 5000000 && principleMemberAge >= 51 && principleMemberAge <= 64) {
               
                var spousePremium = 48240
            }
            
            // SECOND DEPENDANT PREMIUM;
               let seconddependantage = secondependants[3].split('-')[0]
               let seconddependantrelation = secondependants[5]
               let seconddependantyears = currentYear - seconddependantage
            
               
            if(selectinpatientlimit === 500000 && principleMemberAge >=18 && principleMemberAge <= 64 && seconddependantyears <= 21) {
                var seconddependantPremium = 5800
            }
            else if(selectinpatientlimit === 1000000 && principleMemberAge >=18 && principleMemberAge <= 64 && seconddependantyears <= 21) {
                var seconddependantPremium = 10593
            }
            else if(selectinpatientlimit === 2000000 && principleMemberAge >=18 && principleMemberAge <= 64 && seconddependantyears <= 21) {
                var seconddependantPremium = 12119
            }
            else if(selectinpatientlimit === 3000000 && principleMemberAge >=18 && principleMemberAge <= 64 && seconddependantyears <= 21) {
                var seconddependantPremium = 17900
            }
            else if(selectinpatientlimit === 5000000 && principleMemberAge >=18 && principleMemberAge <= 64 && seconddependantyears <= 21) {
                var seconddependantPremium = 18260
            }
               
            
            // THIRD DEPENDANT PREMIUM;
            let thriddependantage = threedependants[3].split('-')[0]
            let thirddependantrelation = threedependants[5]
            let thirddependantyears = currentYear - thriddependantage

            if(selectinpatientlimit === 500000 && principleMemberAge >=18 && principleMemberAge <= 64 && thirddependantyears <= 21) {
                var thirddependantPremium = 5800
            }
            else if(selectinpatientlimit === 1000000 && principleMemberAge >=18 && principleMemberAge <= 64 && thirddependantyears <= 21) {
                var thirddependantPremium = 10593
            }
            else if(selectinpatientlimit === 2000000 && principleMemberAge >=18 && principleMemberAge <= 64 && thirddependantyears <= 21) {
                var thirddependantPremium = 12119
            }
            else if(selectinpatientlimit === 3000000 && principleMemberAge >=18 && principleMemberAge <= 64 && thirddependantyears <= 21) {
                var thirddependantPremium = 17900
            }
            else if(selectinpatientlimit === 5000000 && principleMemberAge >=18 && principleMemberAge <= 64 && thirddependantyears <= 21) {
                var thirddependantPremium = 18260
            }
            
               
            let fourthdependantage = fourthdependants[3].split('-')[0]
            let fourthdependantrelation = fourthdependants[5]
            let fourthdependantyears = currentYear - fourthdependantage

            if(selectinpatientlimit === 500000 && principleMemberAge >=18 && principleMemberAge <= 64 && fourthdependantyears <= 21) {
                var fourthdependantPremium = 5800
            }
            else if(selectinpatientlimit === 1000000 && principleMemberAge >=18 && principleMemberAge <= 64 && fourthdependantyears <= 21) {
                var fourthdependantPremium = 10593
            }
            else if(selectinpatientlimit === 2000000 && principleMemberAge >=18 && principleMemberAge <= 64 && fourthdependantyears <= 21) {
                var fourthdependantPremium = 12119
            }
            else if(selectinpatientlimit === 3000000 && principleMemberAge >=18 && principleMemberAge <= 64 && fourthdependantyears <= 21) {
                var fourthdependantPremium = 17900
            }
            else if(selectinpatientlimit === 5000000 && principleMemberAge >=18 && principleMemberAge <= 64 && fourthdependantyears <= 21) {
                var fourthdependantPremium = 18260
            }
               
            let fifthdependantage = fivedependants[3].split('-')[0]
            let fifthdependantrelation = fivedependants[5]
            let fifthdependantyears = currentYear - fifthdependantage

            if(selectinpatientlimit === 500000 && principleMemberAge >=18 && principleMemberAge <= 64 && fifthdependantyears <= 21) {
                var fifthdependantPremium = 5800
            }
            else if(selectinpatientlimit === 1000000 && principleMemberAge >=18 && principleMemberAge <= 64 && fifthdependantyears <= 21) {
                var fifthdependantPremium = 10593
            }
            else if(selectinpatientlimit === 2000000 && principleMemberAge >=18 && principleMemberAge <= 64 && fifthdependantyears <= 21) {
                var fifthdependantPremium = 12119
            }
            else if(selectinpatientlimit === 3000000 && principleMemberAge >=18 && principleMemberAge <= 64 && fifthdependantyears <= 21) {
                var fifthdependantPremium = 17900
            }
            else if(selectinpatientlimit === 5000000 && principleMemberAge >=18 && principleMemberAge <= 64 && fifthdependantyears <= 21) {
                var fifthdependantPremium = 18260
            }                
               

            // SIXTH DEPENDANT PREMIUM
            let sixthdependantage = sixthdependants[3].split('-')[0]
            let sixthdependantrelation = sixthdependants[5]
            let sixthdependantyears = currentYear - sixthdependantage

            if(selectinpatientlimit === 500000 && principleMemberAge >=18 && principleMemberAge <= 64 && sixthdependantyears <= 21) {
                var sixthdependantPremium = 5800
            }
            else if(selectinpatientlimit === 1000000 && principleMemberAge >=18 && principleMemberAge <= 64 && sixthdependantyears <= 21) {
                var sixthdependantPremium = 10593
            }
            else if(selectinpatientlimit === 2000000 && principleMemberAge >=18 && principleMemberAge <= 64 && sixthdependantyears <= 21) {
                var sixthdependantPremium = 12119
            }
            else if(selectinpatientlimit === 3000000 && principleMemberAge >=18 && principleMemberAge <= 64 && sixthdependantyears <= 21) {
                var sixthdependantPremium = 17900
            }
            else if(selectinpatientlimit === 5000000 && principleMemberAge >=18 && principleMemberAge <= 64 && sixthdependantyears <= 21) {
                var sixthdependantPremium = 18260
            }                
               
            // SEVENTH DEPENDANT PREMIUM
            let seventhdependantage = seventhdependants[3].split('-')[0]
            let seventhdependantrelation = seventhdependants[5]
            let seventhdependantyears = currentYear - seventhdependantage

            if(selectinpatientlimit === 500000 && principleMemberAge >=18 && principleMemberAge <= 64 && seventhdependantyears <= 21) {
                var seventhdependantPremium = 5800
            }
            else if(selectinpatientlimit === 1000000 && principleMemberAge >=18 && principleMemberAge <= 64 && seventhdependantyears <= 21) {
                var seventhdependantPremium = 10593
            }
            else if(selectinpatientlimit === 2000000 && principleMemberAge >=18 && principleMemberAge <= 64 && seventhdependantyears <= 21) {
                var seventhdependantPremium = 12119
            }
            else if(selectinpatientlimit === 3000000 && principleMemberAge >=18 && principleMemberAge <= 64 && seventhdependantyears <= 21) {
                var seventhdependantPremium = 17900
            }
            else if(selectinpatientlimit === 5000000 && principleMemberAge >=18 && principleMemberAge <= 64 && seventhdependantyears <= 21) {
                var seventhdependantPremium = 18260
            }                
           
            // CALCULATE TOTAL IN-PATIENT PREMIUM;

            if(spousePremium == undefined){
                var spousePremiumValue = 0
            }
            else{
                var spousePremiumValue = spousePremium
            }

            if(seconddependantPremium == undefined){
                var seconddependantPremium = 0
            }
            else {
                var seconddependantPremiumValue = seconddependantPremium
            }

            if(thirddependantPremium == undefined){
                var thirddependantPremiumValue = 0
            }
            else {
                var thirddependantPremiumValue = thirddependantPremium
            }

            if(fourthdependantPremium == undefined){
                var fourthdependantPremiumValue = 0
            }
            else {
                var fourthdependantPremiumValue = fourthdependantPremium
            }

            if(fifthdependantPremium == undefined){
                var fifthdependantPremiumValue = 0
            }
            else {
                var fifthdependantPremiumValue = fifthdependantPremium
            }

            if(sixthdependantPremium == undefined){
                var sixthdependantPremiumValue = 0
            }
            else {
                var sixthdependantPremiumValue = sixthdependantPremium
            }

            if(seventhdependantPremium == undefined){
                var seventhdependantPremiumValue = 0
            }
            else {
                var seventhdependantPremiumValue = seventhdependantPremium
            }
            
            var totalInPatientPremium = principlePremium + 
            spousePremiumValue + seconddependantPremiumValue 
            +thirddependantPremiumValue + fourthdependantPremiumValue + fifthdependantPremiumValue + sixthdependantPremiumValue + seventhdependantPremiumValue


            document.getElementById('yearlypay').innerHTML = totalInPatientPremium
                }

                // INDIVIDUAL COVERPLAN

                if(coverplan == 'Individual'){
                if(selectinpatientlimit === 500000 && principleMemberAge >=18 && principleMemberAge <= 29) {
                    var principlePremium = 19018
                   
                   
                }
                else if(selectinpatientlimit === 500000 && principleMemberAge >= 30 && principleMemberAge <= 40){
                    var principlePremium = 21957
                    
                }
                else if(selectinpatientlimit === 500000 && principleMemberAge >= 41 && principleMemberAge <= 50){
                    var principlePremium = 23157
                    
                }
              else if(selectinpatientlimit === 500000 && principleMemberAge >= 51 && principleMemberAge <= 64) {
                    var principlePremium = 25473
                    
              }

                if(selectinpatientlimit === 1000000 && principleMemberAge >=18 && principleMemberAge <= 29) {
                    var principlePremium = 22776
                   
                }
                else if(selectinpatientlimit === 1000000 && principleMemberAge >= 30 && principleMemberAge <= 40){
                    var principlePremium = 23957
                    
                }
                else if(selectinpatientlimit === 1000000 && principleMemberAge >= 41 && principleMemberAge <= 50){
                    var principlePremium = 24860
                    
                }
              else if(selectinpatientlimit === 1000000 && principleMemberAge >= 51 && principleMemberAge <= 64) {
                    var principlePremium = 32374
                    
              }

                if(selectinpatientlimit === 2000000 && principleMemberAge >=18 && principleMemberAge <= 29) {
                    var principlePremium = 26503
                    
                }
                else if(selectinpatientlimit === 2000000 && principleMemberAge >= 30 && principleMemberAge <= 40){
                    var principlePremium = 27703
                    
                }
                else if(selectinpatientlimit === 2000000 && principleMemberAge >= 41 && principleMemberAge <= 50){
                    var principlePremium = 34860
                   
                }
              else if(selectinpatientlimit === 2000000 && principleMemberAge >= 51 && principleMemberAge <= 64) {
                    var principlePremium = 43391
                    
              }

            if(selectinpatientlimit === 3000000 && principleMemberAge >=18 && principleMemberAge <= 29) {
                var principlePremium = 30778
                
            }
            else if(selectinpatientlimit === 3000000 && principleMemberAge >= 30 && principleMemberAge <= 40){
                var principlePremium = 33373
                
            }
            else if(selectinpatientlimit === 3000000 && principleMemberAge >= 41 && principleMemberAge <= 50){
                var principlePremium = 41279
                
            }
            else if(selectinpatientlimit === 3000000 && principleMemberAge >= 51 && principleMemberAge <= 64) {
                var principlePremium = 45242
                
            }

            if(selectinpatientlimit === 5000000 && principleMemberAge >=18 && principleMemberAge <= 29) {
                var principlePremium = 35980
                
            }
            else if(selectinpatientlimit === 5000000 && principleMemberAge >= 30 && principleMemberAge <= 40){
                var principlePremium = 38789
                
            }
            else if(selectinpatientlimit === 5000000 && principleMemberAge >= 41 && principleMemberAge <= 50){
                var principlePremium = 43140
                
            }
            else if(selectinpatientlimit === 5000000 && principleMemberAge >= 51 && principleMemberAge <= 64) {
                var principlePremium = 57420
                
            }

             var totalInPatientPremium = principlePremium;
            document.getElementById('yearlypay').innerHTML = totalInPatientPremium
                }
            
          
            // document.getElementById('mothlypay').innerHTML = (totalInPatientPremium / 12)

            // DISPALY INFO ONN THE FRONT END UPDATING TO THE DB

                 let queryString = decodeURIComponent(window.location.search);
          
                 let carriedId = queryString.substring(1)
                 let splitIds = carriedId.split("?")
          
          
                 let requestUserId = splitIds[0];
                 let policyRequestId = splitIds[1];
                 let requestcompanyId = splitIds[2];

                
            document.getElementById('proceedtopay').onclick = () => {

                if(requestcompanyId == companyId && policyRequest == policyRequestId){
                

                // UPDATE STATUS IN OF REQUEST
                firebase.firestore().collection("policyrequests")
                .doc(policyRequest).update({
                  status:"complete",
                  policyBalance:selectinpatientlimit
                }).then(() => {
                  alert("Policy purchased!")
                  window.location.href = "../user/policycard.html"
                }).catch((error) => {
                  alert(error.message)
                })     
                
            }
            }
  
  
            })

        })
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