// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var namesCheckedOff;

function getChat() {
    fetch('/data')
    .then(response => response.json())
    .then((funFacts) => {
        const uname  = document.getElementById('username');
        uname.innerText = funFacts.username;

        const myStrings = document.getElementById('quote-container');
        myStrings.innerHTML = '';
        funFacts.comments.forEach((line) => {
            console.log(line);
            // check list element inner text
            var liElement = createListElement(line);
            // var n = liElement.innerText.includes('test-user');
            // console.log(n);
            // if(n){
            //     liElement.style = 'float:right;';
            // } else{
            //     liElement.style = 'float:left;';
            // }
            myStrings.appendChild(liElement);
        });
    });
}

function addTable() {
    namesCheckedOff = 0;
    const nameCount = document.getElementById('names-text-test');
    nameCount.innerText = namesCheckedOff;
    var tablearea = document.getElementById('names-table'),
        table = document.createElement('table');
    table.id = 'profile-list';
    table.classList.add('list-table');

    for (var i = 0; i < 20; i++) {
        //create a new table row
        var name = 'Andrew Boyle';
        var tr = document.createElement('tr');
        //creates td
        var td = document.createElement('td');
        //each td requires it's own checkbox variable
        //td also has a name field that may be useful
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style = 'width:40px;height:40px;';
        checkbox.addEventListener('click', function() {
            if(!this.checked){
                this.checked = true;
            } else{
                this.checked = false;
            }
        });
        //append the checkbox to the td
        td.appendChild(checkbox);
        //add event listentener for when user clicks td
        td.addEventListener('click', function() {
            var cbox = this.childNodes[0];
            if(!cbox.checked){
                cbox.checked = true;
                namesCheckedOff++;
            } else{
                namesCheckedOff--;
                cbox.checked = false;
            }
            nameCount.innerText = namesCheckedOff;
        });

        //append the newly created td's to the tr
        tr.appendChild(td);
        //add actual text to the cells of the table row
        tr.cells[0].appendChild(document.createTextNode(name));
        // if(i%2==0){
        //     tr.childNodes[0].align = 'right';
        //     // tr.childNodes[0].text-align = 'left';
        // } else{
        //     tr.align = 'left';
        // } 
        table.appendChild(tr);
    }

    tablearea.appendChild(table);
}

// TODO: Figure out if you need anything dynamic on this web page
function getProfiles() {
    fetch('/profiles')
    .then(response => response.json())
    .then((funFacts) => {
        const uname  = document.getElementById('username');
        uname.innerText = funFacts.username;

        const myStrings = document.getElementById('quote-container');
        myStrings.innerHTML = '';
        funFacts.comments.forEach((line) => {
            console.log(line);
            myStrings.appendChild(createListElement(line));
        });
    });
}

function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}
