<template>
    <span>{{ date }}</span>
</template>
<script>
    import { getRelativeTime } from './time';

    export default {
        name: 'Time',
        props: {
            value: {
                type: [Date, String, Number],
                default: Date.now()
            },
            interval: {
                type: Number,
                default: 1
            }
        },
        data () {
            return {
                date: '',
                timer: null
            }
        },
        computed: {
            timestamp () {
                let value = this.value;

                switch (typeof value) {
                    case 'object':
                        return value.getTime();
                    case 'string':
                        return new Date(value).getTime();
                    case 'number':
                        return new Date(value.toString().length > 10 ? value : value * 1000).getTime();
                }
            }
        },
        mounted() {
            const timestamp = this.timestamp;

            this.date = getRelativeTime(timestamp);
            if (this.interval) {
                this.timer = setInterval(() => {
                    this.date = getRelativeTime(timestamp);
                }, 1000 * this.interval);
            }
        },
        beforeDestroy() {
            this.timer && clearInterval(this.timer);
        }
    }
</script>