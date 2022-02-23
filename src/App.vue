<template>
    <div class="app">
        <Header :totalAmountInCart="goods.totalAmountInCart()" />
        <router-view :goods="goods"></router-view>
    </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
    name: "App",
    components: {
        Header,
    },
    data() {
        return {
            goods: {
                items: [
                    {
                        id: 0,
                        title: "Ножницы",
                        description: "Обыкновенные ножницы",
                        price: 250,
                        amountInCart: 0,
                        images: ["scissors1.png", "scissors2.png"],
                    },
                    {
                        id: 1,
                        title: "Очки",
                        description: "Обыкновенные очки",
                        price: 350,
                        amountInCart: 0,
                        images: ["glasses1.png", "glasses2.png"],
                    },
                    {
                        id: 2,
                        title: "Ручка",
                        description: "Обыкновенная ручка",
                        price: 100,
                        amountInCart: 0,
                        images: ["pen.png"],
                    },
                ],
                totalAmountInCart() {
                    return this.items.reduce((prev, curr) => prev + curr.amountInCart, 0);
                },
            },
        };
    },
};
</script>

<style>
.app {
    margin-top: 5rem;
}
body {
    margin: 0 1rem;
}
:root {
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 22px;

    background-color: var(--background-color);

    --background-color: #f6f6f6;
    --color-primary: black;
    --color-primary--hovered: #e6ab3f;
}
a,
svg {
    color: var(--color-primary);
    transition: 0.25s color;
}
h2 {
    text-align: center;
}

@media (max-width: 417px) {
    .app {
        margin-top: 8rem;
    }
}
</style>
