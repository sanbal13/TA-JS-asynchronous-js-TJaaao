let input = document.querySelector("input");
let img = document.querySelector("img");
let name = document.querySelector("h3");
let userName = document.querySelector("h4");
let followers = document.querySelector(".followers");
let following = document.querySelector(".following");
let followersList = document.querySelector(".followers-list");
let followingList = document.querySelector(".following-list");

input .addEventListener('keyup', handleChange);

function handleChange(e) {
        if(e.keyCode === 13) {
            createUser();
        }
}

createUser();
function createUser() {
            let xhr = new XMLHttpRequest;
            let xhrFollowers = new XMLHttpRequest;
            let xhrFollowing = new XMLHttpRequest;
            let iv = input.value || 'sanbal13';
            xhr.open('GET', `https://api.github.com/users/${iv}`);
            xhrFollowers.open('GET', `https://api.github.com/users/${iv}/followers`);
            xhrFollowing.open('GET', `https://api.github.com/users/${iv}/following`);
            
            xhr.onload = function() {
                let userData = JSON.parse(xhr.response);
              
                let imageData = userData.avatar_url;
                img.src = imageData;
                img.style.boxShadow = '1px 1px 10px grey';
                name.innerText = userData.name;
                userName.innerHTML = `<a href = "https://www.github.com/${userData.login}"> @${userData.login} </a>`;
                followers.innerText = 'Followers: ' + userData.followers;
                following.innerText = 'Following: ' + userData.following; 
            

            }

            xhrFollowers.onload = function() { 
                followersList.innerText = "Followers";
                let followersData = JSON.parse(xhrFollowers.response);
                for(let i = 0; i < 5; i++) {
                    if(followersData[i]) {
                        let img = document.createElement("img");
                        img.src = followersData[i].avatar_url;
                        img.classList.add('img-followers');
                    followersList.append(img); 
                    } 

                }
            }
            xhrFollowing.onload = function() { 
                followingList.innerText = "Following";
                let followingData = JSON.parse(xhrFollowing.response);
                for(let i = 0; i < 5; i++) {    
                    if(followingData[i]) {  
                        let img = document.createElement("img");
                        img.src = followingData[i].avatar_url;
                        img.classList.add('img-following');
                    followingList.append(img);
                    }
                }
            }

            xhrFollowers.onerror = function() {
                console.log("Something went wrong...");
            }
            
            xhrFollowing.onerror = function() {
                console.log("Something went wrong...");
            }

            xhr.onerror = function() {
                console.log("Something went wrong...");
            }
            xhr.send();
            xhrFollowers.send();
            xhrFollowing.send();
            input.value = "";
        }
/* Cat Image Code */

let cat = document.querySelector(".cat");
let getNewCat = document.querySelector("button");
function showCat() {
    cat.removeChild(cat.lastElementChild);
let xhrCat = new XMLHttpRequest;
xhrCat.open('GET','https://api.thecatapi.com/v1/images/search?limit=1&size=full');
xhrCat.onload = function() {
    let catData = JSON.parse(xhrCat.response);
    console.log(catData);
    let imgCat = document.createElement("img");
    imgCat.src = catData[0].url;
    console.log(imgCat);
    cat.append(imgCat);
}
xhrCat.send();
}

getNewCat.addEventListener('click', handleCat);

function handleCat() {
    showCat();
}
showCat();