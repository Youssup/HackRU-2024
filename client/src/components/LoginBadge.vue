<script setup lang="ts">
import { ref } from 'vue';

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
</script>

<template>
    <div>
        <div class="navbar-item">
            <div class="buttons">
                <a @click="openSignUpModal" class="button is-primary">
                    <strong>Sign up</strong>
                </a>
                <a @click="openLoginModal" class="button is-light">
                    Log in
                </a>
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
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-success" type="text" placeholder="Username">
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </div>
                    <p class="help is-success">This username is available</p>
                </div>

                <div class="field">
                    <label class="label">Email</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-danger" type="email" placeholder="Email">
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-exclamation-triangle"></i>
                        </span>
                    </div>
                    <p class="help is-danger">This email is invalid</p>
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-danger" type="password" placeholder="Password">
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-exclamation-triangle"></i>
                        </span>
                    </div>
                    <p class="help is-danger">This password is invalid</p>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button @click="closeSignUpModal" class="button is-link">Submit</button>
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
                        <input class="input" type="text" placeholder="Username or Email">
                </div>

                <div class="field">
                    <label class="label">Password</label>
                        <input class="input" type="password" placeholder="Password">
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button @click="closeLoginModal" class="button is-link">Submit</button>
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
