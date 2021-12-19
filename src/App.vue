<template>
    <div>
        <Header />
    </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
    name: "App",
    components: {
        Header,
    },
};
</script>

<style>
:root {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 22px;

    background-color: #f6f6f6;

    --color-primary: black;
    --color-primary--hovered: #e6ab3f;
}
a {
    color: var(--color-primary);
}
a:hover {
    color: var(--color-primary--hovered);
}
</style>
