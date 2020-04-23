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
var namesCheckedOff;//counts number of profiles selected for group
var loginUsername = "";
var vgChatMade;//flag that checks if a chat has been made for the vg category

/*Get actual chat messages*/
function getChat(page) {
    fetch(page)
    .then(response => response.json())
    .then((funFacts) => {
        const uname  = document.getElementById('username');
        uname.innerText = funFacts.username;

        const myStrings = document.getElementById('message-container');
        myStrings.innerHTML = '';
        funFacts.comments.forEach((line) => {
            console.log(line);
            // check list element inner text
            var liElement = createListElement(line);
            myStrings.appendChild(liElement);
        });
    });
}

/*Get profile names that belong to chat*/
function getChatMemberProfiles(page) {
    fetch(page)
    .then(response => response.json())
    .then((profileNames) => {
        const myStrings = document.getElementById('chat-members');
        myStrings.innerHTML = '';
        var title = 'Chat Members:';
        var liElement = createListElement(title);
        liElement.classList.add('chat-member-list-element');
        myStrings.appendChild(liElement);


        profileNames.usernames.forEach((line) => {
            console.log(line);
            var liElement = createListElement(line);
            liElement.style='list-style: none;';
            myStrings.appendChild(liElement);
        });

    });
}

/*Get profiles that belong to category*/
function getProfiles() {
    namesCheckedOff = 0;
    vgChatMade = 0;
    document.getElementById('names-text-test').innerText = namesCheckedOff;
    var tablearea = document.getElementById('names-table'),
        table = document.createElement('table');
    table.id = 'profile-list';
    table.classList.add('list-table');

    for (var i = 0; i < 20; i++) {
        //Create a static list of names, with some interchanging names
        var name = 'Andrew Brooks';
        if(i%3==0){
            name = 'Gerald Jones';
        } else if(i%5==0){
            name = 'Brad Smith';
        }
        var tr = document.createElement('tr');
        //creates td
        var td = document.createElement('td');
        //each td requires it's own checkbox variable
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style = 'width:40px;height:40px;';
        //Event listerner for changing checkbox value
        checkbox.addEventListener('click', function() {
            if(!this.checked){
                this.checked = true;
            } else{
                this.checked = false;
            }
        });
        //append the checkbox to the td
        td.appendChild(checkbox);
        //add event listentener for when user clicks table row
        td.addEventListener('click', function() {
            var cbox = this.childNodes[0];
            if(!cbox.checked){
                cbox.checked = true;
                namesCheckedOff++;
            } else{
                cbox.checked = false;
                namesCheckedOff--;
            }
            nameCount.innerText = namesCheckedOff;
        });

        //append the newly created td's to the tr
        tr.appendChild(td);
        //add actual text to the cells of the table row
        tr.cells[0].appendChild(document.createTextNode(name));
        table.appendChild(tr);
    }
    tablearea.appendChild(table);
}

/*Create a list element*/
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}

/*Collects all the checked off names and puts them into the list*/
function createGroup() {
    //Error handling for submitting a group
    var checkedSelf = document.getElementById('add-self-to-group');
    if(!checkedSelf.checked){
        window.alert('Add yourself to this category before creating group!');
        return false;
    } else if(namesCheckedOff < 3){
        window.alert('Make sure to add at least 3 people to your group!');
        return false;
    }

    vgChatMade = 1;
    //Retrieve the table holding profile names
    var tablearea = document.getElementById('names-table');
    var table = document.getElementById('profile-list');
    var profileNames = '';

    //Retrive the names that the user has selected from the table
    for (var i = 0, row; row = table.rows[i]; i++) {
        var checkbox = row.childNodes[0].childNodes[0];
        if(checkbox.checked){
            profileNames += row.childNodes[0].innerText;
            profileNames += ',';
        }
    }
    document.getElementById('list-of-group-names').value = profileNames;
    return true;
}

/*function for checking if user has already created a chat for the selected category*/
function checkChatCreated() {
    if(vgChatMade) {
        window.location.href = 'video-games-chat.html';
    } else{
        window.location.href = 'video-games-profiles.html';
    }
}


/* ARIELS JS BELOW */


function login(){
    const username = document.getElementById("username-login").value;
    const password = document.getElementById("password-login").value;
    loginUsername = document.getElementById("username-login").value;
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    
    fetch("/login?" + params.toString()).then(response => response.text()).then((output) => {
        if(output.localeCompare("/index.html") == 0)
            window.alert("Login Unsuccessful.");
        window.location.replace(output);
    });
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
    questionElement.innerText = question;

    return questionElement;
}
function makeAnswerField(answerNumber){
    const answer = document.createElement("input");
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

function getUsername(){
    const username = document.getElementById("username");
    username.innerHTML = loginUsername;
}

