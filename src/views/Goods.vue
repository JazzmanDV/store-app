<template>
    <div>
        <h2>Товары</h2>
        <ul>
            <li v-for="good in goods.items" v-bind:key="good.id">
                <Good :good="good" hasAddButton />
            </li>
        </ul>
    </div>
</template>

<script>
import Good from "../components/Good.vue";

import Swiper from "/src/swiper/swiper.js";
import "/src/swiper/swiper.css";

export default {
    name: "Goods",
    components: {
        Good,
    },
    props: {
        goods: Object,
    },
    data() {
        return {
            swiper: null,
        };
    },
    mounted() {
        this.swiper = new Swiper(".swiper", {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
            },
        });
    },
    beforeDestroy() {
        for (let i = 0; i < this.swiper.length; i++) {
            this.swiper[i].destroy();
        }
    },
};
</script>

<style scoped>
ul {
    display: flex;
    justify-content: center;
    gap: 2rem;

    padding: 0;
    margin: 0;

    list-style-type: none;
}
</style>
