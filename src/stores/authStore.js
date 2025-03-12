import { defineStore } from 'pinia'


export const useAuthStore = defineStore('auth',
{
state: () => ({ 
    user: {
isAuthenticated: localStorage.getItem("token") ? true : false, // check if the user is authenticated
username:"",  // default is null and will be set to the username
token: "", // stores the  authentication token
}
}),

actions: {

    // save token and username to the both the store and local storage
setToken(token, username){
    // save the token and username in the store when the user logs in
this.user.token = token;
this.user.username = username;
this.user.isAuthenticated = true;

localStorage.setItem('token', token);
localStorage.setItem('username', username);
},

removeToken(){
this.user.token = null;
this.user.username = null;
this.user.isAuthenticated = false;


localStorage.clear();
localStorage.removeItem('token');
localStorage.removeItem('username');
// },


}
}
})

