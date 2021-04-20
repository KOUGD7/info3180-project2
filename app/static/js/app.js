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
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">United Auto Sales</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/upload">Upload <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/cars/new">Add Car<span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
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

const UploadForm = {
    name: 'upload-form',
    template: `
    <h2>Upload Form</h2>
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
    
    <form @submit.prevent="uploadPhoto" id="uploadForm" method="post">
        <div class= "form-group">
            <label>Description</label>
            <textarea class ="form-control" name="description" placeholder="Description"></textarea>
        </div>
        <div class = "form-group">
            <label>Photo Upload</label>
            <input class ="form-control" type="file" name="photo">
        </div>
        <button type="submit" name="submit" class="btn btn-primary">Upload</button>
    </form>
    `,
    data() {
        return {
            message: []
        }
    },
    methods: {
        uploadPhoto(){
            let self = this;
            let uploadForm = document.getElementById('uploadForm');
            let form_data = new FormData(uploadForm);

            fetch("/api/upload", {
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
                }
                
                })
                .catch(function (error) {
                console.log(error);
                });
        }
    }
};

//--------------------------------------------------------------

const CarForm = {
    name: 'upload-form',
    template: `
    <h2>Add New Car</h2>
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
    
    <form @submit.prevent="uploadCarPhoto" id="uploadCar" method="post">
  
        <div class= "form-group">
          <label>Make</label>
          <input type="text" class ="form-control" name="Make"></input>
        </div>
  
        <div class= "form-group">
          <label>Model</label>
          <input type="text" class ="form-control" name="Model"></input>
        </div>
  
        <div class= "form-group">
          <label>Colour</label>
          <input type="text" class ="form-control" name="Colour"></input>
        </div>
  
        <div class= "form-group">
          <label>Year</label>
          <input type="text" class ="form-control" name="Year"></input>
        </div>
  
        <div class= "form-group">
          <label>Price</label>
          <input type="text" class ="form-control" name="Price"></input>
        </div>
  
        <div class= "form-group">
          <label>Car Type</label>
          <select id="Car_Type" name="Car_Type" class ="form-control">
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Truck">Truck</option>
          </select>
        </div>
  
        <div class= "form-group">
          <label>Transmission</label>
          <select id="Transmission" name="Transmission" class ="form-control">
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>
  
        <div class= "form-group">
          <label>Description</label>
          <textarea class ="form-control" name="Description" placeholder="Description"></textarea>
        </div>
  
        <div class = "form-group">
          <label>Photo Upload</label>
          <input class ="form-control" type="file" name="photo">
        </div>
        <button type="submit" name="submit" class="btn btn-primary">Upload</button>
    </form>
    `,
    data() {
        return {
            message: []
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
                    self.message = ['good',[jsonResponse.car.message]]
                }
                
                })
                .catch(function (error) {
                console.log(error);
                });
        }
    }
  };

//----------------------------------------------------------------
const Home = {
    name: 'Home',
    template: `
    <div class="jumbotron">
        <h1>United Auto Sales</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
    `,
    data() {
        return {}
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
    { path: '/upload', component: UploadForm },
    { path: '/cars/new', component: CarForm },
    // This is a catch all route in case none of the above matches
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');