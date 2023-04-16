let userform = document.getElementById('userform');
let username = document.getElementById('name');
let useremail = document.getElementById('email');
let usergender = document.getElementsByName('gender');
let selgender = '';

//localstorage config
let users = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : [];

//to generate random Id - arrow function
const genRanId = () => {
    let ranId = Math.floor(Math.random() * 10000);
    return ranId;
};
//form submit Handler
userform.addEventListener('submit', function(e){
    e.preventDefault();// to avoid page refresh

    // to pick value from selected radio input
    for(let i=0; i< usergender.length; i++){
        if(usergender[i].checked){
            selgender = usergender[i].value;
        }
    }
    //object
    let data = {
        id: genRanId(),
        name: username.value,
        email: useremail.value,
        gender: selgender
    };
    console.log('new user =',data);
    createUser(data)
});
// to create new user
function createUser(user){
    let exUser = users.find((item) => item.email === user.email);
        console.log('exUser=',exUser);    
    if(exUser){ 
            alert('user email already registered.');
        } else {
            //save
            users.push(user);
            localStorage.setItem("userInfo", JSON.stringify(users))
            alert('new user created successfully');
            window.location.href = "index.html";
        }
};




