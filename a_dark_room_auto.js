// ==UserScript==
// @name         A Dark Room 自动采集
// @version      0.1
// @description  A Dark Room 自动采集
// @author       Zzqqbs
// @include      *://adarkroom.doublespeakgames.com/*
// @icon         http://adarkroom.doublespeakgames.com/favicon.ico
// ==/UserScript==

(function () {
    'use strict';
    let bottonIdList = [
        'gatherButton', // 伐木
        'trapsButton', // 查看陷阱
    ];
    let bottonObjList = [];
    bottonIdList.forEach(i => {
        bottonObjList.push(document.getElementById(i));
    });
    let timer = setInterval(function () {
        setTimeout(function () {
            bottonObjList.forEach(i => {
                if (i.classList.length == 1) {
                    i.click();
                    console.log(i.innerText);
                }
            });
        }, ~~(Math.random() * 100));
    }, 500);
})();