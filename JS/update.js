// logic to read querry string from url
const params = new Proxy(new URLSearchParams(window .location.search),{
    get:(searchParams,prop)=> searchParams.get(prop)
});

console.log("params=",params.userId);

//localstorage config
let users = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : [];
 
let single = users.find((item) => item.id == params.userId)
console.log('single user=',single)

let userform = document.getElementById('userform');
let username = document.getElementById('name');
let useremail = document.getElementById('email');
let usergender = document.getElementsByName('gender');
let selgender = '';

username.value = single.name;
useremail.value = single.email;

// reading data from storage and selecting the checkbox
for(let i=0; i< usergender.length; i++){
    if(usergender[i].value === single.gender){
        usergender[i].checked = true;
    }
};

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
        id: single.id,
        name: username.value,
        email: useremail.value,
        gender: selgender
    };
    console.log('Updated user =',data);
    updateUser(data)
});

//update the user info
function updateUser(data){
    let index = users.findIndex((item) => item.id === data.id)
    console.log('update user id = ',index)

      //splice(index,deletecount,data)
      users.splice(index,1,data)
    //   users.push(data)  if we use push then it will be push data at the end
      localStorage.setItem('userInfo',JSON.stringify(users))
      alert('user data updated successfully')
      window.location.href = "/index.html"
}
