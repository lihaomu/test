const ak = 'u3LW9r3IUQ5EpwGQaU1dNtdTzF8nrpG5';

const loadBMapScript = function () {
    return new Promise(resolve => {
        window.loadBMapCallback = () => { resolve() };

        if (typeof BMap !== 'undefined') {
            resolve();
            return;
        }
        const script = document.createElement('script');

        script.type = "text/javascript";
        script.src  = `http://api.map.baidu.com/api?v=2.0&ak=${ ak }&callback=loadBMapCallback`;
        document.body.appendChild(script);
    })
}

export default loadBMapScript;