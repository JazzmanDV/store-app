<template>
    <div>
        <h2>Корзина ({{ goods.totalAmountInCart() }} товаров)</h2>
        <ul>
            <li v-for="good in filter(goods)" v-bind:key="good.id">
                <Good :good="good" />
            </li>
        </ul>
    </div>
</template>

<script>
import Good from "../components/Good.vue";

export default {
    name: "Cart",
    components: {
        Good,
    },
    props: {
        goods: Object,
    },
    methods: {
        filter(goods) {
            return goods.items.filter((good) => good.amountInCart);
        },
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
