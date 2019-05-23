window.requestAnimationFrame = (() =>
    window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function (callback) { setTimeout(callback, 1000/60) }
)();

class Barrage {
    constructor (el) {
        const rect = el.getBoundingClientRect();

        this.el = el;
        this.width = rect.width;
        this.height = rect.height;
    }

    shoot (text) {
        let div = document.createElement('div');

        div.style.position = 'absolute';
        div.style.left = `${ this.width }px`;
        div.style.top = (this.height - 20) * +Math.random().toFixed(2) + 'px';
        div.style.color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
        div.innerText = text;

        this.el.appendChild(div);

        const roll = timer => {
            let now = +new Date();
            let left = div.offsetLeft;
            let rect = div.getBoundingClientRect();

            roll.last = roll.last || now;
            roll.timer = roll.timer || timer;

            if (left < (rect.left - rect.right)) {
                this.el.removeChild(div);
            } else {
                if (now - roll.last >= roll.timer) {
                    left -= 3;
                    roll.last = now;
                    div.style.left = `${ left }px`;
                }
                requestAnimationFrame(roll);
            }
        };

        roll(50 * +Math.random().toFixed(2));
    }
}

export default Barrage;