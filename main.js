//  check if user is login
let loginID;
let topicQueryId;
let voteID;
let isCreatingTopic = false;
const hasStoredLoginID = localStorage.getItem('loginID');
const hasStoredCreateTopic = localStorage.getItem('isCreatingTopic');
const isOnAdmin = location.pathname === '/admin.html';
const isOnAdminLogin = location.pathname === '/admin-login.html';
const isOnTopic = location.pathname === '/topic.html';
const isOnVoteSearch = location.pathname === '/vote-search.html';
const isOnVote = location.pathname === '/vote.html';
const hasStoredTopicQuery = localStorage.getItem('topicQueryId');
const hasStoredVoteID = localStorage.getItem('voteID');
const delay = ms => new Promise(res => setTimeout(res, ms));

if (hasStoredVoteID){
  voteID = hasStoredVoteID;
}
if (hasStoredLoginID) {
  loginID = hasStoredLoginID;
  if (isOnAdminLogin && isOnTopic){
    goAdminLogin();
  }
} else {
  if (isOnAdmin){
    goAdminLogin();
  }
}
if(hasStoredCreateTopic){
  isCreatingTopic = true;
}
if (hasStoredTopicQuery){
  topicQueryId = hasStoredTopicQuery;
}

function goHome() {
  location.href = 'index.html';
}
function goSearch() {
  location.href = 'vote-search.html';
}
function goAdminLogin() {
  if(loginID){
    goAdmin();
  } else {
    location.href = 'admin-login.html';
  }
}
function goAdmin() {
  location.href = 'admin.html';
}
function goVote() {
  location.href = 'vote.html';
}
function goAnsList() {
  location.href = 'answer-list.html';
}
function goAnsRank() {
  location.href = 'answer-rank.html';
}
function goTopic() {
  location.href = 'topic.html';
}


async function copyTopicID (topicID) {
  try {
    await navigator.clipboard.writeText(topicID);
    console.log('Content copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}
function formatDateForSorting(date) {
  return new Date(date).toISOString(); // Convert to ISO 8601 format
}
async function login(username, password){
  this.username = username;
  this.password = password;
  console.log(`username: ${this.username}, password: ${this.password}`);
  try{
    const response = await fetch("http://localhost:3000/users/checklogin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password
      })
    });
    if (response.ok){
      const userDTO = await response.json();
      if(userDTO.error === 'invalid'){
        console.log('Invalid username or password.');
      } else {
        console.log('Login successful:', userDTO);
        loginID = userDTO.id;
        localStorage.setItem('loginID', loginID);
        await delay(250);
        goAdmin();
      }
    } else {
      console.error('Error fetching data. Status:', response.status);
      alert('An error occurred. Please try again later.');
    }
  }
  catch (error){
    console.error('Error fetching data: ', error);
    alert('An error occurred. Please try again later.');
    alert("1")
  }
}
async function fetchTopicData(topicID){
  try {
    const response = await fetch(`http://localhost:3000/topic/${topicID}`)
    if (response.ok) {
      const topicDTO = await response.json();
      return topicDTO;
    } else {
      console.error (response.status);
    }
  }
  catch (error){
    console.log(error);
    console.log('please reload to fetch data again');
  }
}
async function checkVoteIDExist(topicID){
  this.topicID = topicID;
  try {
    const response = await fetch(`http://localhost:3000/topic/checkID`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.topicID,
      })
    })
    if (response.ok) {
      const topicDTO = await response.json();
      return topicDTO;
    } else {
      console.error (response.status);
    }
  }
  catch (error){
    console.log(error);
    console.log('please reload to fetch data again');
  }
}
async function fetchAllTopic(){ 
  try{
    const response = await fetch(`http://localhost:3000/topic/all/${loginID}`)
    if (response.ok){
      const allTopic = await response.json();
      console.log(allTopic);
      return allTopic;
    } else {
      console.error(response.status);
    }
  }
  catch (error){
    console.log(error);
    console.log('please reload to fetch data again');
  }
}

document.addEventListener("DOMContentLoaded", () =>{
  const username = document.getElementById("username")
  const password = document.getElementById("password")
  const loginBtn = document.getElementById("login-btn")
  const inputClearBtn = document.querySelectorAll(".clear-icon")
  const createTopicBtn = document.querySelector("#create-topic-btn");
  const topicCreateBtn = document.querySelector('.topic-create-btn')
  
  if (isOnVote) {
    (async () => {
      const topicDTO = await fetchTopicData(voteID);
      const topicName = document.querySelector('#vote-topic-name');
      const topicDesc = document.querySelector('#vote-topic-desc');
      console.log(topicDTO);
      topicName.innerHTML = topicDTO.name;
      topicDesc.innerHTML = topicDTO.description;
    
    })();
  } else {
    localStorage.removeItem("voteID");
  }
  if (isOnVoteSearch){
    const confirmVoteBtn = document.querySelector('#confirm-vote-btn');
    confirmVoteBtn.onclick = async () =>{
      const topicID = document.querySelector('#vote-id').value;
      console.log(topicID);
      const topicDTO = await checkVoteIDExist(topicID);
      if (topicDTO.success){
        localStorage.setItem('voteID', topicID);
        goVote();
      } else if (topicDTO.error){
        console.log(topicDTO.error);
      }
    }
    
  }
  if (username){
    loginBtn.onclick = ()=>{
      login(username.value, password.value);
    };
  }
  if (inputClearBtn){
    inputClearBtn.forEach((inputClearBtn) => {
      inputClearBtn.onclick = () => {
        const parent = inputClearBtn.closest(".input-container-1");
        if (parent) {
          const input = parent.querySelector("input");
          if (input) {
            input.value = '';
          }
        }
      };
    });
  }
  if (createTopicBtn){
    createTopicBtn.onclick = async () =>{
      console.log('creating new topic...');
      await delay(1200);
      goTopic();
      isCreatingTopic = true;
      localStorage.setItem('isCreatingTopic', isCreatingTopic)
    }
  }


  // TODO: add all of the topic into localStorage for when server database is offline
  if(isOnAdmin){
    (async () => {
      const allRetrieveTopic = await fetchAllTopic();
      const sortedTopicsByDate = allRetrieveTopic.sort((a, b) => {
        const dateA = formatDateForSorting(a.create_date);
        const dateB = formatDateForSorting(b.create_date);
        return dateB.localeCompare(dateA);
      });
      const topicsList = document.getElementById('topics-list');
      topicAmount = sortedTopicsByDate.length;
      topicsList.innerHTML = '';
      
      sortedTopicsByDate.forEach((topic) => {
        const button = document.createElement('button');
        const copyIcon = document.createElement('i');
        const topicName = document.createElement('div');
        
        button.className = 'topic-card flex-h rounded-corner-s';
        button.id = topic.id;
        topicName.className = 'topic-card-name';
        topicName.textContent = `${topic.name}`;
        
        copyIcon.className = 'fas fa-copy text-white';
        copyIcon.style.alignSelf = 'center';
        copyIcon.style.fontSize = '2em';
        
        button.appendChild(topicName);
        button.appendChild(copyIcon);
        topicsList.appendChild(button);
      });
      const topicCards = document.querySelectorAll('.topic-card')
      topicCards.forEach((topic) => {
        const copyIcon = topic.querySelector('.fas.fa-copy');
        if (copyIcon) {
          copyIcon.onclick = (event) => {
            event.stopPropagation();
            copyTopicID(topic.id);
          };
        }
        topic.onclick = () => {
          console.log(topic.id);
          localStorage.setItem('topicQueryId', topic.id);
          goTopic();
        };
      });
    })();
  }
  if(isOnTopic){
    let chosenBtn = document.querySelector('#chosen-btn');
    let publicBtn = document.querySelector('#public-btn');
    let privBtn = document.querySelector('#priv-btn');
    
    function swapButtons(chosen, toChange, newBtn) {
      let tempId = chosen.id;
      if (newBtn === 'publicBtn'){
        toChange.id = tempId;
        chosen.id = 'public-btn';
        chosenBtn = document.querySelector('#chosen-btn');
        publicBtn = document.querySelector('#public-btn');
        privBtn = document.querySelector('#priv-btn');
      } else {
        toChange.id = tempId;
        chosen.id = 'priv-btn'
        chosenBtn = document.querySelector('#chosen-btn');
        publicBtn = document.querySelector('#public-btn');
        privBtn = document.querySelector('#priv-btn');
      }
    }
    if (privBtn) {
      privBtn.onclick = () => {
        swapButtons(chosenBtn, privBtn, 'publicBtn');
        checkForPublicPrivChanges();
      };
    }
    if (publicBtn) {
      publicBtn.onclick = () => {
        swapButtons(chosenBtn, publicBtn, 'privBtn');
        checkForPublicPrivChanges();
      }; 
    };
    function checkForPublicPrivChanges(){
      if (publicBtn) {
        publicBtn.onclick = () => {
          swapButtons(chosenBtn, publicBtn, 'privBtn');
          checkForPublicPrivChanges();
        }; 
      } else if (privBtn) {
        privBtn.onclick = () => {
          swapButtons(chosenBtn, privBtn, 'publicBtn');
          checkForPublicPrivChanges();
        }
      };
    }
    // TODO: if no isCreatingTopic then innerhtml of id topic-title = 'editing Topic'
    if (isCreatingTopic){
      const topicName = document.querySelector("#topic-name");
      const topicDesc = document.querySelector("#topic-description");
      let publicOrPriv;
      topicCreateBtn.innerHTML = 'Create';
      topicCreateBtn.onclick = async function (){
        if(chosenBtn.innerHTML === 'PUBLIC'){
          publicOrPriv = 'public';
        } else {
          publicOrPriv = 'private';
        }
        if(topicName.value !== ''){
          createTopic(topicName.value, topicDesc.value, publicOrPriv, loginID);
        }
      };
    } else {
      const topicName = document.querySelector("#topic-name");
      const topicDesc = document.querySelector("#topic-description");
      let publicOrPriv;
      const topicTitle = document.querySelector("#topic-title");
      topicTitle.innerHTML = "Editing Topic";
      topicCreateBtn.innerHTML = 'Save';
      (async () => {
        let topicDTO = await fetchTopicData(topicQueryId);
        topicName.value = topicDTO.name;
        topicDesc.value = topicDTO.description;
        if (topicDTO.public_or_private === 'private'){
          publicOrPriv = 'private';
          swapButtons(chosenBtn, privBtn, 'publicBtn');
          checkForPublicPrivChanges();
        } else {
          publicOrPriv = 'public';
          checkForPublicPrivChanges();
        }
      })();
      topicCreateBtn.onclick = async function (){
        if(chosenBtn.innerHTML === 'PUBLIC'){
          publicOrPriv = 'public';
        } else {
          publicOrPriv = 'private';
        }
        // FIXME:
        if(topicName.value !== ''){
          saveEditedTopic(topicName.value, topicDesc.value, publicOrPriv, loginID, topicQueryId);
        }
      };
      
      // ! TODO: ADD a way to PUT topic name and describtion into the gotten id 
    }
  } else {
    localStorage.removeItem('isCreatingTopic');
    localStorage.removeItem('topicQueryId')
  };
  async function saveEditedTopic(name, description, publicOrPriv, userID, topicID){
    this.name = name;
    this.description = description;
    this.publicOrPriv = publicOrPriv;
    this.userID = userID;
    this.topicID = topicID;
    try{
      const response = await fetch(`http://localhost:3000/topic/update/${this.topicID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name: this.name,
        description: this.description,
        public_or_private: this.publicOrPriv,
        create_by: this.userID,
        })
      })
      if (response.ok){
        const allTopic = await response.json();
        console.log(allTopic)
        if (allTopic.code === 'ECONNREFUSED')
        {
          console.log("server database is currently offline");
        } else {
          goAdmin();
        }
      } else {
        console.error(response.status);
      }
    }
    catch (error){
      console.log(error)
    }
  }
  async function createTopic(name, description, publicOrPriv,userID){
    this.name = name;
    this.description = description;
    this.publicOrPriv = publicOrPriv;
    this.userID = userID;
    try{
      const response = await fetch("http://localhost:3000/topic/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name: this.name,
        description: this.description,
        public_or_private: this.publicOrPriv,
        create_by: this.userID,
        })
      })
      if (response.ok){
        const allTopic = await response.json();
        console.log(allTopic)
        if (allTopic.code === 'ECONNREFUSED')
        {
          console.log("server database is currently offline");
        } else {
          goAdmin();
        }
      } else {
        console.error(response.status);
      }
    }
    catch (error){
      console.log(error)
    }
  }
});