// ==UserScript==
// @name        自动跳转
// @namespace   自动跳转
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      -
// @description 2023/2/26 17:31:59
// ==/UserScript==
'use stricty';

(function () {
    const __search_keys = ["url", "target"];
    const __conf = {
        "www.coolapk.com": [1, 0, false],
        "www.baidu.com": [1, 0, true]
    }

    main(__conf[location.host]);

    function main(arg1) {
        if (arg1) {
            window.stop();
        } else {
            return false;
        }
        let url;
        if (arg1[0] == 1) {
            url = search2kv(location.search)[__search_keys[arg1[1]]];
        } else if (arg1 == 2) {
            url = location.split('/')[arg1[1]];
        }
        if (arg1[2]) {
            url = window.atob(url);
        }
        location.assign(url);
    }

    function search2kv(str) {
        let kv_list = new Array();
        str.slice(1).split('&').forEach(ele => {
            let k_and_v = ele.split('=');
            kv_list[k_and_v[0]] = decodeURIComponent(k_and_v[1]);
        });
        return kv_list;
    }
})();