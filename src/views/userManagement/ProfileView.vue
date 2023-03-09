<template>
    <p>User ID: {{ user.userId }}</p>
    <p>Username: {{ user.username }}</p>
    <p>Email: {{ user.email }}</p>
    <button v-on:click="logout()">Logout</button>
</template>

<script>

import { validateToken } from '../../auth';

import router from '../../router';

export default {
    name: 'ProfileView',
    data() {
        return {
            user: {
                userId: '',
                username: '',
                email: ''
            }
        }
    },
    methods : {
        async getUser() {
            const response = await validateToken(JSON.parse(localStorage.getItem('token')))
            this.user = response.user;
        },
        logout() {
            localStorage.removeItem('token');
            router.push('/login');
        }
    },
    created() {
        this.getUser();
    }
}

</script>