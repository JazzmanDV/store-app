<template>
    <div class="good">
        <h3>{{ good.title }}</h3>
        <p>{{ good.description }}</p>
        <span>{{ good.price }} у.е.</span>
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
        <div v-else class="align-right">
            <span>{{ good.amountInCart }} шт.</span>
            <button @click="removeFromCart">
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
export default {
    name: "Good",
    props: {
        good: Object,
        hasAddButton: Boolean,
    },
    methods: {
        addToCart() {
            this.good.amountInCart++;
        },
        removeFromCart() {
            this.good.amountInCart--;
        },
    },
};
</script>

<style scoped>
.good {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding: 1rem;
    background-color: #fff;
    border: 1px solid var(--color-primary);
}
h3 {
    margin: 0;
    text-align: center;
}
p {
    margin: 0;
}
span {
    align-self: flex-end;
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
.align-right {
    display: flex;
    gap: 1rem;

    align-self: flex-end;
}
</style>
