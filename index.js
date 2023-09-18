const button = document.querySelector("button");




var siteHost = 'http://localhost:3001/sites/';  
var examHostpwr = 'http://localhost:3001/pwr/';
var examHostbwr = 'http://localhost:3001/bwr/';  

button.addEventListener('click', async ()=> {

    var examQuery = '';

    // Get the selected site flags:
    var siteSelected = document.querySelector("select");
    console.log(siteSelected.options[siteSelected.selectedIndex]);

    let queryUrl = siteHost + siteSelected.options[siteSelected.selectedIndex].value;
    console.log(queryUrl);

    const firstResponse = await Promise.all([
        axios({

            url: queryUrl,
            method: 'get',
            
        })
        .then(response => {
            
            // If the response is good, let's update the page with the results:
            console.log(response);

            // Store the site flags based on whether the site is a BWR or a PWR:
            var siteName = response.data.siteData.PlantName;
            var siteRxType = response.data.siteData.ReactorType;

            if (siteRxType === "B") {//  If it is a BWR, store the correct flags and call the BWR exam topic generator function
                var markIIIflag = response.data.siteData.MarkIIIflag;
                var containmentType = response.data.siteData.ContainmentType;
                var multiUnitFlag = response.data.siteData.MultiUnit;
                var hpci = response.data.siteData.hpciFlag;
                var isoCondenser = response.data.siteData.isolationCondenser;
                var rhrFlag = response.data.siteData.rhrLPCI;
                examQuery = 'http://localhost:3001/bwr/' + parseInt(containmentType) + '/isocondenser/'+parseInt(isiCondenser);

            }
            else { // store the correct PWR flags and call the PWR exam topic generator function

                var iceCondenser = response.data.siteData.IceCondenser;
                var designType = response.data.siteData.DesignType;
                var multiUnitFlag = response.data.siteData.MultiUnit;
                examQuery = 'http://localhost:3001/pwr/' + designType + '/icecondflag/'+parseInt(iceCondenser)+'/multi/'+parseInt(multiUnitFlag);
            }


        
        
        })
                
        .catch(err => {
            console.log(err);
        })
    ]);

     // Request the exam topics based on the site selected.

     await axios({

        url: examQuery,
        method: 'get',
        
     })
     .then(response => {
        
        // If the response is good, let's update the page with the results:
        console.log(examQuery);

        /// create a Table with the returned job results from the query:

        // check if a table exists on the page already (for multiple searches):
        let tableCheck = document.querySelector("table");
        if (tableCheck !== null) {  // if a table exists, delete it.
            var parentTable = tableCheck.parentElement;
            parentTable.removeChild(tableCheck);
        };



        function createTable() {

            topicTitles = response.data.examTopics.titles;
            topicImportance = response.data.examTopics.importance;
            topicCategory = response.data.examTopics.kaCats;
            topicSystems = response.data.examTopics.systems;

            // Set up the array of headers for the table columns:
            var headers = ["Question Number", "Topic Title", "Topic Importance","Topic Category","Topic System"];
            var table = document.createElement("TABLE");  //make a table element for the page

            // add a class to the table for dynamic styling:          

            table.setAttribute("class", "jobs_table");

            if (topicTitles.length > 0) {//  If there are  results, display them in a table.
   
                for(var i = 0; i < topicTitles.length; i++) { // For each job, insert a row with the desired information
                    var row = table.insertRow(i);
                    row.classList.add("table_row"); // add a class to the table row
                    row.insertCell(0).innerHTML = parseInt(i+1);
                    row.insertCell(1).innerHTML = topicTitles[i];
                    row.insertCell(2).innerHTML = topicImportance[i];
                    row.insertCell(3).innerHTML = topicCategory[i];
                    row.insertCell(4).innerHTML = topicSystems[i];                    
                }
            }
            else {  // if no jobs are returned, dispaly a no jobs returned message to alert the user.
                var row = table.insertRow(i);
                row.insertCell(0).innerHTML = "No jobs returned for this search.";
                row.insertCell(1).innerHTML = "";
                row.insertCell(2).innerHTML = "";
                row.insertCell(3).innerHTML = "";
                row.insertCell(4).innerHTML = "";


            }
        
            var header = table.createTHead();
            var headerRow = header.insertRow(0);
            header.classList.add("table_header");
            for(var i = 0; i < headers.length; i++) {
                headerRow.insertCell(i).innerHTML = headers[i];
            }
        
            document.body.appendChild(table);

            

        };
        
        createTable();





       
     })
            
     .catch(err => {
        console.log(err);
     });



});
