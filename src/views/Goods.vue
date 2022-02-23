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

export default {
    name: "Goods",
    components: {
        Good,
    },
    props: {
        goods: Object,
    },
};
</script>

<style scoped>
ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;

    padding: 0;
    margin: 0;

    list-style-type: none;
}
</style>
