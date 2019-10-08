<template>
    <div>
        <Time :value="time"></Time>
        <vue-preview :slides="list" @close="handleClose"></vue-preview>
    </div>
</template>

<script>
    import Time from '../components/time/index';

    export default {
        name: 'TimeView',
        components: { Time },
        data () {
            return {
                time: new Date('2019/8/14 15:19:00'),
                list: [
                    {
                        src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                        msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                        alt: 'picture1',
                        title: 'Image Caption 1',
                        w: 600,
                        h: 400
                    },
                    {
                        src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
                        msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
                        alt: 'picture2',
                        title: 'Image Caption 2',
                        w: 1200,
                        h: 900
                    }
                ]
            }
        },
        methods: {
            handleClose () {
                console.log('close');
            }
        }
    }
</script>