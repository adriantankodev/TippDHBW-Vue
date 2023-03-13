<template>
    <div class="header">
        <h1>Profile</h1>
    </div>
    <div class="container">
        <div class="col-md-6 mx-auto row">
            <table class="table table-borderless">
            <tbody>
                <tr>
                    <th scope="row"><b>User ID</b></th>
                    <td>{{ user.userId }}</td>
                </tr>
                <tr>
                    <th scope="row"><b>Username</b></th>
                    <td>{{ user.username }}</td>
                </tr>
                <tr>
                    <th scope="row"><b>Email</b></th>
                    <td>{{ user.email }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2">
                        <button type="button" class="btn btn-primary" v-on:click="logout()">Logout</button>
                    </td>
                </tr>
            </tfoot>
        </table>
        </div>
    </div>
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
    methods: {
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

<style>
header {
    margin-top: 1rem;
    margin-bottom: 1rem;
}
</style>