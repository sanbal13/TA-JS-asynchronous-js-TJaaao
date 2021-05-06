/************ Promise all ************/
const one1 = new Promise((resolve, reject) =>
        setTimeout(()=> resolve(1), 1000)
);
const two2 = new Promise((resolve, reject) =>
        setTimeout(()=> resolve(2), 2000)
);
const three3 = new Promise((resolve, reject) =>
        setTimeout(()=> resolve(3), 3000)
);
const four4 = new Promise((resolve, reject) =>
        setTimeout(()=> resolve(4), 4000)
);

let all =  Promise.all([one1, two2, three3, four4])
           .then((res) => console.log(res));

/************ GitHub Users ************/
let username = [
    'getify',
    'gaearon',
    'AArnott',
    'subtleGradient',
    'piranha',    
];           

const url = 'https://api.github.com/users/';

const userFollowerData = Promise.all(username.map((user) => {
    return fetch(url + user)
    .then((res) => res.json())
})).then((users) => users.forEach((user) => {
    console.log(user.followers);
}));

/************ Promise.race() ************/

const dog = fetch(`https://random.dog/woof.json`);
const cat = fetch(`https://aws.random.cat/meow`);

console.log(Promise.race([dog, cat]));

/************ Promise.allSettled() ************/
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

let allSettled = Promise.allSettled([one, two, three]);
let allOnly = Promise.all([one, two, three]);
console.log(allSettled);
console.log(allOnly);
