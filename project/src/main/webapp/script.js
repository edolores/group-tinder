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


/* ARIELS JS BELOW */


function login(){
    const username = document.getElementById("username-login").value;
    const password = document.getElementById("password-login").value;
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    
    fetch("/login?" + params.toString()).then(response => response.text()).then((output) => {
        if(output.localeCompare("/index.html") == 0)
            window.alert("Login Unsuccessful.");
        window.location.replace(output);
    });
    var queryString = "?user=" + username;
    window.location.href = "categories.html" + queryString;  
}

function signUp(){
    const username = document.getElementById("username-signup").value;
    const password = document.getElementById("password-signup").value;

    const s1 = document.getElementById("security-question1");
    const securityQ1 = s1.options[s1.selectedIndex].text;
    const answerQ1 = document.getElementById("answer1").value;

    const s2 = document.getElementById("security-question2");
    const securityQ2 = s2.options[s2.selectedIndex].text;
    const answerQ2 = document.getElementById("answer2").value;

    const s3 = document.getElementById("security-question3");
    const securityQ3 = s3.options[s3.selectedIndex].text;
    const answerQ3 = document.getElementById("answer3").value;

    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    params.append("securityQ1", securityQ1);
    params.append("answerQ1", answerQ1);
    params.append("securityQ2", securityQ2);
    params.append("answerQ2", answerQ2);
    params.append("securityQ3", securityQ3);
    params.append("answerQ3", answerQ3);

    if (hasEmptyParams(params))
        window.alert("Fields are missing.");
    else
        fetch("/sign-up?" + params.toString()).then(response => response.text()).then((output) => {
            window.alert(output);
        });
}
function hasEmptyParams(params){
    for (var pair of params.entries())
        if (pair[1] == "") return true;
    return false;
}

function getSecurityQuestions(){
    const username = document.getElementById("username-forgot").value;
    const params = new URLSearchParams();
    params.append("username", username);

    fetch("/forgot?" + params.toString()).then(response => response.json()).then((questions) => {
        if (JSON.stringify(questions).length != 2){
            document.getElementById("get-questions").disabled = true;

            document.getElementById("question-prompt").innerText = "Fill in the answers to the security questions: ";
            const questionList = document.getElementById("security-questions");

            for (var key in questions) {
                questionList.appendChild(getQuestion(questions[key]));
                questionList.appendChild(makeAnswerField(key.charAt(key.length-1)));
            }
            
            questionList.appendChild(document.createElement("br"));
            questionList.appendChild(document.createElement("br"));

            const button = document.createElement("button");
            button.innerHTML = "Get Password";
            button.className = "button-a";
            button.setAttribute("onclick", "getUserPassword()");

            questionList.appendChild(button);
        }
        else
            window.alert("Account with username entered does not exist. ");
    });
}
function getQuestion(question) {    
    const questionElement = document.createElement("li");
    questionElement.style.listStyle = "none";
    questionElement.className = "li";
    questionElement.innerText = question;

    return questionElement;
}
function makeAnswerField(answerNumber){
    const answer = document.createElement("input");
    answer.className = "li";
    answer.id = "answerQ" + answerNumber;
    return answer;
}
function getUserPassword(){
    const username = document.getElementById("username-forgot").value;
    const a1 = document.getElementById("answerQ1").value;
    const a2 = document.getElementById("answerQ2").value;
    const a3 = document.getElementById("answerQ3").value;
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("answerQ1", a1);
    params.append("answerQ2", a2);
    params.append("answerQ3", a3);

    fetch("/password?" + params.toString()).then(response => response.text()).then((password) => {
        if (password.length != 1)
            window.alert("The password for " + username + " is " + password)
        else
            window.alert("One or more questions were answered incorrectly. Please try again.");
        window.location.replace("/restore.html");
    });
}

