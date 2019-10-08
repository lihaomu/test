<template>
    <div ref="live" class="live">
        <div class="live-form">
            <o-form size="small" :labelWidth="0">
                <o-form-item>
                    <o-input v-model="value" @on-enter="send"></o-input>
                    <o-button
                        @on-click="send"
                        custom="primary"
                        type="text">
                        发送
                    </o-button>
                </o-form-item>
            </o-form>
        </div>
    </div>
</template>

<script>
    import Barrage from '../utils/barrage';
    import canvas from '../utils/canvas';

    export default {
        name: 'LiveView',
        data () {
            return {
                barrage: null,
                value: ''
            }
        },
        methods: {
            send () {
                const value = this.value;
                this.value = '';

                value && this.barrage.shoot(value);
            }
        },
        mounted () {
            this.barrage = new canvas();
            // this.barrage.draw();
            // this.barrage = new Barrage(this.$refs.live);
        }
    }
</script>