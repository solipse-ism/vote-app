//  check if user is login
let loginID;
let topicQueryId;
let voteID;
let isCreatingTopic = false;
const hasStoredLoginID = localStorage.getItem('loginID');
const hasStoredCreateTopic = localStorage.getItem('isCreatingTopic');
const isOnAdmin = location.pathname === '/admin.html';
const isOnAdminLogin = location.pathname === '/index.html';
const isOnTopic = location.pathname === '/topic.html';
const isOnVoteSearch = location.pathname === '/vote-search.html';
const isOnVote = location.pathname === '/vote.html';
const isOnAnsList = location.pathname === '/answer-list.html';
const isOnAnsRank = location.pathname === '/answer-rank.html';
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
  location.href = '/index.html';
}
function goSearch() {
  location.href = '/vote-search.html';
}
function goAdminLogin() {
  if(loginID){
    goAdmin();
  } else {
    location.href = '/index.html';
  }
}
function goAdmin() {
  location.href = '/admin.html';
}
function goVote() {
  location.href = '/vote.html';
}
function goAnsList() {
  location.href = '/answer-list.html';
}
function goAnsRank() {
  location.href = '/answer-rank.html';
}
function goTopic() {
  location.href = '/topic.html';
}

async function  postAnswer(nickname, answer, voteID){
  this.nickname = nickname;
  this.answer = answer;
  this.voteID = voteID;
  try {
    const response = await fetch("http://localhost:3000/vote", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nickname: this.nickname,
        answer: this.answer,
        topic_id: this.voteID,
      })
    });
    if (response.ok) {
      console.log("Success");
      goAnsList();
    } else {
      console.log(response.status);
    }
  }
  catch (errors){
    console.log(errors);
    error = true;    
  }
}

async function copyTopicID (topicID) {
  try {
    await navigator.clipboard.writeText(topicID);
    console.log('Content copied to clipboard');
  } catch (error) {
    console.error('Failed to copy: ', error);
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
async function fetchAllPublicTopic(){
  try {
    const response = await fetch('http://localhost:3000/topic')
    if(response.ok) {
      const allPublicTopic = await response.json();
      console.log(allPublicTopic);
      return allPublicTopic;
    } else {
      console.error (response.status);
    }
  } catch (error){
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
async function fetchAllVote(){
  try{
    const response = await fetch(`http://localhost:3000/vote/all/${voteID}`);
    if (response.ok){
      const allVote = await response.json();
      console.log(allVote);
      return allVote;
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
      const nickname = document.querySelector('#nickname');
      const answer = document.querySelector('#answer');
      const ansBtn = document.querySelector('#ans-send');
      ansBtn.onclick = () =>{
        if (nickname.value && answer.value) {
          postAnswer(nickname.value, answer.value, voteID);
        }
      }
    
    })();
  } else if (isOnAnsList) { 
    (async () => {
      const topicDTO = await fetchTopicData(voteID);
      const topicName = document.querySelector('#topic-name-answer-list');
      topicName.innerHTML = topicDTO.name;
      const allRetrieveVote = await fetchAllVote();
      const sortedTopicsByDate = allRetrieveVote.sort((a, b) => {
        const dateA = formatDateForSorting(a.submit_time);
        const dateB = formatDateForSorting(b.submit_time);
        return dateB.localeCompare(dateA);
      });
      const voteList = document.querySelector('.purple-list-box');
      voteList.innerHTML = '';
      
      sortedTopicsByDate.forEach((vote) => {
        const li = document.createElement('li');
        const nickname = document.createElement('div');
        const answer = document.createElement('div');
        
        nickname.className = 'user-ans';
        answer.className = 'user-ans-content';
        nickname.textContent = `${vote.nickname}`;
        answer.textContent = `${vote.answer}`;
        
        li.appendChild(nickname);
        li.appendChild(answer);
        voteList.appendChild(li);
      });
    })();
  } else if (isOnAnsRank) {
    (async () => {
      const topicDTO = await fetchTopicData(voteID);
      const topicName = document.querySelector('#topic-name-answer-list');
      topicName.innerHTML = topicDTO.name;
      const allRetrieveVote = await fetchAllVote();
      const answerCount = {};
      let totalAnswerCount = 0;
      allRetrieveVote.forEach(vote => {
        const answer = vote.answer;
        answerCount[answer] = (answerCount[answer] || 0) + 1;
        totalAnswerCount++;
      });
      let maxCount = 0;
      for (const answer in answerCount) {
        if (answerCount[answer] > maxCount) {
          mostCommonAnswer = answer;
          maxCount = answerCount[answer];
        }
      }
      console.log(answerCount["d"]);
      const sortedAnswers = Object.keys(answerCount).sort((a, b) => answerCount[b] - answerCount[a]);
      const mostCommonAnswers = sortedAnswers.slice(0, 5);
      (function assignValue(){
        for (let i = 0; i<5; i++){
          if (!!!mostCommonAnswers[i]){
            mostCommonAnswers[i] = "";
            answerCount[""] = 0;
          }
        };
      })();
      const resultArray = mostCommonAnswers.map(answer => {
        return {
          answer: answer,
          count: answerCount[answer],
          allRetrieveVote: allRetrieveVote.filter(item => item.answer === answer)
        };
      });
      const proportions = resultArray.map(answer => answer.count / totalAnswerCount);
      const no1content = document.getElementById('num1-content');
      const no2content = document.getElementById('num2-content');
      const no3content = document.getElementById('num3-content');
      const no4content = document.getElementById('num4-content');
      const no5content = document.getElementById('num5-content');
      const no1 = document.getElementById('num1');
      const no2 = document.getElementById('num2');
      const no3 = document.getElementById('num3');
      const no4 = document.getElementById('num4');
      const no5 = document.getElementById('num5');
      no1.style.height = (proportions[0] * 100) + '%';  
      no2.style.height = (proportions[1] * 100) + '%';
      no3.style.height = (proportions[2] * 100) + '%';
      no4.style.height = (proportions[3] * 100) + '%';
      no5.style.height = (proportions[4] * 100) + '%';
      no1content.setAttribute('title', resultArray[0].answer);
      no2content.setAttribute('title', resultArray[1].answer);
      no3content.setAttribute('title', resultArray[2].answer);
      no4content.setAttribute('title', resultArray[3].answer);
      no5content.setAttribute('title', resultArray[4].answer);
      no1content.innerHTML = resultArray[0].answer;
      no2content.innerHTML = resultArray[1].answer;
      no3content.innerHTML = resultArray[2].answer;
      no4content.innerHTML = resultArray[3].answer;
      no5content.innerHTML = resultArray[4].answer;
      no1.innerHTML = resultArray[0].count;
      no2.innerHTML = resultArray[1].count;
      no3.innerHTML = resultArray[2].count;
      no4.innerHTML = resultArray[3].count;
      no5.innerHTML = resultArray[4].count;
    })();

  }else {
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
  // might TODO: add all of the topic into localStorage for when server database is offline
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