<script setup lang="ts">
import { ref } from 'vue';
import { getSession, useLogin } from '../models/session'
import { createUser } from '../models/users'

const session = getSession();

const signUpModal = ref(false);
const loginModal = ref(false);

function openLoginModal() {
    loginModal.value = true;
}
function closeLoginModal() {
    loginModal.value = false;
}

function openSignUpModal() {
    signUpModal.value = true;
}
function closeSignUpModal() {
    signUpModal.value = false;
}

// TODO: remove from production!
const password = ref('testing123');
const email = ref('test@mail.com');
const username = ref('');
const firstName = ref('');
const lastName = ref('');

const { login, logout } = useLogin()

function handleLogin() {
    login(email.value, password.value)
}

async function handleCreateUser() {
    try {
        const newUser = await createUser({
            userName: username.value,
            email: email.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value,
            friends: [],
            events: []
        });

        console.log('New user created:', newUser);

        closeSignUpModal();

        handleLogin();
    } catch (error) {
        console.error('Error creating user:', error);
    }
}
</script>

<template>
    <div>
        <div class="navbar-item" style="margin-top: 3px;">
            <div v-if="!session.user" class="buttons">
                <a @click="openSignUpModal" v-if="!session.user" class="button is-primary">
                    <strong>Sign up</strong>
                </a>
                <a @click="openLoginModal" v-if="!session.user" class="button is-light">
                    Log in
                </a>
            </div>
            <div v-if="session.user" class="navbar-item custom-text-color badge">
                <div style="margin-right: 10px;">
                    Welcome, {{ session.user.firstName }} {{ session.user.lastName }}
                </div>
                <div class="buttons">
                    <a @click="logout" v-if="session.user" class="button is-light">
                        Log out
                    </a>
                </div>
            </div>
        </div>
    </div>
    <!-- Sign up Modal -->
    <div class="modal" :class="{ 'is-active': signUpModal }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <div class="field">
                    <label class="label">Username</label>
                    <input class="input" type="text" placeholder="Username" v-model="username">
                </div>
                <div class="field">
                    <label class="label">Email</label>
                    <input class="input" type="email" placeholder="Email" v-model="email">
                </div>

                <div class="field">
                    <label class="label">First Name</label>
                    <input class="input" type="text" placeholder="First name" v-model="firstName">
                </div>

                <div class="field">
                    <label class="label">Last Name</label>
                    <input class="input" type="text" placeholder="Last name" v-model="lastName">
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <input class="input" type="password" placeholder="Password" v-model="password">
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button @click="handleCreateUser" class="button is-link">Sign up</button>
                    </div>
                    <div class="control">
                        <button @click="closeSignUpModal" class="button is-link is-light">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <button @click="closeSignUpModal" class="modal-close is-large" aria-label="close"></button>
    </div>
    <!-- Login Modal -->
    <div class="modal" :class="{ 'is-active': loginModal }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <div class="field">
                    <label class="label">Username or Email</label>
                    <input class="input" type="text" placeholder="Username or Email" v-model="email">
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <input class="input" type="password" placeholder="Password" v-model="password">
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button @click.prevent="closeLoginModal(); handleLogin()" class="button is-link">Login</button>
                    </div>
                    <div class="control">
                        <button @click="closeLoginModal" class="button is-link is-light">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <button @click="closeLoginModal" class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<style scoped>
.badge {
  display: flex;
  align-items: center;
  line-height: 1em;
}
.custom-text-color {
  color: whitesmoke;
}
</style>
