<script setup lang="ts">
import { ref } from 'vue';
import { getSession, useLogin } from '../models/session'

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

const { login, logout } = useLogin()

function handleLogin() {
    login(email.value, password.value)
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
            <div v-if="session.user" class="navbar-item">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>{{ session.user.userName }}</strong>
                    </a>
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
                    <label class="label">Password</label>
                    <input class="input" type="password" placeholder="Password" v-model="password">
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button @click="closeSignUpModal" class="button is-link">Sign up</button>
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

<style scoped></style>
