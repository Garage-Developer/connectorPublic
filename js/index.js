fetch("https://au-api.basiq.io/public/connectors")
.then(response => response.json())
.then(institutions => displayInstitutions(institutions.data));

displayInstitutions = institutions => {
   institutions.forEach(institution => {
      tableBody = document.querySelector("tbody")
      const tableRow = document.createElement("tr");
      tableBody.append(tableRow)
      addData(tableRow, institution.institution.shortName)
      addData(tableRow, institution.id)
      addData(tableRow, institution.institution.tier)
      addData(tableRow, institution.institution.country)
      addData(tableRow, institution.stage)
      addData(tableRow, institution.authorization.type)
      addData(tableRow, institution.stage == 'beta' || institution.country == 'New Zealand' ? 'operational' : institution.status)
      addData(tableRow, institution.stats == null ? null : `${institution.stats.averageDurationMs.verifyCredentials / 1000}`)
      addData(tableRow, institution.stats == null ? null : `${institution.stats.averageDurationMs.retrieveAccounts / 1000}`)
      addData(tableRow, institution.stats == null ? null : `${institution.stats.averageDurationMs.retrieveMeta / 1000}`)
      addData(tableRow, institution.stats == null ? null : `${institution.stats.averageDurationMs.retrieveTransactions / 1000}`)
      //addData(tableRow, institution.institution.country == 'New Zealand' ? '-' : checkIfDisplayed(institution.features.profile.fullName))
      //addData(tableRow, institution.institution.country == 'New Zealand' ? '-' : checkIfDisplayed(institution.features.profile.firstName))
      //addData(tableRow, institution.institution.country == 'New Zealand' ? '-' : checkIfDisplayed(institution.features.profile.lastName))
      //addData(tableRow, institution.institution.country == 'New Zealand' ? '-' : checkIfDisplayed(institution.features.profile.physicalAddresses))
      //addData(tableRow, institution.institution.country == 'New Zealand' ? '-' : checkIfDisplayed(institution.features.profile.phoneNumbers))
      //addData(tableRow, institution.institution.country == 'New Zealand' ? '-' : checkIfDisplayed(institution.features.profile.emailAddresses))
      //addData(tableRow, checkIfDisplayed(institution.features.accounts.accountHolder))
      //addData(tableRow, checkIfDisplayed(institution.features.accounts.meta))
      //addData(tableRow, checkIfDisplayed(institution.features.transactions.class))
      //addData(tableRow, isStatementUpload(institution.method))
});

}

addData = (parent, info) => {
   const institutionElement = document.createElement("td");
   institutionElement.innerText = info;
   checkInstitutionStatus(institutionElement);
   isInstitutionSandbox(institutionElement);
   parent.append(institutionElement);
}

checkIfDisplayed = (item) => {
   if (item == null) {
      return '✘';
   } 

   return item.includes("web") ? '✔' : '✘';
}

isStatementUpload = (item) => {
  if (item == null) {
     return '✘';
  } 

  return item.includes("pdf") ? '✔' : '✘';
}

checkInstitutionStatus = (institutionElement) => {
   if (institutionElement.innerText == "under-maintenance") {
      institutionElement.className = "under-maintenance";
   } else if (institutionElement.innerText == "degraded-performance") {
      institutionElement.className = "degraded-performance";
   } else if (institutionElement.innerText == "partial-outage") {
      institutionElement.className = "partial-outage";
   } else if (institutionElement.innerText == "operational") {
      institutionElement.className = "operational";
   } else if (institutionElement.innerText == "major-outage") {
     institutionElement.className = "major-outage"
   }
}

isInstitutionSandbox = (institutionElement) => {
  if (institutionElement.innerText.slice(0, 2) == 'AU' || institutionElement.innerText.slice(0, 2) == 'NZ') {
    let number = institutionElement.innerText.slice(-5);
    if (number <= 00010) {
      institutionElement.className = "sandbox-institution";
    }
  }
}

filter = () => {
   var input, filter, table, tr, td, i, txtValue;
   input = document.getElementById("myInput");
   filter = input.value.toUpperCase();
   table = document.getElementById("table");
   tr = table.getElementsByTagName("tr");
 
   // Loop through all table rows, and hide those who don't match the search query
   for (i = 0; i < tr.length; i++) {
     td = tr[i].getElementsByTagName("td")[0];
     if (td) {
       txtValue = td.textContent || td.innerText;
       if (txtValue.toUpperCase().indexOf(filter) > -1) {
         tr[i].style.display = "";
       } else {
         tr[i].style.display = "none";
       }
     }
   }
 }

 sortTable = (n) => {
   var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
   table = document.getElementById("table");
   switching = true;
   // Set the sorting direction to ascending:
   dir = "asc";
   /* Make a loop that will continue until
   no switching has been done: */
   while (switching) {
     // Start by saying: no switching is done:
     switching = false;
     rows = table.rows;
     /* Loop through all table rows (except the
     first, which contains table headers): */
     for (i = 1; i < (rows.length - 1); i++) {
       // Start by saying there should be no switching:
       shouldSwitch = false;
       /* Get the two elements you want to compare,
       one from current row and one from the next: */
       x = rows[i].getElementsByTagName("td")[n];
       y = rows[i + 1].getElementsByTagName("td")[n];
       /* Check if the two rows should switch place,
       based on the direction, asc or desc: */
       if (dir == "asc") {
         if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
           // If so, mark as a switch and break the loop:
           shouldSwitch = true;
           break;
         }
       } else if (dir == "desc") {
         if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
           // If so, mark as a switch and break the loop:
           shouldSwitch = true;
           break;
         }
       }
     }
     if (shouldSwitch) {
       /* If a switch has been marked, make the switch
       and mark that a switch has been done: */
       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
       switching = true;
       // Each time a switch is done, increase this count by 1:
       switchcount ++;
     } else {
       /* If no switching has been done AND the direction is "asc",
       set the direction to "desc" and run the while loop again. */
       if (switchcount == 0 && dir == "asc") {
         dir = "desc";
         switching = true;
       }
     }
   }
 }

sortNumbers = (n) => {
   var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
   table = document.getElementById("table");
   switching = true;
   // Set the sorting direction to ascending:
   dir = "asc";
   /* Make a loop that will continue until
   no switching has been done: */
   while (switching) {
     // Start by saying: no switching is done:
     switching = false;
     rows = table.rows;
     /* Loop through all table rows (except the
     first, which contains table headers): */
     for (i = 1; i < (rows.length - 1); i++) {
       // Start by saying there should be no switching:
       shouldSwitch = false;
       /* Get the two elements you want to compare,
       one from current row and one from the next: */
       x = rows[i].getElementsByTagName("td")[n];
       y = rows[i + 1].getElementsByTagName("td")[n];
       /* Check if the two rows should switch place,
       based on the direction, asc or desc: */
       if (dir == "asc") {
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
           // If so, mark as a switch and break the loop:
           shouldSwitch = true;
           break;
         }
       } else if (dir == "desc") {
         if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
       }
     }
     if (shouldSwitch) {
       /* If a switch has been marked, make the switch
       and mark that a switch has been done: */
       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
       switching = true;
       // Each time a switch is done, increase this count by 1:
       switchcount ++;
     } else {
       /* If no switching has been done AND the direction is "asc",
       set the direction to "desc" and run the while loop again. */
       if (switchcount == 0 && dir == "asc") {
         dir = "desc";
         switching = true;
       }
     }
   }
 }

 hideShowColumns = (columns, header) => {
    columns.forEach((column) => {
      $(`td:nth-child(${column}),th:nth-child(${column})`).toggleClass('hidden');
    })
    $(`#${header}`).toggleClass('hidden')
 }

 copyTable = () => {
    // var table = document.querySelector('table');
    // var data = document.createRange();  
    // data.selectNode(table);
    // window.getSelection().removeAllRanges()
    // window.getSelection().addRange(data);
    
    // const type = 'text/html';
    // const blob = new Blob([data], { type });

    // let newData = [new ClipboardItem({ [type]: blob })];
    // console.log(newData)
    // navigator.clipboard.write(newData)
    // document.execCommand("Copy")

    var urlField = document.querySelector('table');
   
    // create a Range object
    var range = document.createRange();  
    // set the Node to select the "range"
    range.selectNode(urlField);

    window.getSelection().removeAllRanges()
    // add the Range to the set of window selections
    window.getSelection().addRange(range);
     
    // execute 'copy', can't 'cut' in this case
    document.execCommand('copy');
}