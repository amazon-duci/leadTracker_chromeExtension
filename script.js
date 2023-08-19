let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const delBtn =  document.getElementById('del-btn');
const tabBtn = document.getElementById("tab-btn")

// converting back local storage data from strings to array
const myLeadsArray = JSON.parse(localStorage.getItem("myLeads"));

// checking if local storage is empty before rendering out after a refresh
if (myLeadsArray){
    myLeads = myLeadsArray;
    render(myLeads);
}


tabBtn.addEventListener("click", function(){
    // grabbing the current tab on chrome and triggering a function with tab parameter
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry

        // pushing that active tab to myLeads array 
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
    
})




// Replace .textContent with .innerHTML and use <li> tags
function render(leads){
    let listItems = "";
    for (let i = 0; i <leads.length; i++) {
        listItems += `<li>
                        <a href = '${leads[i]}' target = '_blank'>
                            ${leads[i]}
                        </a>
                    </li>`;

        // other ways
        // const li = document.createElement('li');
        // li.textContent = myLeads[i];
        // ulEl.append(li);
    }
    ulEl.innerHTML = listItems;
}

// doubleclick listener to clear local storage
delBtn.addEventListener('dblclick',function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})



inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)

    // converting myLeads array to string to be used in local storage
    let myLeadsString = JSON.stringify(myLeads);

    localStorage.setItem("myLeads", myLeadsString)
    render(myLeads);
    inputEl.value = "";
})


