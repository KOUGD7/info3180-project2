/* Add your Application JavaScript */
// Instantiate our main Vue Instance
const app = Vue.createApp({
    data() {
        return {

        }
    }
});

app.component('app-header', {
    name: 'AppHeader',
    template: `
    <nav id="navbar1" class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <router-link class="nav-link text-white mr-5" to="/">United Auto Sales<span class="sr-only">(current)</span></router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse ml-5 float-right" id="navbarSupportedContent">    
      
      <ul  class="navbar-nav mr-auto">
      </ul>
    
      <ul v-if="seen" class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/cars/new">Add Car<span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to="/explore">Explore <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item active">
          <a class="nav-link" @click="myProfile">My Profile<span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <ul  class="navbar-nav mr-auto">
      </ul>
          
      <ul class = "navbar-nav">
        <li v-if="seen" class="nav-item active">
          <a @click="LogoutP" class="nav-link">Logout <span class="sr-only">(current)</span></a>
          <!-- <router-link @click="LogoutP" v-if="seen" class="nav-link" to="/logout">Logout <span class="sr-only">(current)</span></router-link> -->
        </li>
        <div v-else class = "navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/register">Register <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/login">Login <span class="sr-only">(current)</span></router-link>
          </li>
        </div>
      </ul>
    </div>
    </nav>
    `,
    created(){
      let self = this;
      self.seen = localStorage.auth;
      console.log(self.seen)
    },
    data() {
      return {
        user: [],
        seen: localStorage.auth,
      }   
  },
  methods: {
    myProfile(){
      let uid = localStorage.uid
      router.push(`/users/${uid}`);

    },
    LogoutP(){
      let self = this;
      var n = document.getElementById('navbar1');
      var content
      //self.seen = false;
      //localStorage.auth = false;
      fetch('/api/auth/logout',{
        method: 'GET',
        headers: {
        Authorization: "Bearer " + localStorage.token,
        'X-CSRFToken': token
      },
      credentials: 'same-origin'
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        localStorage.removeItem('uid')
        localStorage.removeItem('token')
        localStorage.removeItem('auth')
        console.log(localStorage)
        //refresh nav
        content = n.innerHTML
        n.innerHTML= content
        router.push('/login');
      }) 
      .catch(function (error) {
        console.log(error);
      });
    }
    
  }
});

app.component('app-footer', {
    name: 'AppFooter',
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; {{ year }} Flask Inc.</p>
        </div>
    </footer>
    `,
    data() {
        return {
            year: (new Date).getFullYear()
        }
    }
});

//--------------------------------------------------------------
const Home = {
    name: 'Home',
    template: `
    <app-header></app-header>
    <div class="home-page" style="position:absolute; top:0; right:0; bottom:0; left:0; width=100%;">
      <div class="row">

        <div class="column" style="float:left; width:50%; padding:50px; height:100%;">
          <div style="display:inline-block; margin:0 auto; padding:70px 70px 70px 70px;">
            <div class="row">
              <h1><strong>Buy and Sell Cars Online</strong></h1>
            </div>

            <div class="row">
              <p>United Auto Sales provides the fastest, easiest and most user
                 friendly way to buy or sell cars online. Find a Great Price on
                 the Vehicle You Want
              </p>
            </div>
          
            <div class="row">
              <div class="col-md-2 mr-auto">
                <button @click="goToRegister()" type="submit" class="register btn btn-primary btn-lg" style="background-color:#1E90FF; color:#FFFFFF; border:none;">Register</button>
              </div>

              <div class="col-md-2 mr-auto">
                <button @click="goToLogin()" type="submit" class="login btn btn-primary btn-lg" style="background-color:#04AA6D; color:#FFFFFF; border:none;">Login</button>
              </div>
            </div>
          </div>
      </div>

      <div class="column" style="float:left; width:50%;">
         <img class="img-fluid" src="/icon/home.jpg" alt="home-img">
       </div>

      </div>
    </div>

    `,
    data() {
        return {}
    },
      methods: {
        goToRegister(){
          this.$router.push('/register');
        },

        goToLogin(){
          this.$router.push('/login');
        }
    }
};

//--------------------------------------------------------------
const RegistrationForm = {
    name: 'registration-form',
    template: `
    <app-header></app-header>
    <h2 style="padding: 80px 70px 10px 220px;">Register New User</h2>
    
   
    <div v-if="message[0] == 'good'">
        <div class="alert alert-success" role="alert">
            <ul v-for="m in message[1]"> 
                <li>{{ m }}</li>
            </ul>
        </div>
    </div>
    <div v-if="message[0] == 'bad'">
        <div class="alert alert-warning" role="alert">
            <ul v-for="m in message[1]"> 
                <p>{{ m }}</p>
            </ul>
        </div>
    </div>

    <div style=" margin: 0 auto; width:60%; border: 2px solid #F0F0F0; background-color:#FFFFFF; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); border-radius: 5px;">
      <form @submit.prevent="uploadProfilePhoto" id="uploadprofile" method="post" style="margin: 0 auto; width:70%; padding: 40px 0px 40px 0px;">
          <div class="row">
            <div class= "col">
              <label>Username</label>
              <input type="text" class ="form-control" name="Username" placeholder="username">
            </div>
      
            <div class= "col">
              <label>Password</label>
              <input type="password" class ="form-control" name="Password" placeholder="password">
            </div>
          </div>

          <div class="row">
            <div class= "col">
              <label>Full name</label>
              <input type="text" class ="form-control" name="Name" placeholder="name">
            </div>
      
            <div class= "col">
              <label>Email</label>
              <input type="email" class ="form-control" name="Email" placeholder="email">
            </div>
          </div>

          <div class="row">
            <div class= "col">
              <label>Location</label>
              <input type="text" class ="form-control" name="Location" placeholder="location">
            </div>
          </div>
    
          <div class="form-group">
            <label>Biography</label>
            <textarea class="form-control" rows="5" id="des" name="Biography" placeholder="biography"></textarea>
          </div>
      
          <div class = "form-group">
            <label>Upload Photo</label>
            <input class ="form-control" type="file" name="photo">
          </div>

          <button type="submit" name="submit" class="btn btn-primary" style="background-color:#04AA6D;">Register</button>
      </form>
    </div>
    `,
    data() {
        return {
            message: []
        }
    },
    methods: {
        uploadProfilePhoto(){
            let self = this;
            let uploadprofile = document.getElementById('uploadprofile');
            let form_data = new FormData(uploadprofile);
  
            fetch("/api/register", {
                method: 'POST',
                body: form_data,
                headers: {
                    'X-CSRFToken': token
                    },
                    credentials: 'same-origin'
                })
                .then(function (response) {
                return response.json();
                })
                .then(function (jsonResponse) {
                // display a success message
                console.log(jsonResponse);
                if(jsonResponse.error){
                    self.message = ['bad', jsonResponse.error]
                }
                else{
                    //self.message = ['good',[jsonResponse]]
                }
                
                })
                .catch(function (error) {
                console.log(error);
                });
        }/* ,

        goToProfile(){
          this.$router.push('/api/users/<user_id>');
        } */
    }
};

//--------------------------------------------------------------
const Login = {
    name: 'login',
    template: `
    <app-header></app-header>
    <h2 style="padding-top:80px; text-align:center;">Login to your account</h2>
    <div v-if="message[0] == 'good'">
        <div class="alert alert-success" role="alert">
            <ul v-for="m in message[1]" > 
                <li>{{ m }}</li>
            </ul>
        </div>
    </div>
    <div v-if="message[0] == 'bad'">
        <div class="alert alert-warning" role="alert">
            <ul v-for="m in message[1]"> 
                <p>{{ m }}</p>
            </ul>
        </div>
    </div>
    
    <div style="padding: 40px 0px 195px 0px; background-color:#F0F0F0;">
      <div style=" margin: 0 auto; width:40%; border: 2px solid #F0F0F0; background-color:#FFFFFF; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); border-radius: 5px;">    
        <form @submit.prevent="loginPro" id="loginForm" method="post" style="margin: 0 auto; width:70%; padding: 40px 0px 40px 0px;">
      
            <div class= "form-group">
              <label>Username</label>
              <input type="text" class ="form-control" id="username" name="Username">
            </div>
      
            <div class= "form-group">
              <label>Password</label>
              <input type="password" class ="form-control" id="password" name="Password">
            </div>
        
            <button type="submit" name="submit" class="btn btn-primary btn-block" style="background-color:#04AA6D; border:none;">Login</button>
        </form>
      </div>
    </div>
    `,
    data() {
        return {
            message: []
        }
    },
    methods: {
      loginPro(){
        let self = this;
        let loginF = document.getElementById('loginForm');
        let form_data = new FormData(loginF);
        var n = document.getElementById('navbar1');
        /* let p = document.getElementById('username').value;
        let l = document.getElementById('password').value;
        console.log(form_data)
        console.log(p)
        console.log(l)*/
        fetch("/api/auth/login", {
          method: 'POST',
          body: form_data,
          headers: {
              'X-CSRFToken': token
              },
              credentials: 'same-origin'
          })
          .then(function (response) {
             return response.json();
            })
          .then(function (jsonResponse) {
          // display a success message
            console.log(jsonResponse);
            if(jsonResponse.error){
              self.message = ['bad', jsonResponse.error]
              }
            else{
              self.message = ['good',[jsonResponse.info.message]]
              let token = jsonResponse.info.token
              const tokenParts = token.split('.')
              const payload = JSON.parse(atob(tokenParts[1]))
              //console.log(payload)
              //Store User Infomation in Local Storage
              localStorage.uid = payload.id
              localStorage.token = token
              localStorage.auth = true
              //refresh nav
              content = n.innerHTML;
              n.innerHTML= content;
              router.push('/explore');
              }
              })
              .catch(function (error) {
                console.log(error);
              
              });
        }
    }
};

//------------------------------------------------------------
const Logout = {
    name: 'logout',
    template: `<app-header></app-header>`,
    data() {
        return {
            message: []
        }
    },
    created(){
      fetch('/api/auth/logout',{
        method: 'GET',
        headers: {
        Authorization: "Bearer " + localStorage.token,
        // 'Authorization': 'Bearer <>'
        'X-CSRFToken': token
      },
      credentials: 'same-origin'
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        localStorage.removeItem('uid')
        localStorage.removeItem('token')
        localStorage.removeItem('auth')
        console.log(localStorage.auth)
        router.push('/');
      }) 
      .catch(function (error) {
        console.log(error);
      });
      
    }

};

//--------------------------------------------------------------
const Explore = {
    name: 'explore',
    template: `
    <app-header></app-header>
    <h2 style="text-align:left; padding: 80px 70px 10px 55px;">Explore</h2>

    <div style="margin: 0 auto; width:90%; border: 2px solid #F0F0F0; background-color:#FFFFFF; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); border-radius: 5px; padding:20px; display:block; text-align:center;">
      <form @submit.prevent="searchCar" id="searchForm" method="get" class="form-inline">
        
        <label for="search" style="padding-left:150px;">Make</label>
        <input type="search" name="make" id="make" class="form-control m-2"/>

        <label for="search">Model</label>
        <input type="search" name="model" id="model" class="form-control m-2"/>
          
        <div>
          <button class="btn btn-md m2-2 text-white" style="padding:6px 20px 6px 20px; background-color:#04AA6D;">Search</button>
        </div>
        
      </form>
    </div>

    <br>
    <br>

    <div class="car-list d-flex flex-row">
      <ul class="car-list d-flex flex-row flex-wrap">

        <div v-for="car in cars" class="card m-2" style="width:21rem;">
          <img v-bind:src=car.photo alt="car photo" class="card-img-top rounded-top" style="width:100%;"/>
          <div class="card-body mb-1">
            <div class="mb-2 d-flex flex-row flex-wrap justify-content-between">
              <div class="mr-0 mb-1">
                <h4 class="mb-0 font-weight-bold">{{car.year}} {{car.make}}</h4>
                <p class="my-1">{{car.model}}</p>
              </div>

              <div class="h-25 p-1 m-1" style="background-color:#04AA6D; border-radius:10px; color:#FFFFFF;">
                <img class="pr-1" src="/icon/iconfinder_tag.png" style="">{{car.price}}
              </div>
            </div>
             
            <div class="card-text mb-1 mt d-flex flex-row flex-wrap">
              <button class="btn btn-primary btn-block mb-2" @click="goToCarDetails(car.id)">ViewDetails</button>
            </div>
          </div>
        </div>
      </ul>
    </div>   
    
    `,
    created() {
      let self = this;
      fetch('/api/cars',{
        method: 'GET',
        headers: {
        // JWT requires the Authorization schema to be `Bearer` instead of `Basic`
        Authorization: "Bearer " + localStorage.token,
        'X-CSRFToken': token
      },
      credentials: 'same-origin'
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        if(data.code){
          router.push('/login');
        }
        else{
          self.cars = data.cars;
        }
        
      });
    },
    data() {
        return {
            cars: [],
            message:[]
        }
    },
    methods: {
       searchCar(){
        let self = this;
        let model = document.getElementById('model').value;
        let make = document.getElementById('make').value;
        //console.log(model);
        //console.log(make);

        fetch(`/api/search?model=${model}&make=${make}`, {
            method: 'GET',
            headers: {
              Authorization: "Bearer " + localStorage.token,
                'X-CSRFToken': token
                },
                credentials: 'same-origin'
            })
            .then(function (response) {
            return response.json();
            })
            .then(function (jsonResponse) {
            // display a success message
            console.log(jsonResponse);
            if(jsonResponse.error){
                self.message = ['bad', jsonResponse.error]
            }
            self.cars = jsonResponse.cars;
            
            })
            .catch(function (error) {
            console.log(error);
            });
      },

      goToCarDetails(cid){
        this.$router.push(`/cars/${cid}`);

      }
    }
};

//--------------------------------------------------------------
const CarDetails = {
  name: 'car-details',
  template: `
  <app-header></app-header>
  <div class="container-fluid mb-5">
    <div class="card mb-5 w-100" style="flex-direction: row;">
      <img v-bind:src = car.photo class="card-img w-50" alt="Cars Logo">
      <div class="card-body">
        <h1 class="card-title font-weight-bold mb-1">{{car.year}} {{car.make}}</h1>
        <h4 class="card-title text-muted mt-1 mb-4">{{car.model}}</h4>
        
        <p class="card-text text-muted">{{car.description}}</p>
        <br>

        <div class="row">
          <div class="col d-flex flex-row flex-wrap">            
            <p class="card-text">Colour: &nbsp</p>
            <p class="card-text font-weight-bold">{{car.colour}}</p>
          </div>
          <div class="col d-flex flex-row flex-wrap">
            <p class="card-text">Body Type: &nbsp &nbsp &nbsp</p>
            <p class="card-text font-weight-bold">{{car.car_type}}</p> 
          </div>            
          <div class="w-100"></div>
          <div class="col d-flex flex-row flex-wrap">
            <p class="card-text">Price: &nbsp &nbsp</p>
            <p class="card-text font-weight-bold">{{car.price}}</p>
          </div>
          <div class="col d-flex flex-row flex-wrap">
            <p class="card-text">Transmission: &nbsp </p>
            <p class="card-text font-weight-bold">{{car.transmission}}</p>
          </div>
        </div>             
        
        <br>
        <br>
        

        <div class="mx-3" id="prop-btn">
          <div class="row">
            <button type="submit" name="submit" class="col btn text-white" style="background-color:#04AA6D;">Email Owner</button>
            <a @click="addToFavourites(car.id)" class="col clickable" >
              <img id="like-img" alt="Like" class="m-2 float-right" style="width: 15%;" src="/icon/like.png">
            </a>
          </div>
          
          <!--<button type="submit" name="submit" class="btn btn-primary" @click="addToFavourites(car.id)">Like</button>-->
          

        </div>
      </div>
    </div>
  </div>
  `,
  data() {
      return {
          car: [],
          message: []
      }
  },
  methods: {
    addToFavourites(car_id){
      let self = this;
      let host = window.location.protocol + "//" + window.location.host;
      //fetch(`api/cars/${car_id}/favourite`,{
      fetch(`${host}/api/cars/${car_id}/favourite`,{
        method: 'POST',
        headers: {
          Authorization: "Bearer " + localStorage.token,
          'X-CSRFToken': token
          },
          credentials: 'same-origin'
      })
          .then(function (response) {
            return response.json();
      })
             .then(function(data){
                console.log(data);
                //self.car = data.car;
      });
    }
  },
  created() {
    let self = this;
    fetch(`/api/cars/${self.$route.params.car_id}`,{
      method: 'GET', 
      headers: {
      Authorization: "Bearer " + localStorage.token,
      // 'Authorization': 'Bearer <>'
      'X-CSRFToken': token
    },
    credentials: 'same-origin'
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      self.car = data.car;

    });
  },
};

//--------------------------------------------------------------
const User = {
  name: 'user',
  template:`
    <app-header></app-header>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 mt-3">
            <div class="card"  style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);">
              <div class="card-horizontal"> 
                <div class="card-img" style="width:40%;"> 
                  <img v-bind:src = user.photo class="card-img-top" alt="profilephoto" id="profilephoto" style="border-radius:50%;padding:20px;">
                </div>  

                <div class="card-body text-left w-75 p-5">
                  <h2 class="card-title font-weight-bold">{{user.name}}</h2>
                  <h4 class="card-title text-muted">@{{user.username}}</h4>
                  <p class="card-text text-muted">{{user.biography}}</p>
                  <br>
                  <div class="mb-1 d-flex flex-row flex-wrap">
                    <p class="card-text text-left">Email:  &nbsp &nbsp &nbsp &nbsp  &nbsp</p>
                    <p class="card-text text-left font-weight-bold">{{user.email}}</p>
                  </div>
                  <div class="mb-1 d-flex flex-row flex-wrap">
                    <p class="card-text text-left">Location:   &nbsp &nbsp</p>
                    <p class="font-weight-bold">{{user.location}}</p>
                  </div>
                  <div class="mb-1 d-flex flex-row flex-wrap">
                    <p class="card-text text-left">Joined:  &nbsp &nbsp &nbsp  &nbsp</p>
                    <p class="font-weight-bold">{{user.date_joined}}</p>
                  </div> 
                </div>   
              </div> 
            </div>
          </div>
        </div> 
      </div>
    <br>

    <div>
      <h2 class="text-left font-weight-bold" style="padding: 10px 70px 10px 60px;">Cars Favourited</h2>
    </div>

    <div class="car-list d-flex flex-row">
      <ul class="car-list d-flex flex-row flex-wrap">

        <div v-for="car in favourites" class="card m-2" style="width:21rem;">
          <img v-bind:src=car.photo alt="car photo" class="card-img-top rounded-top" style="width:100%;"/>
          <div class="card-body mb-1">
            <div class="mb-2 d-flex flex-row flex-wrap justify-content-between">
              <div class="mr-0 mb-1">
                <h4 class="mb-0 font-weight-bold">{{car.year}} {{car.make}}</h4>
                <p class="my-1">{{car.model}}</p>
              </div>

              <div class="h-25 p-1 m-1" style="background-color:#04AA6D; border-radius:10px; color:#FFFFFF;">
                <img class="pr-1" src="/icon/iconfinder_tag.png" style="">{{car.price}}
              </div>
            </div>
             
            <div class="card-text mb-1 mt d-flex flex-row flex-wrap">
              <button class="btn btn-primary btn-block mb-2" @click="goToCarDetails(car.id)">ViewDetails</button>
            </div>
          </div>
        </div>
      </ul>
    </div>
  `,
    created()
    {
      let self = this;
      let uid = localStorage.uid

      fetch(`/api/users/${self.$route.params.user_id}`, {
          method: 'GET',
          headers: {
            Authorization: "Bearer " + localStorage.token,
              'X-CSRFToken': token
              },
              credentials: 'same-origin'
          })
             .then(function(response){
                return response.json();
             })
             .then(function(data){
                console.log(data);
                if(data.code){
                  router.push('/login');
                }
                self.user = data.user;
             });

      fetch(`/api/users/${uid}/favourites`, {
              method: 'GET',
              headers: {
                Authorization: "Bearer " + localStorage.token,
                  'X-CSRFToken': token
                  },
                  credentials: 'same-origin'
              })
                 .then(function(response){
                    return response.json();
                 })
                 .then(function(data){
                    console.log(data);
                    self.favourites = data.cars;
                 });
    },
    methods: {
      goToCarDetails(cid){
        this.$router.push(`/cars/${cid}`);

      }
    },
    data(){
      return{
        user: [],
        favourites: []
  
      }
  }
};

//--------------------------------------------------------------
const CarForm = {
    name: 'upload-form',
    template: `
    <app-header></app-header>
    <h2 style="padding: 80px 70px 10px 110px;">Add New Car</h2>
    <div v-if="message[0] == 'good'">
        <div class="alert alert-success" role="alert">
            <ul v-for="m in message[1]" > 
                <li>{{ m }}</li>
            </ul>
        </div>
    </div>
    <div v-if="message[0] == 'bad'">
        <div class="alert alert-warning" role="alert">
            <ul v-for="m in message[1]"> 
                <p>{{ m }}</p>
            </ul>
        </div>
    </div>
    <div style=" margin: 0 auto; width:80%; border: 2px solid #F0F0F0; background-color:#FFFFFF; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); border-radius: 5px;">
    <form @submit.prevent="uploadCarPhoto" id="uploadCar" method="post" style="margin: 0 auto; width:80%; padding: 40px 0px 40px 0px;">
        <div class="row">
          <div class= "col">
            <label>Make</label>
            <input type="text" class ="form-control" name="Make" placeholder="make">
          </div>
    
          <div class= "col">
            <label>Model</label>
            <input type="text" class ="form-control" name="Model"  placeholder="model">
          </div>
        </div>

        <div class="row">
          <div class= "col">
            <label>Colour</label>
            <input type="text" class ="form-control" name="Colour"  placeholder="colour">
          </div>
    
          <div class= "col">
            <label>Year</label>
            <input type="text" class ="form-control" name="Year"  placeholder="year">
          </div>
        </div>

        <input type="hidden" class ="form-control" name="User" :value=uid>
  
        <div class="row">
          <div class= "col">
            <label>Price</label>
            <input type="text" class ="form-control" name="Price"  placeholder="price">
          </div>
    
          <div class= "col">
            <label>Car Type</label>
            <select id="Car_Type" name="Car_Type" class ="form-control"  placeholder="Select Car Type">
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Truck">Truck</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class= "col">
            <label>Transmission</label>
            <select id="Transmission" name="Transmission" class ="form-control"  placeholder="transmission">
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
        </div>

        <div class= "form-group">
          <label>Description</label>
          <textarea class ="form-control" name="Description" placeholder="Description"  placeholder="description"></textarea>
        </div>
  
        <div class = "form-group">
          <label>Photo Upload</label>
          <input class ="form-control" type="file" name="photo">
        </div>
        <button type="submit" name="submit" class="btn btn-primary" style="background-color:#04AA6D; border:none; padding: 5px 50px 5px 50px;">Save</button>
    </form>
    </div>
    `,
    data() {
        return {
            message: [],
            uid: localStorage.uid
        }
    },
    methods: {
        uploadCarPhoto(){
            let self = this;
            let uploadCar = document.getElementById('uploadCar');
            let form_data = new FormData(uploadCar);
  
            fetch("/api/cars", {
                method: 'POST',
                body: form_data,
                headers: {
                    Authorization: "Bearer " + localStorage.token,
                    'X-CSRFToken': token
                    },
                    credentials: 'same-origin'
                })
                .then(function (response) {
                return response.json();
                })
                .then(function (jsonResponse) {
                // display a success message
                console.log(jsonResponse);
                if(jsonResponse.error){
                    self.message = ['bad', jsonResponse.error]
                }
                else if(jsonResponse.code){
                  self.message = ['bad', ["Please Login"]]
                  router.push('/login');
                }
                else{
                    self.message = ['good',["Car Sucessfully Added"]]
                }
                
                })
                .catch(function (error) {
                console.log(error);
                });
        }
    }
};

const NotFound = {
    name: 'NotFound',
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data() {
        return {}
    }
};

// Define Routes
const routes = [
    { path: "/", component: Home },
    // Put other routes here
    { path: '/register', component: RegistrationForm },
    { path: '/login', component: Login },
    { path: '/logout', component: Logout },
    { path: '/explore', component: Explore },
    { path: '/users/:user_id', component: User },
    { path: '/cars/new', component: CarForm },
    { path: '/cars/:car_id', component: CarDetails },
    // This is a catch all route in case none of the above matches
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');