<template>
    <div class="good">
        <h3>{{ good.title }}</h3>
        <div class="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="imageName in good.images" v-bind:key="imageName">
                    <img :src="require(`/src/assets/${imageName}`)" />
                </div>
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
        </div>
        <p>{{ good.description }}</p>
        <span>{{ good.price }} у.е.</span>
        <div class="flex">
            <span v-if="!hasAddButton">{{ good.amountInCart }} шт.</span>
            <input type="number" name="" v-model.number="inputAmount" />
            <button v-if="hasAddButton" @click="addToCart">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 4">
                    <line
                        x1="2"
                        y1="0"
                        x2="2"
                        y2="4"
                        stroke="black"
                        stroke-width="1px"
                        vector-effect="non-scaling-stroke"
                    ></line>
                    <line
                        x1="0"
                        y1="2"
                        x2="4"
                        y2="2"
                        stroke="black"
                        stroke-width="1px"
                        vector-effect="non-scaling-stroke"
                    ></line>
                </svg>
            </button>
            <button v-else @click="removeFromCart">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 4">
                    <line
                        x1="0"
                        y1="0"
                        x2="4"
                        y2="4"
                        stroke="black"
                        stroke-width="1px"
                        vector-effect="non-scaling-stroke"
                    ></line>
                    <line
                        x1="4"
                        y1="0"
                        x2="0"
                        y2="4"
                        stroke="black"
                        stroke-width="1px"
                        vector-effect="non-scaling-stroke"
                    ></line>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import Swiper from "/src/swiper/swiper.js";
import "/src/swiper/swiper.css";

export default {
    name: "Good",
    props: {
        good: Object,
        hasAddButton: Boolean,
    },
    data() {
        return {
            inputAmount: 1,
            swiper: null,
        };
    },
    methods: {
        addToCart() {
            if (!Number.isNaN(this.inputAmount) && this.inputAmount > 0) {
                this.good.amountInCart += this.inputAmount;
            }
            this.inputAmount = 1;
        },
        removeFromCart() {
            if (!Number.isNaN(this.inputAmount) && this.inputAmount > 0 && this.good.amountInCart >= this.inputAmount) {
                this.good.amountInCart -= this.inputAmount;
            }
            this.inputAmount = 1;
        },
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
        this.swiper.destroy();
    },
};
</script>

<style scoped>
.good {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);

    padding: 1rem;
    background-color: #fff;
}
h3 {
    margin: 0;
}
p {
    margin: 0;
}
.swiper {
    width: 10rem;
}
.swiper-button-prev,
.swiper-button-next {
    color: 1px solid var(--color-primary);
}
img {
    width: 100%;
}
.flex {
    display: flex;
    gap: 0.5rem;
}
span {
    align-self: flex-end;
}
input {
    border: 1px solid var(--color-primary);

    flex-grow: 0;
    flex-shrink: 1;
    font: inherit;
    width: 2rem;
    margin-left: auto;
}
button {
    cursor: pointer;
    font: inherit;

    width: 2rem;
    height: 2rem;

    align-self: flex-end;

    padding: 0.25rem;

    background-color: #fff;
    border: 1px solid var(--color-primary);
    transition: 0.25s border;
}
line {
    transition: 0.25s stroke;
}
button:hover {
    border: 1px solid var(--color-primary--hovered);
}
button:hover line {
    stroke: var(--color-primary--hovered);
}
</style>
