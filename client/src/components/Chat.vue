<script setup lang="ts">
import { ref } from 'vue';

const isModalActive = ref(false);

const openModal = () => {
    isModalActive.value = true;
};

const closeModal = () => {
    isModalActive.value = false;
};
</script>

<template>
    <div>
        <button class="button is-primary is-pulled-right" @click="openModal">
            Open Chat
        </button>

        <div class="modal" :class="{ 'is-active': isModalActive }">
            <div @click="closeModal" class="modal-background">
                <div class="modal-content">
                <div id="chat-container">
                    <div>
                        <h1>OpenAI Chatbot</h1>
                        <div id="chat-container">
                            <iframe id=PGEMDTGOHP loading="eager"
                                src="https://embed.pickaxeproject.com/axe?id=CleanBot_Customer_Support_LH3MW&mode=embed_gold&host=beta&theme=light&opacity=100&font_header=Real+Head+Pro&size_header=30&font_body=Real+Head+Pro&size_body=16&font_labels=Real+Head+Pro&size_labels=14&font_button=Real+Head+Pro&size_button=16&c_fb=FFFFFF&c_ff=FFFFFF&c_fbd=888888&c_bb=228DD7&c_bt=FFFFFF&c_t=000000&s_ffo=100&s_bbo=100&s_f=minimalist&s_b=filled&s_t=2&s_to=1&s_r=2"
                                width="100%" height="500px"
                                onMouseOver="this.style.boxShadow='0px 6px 6px -3px rgba(0,0,0,0.1)'"
                                onMouseOut="this.style.boxShadow='none'"
                                style="border:1px solid rgba(0, 0, 0, 1);transition:.3s;border-radius:4px;"
                                frameBorder="0"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.button {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
}

.modal-content {
    width: 90%;
    height: 90%;
    overflow: auto;
}
</style>