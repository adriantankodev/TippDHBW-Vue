<template>
    <header class="header text-center">
        <h1>Register</h1>
    </header>

    <div class="container">
        <form class="col-md-4 mx-auto">
            <div class="form-floating mb-3">
                <input type="text" v-model="username" class="form-control" id="floatingUser" placeholder="name">
                <label for="floatingUser">Username</label>
            </div>
            <div class="form-floating mb-3">
                <input type="email" v-model="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" v-model="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>
            <div class="mb-3 align-items-center">
                <button type="button" @click="register" class="btn btn-primary col-auto me-3">Register</button>
                <span class="form-text col-auto me-2">Du hast schon einen Account?</span>
                <a class="link-primary" style="cursor: pointer" v-on:click="login()">Login</a>
            </div>
            <div class="alert alert-info" role="alert" v-show="alert">
                {{ message }}
            </div>
        </form>
    </div>
</template>

<script>

import router from '../../router';
import { register } from '../../auth';

export default {
    name: 'RegisterView',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            message: '',
            alert: false
        }
    },
    methods: {
        async register() {
            const response = await register(this.username, this.email, this.password);
            this.message = response.msg;

            this.alert = true;
            setTimeout(() => {
                this.alert = false;
            }, 3000);

            if(response.redirect !== null) {
                router.push({path: response.redirect});
            }
        },
        login() {
            const redirect = new URLSearchParams(window.location.search).get('redirect');
            router.push('/login?redirect=' + redirect);
        }
    }
}

</script>

<style>
header {
    margin-top: 1rem;
    margin-bottom: 1rem;
}
</style>