// ==UserScript==
// @name            自动全屏
// @author          Zzqqbs
// @version         0.1
// @description     在播放视频后自动全屏
// @icon            https://www.bilibili.com/favicon.ico
// @include         /^https?:\/\/www.bilibili.com\/video\/av\d+\//
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_addStyle
// ==/UserScript==

const __BPVBSP__ = 'bilibili-player-video-btn-setting-panel';

function settings_radio(title, name, items) {
    function settings_radio_item(value, text, name) {
        return '<label class="bui-radio-item" style="margin: 0 4px;">' +
            '<input type="radio" class="bui-radio-input" value="' + value + '" name="' + name + '">' +
            '<span class="bui-radio-label">' +
            '<span class="bui-radio-text">' + text +
            '</span></span></label>';
    }

    let html_items = '';
    items.forEach(i => {
        html_items += settings_radio_item(i, i, name);
    });
    return {
        html: '<div class="' + __BPVBSP__ + '-' + name + '">' +
            '<div class="' + __BPVBSP__ + '-' + name + '-title">' +
            '<span>' + title + '</span></div>' +
            '<div class="' + __BPVBSP__ + '-' + name + '-content bui bui-radio bui-dark">' +
            '<div class="bui-radio-wrap bui-radio-button">' +
            '<div class="bui-radio-group" style="margin: 0 -4px;">' + html_items +
            '</div></div></div></div>',
        css: '@cher utf-8;' +
            '.bilibili-player-video-control .' + __BPVBSP__ + '-' + name + '-content {width: 100%; margin-bottom: 12px;}'
    };
}

function radioEvent() {
    GM_setValue(this.name, this.value);
}

function init() {
    const name = 'autofullscreen';
    const html_css = settings_radio('播放全屏', name, ['默认', '网页全屏', '全屏']);
    $(function () {
        GM_addStyle(html_css.css);
        $('.' + __BPVBSP__).prepend(html_css.html);
        $('.' + __BPVBSP__ + '-' + name + ' input').change(radioEvent);
        $('.' + __BPVBSP__ + '-' + name + ' input[value="' + GM_getValue(name, '默认') + '"]').change();
        let oldPlay = $('video')[0].play;
        $('video')[0].play = function () {
            switch (GM_getValue(name, '默认')) { 
                case '网页全屏': break;
                case '全屏': break;
            }
            oldPlay();
            this.play = oldPlay();
        }
    });
}

init();
