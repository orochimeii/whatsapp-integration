<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

function saveNumber(n){
  store.dispatch('savePhoneNumber', n);
  router.push('/message');
}

const numbers = ["5493884382300", "5493885870717", "5493885202112", "5493885763994", '5491144174562', '5491130485504', '5493886107215'];
</script>

<template>
    <h1 class="mb-6 text-3xl font-extrabold">Whatsapp integration</h1>
    <table>
        <th>Contactos</th>
        <tr v-for="number in numbers">
        <td name="number" @click="saveNumber(number)">{{number}}</td>
        </tr>
    </table>
</template>