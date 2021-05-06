/******************** Promise.all() ********************/
let times = [1, 2, 3, 4];

let timesPromise =  times.map((second) => new Promise((res) => {
    setTimeout(() => res(Math.random()), (second)*1000);
}))

Promise.all(timesPromise).then(console.log);

/******************** GitHub Users ********************/
let users = ['getify', 'prank7', 'suraj122', 'ravi11o', 'kumaarsachin'];
let url = 'https://api.github.com/users/';

let userPromise = users.map((user) => {
    return fetch(url + user)
    .then(res => res.json());
});

Promise.all(userPromise)
.then(users => 
    users.forEach((user) => {
        console.log(user.followers);
}
));

/******************** Promise.race() ********************/
let dogUrl = 'https://random.dog/woof.json';
let catUrl = 'https://aws.random.cat/meow';
let dogPromise = fetch(dogUrl).then((res) => res.json());
let catPromise = fetch(catUrl).then((res) => res.json());

let fastPromise = Promise.race([dogPromise, catPromise]).then(console.log);

// Another example for race()

let myPromise = new Promise((resolve,reject) => {
    setTimeout(resolve, 3000, 'My Promise');
});
let yourPromise = new Promise((resolve,rej) => {
    setTimeout(resolve, 1000, "Your Promise");
});

Promise.race([myPromise, yourPromise]).then(val => console.log(val, "first"));

Promise.race([   new Promise((res,rej) => {
                 setTimeout(res, 3000, "My Promise");
                }),
                 new Promise((res,rej) => {
                 setTimeout(res, 1000, "Your Promise");
                })]).then(val => console.log(val, "second"));

                
                const promise1 = new Promise((resolve, reject) => {
                    setTimeout(resolve, 500, 'one');
                  });
                  
                  const promise2 = new Promise((resolve, reject) => {
                    setTimeout(resolve, 100, 'two');
                  });
                  
                  Promise.race([promise1, promise2]).then((value) => {
                    console.log(value); 
                  })               