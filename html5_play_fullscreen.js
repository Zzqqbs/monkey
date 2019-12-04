// ==UserScript==
// @name        AcFun 播放器全屏保持
// @author      Zzqqbs
// @version     0.2.1
// @description AcFun 播放器自动播放下一集时，保持当前窗口全屏状态
// @icon        https://cdn.aixifan.com/ico/favicon.ico
// @include     /^https?:\/\/www.acfun.cn/bangumi/\w+(\d+_){2}\d+$/
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==
(function () {
    let loopTime = 20;

    function getTip(a) {
        return a.getElementsByClassName('tip-fullscreen')[0];
    }

    let videoEle = document.getElementsByTagName('video')[0];
    let fullscreen_web = document.getElementsByClassName('fullscreen-web')[0];
    let fullscreen_web_tip = getTip(fullscreen_web);
    let fullscreen_screen = document.getElementsByClassName('fullscreen-screen')[0];
    let fullscreen_screen_tip = getTip(fullscreen_screen);

    function fullscreen_read() {
        GM_setValue('web', fullscreen_web_tip.innerText);
        GM_setValue('screen', fullscreen_screen_tip.innerText);
    }

    function fullscreen_write() {
        if (fullscreen_web_tip.innerText != GM_getValue('web')) {
            fullscreen_web.click();
        } else if (fullscreen_screen_tip.innerText != GM_getValue('screen')) {
            fullscreen_screen.click();
        }
    }

    fullscreen_read();
    setInterval(function () {
        setTimeout(function () {
            if (videoEle.currentTime <= loopTime) {
                fullscreen_write();
            } else if (videoEle.currentTime + loopTime >= videoEle.duration) {
                fullscreen_read();
            }
        }, ~~(Math.random * 1000));
    }, loopTime * 500);
})();