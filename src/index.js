let isOnHome, isOnAdmin,isOnTopic, isOnSearch, isOnVote, isOnAnswer, isLogin, loginId, voteId, topicId;
if (localStorage.getItem('loginId')){
  isLogin = true;
  loginId = localStorage.getItem('loginId');
} else {
  isLogin = false;
}
if (localStorage.getItem('voteId')){
  voteId = localStorage.getItem('voteId');
}
if (localStorage.getItem('topicId')){
  topicId = localStorage.getItem('topicId');
}
switch (location.pathname){
  case "/public/":
    isOnHome = true;
    break;
  case "/public/pages/admin.html":
    isOnAdmin = true;
    break;
  case "/public/pages/topic.html":
    isOnTopic = true;
    break;
  case "/public/pages/vote-search.html":
    isOnSearch = true;
    break;
  case "/public/pages/vote.html":
    isOnVote = true;
    break;
  case "/public/pages/answer.html":
    isOnAnswer = true;
    break;
}
if (!isOnVote && !isOnAnswer){
  localStorage.removeItem('voteId');
}
if (!isOnTopic){
  localStorage.removeItem('topicId');
}
async function adminPage () {
  const adminTitle = document.querySelector('.admin-title');
  loginUser = await fetchUser(loginId);
  adminTitle.innerHTML = loginUser;
};
function copyTopicID (topicID) {
  navigator.clipboard.writeText(topicID);
  console.log('Content copied to clipboard');
}
document.addEventListener('DOMContentLoaded', () => {
  if(isOnAdmin){
    const adminTitle = document.querySelector('.admin-title');
    const logoutBtn = document.querySelector('.logout-wrap');
    if (!isLogin){
      adminTitle.innerHTML = 'User Login'
    } else {
      adminPage();
      const loginSection = document.querySelector('.login-section');
      loginSection.classList.remove('flex-v');
      loginSection.classList.add('invisible');
      logoutBtn.classList.remove('invisible');
      logoutBtn.onclick = () =>{
        localStorage.removeItem('loginId');
        location.reload();
      }
    }
    const userInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login');
    loginBtn.onclick = () => {
      login(userInput.value, passwordInput.value);
    }

  }
  if (isOnHome){
    const recentSection = document.querySelector('.recent');
    const publicSection = document.querySelector('.public');
    const ownSection = document.querySelector('.own');
    (async () =>{
      const createTopic = document.querySelector('.create-topic');
      createTopic.onclick = () =>{
        location.href = '/public/pages/topic.html';
      }
      if (loginId){
        const recentTopic = await fetchAllRecentTopic();
        const sortedRecentTopic = recentTopic.sort((a, b) => {
          const dateA = formatDateForSorting(a.submit_time);
          const dateB = formatDateForSorting(b.submit_time);
          return dateB.localeCompare(dateA);
        });
        sortedRecentTopic.forEach(async (vote) =>  {
          const topicName = await fetchTopicData(vote.topic_id);
          const topicsDiv = document.createElement('div');
          topicsDiv.className = 'topics';
          topicsDiv.id = vote.topic_id;
          const topicTitle = document.createElement('topic-title');
          const topicTitleParagraph = document.createElement('p');
          topicTitleParagraph.id = 'topic-title';
          topicTitleParagraph.textContent = topicName.name;
          const profilePictureImg = document.createElement('img');
          profilePictureImg.className = 'profile-picture';
          profilePictureImg.src = 'img/2.png';
          topicTitle.appendChild(topicTitleParagraph);
          topicTitle.appendChild(profilePictureImg);
          const topicDescriptionParagraph = document.createElement('p');
          topicDescriptionParagraph.id = 'topic-description';
          topicDescriptionParagraph.textContent = vote.answer;
          topicsDiv.appendChild(topicTitle);
          topicsDiv.appendChild(topicDescriptionParagraph);
          const parentElement = recentSection;
          parentElement.appendChild(topicsDiv);
        });
        setTimeout(() => {
          const recentTopicCards = document.querySelectorAll('.topics');
          recentTopicCards.forEach(topic => {
            topic.onclick = () => {
              console.log(topic.id)
              localStorage.setItem('voteId', topic.id);
              location.href = "/public/pages/answer.html";
            };
          })
        }, 500);
      }
      const publicTopic = await fetchAllPublicTopic();
      const sortedPublicTopic = publicTopic.sort((a, b) => {
        const dateA = formatDateForSorting(a.create_date);
        const dateB = formatDateForSorting(b.create_date);
        return dateB.localeCompare(dateA);
      });
      sortedPublicTopic.forEach(topic => {
        const topicsDiv = document.createElement('div');
        topicsDiv.className = 'topicsss';
        topicsDiv.id = topic.id;
        const topicTitle = document.createElement('topic-title');
        const topicTitleParagraph = document.createElement('p');
        topicTitleParagraph.id = 'topic-title';
        topicTitleParagraph.textContent = topic.name;
        const profilePictureImg = document.createElement('img');
        profilePictureImg.className = 'profile-picture';
        profilePictureImg.src = 'img/2.png';
        topicTitle.appendChild(topicTitleParagraph);
        topicTitle.appendChild(profilePictureImg);
        const topicDescriptionParagraph = document.createElement('p');
        topicDescriptionParagraph.id = 'topic-description';
        topicDescriptionParagraph.textContent = topic.description;
        topicsDiv.appendChild(topicTitle);
        topicsDiv.appendChild(topicDescriptionParagraph);
        const parentElement = publicSection;
        parentElement.appendChild(topicsDiv);
      });
      const publicTopicCards = document.querySelectorAll('.topicsss');
      publicTopicCards.forEach(topic => {
        topic.onclick = () => {
          localStorage.setItem('voteId', topic.id);
          location.href = "/public/pages/vote.html";
        };
      })

      const ownTopic = await fetchAllTopic();
      const sortedOwnTopic = ownTopic.sort((a, b) => {
        const dateA = formatDateForSorting(a.create_date);
        const dateB = formatDateForSorting(b.create_date);
        return dateB.localeCompare(dateA);
      });
      topicAmount = sortedOwnTopic.length;
      sortedOwnTopic.forEach(topic =>{
        const topicsContainer = document.createElement('div');
        topicsContainer.classList.add('topicss');
        const topicTitle = document.createElement('topic-title');
        const titleParagraph = document.createElement('p');
        titleParagraph.textContent = `${topic.name}`;
        const profilePicture = document.createElement('img');
        profilePicture.classList.add('profile-picture');
        profilePicture.src = 'img/1.png';
        topicTitle.appendChild(titleParagraph);
        topicTitle.appendChild(profilePicture);
        const flexSection = document.createElement('div');
        flexSection.classList.add('flex-h', 'justify-sb', 'width-100');
        const voteParagraph = document.createElement('p');
        voteParagraph.textContent = `Vote : 86`;
        flexSection.appendChild(voteParagraph);
        const copyIdSection = document.createElement('div');
        copyIdSection.classList.add('topic-card', 'copy-id', 'align-items-center', 'justify-sb', 'flex-h');
        copyIdSection.id = topic.id;
        const copyIdParagraph = document.createElement('p');
        copyIdParagraph.textContent = 'Copy ID';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '16');
        svg.setAttribute('height', '16');
        svg.setAttribute('viewBox', '0 0 16 16');
        svg.setAttribute('fill', 'none');
        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svgPath.setAttribute('d', 'M10.2067 5.79347C12.0737 7.6625 12.0481 10.659 10.2179 12.4994C10.2145 12.5031 10.2104 12.5072 10.2067 12.511L8.10666 14.611C6.25447 16.4631 3.24107 16.4629 1.38917 14.611C-0.463015 12.7591 -0.463015 9.74534 1.38917 7.89347L2.54873 6.73391C2.85623 6.42641 3.38579 6.63078 3.40166 7.06535C3.42191 7.61916 3.52123 8.17556 3.70448 8.71287C3.76654 8.89481 3.7222 9.09606 3.58626 9.232L3.17729 9.64097C2.30148 10.5168 2.27401 11.9428 3.1412 12.8272C4.01694 13.7203 5.45638 13.7256 6.33885 12.8431L8.43884 10.7435C9.31981 9.8625 9.31612 8.43856 8.43884 7.56128C8.32319 7.44585 8.20669 7.35616 8.11569 7.2935C8.05131 7.24929 7.99816 7.19065 7.96046 7.12226C7.92277 7.05386 7.90158 6.9776 7.89859 6.89957C7.88622 6.56935 8.00322 6.22907 8.26416 5.96813L8.92209 5.31016C9.09462 5.13763 9.36528 5.11644 9.56534 5.25607C9.79445 5.41605 10.0091 5.59588 10.2067 5.79347ZM14.6109 1.38904C12.759 -0.46289 9.74556 -0.46314 7.89338 1.38904L5.79338 3.48904C5.78963 3.49279 5.78557 3.49685 5.78213 3.5006C3.95194 5.34097 3.92629 8.3375 5.79338 10.2065C5.99097 10.4041 6.20555 10.5839 6.43466 10.7439C6.63472 10.8835 6.90541 10.8623 7.07791 10.6898L7.73584 10.0318C7.99678 9.7709 8.11378 9.43062 8.10141 9.1004C8.09841 9.02237 8.07723 8.94611 8.03954 8.87771C8.00184 8.80932 7.94869 8.75068 7.88431 8.70647C7.79331 8.64381 7.67681 8.55412 7.56116 8.43869C6.68388 7.56141 6.68019 6.13747 7.56116 5.25651L9.66115 3.15682C10.5436 2.27435 11.983 2.27967 12.8588 3.17276C13.726 4.05713 13.6986 5.48319 12.8227 6.359L12.4137 6.76797C12.2778 6.90391 12.2335 7.10516 12.2955 7.2871C12.4788 7.82441 12.5781 8.38081 12.5983 8.93462C12.6142 9.36918 13.1438 9.57356 13.4513 9.26606L14.6108 8.1065C16.463 6.25466 16.463 3.24092 14.6109 1.38904Z');
        svgPath.setAttribute('fill', '#F800C1');
        svg.appendChild(svgPath);
        copyIdSection.appendChild(copyIdParagraph);
        copyIdSection.appendChild(svg);
        flexSection.appendChild(copyIdSection);
        topicsContainer.appendChild(topicTitle);
        topicsContainer.appendChild(flexSection);
        ownSection.appendChild(topicsContainer);
      });      
      const ownTopicCards = document.querySelectorAll('.topicss')
      ownTopicCards.forEach((topic) => {
        const copyIcon = topic.querySelector('.copy-id');
        if (copyIcon) {
          copyIcon.onclick = (event) => {
            event.stopPropagation();
            copyTopicID(copyIcon.id);
          };
          topic.onclick = () => {
            localStorage.setItem('topicId', copyIcon.id);
            location.href = "/public/pages/topic.html";
          };
        }
      });
    })();
  }
  if (isOnHome || isOnAnswer) {
    const optionList = document.querySelector('.option-wrapper');
    const option = Array.from(optionList.children);
    const recentSection = document.querySelector('.recent');
    const publicSection = document.querySelector('.public');
    const ownSection = document.querySelector('.own');
    const listAnswer = document.querySelector('.answers');
    const rankAnswer = document.querySelector('.rank')
    const answerTitle = document.querySelector('#answer-title');

    optionList.addEventListener('click', (event) => {
      const clickedElement = event.target;
      if (clickedElement.tagName === 'LI') {
        option.forEach(li => li.classList.remove('active-option'));
        clickedElement.classList.add('active-option');
      }
      function changeSectionVisibility(remove, remove2, visible){
        remove.classList.add('invisible');
        remove2.classList.add('invisible');
        visible.classList.remove('invisible');
        visible.classList.add('inline-flex');
      }
      switch (clickedElement.innerHTML) {
        case "Recent":
          changeSectionVisibility(publicSection, ownSection, recentSection);
          break;
        case "Public Vote":
          changeSectionVisibility(recentSection, ownSection, publicSection);
          break;
        case "Your Topic":
          changeSectionVisibility(publicSection, recentSection, ownSection);
          break;
        case "List":
          listAnswer.classList.remove('invisible');
          listAnswer.classList.add('grid');
          rankAnswer.classList.add('invisible');
          rankAnswer.classList.remove('grid');
          answerTitle.innerHTML = 'Answer List';
          break;
        case "Rank":
          rankAnswer.classList.remove('invisible');
          rankAnswer.classList.add('grid');
          listAnswer.classList.remove('grid');
          listAnswer.classList.add('invisible');   
          answerTitle.innerHTML = 'Answer Rank';
          break;
      }
    });  
  }
  if(isOnAnswer){
    (async () => {
      const topicTitle = document.querySelector('#topic-title');
      const topicDTO = await fetchTopicData(voteId);
      topicTitle.innerHTML = topicDTO.name;
      const voteDTO = await fetchAllVote();
      console.log(voteDTO.length);
      voteDTO.forEach(vote => {
        const newLi = document.createElement('li');
        const usernameDiv = document.createElement('div');
        usernameDiv.className = 'username width-100';
        usernameDiv.textContent = `${vote.nickname}`;
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer';
        answerDiv.textContent = `${vote.answer}`;
        newLi.appendChild(usernameDiv);
        newLi.appendChild(answerDiv);
        const ulElement = document.querySelector('.answers');
        ulElement.appendChild(newLi);
      })
      const answerCount = {};
      let totalAnswerCount = 0;
      voteDTO.forEach(vote => {
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
          allRetrieveVote: voteDTO.filter(item => item.answer === answer)
        };
      });
      const proportions = resultArray.map(answer => answer.count / totalAnswerCount);
      const no1content = document.getElementById('no1-content');
      const no2content = document.getElementById('no2-content');
      const no3content = document.getElementById('no3-content');
      const no4content = document.getElementById('no4-content');
      const no5content = document.getElementById('no5-content');
      const no1 = document.getElementById('no1');
      const no2 = document.getElementById('no2');
      const no3 = document.getElementById('no3');
      const no4 = document.getElementById('no4');
      const no5 = document.getElementById('no5');
      for (let i = 0; i < 5; i++) {
        if(proportions[i] === 0){
          proportions[i] = -4/100;
        }
      }
      no1.style.width = (proportions[0] * 100 + 4) + '%';  
      no2.style.width = (proportions[1] * 100 + 4) + '%';
      no3.style.width = (proportions[2] * 100 + 4) + '%';
      no4.style.width = (proportions[3] * 100 + 4) + '%';
      no5.style.width = (proportions[4] * 100 + 4) + '%';
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
  }
  if(isOnVote){
    if (voteId){
      const username = document.querySelector('#username');
      const answer = document.querySelector('#answer');
      (async () => {
        const topicTitle = document.querySelector('#topic-title');
        topicDTO = await fetchTopicData(voteId);
        topicTitle.innerHTML = topicDTO.name;
        if (loginId){
          loginUser = await fetchUser(loginId);
          username.value = loginUser;
        }
      })();
      const submitBtn = document.querySelector('#submit-btn');
      submitBtn.onclick = () => {
        if(answer.value !== "" && username.value !== ""){
          postAnswer(username.value, answer.value, voteId)
        }
      }
    }
  }
  if (isOnSearch || isOnVote || isOnAnswer){
    const searchBtn = document.querySelector('#search-btn');
    searchBtn.onclick = () => {
      const search = document.querySelector('#search-vote');
      checkVoteIDExist(search.value);
    }
    if(isOnSearch) return;
    const search = document.querySelector('#search-vote');
    search.placeholder = voteId;
  }
  if (isOnTopic){
    (async () => {
      const topicTitle = document.getElementById('topic-title');
      const topicName = document.getElementById('topic-name');
      const topicDesc = document.getElementById('topic-description');
      const publicBtn = document.querySelector('.public-btn');
      const privateBtn = document.querySelector('.private-btn');
      const createBtn = document.getElementById('save-create-btn');
      if (topicId){
        topicTitle.innerHTML = "Editing Topic";
        createBtn.innerHTML = "Save";
        const topicDTO = await fetchTopicData(topicId);
        console.log(topicDTO);
        topicName.value = topicDTO.name;
        topicDesc.value = topicDTO.description;
        console.log(topicDTO.public_or_private);
        if (topicDTO.public_or_private === "private"){
          console.log(true)
          publicBtn.id = "";
          privateBtn.id = "active";
        }
        publicBtn.onclick = () => {
          if (publicBtn.id === ""){
            publicBtn.id = "active";
            privateBtn.id = "";
          }
        }
        privateBtn.onclick = () => {
          if (privateBtn.id === ""){
            privateBtn.id = "active";
            publicBtn.id = "";
          }
        }
        createBtn.onclick = () => {
          if (topicName.value === "") return;
          if (publicBtn.id === "active") active = "public";
          if (privateBtn.id === "active") active = "private";
          saveEditedTopic(topicName.value, topicDesc.value, active, loginId, topicId);
        }
      } else {
        topicTitle.innerHTML = "Creating Topic"
        publicBtn.onclick = () => {
          if (publicBtn.id === ""){
            publicBtn.id = "active";
            privateBtn.id = "";
          }
        }
        privateBtn.onclick = () => {
          if (privateBtn.id === ""){
            privateBtn.id = "active";
            publicBtn.id = "";
          }
        }
        createBtn.onclick = () =>{
          if (topicName.value === "") return;
          if (publicBtn.id === "active") active = "public";
          if (privateBtn.id === "active") active = "private";
          createTopic(topicName.value, topicDesc.value, active, loginId)
        }
      }
    })();
  }
});
async function saveEditedTopic(name, description, active, loginId, topicId){
  this.name = name;
  this.description = description;
  this.active = active;
  this.loginId = loginId;
  this.topicId = topicId;
  try{
    const response = await fetch(`http://localhost:3000/topic/update/${this.topicId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      name: this.name,
      description: this.description,
      public_or_private: this.active,
      create_by: this.loginId,
      })
    })
    if (response.ok){
      const allTopic = await response.json();
      console.log(allTopic)
      if (allTopic.code === 'ECONNREFUSED')
      {
        console.log("server database is currently offline");
      } else {
        location.href = '/public';
      }
    } else {
      console.error(response.status);
    }
  }
  catch (error){
    console.log(error)
  }
}
async function createTopic(name, description, active, loginId){
  this.name = name;
  this.description = description;
  this.active = active;
  this.loginId = loginId;
  try{
    const response = await fetch("http://localhost:3000/topic/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      name: this.name,
      description: this.description,
      public_or_private: this.active,
      create_by: this.loginId,
      })
    })
    if (response.ok){
      const allTopic = await response.json();
      console.log(allTopic)
      if (allTopic.code === 'ECONNREFUSED')
      {
        console.log("server database is currently offline");
      } else {
        location.href = '/public';
      }
    } else {
      console.error(response.status);
    }
  }
  catch (error){
    console.log(error)
  }
}
async function postAnswer(nickname, answer, voteId){
  this.nickname = nickname;
  this.answer = answer;
  this.voteId = voteId;
  try {
    const response = await fetch("http://localhost:3000/vote", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nickname: this.nickname,
        answer: this.answer,
        topic_id: this.voteId,
      })
    });
    if (response.ok) {
      console.log("Success");
      location.href = '/public/pages/answer.html';
    } else {
      console.log(response.status);
    }
  }
  catch (errors){
    console.log(errors);
    error = true;    
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
        loginId = userDTO.id;
        localStorage.setItem('loginId', loginId);
        adminPage();
        location.reload();
      }
    } else {
      console.error('Error fetching data. Status:', response.status);
    }
  }
  catch (error){
    console.error(error);
  }
}
async function fetchUser(id){
  this.id = id;
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`);
    if (response.ok){
      username = await response.json();
      username = username.username;
      return username;
    } else {
      console.log(response.status);
    }
  }
  catch (error){
    console.log(error);
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
      localStorage.setItem('voteId', this.topicID);
      location.href = '/public/pages/vote.html';
    } else {
      console.error (response.status);
    }
  }
  catch (error){
    console.log(error);
    console.log('please reload to fetch data again');
  }
}
async function fetchAllRecentTopic(){
  try {
    const response = await fetch(`http://localhost:3000/topic/recent/${loginId}`)
    if(response.ok) {
      const allRecentTopic = await response.json();
      return allRecentTopic;
    } else {
      console.error (response.status);
    }
  } catch (error){
    console.log(error);
    console.log('please reload to fetch data again'); 
  }
}
async function fetchAllPublicTopic(){
  try {
    const response = await fetch('http://localhost:3000/topic')
    if(response.ok) {
      const allPublicTopic = await response.json();
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
    const response = await fetch(`http://localhost:3000/topic/all/${loginId}`)
    if (response.ok){
      const allTopic = await response.json();
      return allTopic;
    } else {
      console.error(response.status);
      alert(response.status);
    }
  }
  catch (error){
    console.log(error);
    console.log('please reload to fetch data again');
  }
}
async function fetchAllVote(){
  try{
    const response = await fetch(`http://localhost:3000/vote/all/${voteId}`);
    if (response.ok){
      const allVote = await response.json();
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