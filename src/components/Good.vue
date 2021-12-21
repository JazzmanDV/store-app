<template>
    <div class="good">
        <h3>{{ good.title }}</h3>
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
export default {
    name: "Good",
    props: {
        good: Object,
        hasAddButton: Boolean,
    },
    data() {
        return {
            inputAmount: 1,
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
};
</script>

<style scoped>
.good {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    padding: 1rem;
    background-color: #fff;
    border: 1px solid var(--color-primary);
}
h3 {
    margin: 0;
}
p {
    margin: 0;
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
