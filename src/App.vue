<template>
    <div class="app">
        <Header />
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
    data: function () {
        return {
            goods: [
                {
                    id: 0,
                    title: "Ножницы",
                    description: "Обыкновенные ножницы",
                    price: 250,
                },
                {
                    id: 1,
                    title: "Расческа",
                    description: "Обыкновенная расческа",
                    price: 350,
                },
                {
                    id: 2,
                    title: "Мыло",
                    description: "Обыкновенное мыло",
                    price: 100,
                },
            ],
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

    background-color: #f6f6f6;

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
</style>
