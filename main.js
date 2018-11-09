let contactInfo = document.querySelector('.contact-info')
let statsInfo = document.querySelector('.stats')
let followingsInfo = document.querySelector('.followings')

function renderProfile(user){
  //Adding Profiles components
  let html =`<div class="row">
              <div class="column">
                <div class="profile-main"><img src="../assets/${user.avatarpath}"></div>
              </div>
              <div class="column right">
                <ul>
                  <li><span class="contact-label">Name</span>: ${user.firstName} ${user.lastName} </li>
                  <li><span class="contact-label">Email</span>: ${user.email}</li>
                  <li><span class="contact-label">Phone</span>: ${user.phone}</li>
                  <li><span class="contact-label">Mobile</span>: ${user.mobile}</li>
                  <li><span class="contact-label">Location</span>: ${user.location}</li>
                </ul>
              </div>
          </div>`;
    contactInfo.innerHTML += html;
}

function renderStats(stats){
  //Adding stats components
  let html = ``
  stats.map((stat) =>{
      html = `<div class="column section-container">
              <div class="stats-total">${stat.total}</div>
              <div class="stats-label">${stat.title}</div>
            </div>`;
      statsInfo.innerHTML += html;
  })
}

function renderFollowings(data){
  //Render Static Content
  followingsInfo.innerHTML += `
  <div class="row margin-10">
    <div class="column"><span class="follow-links active">FOLLOWING</span></div>
    <div class="column"><span class="follow-links left">FOLLOWERS</span></div>
  </div>
  <div class="row following-label">${data.followingTitle}</div>`;

  let html = ``;

  //Render rows with a .section-container class ie:bottom border unless it's the last row
  data.followings.map((followee, index) =>{
    if(index <= 3){
      html = `<div id="${followee.followee.userId}" class="column">
                <div class="row section-container">
                  <img class="avatar-size" src="../assets${followee.followee.avatar}">
                  <div class="column following">${followee.followee.userDisplayName}</div>
                </div>
              </div>`;
            followingsInfo.innerHTML += html;
      }else if(index === 4){
      html = `<div id="${followee.followee.userId}" class="column">
                <div class="row">
                  <img class="avatar-size" src="../assets${followee.followee.avatar}">
                  <div class="column following">${followee.followee.userDisplayName}</div>
                </div>
              </div>`;
            followingsInfo.innerHTML += html;
    }
  })
  //render see all last row
  followingsInfo.innerHTML += `<div class="row see-all">
                                  <div class="column"> SEE ALL</div>
                                </div>`;
}

fetch('data.json')
  .then((response) =>{
    return response.json();
  }).then((data) =>{
    //Render components

    renderProfile(data.data.userInfo)
    renderStats(data.data.stats)
    renderFollowings(data.data)

  }).catch((error) =>{
    contactInfo.innerHTML = "Please run a local server to view Page."
    reject(error)
})
