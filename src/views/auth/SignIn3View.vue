<script setup>
import { useTemplateStore } from "@/stores/template";
// import { useCounterstore } from "@/stores/counter";
import { ref } from "vue";
import {useRouter, RouterLink} from 'vue-router';
import axios from "axios";

// Main store and Router
const store = useTemplateStore();
// const counterStore = useCounterstore();

// sign in form submit
const username = ref('')
const password = ref('')
const router =  useRouter();
const errors = ref({});



const onSubmit = async() => {
  console.log("Attempt to submit")
  try{
    const response = await axios.post( '/v1/auth/login', {
      username: username.value,
      password: password.value,
    });

  console.log("Login successful",response.data);
  console.log("Full Response:", response);


//storing the token
localStorage.setItem("token", response.data.dataPayload.data.token);

  router.push({ name: 'dashboard' });

  }catch (error) {
    if (error.response.data.errorPayload){
      errors.value= error.response.data.errorPayload.errors || {};
    }
    console.log("what error n",error);
  }

};


</script>

<template>
  <!-- Page Content -->
  <BaseBackground image="/assets/media/photos/photo28@2x.jpg">
    <div class="row g-0 bg-primary-dark-op">
      <!-- Meta Info Section -->
      <div
        class="hero-static col-lg-4 d-none d-lg-flex flex-column justify-content-center"
      >
        <div class="p-4 p-xl-5 flex-grow-1 d-flex align-items-center">
          <div class="w-100">
            <RouterLink
              :to="{ name: 'dashboard' }"
              class="link-fx fw-semibold fs-2 text-white"
            >
              One<span class="fw-normal">UI</span>
            </RouterLink>
            <p class="text-white-75 me-xl-8 mt-2">
              Welcome to your amazing app. Feel free to login and start managing
              your projects and clients.
            </p>
          </div>
        </div>
        <div
          class="p-4 p-xl-5 d-xl-flex justify-content-between align-items-center fs-sm"
        >
          <p class="fw-medium text-white-50 mb-0">
            <strong>{{ store.app.name + " " + store.app.version }}</strong>
            &copy; {{ store.app.copyright }}
          </p>
          <ul class="list list-inline mb-0 py-2">
            <li class="list-inline-item">
              <a class="text-white-75 fw-medium" href="javascript:void(0)"
                >Legal</a
              >
            </li>
            <li class="list-inline-item">
              <a class="text-white-75 fw-medium" href="javascript:void(0)"
                >Contact</a
              >
            </li>
            <li class="list-inline-item">
              <a class="text-white-75 fw-medium" href="javascript:void(0)"
                >Terms</a
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- END Meta Info Section -->

      <!-- Main Section -->
      <div
        class="hero-static col-lg-8 d-flex flex-column align-items-center bg-body-extra-light"
      >
        <div class="p-3 w-100 d-lg-none text-center">
          <RouterLink
            :to="{ name: 'dashboard' }"
            class="link-fx fw-semibold fs-3 text-dark"
          >
            One<span class="fw-normal">UI</span>
          </RouterLink>
        </div>
        <div class="p-4 w-100 flex-grow-1 d-flex align-items-center">
          <div class="w-100">
            <!-- Header -->
            <div class="text-center mb-5">
              <p class="mb-3">
                <i class="fa fa-2x fa-circle-notch text-primary-light"></i>
              </p>
              <h1 class="fw-bold mb-2">Sign In</h1>
              <p class="fw-medium text-muted">
                Welcome, please login or
                <RouterLink :to="{ name: 'auth-signin3' }">sign up</RouterLink>
                for a new account.
              </p>
            </div>
            <!-- END Header -->

            <!-- Sign In Form -->
            <div class="row g-0 justify-content-center">
              <div class="col-sm-8 col-xl-4">
                <form @submit.prevent="onSubmit">
                  <div class="mb-4">
                    <input
                      type="text"
                      class="form-control form-control-lg form-control-alt py-3  "
                      id="login-username"
                      name="login-username"
                      placeholder="Username"
                      v-model= "username"
                      :class="{ 'border-danger bg-transparent': errors.username }"
                      
                    />
                    <div v-if="errors.username" class="text-danger " style = " font-size: 13px;"> {{ errors.username }} </div>
                    
                  </div>
                  <div class="mb-4">
                    <input
                      type="password"
                      class="form-control form-control-lg form-control-alt py-3"
                      id="login-password"
                      name="login-password"
                      placeholder="Password"
                      v-model="password"
                      :class="{ 'border-danger bg-transparent': errors.username }"

                    />
                    <div v-if="errors.password" class="text-danger" style = " font-size: 13px;"> {{ errors.password }} </div>

                  </div>
                  
                  <div
                    class="d-flex justify-content-between align-items-center mb-4"
                  >
                    <div>
                      <RouterLink
                        :to="{ name: 'auth-signin3' }"
                        class="text-muted fs-sm fw-medium d-block d-lg-inline-block mb-1"
                      >
                        Forgot Password?
                      </RouterLink>
                    </div>
                    <div>
                      <button type="submit" class="btn btn-lg btn-alt-primary">
                        <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i>
                        Sign In
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <!-- END Sign In Form -->
          </div>
        </div>
        <div
          class="px-4 py-3 w-100 d-lg-none d-flex flex-column flex-sm-row justify-content-between fs-sm text-center text-sm-start"
        >
          <p class="fw-medium text-black-50 py-2 mb-0">
            <strong>{{ store.app.name + " " + store.app.version }}</strong>
            &copy; {{ store.app.copyright }}
          </p>
          <ul class="list list-inline py-2 mb-0">
            <li class="list-inline-item">
              <a class="text-muted fw-medium" href="javascript:void(0)"
                >Legal</a
              >
            </li>
            <li class="list-inline-item">
              <a class="text-muted fw-medium" href="javascript:void(0)"
                >Contact</a
              >
            </li>
            <li class="list-inline-item">
              <a class="text-muted fw-medium" href="javascript:void(0)"
                >Terms</a
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- END Main Section -->
    </div>
  </BaseBackground>
  <!-- END Page Content -->
</template>
