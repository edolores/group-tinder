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
            myStrings.appendChild(createListElement(line));
        });
    });
}

// TODO: Figure out if you need anything dynamic on this web page
function getCategories() {
    fetch('/data')
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
