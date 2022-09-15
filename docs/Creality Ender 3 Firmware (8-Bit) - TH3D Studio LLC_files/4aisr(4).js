// source --> https://support.th3dstudio.com/wp-content/plugins/download-manager/assets/js/front.js?ver=3.2.56 
/**
 * Version: 2.2.2
 */
var allps, pss;
var wpdm_pass_target = '#pps_z';
String.prototype.wpdm_shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}
String.prototype.wpdm_hash = function () {
    if (Array.prototype.reduce) {
        return this.split("").reduce(function (a, b) {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a
        }, 0);
    }
    var hash = 0;
    if (this.length === 0) return hash;
    for (var i = 0; i < this.length; i++) {
        var character = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + character;
        hash = hash & hash;
    }
    return hash;
}

var WPDM = {

    init: function ($) {

    },

    copy: function ($id) {
        var copyText = document.getElementById($id);
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        WPDM.notify('<i class="fa fa-check-double"></i> Copied', 'success', 'top-center', 1000);
    },

    beep: function () {
        if (WPDM.audio == undefined)
            var snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
        else
            var snd = new Audio(WPDM.audio);
        snd.play();
    },

    hash: function (str) {
        return str.wpdm_hash();
    },

    uniqueID: function () {
        var uniq = Date.now() + "abcdefghijklmnopqrstuvwxyz_";
        uniq = uniq.wpdm_shuffle();
        uniq = uniq.substring(1, 10);
        return uniq;
    },

    popupWindow: function (url, title, w, h) {
        /* Fixes dual-screen position                         Most browsers      Firefox */
        var dualScreenLeft = typeof window.screenLeft !== 'undefined' ? window.screenLeft : screen.left;
        var dualScreenTop = typeof window.screenTop !== 'undefined' ? window.screenTop : screen.top;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;
        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        /* Puts focus on the newWindow */
        if (window.focus) {
            newWindow.focus();
        }

        return false;
    },

    html: function (elment, html, _class, _id) {
        _class = _class !== undefined ? _class : '';
        _id = _id !== undefined ? _id : '';
        return "<" + elment + " class='" + _class + "' id='" + _id + "'>" + html + "</" + elment + ">";
    },

    el: function (element, attrs, innerHTML) {
        var el = document.createElement(element);
        el = jQuery(el);
        jQuery.each(attrs, function (name, val) {
            el.attr(name, val);
        })
        if (typeof innerHTML !== 'undefined' && innerHTML !== '')
            el.html(innerHTML);
        return el[0].outerHTML;
    },
    card: function (header, body, footer, id, style) {
        if (typeof id === 'undefined') id = 'card_'+WPDM.uniqueID();
        if (typeof style === 'undefined') style = '';
        header = header !== '' ? WPDM.el("div", {'class': 'card-header'}, header) : '';
        body = WPDM.el("div", {'class': 'card-body'}, body);
        footer = footer !== '' ? WPDM.el("div", {'class': 'card-footer'}, footer) : '';
        return WPDM.el("div", {'class': 'card', id: id, style: style}, header + body + footer);
    },
    fa: function (icon) {
        return WPDM.el("i", {'class': icon});
    },
    bootAlert: function (heading, content, width) {
        var html;
        if (!width) width = 400;
        var modal_id = '__bootModal_' + WPDM.uniqueID();
        html = '<div class="w3eden" id="w3eden' + modal_id + '"><div id="' + modal_id + '" class="modal fade" tabindex="-1" role="dialog">\n' +
            '  <div class="modal-dialog" style="width: ' + width + 'px" role="document">\n' +
            '    <div class="modal-content" style="border-radius: 4px;overflow: hidden">\n' +
            '      <div class="modal-header" style="padding: 12px 15px;background: rgba(0,0,0,0.02);">\n' +
            '        <h4 class="modal-title" style="font-size: 10pt;font-weight: 600;padding: 0;margin: 0;letter-spacing: 0.5px">' + heading + '</h4>\n' +
            '      </div>\n' +
            '      <div class="modal-body fetfont" style="line-height: 1.5;text-transform: unset;font-weight:400;letter-spacing:0.5px;font-size: 12px">\n' +
            '        ' + content + '\n' +
            '      </div>\n' +
            '      <div class="modal-footer" style="padding: 10px 15px">\n' +
            '        <button type="button" class="btn btn-secondary btn-xs" data-target="#' + modal_id + '" data-dismiss="modal">Close</button>\n' +
            '      </div>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '</div></div>';
        jQuery('body').append(html);
        jQuery("#" + modal_id).modal({show: true, backdrop: 'static'});
        return jQuery("#" + modal_id);
    },

    /**
     * Local push notification
     * @param title
     * @param message
     * @param icon
     * @param image
     * @param url
     */
    pushNotify: function (title, message, icon, image, url) {
        var type = 'info';
        if (title.includes('rror') || message.includes('rror')) type = 'error';

        if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
            WPDM.notify("<strong>" + title + "</strong><br/>" + message, type, 'top-right');
            return;
        }

        Notification.requestPermission(function (result) {
            if (result === 'granted') {
                console.log('Notification: ' + result);
                try {
                    var notification = new Notification(title, {
                        body: message,
                        icon: icon ? icon : 'https://cdn1.iconfinder.com/data/icons/hawcons/32/698558-icon-47-note-important-512.png',
                        image: image ? image : ''
                    });
                    if (url) {
                        notification.onclick = function (e) {
                            e.preventDefault();
                            window.open(url, '_blank');
                        };
                    }
                } catch (err) {
                    WPDM.notify("<strong>" + title + "</strong><br/>" + message, type, 'top-right');
                    console.log('Notification API error: ' + err);
                }
            } else {
                WPDM.notify("<strong>" + title + "</strong><br/>" + message, type, 'top-right');
                console.log('Notification: ' + result);
            }
        });

    },


    /**
     * Shows notification
     * @param message
     * @param type
     * @param position
     */
    notify: function (message, type, position, autoclose) {
        var $ = jQuery;
        if (type === undefined || !type) type = 'info';
        if (position === undefined || !position) position = 'top-right';
        if (type === 'danger') type = 'error';
        var notifycont = position.indexOf('#') >= 0 ? position : '#wpdm-notify-' + position;
        if ($(notifycont).length == 0)
            $('body').prepend("<div id='wpdm-notify-" + position + "'></div>");
        var notif = $("<div class='wpdm-notify fetfont wpdm-notify-" + type + "' style='display: none'>" + message + "</div>");
        $(notifycont).append(notif);
        $(notif).fadeIn();
        if (autoclose !== undefined) {
            setTimeout(function () {

                $(notif).animate({
                    opacity: 0
                }, 1000, function () {
                    $(this).slideUp();
                });

            }, autoclose);
        }
        return $(notif);
    },

    /**
     * Shows notification
     * @param message
     * @param type
     * @param position
     */
    floatify: function (html, position) {
        var $ = jQuery;
        if (position === undefined || !position) position = 'top-right';
        var floatifycont = '#wpdm-floatify-' + position;
        if ($(floatifycont).length == 0)
            $('body').prepend("<div class='w3eden' id='wpdm-floatify-" + position + "'></div>");
        var floatify = $("<div class='wpdm-floatify fetfont' style='margin-right: -500px'>" + html + "</div>");
        $(floatifycont).append(floatify);
        $(floatify).animate({marginRight: '0px'});
        return $(floatify);
    },

    blockUI: function (element, xhr) {
        jQuery(element).addClass("blockui");
        if (xhr)
            xhr.addEventListener("load", function () {
                jQuery(element).removeClass("blockui");
            });
    },

    unblockUI: function (element) {
        jQuery(element).removeClass("blockui");
    },

    overlay: function (element, html) {
        var $ = jQuery;
        var overlaycontent = $("<div class='wpdm-overlay-content' style='display: none'>" + html + "<div class='wpdm-overlay-close' style='cursor: pointer'><i class='far fa-times-circle'></i> close</div></div>");
        $(element).addClass('wpdm-overlay').append(overlaycontent);
        $(overlaycontent).fadeIn();
        $('body').on('click', '.wpdm-overlay-close', function () {
            $(overlaycontent).fadeOut(function () {
                $(this).remove();
            });
        });
        return $(overlaycontent);
    },


    confirm: function (heading, content, buttons) {
        var html, $ = jQuery;
        var modal_id = '__boot_popup_' + WPDM.uniqueID();
        $("#w3eden__boot_popup").remove();
        var _buttons = '';
        if (buttons) {
            _buttons = '<div class="modal-footer" style="padding: 8px 15px;">\n';
            $.each(buttons, function (i, button) {
                var id = 'btx_' + i;
                _buttons += "<button id='" + id + "' class='" + button.class + " btn-xs' style='font-size: 10px;padding: 3px 20px;'>" + button.label + "</button> ";
            });
            _buttons += '</div>\n';
        }

        html = '<div class="w3eden" id="w3eden' + modal_id + '"><div id="' + modal_id + '" style="z-index: 9999999 !important;" class="modal fade" tabindex="-1" role="dialog">\n' +
            '  <div class="modal-dialog" role="document" style="max-width: 100%;width: 350px">\n' +
            '    <div class="modal-content" style="border-radius: 3px;overflow: hidden">\n' +
            '      <div class="modal-header" style="padding: 12px 15px;background: #f5f5f5;">\n' +
            '        <h4 class="modal-title" style="font-size: 9pt;font-weight: 500;padding: 0;margin: 0;font-family:var(--wpdm-font), san-serif;letter-spacing: 0.5px">' + heading + '</h4>\n' +
            '      </div>\n' +
            '      <div class="modal-body text-center" style="font-family:var(--wpdm-font), san-serif;letter-spacing: 0.5px;font-size: 10pt;font-weight: 300;padding: 25px;line-height: 1.5">\n' +
            '        ' + content + '\n' +
            '      </div>\n' + _buttons +
            '    </div>\n' +
            '  </div>\n' +
            '</div></div>';
        $('body').append(html);
        $("#" + modal_id).modal('show');
        $.each(buttons, function (i, button) {
            var id = 'btx_' + i;
            $('#' + id).unbind('click');
            $('#' + id).bind('click', function () {
                button.callback.call($("#" + modal_id));
                return false;
            });
        });
        return $("#" + modal_id);
    },
    audioUI: function (audio) {
        var $ = jQuery, song_length, song_length_m, song_length_s;

        var player_html = '<div class="w3eden"><div style="display: none" class="wpdm-audio-player-ui" id="wpdm-audio-player-ui"><div class="card m-2"><div class="card-body text-center"><div class="media"><div class="mr-3 wpdm-audio-control-buttons"><button class="btn btn-primary btn-play" id="wpdm-btn-play"><i class="fa fa-play"></i></button> <button class="btn btn-primary btn-backward" id="wpdm-btn-backward"><i class="fa fa-backward"></i></button> <button class="btn btn-primary btn-forward" id="wpdm-btn-forward"><i class="fa fa-forward"></i></button></div><div class="media-body"><div class="position-relative"><div id="played">00:00</div><div id="mins">00:00</div></div><div class="progress"><div  id="wpdm-audio-progress" class="progress-bar bg-success" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div></div></div><div class="ml-3 wpdm-audio-control-buttons"> <button class="btn btn-info btn-volumctrl" id="wpdm-btn-volumctrl"><i class="fa fa-volume-up"></i></button> <div class="volumctrl"><input type="range" min="0" max="1" step="0.01" value="3" class="p-0" id="wpdm-audio-volume"></div></div></div></div></div></div></div>';

        if (audio.duration !== Infinity) {
            song_length = parseInt(audio.duration);
            song_length_m = parseInt(song_length / 60);
            song_length_s = song_length - (song_length_m * 60);
            song_length_m = song_length_m > 9 ? song_length_m : "0" + song_length_m;
            song_length_s = song_length_s > 9 ? song_length_s : "0" + song_length_s;
        } else {
            song_length_m = "--";
            song_length_s = "--";
            audio.addEventListener("durationchange", function (e) {
                console.log(this.duration);
                if (this.duration !== Infinity) {
                    song_length = parseInt(this.duration);
                    song_length_m = parseInt(song_length / 60);
                    song_length_s = song_length - (song_length_m * 60);
                    song_length_m = song_length_m > 9 ? song_length_m : "0" + song_length_m;
                    song_length_s = song_length_s > 9 ? song_length_s : "0" + song_length_s;
                    $('#mins').html(song_length_m + ":" + song_length_s);
                    next(song_length);
                }
            }, false);
        }

        if ($('#wpdm-audio-player-ui').length === 0) {
            $('body').append(player_html);
            $("#wpdm-audio-player-ui").slideDown();
            $('#mins').html(song_length_m + ":" + song_length_s);
            $('body').on('click', '#wpdm-audio-player-ui .progress', function (e) {
                let value = e.offsetX * 100 / this.clientWidth;
                var played = parseInt(song_length * value / 100);
                var played_m = parseInt(played / 60);
                var played_s = played - (played_m * 60);
                played_m = played_m > 9 ? played_m : "0" + played_m;
                played_s = played_s > 9 ? played_s : "0" + played_s;
                $('#played').html(played_m + ":" + played_s);
                audio.currentTime = (song_length * value) / 100;
                $(this).find('.progress-bar').css('width', value + "%");
                //video.currentTime = duration * (value / 100);
            });
            $('body').on('click', '#wpdm-btn-backward', function () {
                let value = (parseInt($('#wpdm-audio-player-ui .progress-bar').css('width')) / parseInt($('#wpdm-audio-player-ui .progress').css('width'))) * 100 - 10;
                if (value < 0) value = 0;
                var played = parseInt(song_length * value / 100);
                var played_m = parseInt(played / 60);
                var played_s = played - (played_m * 60);
                played_m = played_m > 9 ? played_m : "0" + played_m;
                played_s = played_s > 9 ? played_s : "0" + played_s;
                $('#played').html(played_m + ":" + played_s);
                audio.currentTime = (song_length * value) / 100;
                $('#wpdm-audio-player-ui .progress-bar').css('width', value + "%");
            });
            $('body').on('click', '#wpdm-btn-forward', function () {
                let value = (parseInt($('#wpdm-audio-player-ui .progress-bar').css('width')) / parseInt($('#wpdm-audio-player-ui .progress').css('width'))) * 100 + 10;
                if (value > 100) value = 100;
                var played = parseInt(song_length * value / 100);
                var played_m = parseInt(played / 60);
                var played_s = played - (played_m * 60);
                played_m = played_m > 9 ? played_m : "0" + played_m;
                played_s = played_s > 9 ? played_s : "0" + played_s;
                $('#played').html(played_m + ":" + played_s);
                audio.currentTime = (song_length * value) / 100;
                $('#wpdm-audio-player-ui .progress-bar').css('width', value + "%");
            });
            $('#wpdm-btn-volumctrl').on('click', function () {
                $(this).next('.volumctrl').toggle();
            });
            $('body').on('click', '.btn-play', function () {
                if ($(this).find('.fa').hasClass('fa-play')) {
                    $(this).find('.fa').addClass('fa-pause').removeClass('fa-play');
                    $(this).data('state', 'playing');
                    audio.play();
                } else {
                    $(this).find('.fa').addClass('fa-play').removeClass('fa-pause');
                    $(this).data('state', 'paused');
                    audio.pause();
                }
            });
            $('body').on('change', '#wpdm-audio-volume', function () {
                audio.volume = this.value;
            });

        }
        $('#mins').html(song_length_m + ":" + song_length_s);
        audio.addEventListener("play", function () {
            $('#wpdm-btn-play').find('.fa').addClass('fa-pause').removeClass('fa-play');
        });
        audio.addEventListener("pause", function () {
            $('#wpdm-btn-play').find('.fa').addClass('fa-play').removeClass('fa-pause');
        });
        audio.addEventListener("timeupdate", function (e) {
            var song_length = parseInt(audio.duration);
            var time_now = audio.currentTime;
            var percent = (time_now / song_length) * 100;
            if (percent > 100) percent = 100;
            $('#wpdm-audio-progress').css('width', percent + "%");
            var played = parseInt(time_now);
            var played_m = parseInt(played / 60);
            var played_s = played - (played_m * 60);
            played_m = played_m > 9 ? played_m : "0" + played_m;
            played_s = played_s > 9 ? played_s : "0" + played_s;
            $('#played').html(played_m + ":" + played_s);
        });


    }

};


jQuery(function ($) {

    var $body = $('body');

    $body.on('click', '.wpdm-notify, .wpdm-floatify', function () {
        $(this).animate({
            opacity: 0
        }, 1000, function () {
            $(this).slideUp();
        });
    });

    $body.on('click', '.dismis-on-click', function () {
        $(this).slideUp();
    });

    $body.on('click', '.wpdm-download-link.wpdm-download-locked', function (e) {
        e.preventDefault();
        hideLockFrame();

        var parentWindow = document.createElement("a");
        parentWindow.href = document.referrer.toString();
        var __sep = '?';
        if (wpdm_url.home.indexOf('?') > 0) __sep = '&';
        if (parentWindow.hostname === window.location.hostname || 1)
            $(window.parent.document.body).append("<iframe id='wpdm-lock-frame' style='left:0;top:0;width: 100%;height: 100%;z-index: 999999999;position: fixed;background: rgba(255,255,255,0.4) url(" + wpdm_url.home + "wp-content/plugins/download-manager/assets/images/loader.svg) center center no-repeat;background-size: 80px 80px;border: 0;' src='" + wpdm_url.home + __sep + "__wpdmlo=" + $(this).data('package') + "'></iframe>");
        else
            window.parent.postMessage({
                'task': 'showiframe',
                'iframe': "<iframe id='wpdm-lock-frame' style='left:0;top:0;width: 100%;height: 100%;z-index: 999999999;position: fixed;background: rgba(255,255,255,0.4) url(" + wpdm_url.home + "wp-content/plugins/download-manager/assets/images/loader.svg) center center no-repeat;background-size: 80px 80px;border: 0;' src='" + wpdm_url.home + __sep + "__wpdmlo=" + $(this).data('package') + "'></iframe>"
            }, "*");

    });

    $body.on('click', '.wpdm-download-link.download-on-click[data-downloadurl]', function (e) {
        e.preventDefault();
        if (this.target === '_blank')
            window.open($(this).data('downloadurl'));
        else
            window.location.href = $(this).data('downloadurl');
    });

    $body.on('click', '.__wpdm_playvideo', function (e) {
        e.preventDefault();
        $('#__wpdm_videoplayer').children('source').attr('src', $(this).data('video'));
        console.log('loading...');
        var vid = document.getElementById("__wpdm_videoplayer");
        vid.onloadeddata = function () {
            console.log('loaded....');
        };
        $("#__wpdm_videoplayer").get(0).load();

    });

    $body.on('change', '.terms_checkbox', function (e) {
        if ($(this).is(':checked'))
            $('#wpdm-filelist-' + $(this).data('pid') + ' .btn.inddl, #xfilelist .btn.inddl').removeAttr('disabled');
        else
            $('#wpdm-filelist-' + $(this).data('pid') + ' .btn.inddl, #xfilelist .btn.inddl').attr('disabled', 'disabled');
    });

    $body.on('click', '.wpdm-social-lock', function (e) {

        try {


            _PopupCenter($(this).data('url'), 'Social Lock', 600, 400);

        } catch (e) {
        }

    });

    $body.on('click', '#wpdm-dashboard-sidebar a.list-group-item', function (e) {
        location.href = this.href;
    });

    var $input_group_input = $('.input-group input');
    $input_group_input.on('focus', function () {
        $(this).parent('.input-group').find('.input-group-addon').addClass('input-group-addon-active');
    });
    $input_group_input.on('blur', function () {
        $(this).parent().find('.input-group-addon').removeClass('input-group-addon-active');
    });


    $body.on('click', 'button.btn.inddl', function (e) {
        e.preventDefault();
        var tis = this;
        if ($(this).data('dlurl') !== undefined) {
            location.href = $(this).data('dlurl');
            return;
        }
        $.post(wpdm_rest_url('validate-filepass'), {
            wpdmfileid: $(tis).data('pid'),
            wpdmfile: $(tis).data('file'),
            actioninddlpvr: 1,
            filepass: $($(tis).data('pass')).val()
        }, function (res) {
            if (res.success === true) {
                var dlurl = res.downloadurl;
                $(tis).data('dlurl', dlurl);
                wpdm_boot_popup("Password Verified!", "<div style='padding: 50px;'>Please click following button to start download.<br/><br/><a href='" + dlurl + "' class='btn btn-lg btn-success' target='_blank'>Start Download</a></div>",
                    [{
                        label: 'Close',
                        class: 'btn btn-secondary',
                        callback: function () {
                            this.modal('hide');
                            return false;
                        }
                    }]
                );
            } else {
                alert(res.msg);
            }
        });
    });

    $body.on('click', '.wpdm-indir', function (e) {
        e.preventDefault();
        WPDM.blockUI('#xfilelist');
        $('#xfilelist').load(location.href, {
            action: 'wpdmfilelistcd',
            pid: $(this).data('pid'),
            cd: $(this).data('dir')
        }, function (res) {
            WPDM.unblockUI('#xfilelist');
        });
    });


    $body.on('click', '.role-tabs a', function (e) {
        $('.role-tabs a').removeClass('active');
        $(this).addClass('active');
    });


    $body.on('click', '.btn-wpdm-a2f', function (e) {
        var a2fbtn = $(this);
        $.post(wpdm_url.ajax, {action: 'wpdm_addtofav', pid: $(this).data('package')}, function (res) {
            if (a2fbtn.hasClass('btn-secondary'))
                a2fbtn.removeClass('btn-secondary').addClass('btn-danger').html(a2fbtn.data('rlabel'));
            else
                a2fbtn.removeClass('btn-danger').addClass('btn-secondary').html(a2fbtn.data('alabel'));
        });
    });

    $body.on('click', '.wpdm-btn-play', function (e) {
        e.preventDefault();

        if ($('#wpdm-audio-player').length === 0) {
            var player = document.createElement('audio');
            player.id = 'wpdm-audio-player';
            player.controls = 'controls';
            player.autoplay = 1;
            player.type = 'audio/mpeg';
            $('body').append(player);
        }

        player = $('#wpdm-audio-player');
        var btn = $(this);

        if (btn.data('state') === 'stop' || !btn.data('state')) {
            player.css('display', 'none');
            player.attr('src', $(this).data('song') + "&play=song.mp3");
        }

        if (btn.data('state') === 'playing') {
            $(this).data('state', 'paused');
            player.trigger('pause');
            $(this).html("<i class='fa fa-play'></i>");
            return false;
        }

        if (btn.data('state') === 'paused') {
            $(this).data('state', 'playing');
            player.trigger('play');
            $('.wpdm-btn-play').html("<i class='fa fa-play'></i>");
            $(this).html("<i class='fa fa-pause'></i>");
            return false;
        }


        $('.wpdm-btn-play').data("state", "stop");
        $('.wpdm-btn-play').html("<i class='fa fa-play'></i>");
        btn.html("<i class='fas fa-sun  fa-spin'></i>");
        player.unbind('loadedmetadata');
        player.on('loadedmetadata', function () {
            console.log("Playing " + this.src + ", for: " + this.duration + "seconds.");
            btn.html("<i class='fa fa-pause'></i>");
            btn.data('state', 'playing');
            WPDM.audioUI(this);
        });
        document.getElementById('wpdm-audio-player').onended = function () {
            btn.html("<i class='fa fa-redo'></i>");
            btn.data('state', 'stop');
        }
    });

    $('.wpdm_remove_empty').remove();

    /* Uploading files */
    var file_frame, dfield;

    $body.on('click', '.wpdm-media-upload', function (event) {
        event.preventDefault();
        dfield = $($(this).attr('rel'));

        /* If the media frame already exists, reopen it. */
        if (file_frame) {
            file_frame.open();
            return;
        }

        /* Create the media frame. */
        file_frame = wp.media.frames.file_frame = wp.media({
            title: $(this).data('uploader_title'),
            button: {
                text: $(this).data('uploader_button_text')
            },
            multiple: false  /* Set to true to allow multiple files to be selected */
        });

        /* When an image is selected, run a callback. */
        file_frame.on('select', function () {
            /* We set multiple to false so only get one image from the uploader */
            attachment = file_frame.state().get('selection').first().toJSON();
            dfield.val(attachment.url);

        });

        /* Finally, open the modal */
        file_frame.open();
    });

    $body.on('click', '.btn-image-selector', function (event) {
        event.preventDefault();
        dfield = $($(this).attr('rel'));
        var dfield_h = $($(this).attr('rel') + '_hidden');

        if (file_frame) {
            file_frame.open();
            return;
        }

        file_frame = wp.media.frames.file_frame = wp.media({
            title: $(this).data('uploader_title'),
            button: {
                text: $(this).data('uploader_button_text')
            },
            multiple: false
        });


        file_frame.on('select', function () {

            attachment = file_frame.state().get('selection').first().toJSON();
            dfield.attr('src', attachment.url);
            dfield_h.val(attachment.url);

        });

        file_frame.open();
    });

    $body.on('click', '.pagination.async a, .__wpdm_load_async', function (e) {
        e.preventDefault();
        var _cont = $(this).data('container');
        $(_cont).addClass('blockui');
        $.get(this.href, function (res) {
            $(_cont).html($(res).find(_cont).html());
            $(_cont).removeClass('blockui');
        });
    });

    $body.on("keyup", '.wpdm-pack-search-file', function () {
        var value = $(this).val().toLowerCase();
        var filelist_item = $(this).data('filelist') + " tr";
        $(filelist_item).filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('.__wpdm_submit_async').on('submit', function (e) {
        e.preventDefault();
        var _cont = $(this).data('container');
        $(_cont).addClass('blockui');
        $(this).ajaxSubmit({
            success: function (response) {
                $(_cont).html($(response).find(_cont).html());
                $(_cont).removeClass('blockui');
            }
        })
    });


    var unlocked = [];

    $('.wpdm-filelist-area[data-termlock]').on('mouseover', function () {

        try {
            if (unlocked[$(this).data('packageid')] === 1) return;
        } catch (e) {

        }
        $('#term-panel-' + $(this).data('packageid')).fadeIn('fast');
    });

    $('.terms_checkbox').on('click', function () {
        if ($(this).is(':checked')) {
            unlocked[$(this).data('pid')] = 1;
            $('#term-panel-' + $(this).data('pid')).fadeOut('fast');
            $('.download_footer_' + $(this).data('pid')).slideDown();
        } else
            $('.download_footer_' + $(this).data('pid')).slideUp();
    });


    $formcontrol = $('.input-wrapper input');
    $formcontrol.on('focus', function () {
        $('.input-wrapper').removeClass('input-focused');
        $(this).parent('.input-wrapper').addClass('input-focused');
    });
    $formcontrol.on('change', function () {
        $('.input-wrapper').removeClass('input-focused');
        $(this).parent('.input-wrapper').addClass('input-focused');
        if ($(this).val() !== '')
            $(this).parent('.input-wrapper').addClass('input-withvalue');
        else
            $(this).parent('.input-wrapper').removeClass('input-withvalue');
    });


});


function _PopupCenter(url, title, w, h) {
    /* Fixes dual-screen position                         Most browsers      Firefox */
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    /* Puts focus on the newWindow */
    if (window.focus) {
        newWindow.focus();
    }

    return false;
}

function generatepass(id) {
    wpdm_pass_target = '#' + id;
    jQuery('#generatepass').modal('show');
}

function hideLockFrame() {
    jQuery('#wpdm-lock-frame').remove();
}

function wpdm_bootModal(heading, content, width) {
    var html;
    if (!width) width = 400;
    jQuery("#w3eden__bootModal").remove();
    html = '<div class="w3eden" id="w3eden__bootModal"><div id="__bootModal" class="modal fade" tabindex="-1" role="dialog">\n' +
        '  <div class="modal-dialog" style="width: ' + width + 'px" role="document">\n' +
        '    <div class="modal-content" style="border-radius: 3px;overflow: hidden">\n' +
        '      <div class="modal-header" style="padding: 12px 15px;background: #f5f5f5;">\n' +
        '        <h4 class="modal-title" style="font-size: 9pt;font-weight: 500;padding: 0;margin: 0;letter-spacing: 0.5px">' + heading + '</h4>\n' +
        '      </div>\n' +
        '      <div class="modal-body fetfont" style="line-height: 1.5;text-transform: unset;font-weight:400;letter-spacing:0.5px;font-size: 12px">\n' +
        '        ' + content + '\n' +
        '      </div>\n' +
        '      <div class="modal-footer" style="padding: 10px 15px">\n' +
        '        <button type="button" class="btn btn-secondary btn-xs" data-dismiss="modal">Close</button>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div></div>';
    jQuery('body').append(html);
    jQuery("#__bootModal").modal('show');
}

function wpdm_boot_popup(heading, content, buttons) {
    var html, $ = jQuery;
    $("#w3eden__boot_popup").remove();
    var _buttons = '';
    if (buttons) {
        _buttons = '<div class="modal-footer" style="padding: 8px 15px;">\n';
        $.each(buttons, function (i, button) {
            var id = 'btx_' + i;
            _buttons += "<button id='" + id + "' class='" + button.class + " btn-xs' style='font-size: 10px;padding: 3px 20px;'>" + button.label + "</button> ";
        });
        _buttons += '</div>\n';
    }

    html = '<div class="w3eden" id="w3eden__boot_popup"><div id="__boot_popup" style="z-index: 9999999 !important;" class="modal fade" tabindex="-1" role="dialog">\n' +
        '  <div class="modal-dialog" role="document" style="max-width: 100%;width: 350px">\n' +
        '    <div class="modal-content" style="border-radius: 3px;overflow: hidden">\n' +
        '      <div class="modal-header" style="padding: 12px 15px;background: #f5f5f5;">\n' +
        '        <h4 class="modal-title" style="font-size: 9pt;font-weight: 500;padding: 0;margin: 0;letter-spacing: 0.5px">' + heading + '</h4>\n' +
        '      </div>\n' +
        '      <div class="modal-body text-center" style="letter-spacing: 0.5px;font-size: 10pt;font-weight: 300;padding: 25px;line-height: 1.5">\n' +
        '        ' + content + '\n' +
        '      </div>\n' + _buttons +
        '    </div>\n' +
        '  </div>\n' +
        '</div></div>';
    $('body').append(html);
    $("#__boot_popup").modal('show');
    $.each(buttons, function (i, button) {
        var id = 'btx_' + i;
        $('#' + id).unbind('click');
        $('#' + id).bind('click', function () {
            button.callback.call($("#__boot_popup"));
            return false;
        });
    });
    return $("#__boot_popup");
}

/**
 * Open an url in iframe modal
 * @param url
 * @param closebutton
 * @returns {boolean}
 */
function wpdm_iframe_modal(url, closebutton) {
    var iframe, $ = jQuery;
    if (url === 'close') {
        $('#wpdm_iframe_modal').remove();
        $('#ifcb').remove();
        $('body').removeClass('wpdm-iframe-modal-open');
        return false;
    }
    var closebutton_html = "";
    if (closebutton !== undefined && closebutton === true)
        closebutton_html = "<span id='ifcb' class='w3eden'><a href='#' onclick='return wpdm_iframe_modal(\"close\");' style='border-radius: 0;position: fixed;top: 0;right: 0;z-index: 9999999999 !important;width: 40px;line-height: 40px;padding: 0' class='btn btn-danger'><i class='fas fa-times'></i></a></span>";

    iframe = '<iframe src="' + url + '" style="width: 100%;height: 100%;position: fixed;z-index: 999999999 !important;border: 0;left: 0;top: 0;right: 0;bottom: 0;background: rgba(0,0,0,0.2);display: none;" id="wpdm_iframe_modal"></iframe>' + closebutton_html;
    $('body').append(iframe).addClass('wpdm-iframe-modal-open');
    $('#wpdm_iframe_modal').fadeIn();

};
// source --> https://support.th3dstudio.com/wp-content/plugins/wp-dark-mode/assets/js/dark-mode.min.js?ver=2.4.0 
(function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):(e="undefined"!=typeof globalThis?globalThis:e||self,t(e.DarkMode={}))})(this,function(e){"use strict";function t(e,t,n,r){function o(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||(n=Promise))(function(n,a){function i(e){try{c(r.next(e))}catch(e){a(e)}}function u(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?n(e.value):o(e.value).then(i,u)}c((r=r.apply(e,t||[])).next())})}function n(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;c;)try{if(o=1,a&&(i=2&n[0]?a.return:n[0]?a.throw||((i=a.return)&&i.call(a),0):a.next)&&!(i=i.call(a,n[1])).done)return i;switch(a=0,i&&(n=[2&n[0],i.value]),n[0]){case 0:case 1:i=n;break;case 4:return c.label++,{value:n[1],done:!1};case 5:c.label++,a=n[1],n=[0];continue;case 7:n=c.ops.pop(),c.trys.pop();continue;default:if(i=c.trys,!(i=i.length>0&&i[i.length-1])&&(6===n[0]||2===n[0])){c=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){c.label=n[1];break}if(6===n[0]&&c.label<i[1]){c.label=i[1],i=n;break}if(i&&c.label<i[2]){c.label=i[2],c.ops.push(n);break}i[2]&&c.ops.pop(),c.trys.pop();continue}n=t.call(e,c)}catch(e){n=[6,e],a=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,a,i,u,c={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return u={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u}function r(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function o(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=a.next()).done;)i.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return i}function a(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(o(arguments[t]));return e}function i(e,r){return t(this,void 0,void 0,function(){var t;return n(this,function(n){switch(n.label){case 0:return[4,fetch(e,{cache:"force-cache",credentials:"omit"})];case 1:if(t=n.sent(),sn&&"text/css"===r&&e.startsWith("moz-extension://")&&e.endsWith(".css"))return[2,t];if(r&&!t.headers.get("Content-Type").startsWith(r))throw new Error("Mime type mismatch when loading "+e);if(!t.ok)throw new Error("Unable to load "+e+" "+t.status+" "+t.statusText);return[2,t]}})})}function u(e,r){return t(this,void 0,void 0,function(){var t;return n(this,function(n){switch(n.label){case 0:return[4,i(e,r)];case 1:return t=n.sent(),[4,c(t)];case 2:return[2,n.sent()]}})})}function c(e){return t(this,void 0,void 0,function(){var t,r;return n(this,function(n){switch(n.label){case 0:return[4,e.blob()];case 1:return t=n.sent(),[4,new Promise(function(e){var n=new FileReader;n.onloadend=function(){return e(n.result)},n.readAsDataURL(t)})];case 2:return r=n.sent(),[2,r]}})})}function s(e){e||vn}function l(){}function d(e){gn.add(e)}function f(e){return null!=e.length}function h(e,t){var n,o;if(f(e))for(var a=0,i=e.length;a<i;a++)t(e[a]);else try{for(var u=r(e),c=u.next();!c.done;c=u.next()){var s=c.value;t(s)}}catch(e){n={error:e}}finally{try{c&&!c.done&&(o=u.return)&&o.call(u)}finally{if(n)throw n.error}}}function p(e,t){h(t,function(t){return e.push(t)})}function m(e){for(var t=[],n=0,r=e.length;n<r;n++)t.push(e[n]);return t}function v(e){return Sn||(Sn=document.createElement("a")),Sn.href=e,Sn.href}function g(e,t){return void 0===t&&(t=null),t?(t=v(t),new URL(e,t)):(e=v(e),new URL(e))}function b(e,t){if(t.match(/^data\:/))return t;var n=g(e),r=g(t,n.href);return r.href}function y(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t]}function S(e,t){h(e,function(e){if(e instanceof CSSMediaRule){var n=Array.from(e.media);(n.includes("screen")||n.includes("all")||!n.includes("print")&&!n.includes("speech"))&&S(e.cssRules,t)}else if(e instanceof CSSStyleRule)t(e);else if(e instanceof CSSImportRule)try{S(e.styleSheet.cssRules,t)}catch(e){y(e)}else e instanceof CSSSupportsRule?CSS.supports(e.conditionText)&&S(e.cssRules,t):y("CSSRule type not supported",e)})}function w(e,t){h(e,function(n){var r=e.getPropertyValue(n).trim();r&&t(n,r)})}function k(e){return e.startsWith("--")&&!e.startsWith("--wp-dark-mode")}function _(e){var t=new Map;return e&&S(e,function(e){e.style&&w(e.style,function(e,n){k(e)&&t.set(e,n)})}),t}function E(e){var t=new Map;return w(e.style,function(e,n){k(e)&&t.set(e,n)}),t}function x(e){return e.replace(/^url\((.*)\)$/,"$1").replace(/^"(.*)"$/,"$1").replace(/^'(.*)'$/,"$1")}function C(e){var t=g(e);return""+t.origin+t.pathname.replace(/\?.*$/,"").replace(/(\/)([^\/]+)$/i,"$1")}function M(e,t){return e.replace(En,function(e){var n=x(e);return'url("'+b(t,n)+'")'})}function A(e){return e.replace(Cn,"")}function R(e){return e.replace(Mn,"")}function L(e,t,n){void 0===n&&(n=new Set);var r=!1,o=new Set,a=e.replace(An,function(e,a,i){if(n.has(a))return y("Circular reference to variable "+a),i||(r=!0,e);if(t.has(a)){var u=t.get(a);return u.match(An)&&o.add(a),u}return i||(y("Variable "+a+" not found"),r=!0,e)});return r?a:a.match(An)?(o.forEach(function(e){return n.add(e)}),L(a,t,n)):a}function T(e){var t,n=!1,r=null,o=function(){for(var o=[],i=0;i<arguments.length;i++)o[i]=arguments[i];t=o,r?n=!0:(e.apply(void 0,a(t)),r=requestAnimationFrame(function(){r=null,n&&(e.apply(void 0,a(t)),n=!1)}))},i=function(){cancelAnimationFrame(r),n=!1,r=null};return Object.assign(o,{cancel:i})}function P(){function e(){for(var e;e=r.shift();)e();o=null}function t(t){r.push(t),o||(o=requestAnimationFrame(e))}function n(){r.splice(0),cancelAnimationFrame(o),o=null}var r=[],o=null;return{add:t,cancel:n}}function O(e){var t=0;return e.seconds&&(t+=1e3*e.seconds),e.minutes&&(t+=60*e.minutes*1e3),e.hours&&(t+=60*e.hours*60*1e3),e.days&&(t+=24*e.days*60*60*1e3),t}function j(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function q(e,t,n){void 0===n&&(n=Function.prototype);var r=10,o=O({seconds:2}),a=O({seconds:10}),i=e.previousSibling,u=e.parentNode;if(!u)throw new Error("Unable to watch for node position: parent element not found");if("prev-sibling"===t&&!i)throw new Error("Unable to watch for node position: there is no previous sibling");var c=0,s=null,l=null,d=T(function(){if(!l){c++;var h=Date.now();if(null==s)s=h;else if(c>=r){if(h-s<a)return y("Node position watcher paused: retry in "+o+"ms",e,i),void(l=setTimeout(function(){s=null,c=0,l=null,d()},o));s=h,c=1}if("parent"===t&&i&&i.parentNode!==u)return y("Unable to restore node position: sibling parent changed",e,i,u),void p();if("prev-sibling"===t){if(null==i.parentNode)return y("Unable to restore node position: sibling was removed",e,i,u),void p();i.parentNode!==u&&(y("Style was moved to another parent",e,i,u),v(i.parentNode))}y("Restoring node position",e,i,u),u.insertBefore(e,i?i.nextSibling:u.firstChild),f.takeRecords(),n&&n()}}),f=new MutationObserver(function(){("parent"===t&&e.parentNode!==u||"prev-sibling"===t&&e.previousSibling!==i)&&d()}),h=function(){f.observe(u,{childList:!0})},p=function(){clearTimeout(l),f.disconnect(),d.cancel()},m=function(){f.takeRecords()},v=function(e){u=e,p(),h()};return h(),{run:h,stop:p,skip:m}}function N(e,t){if(null!=e)for(var n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:function(e){return null==e.shadowRoot?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT}}),r=e.shadowRoot?n.currentNode:n.nextNode();null!=r;r=n.nextNode())t(r),N(r.shadowRoot,t)}function F(){return"complete"===document.readyState||"interactive"===document.readyState}function B(e){Rn.add(e)}function D(e){Rn.delete(e)}function W(e){if(e.length>Pn)return!0;for(var t=0,n=0;n<e.length;n++)if(t+=e[n].addedNodes.length,t>Pn)return!0;return!1}function I(e){var t=new Set,n=new Set,r=new Set;e.forEach(function(e){h(e.addedNodes,function(e){e instanceof Element&&e.isConnected&&t.add(e)}),h(e.removedNodes,function(e){e instanceof Element&&(e.isConnected?r.add(e):n.add(e))})}),r.forEach(function(e){return t.delete(e)});var o=[],a=[];return t.forEach(function(e){t.has(e.parentElement)&&o.push(e)}),n.forEach(function(e){n.has(e.parentElement)&&a.push(e)}),o.forEach(function(e){return t.delete(e)}),a.forEach(function(e){return n.delete(e)}),{additions:t,moves:r,deletions:n}}function z(e,t){var n,r,o;if(On.has(e))n=On.get(e),r=jn.get(n);else{var a=!1,i=!1;n=new MutationObserver(function(t){if(W(t))!a||F()?r.forEach(function(t){var n=t.onHugeMutations;return n(e)}):i||(o=function(){return r.forEach(function(t){var n=t.onHugeMutations;return n(e)})},B(o),i=!0),a=!0;else{var n=I(t);r.forEach(function(e){var t=e.onMinorMutations;return t(n)})}}),n.observe(e,{childList:!0,subtree:!0}),On.set(e,n),r=new Set,jn.set(n,r)}return r.add(t),{disconnect:function(){r.delete(t),o&&D(o),0===r.size&&(n.disconnect(),jn.delete(n),On.delete(e))}}}function U(){if(qn)return qn;if(mn)return qn=new CSSStyleSheet,qn;var e=document.createElement("style");return document.head.append(e),qn=e.sheet,document.head.removeChild(e),qn}function V(e){var t=e.h,n=e.s,r=e.l,a=e.a,i=void 0===a?1:a;if(0===n){var u=o([r,r,r].map(function(e){return Math.round(255*e)}),3),c=u[0],s=u[1],l=u[2];return{r:c,g:l,b:s,a:i}}var d=(1-Math.abs(2*r-1))*n,f=d*(1-Math.abs(t/60%2-1)),h=r-d/2,p=o((t<60?[d,f,0]:t<120?[f,d,0]:t<180?[0,d,f]:t<240?[0,f,d]:t<300?[f,0,d]:[d,0,f]).map(function(e){return Math.round(255*(e+h))}),3),m=p[0],v=p[1],g=p[2];return{r:m,g:v,b:g,a:i}}function $(e){var t=e.r,n=e.g,r=e.b,o=e.a,a=void 0===o?1:o,i=t/255,u=n/255,c=r/255,s=Math.max(i,u,c),l=Math.min(i,u,c),d=s-l,f=(s+l)/2;if(0===d)return{h:0,s:0,l:f,a:a};var h=60*(s===i?(u-c)/d%6:s===u?(c-i)/d+2:(i-u)/d+4);h<0&&(h+=360);var p=d/(1-Math.abs(2*f-1));return{h:h,s:p,l:f,a:a}}function H(e,t){void 0===t&&(t=0);var n=e.toFixed(t);if(0===t)return n;var r=n.indexOf(".");if(r>=0){var o=n.match(/0+$/);if(o)return o.index===r+1?n.substring(0,r):n.substring(0,o.index)}return n}function G(e){var t=e.r,n=e.g,r=e.b,o=e.a;return null!=o&&o<1?"rgba("+H(t)+", "+H(n)+", "+H(r)+", "+H(o,2)+")":"rgb("+H(t)+", "+H(n)+", "+H(r)+")"}function K(e){var t=e.r,n=e.g,r=e.b,o=e.a;return"#"+(null!=o&&o<1?[t,n,r,Math.round(255*o)]:[t,n,r]).map(function(e){return(e<16?"0":"")+e.toString(16)}).join("")}function J(e){var t=e.h,n=e.s,r=e.l,o=e.a;return null!=o&&o<1?"hsla("+H(t)+", "+H(100*n)+"%, "+H(100*r)+"%, "+H(o,2)+")":"hsl("+H(t)+", "+H(100*n)+"%, "+H(100*r)+"%)"}function Q(e){var t=e.trim().toLowerCase();if(t.match(Nn))return Y(t);if(t.match(Fn))return Z(t);if(t.match(Bn))return ee(t);if($n.has(t))return te(t);if(Hn.has(t))return ne(t);if("transparent"===e)return{r:0,g:0,b:0,a:0};throw new Error("Unable to parse "+e)}function X(e,t,n,r){var a=e.split(t).filter(function(e){return e}),i=Object.entries(r),u=a.map(function(e){return e.trim()}).map(function(e,t){var r,a=i.find(function(t){var n=o(t,1),r=n[0];return e.endsWith(r)});return r=a?parseFloat(e.substring(0,e.length-a[0].length))/a[1]*n[t]:parseFloat(e),n[t]>1?Math.round(r):r});return u}function Y(e){var t=o(X(e,Dn,Wn,In),4),n=t[0],r=t[1],a=t[2],i=t[3],u=void 0===i?1:i;return{r:n,g:r,b:a,a:u}}function Z(e){var t=o(X(e,zn,Un,Vn),4),n=t[0],r=t[1],a=t[2],i=t[3],u=void 0===i?1:i;return V({h:n,s:r,l:a,a:u})}function ee(e){var t=e.substring(1);switch(t.length){case 3:case 4:var n=o([0,1,2].map(function(e){return parseInt(""+t[e]+t[e],16)}),3),r=n[0],a=n[1],i=n[2],u=3===t.length?1:parseInt(""+t[3]+t[3],16)/255;return{r:r,g:a,b:i,a:u};case 6:case 8:var c=o([0,2,4].map(function(e){return parseInt(t.substring(e,e+2),16)}),3);r=c[0],a=c[1],i=c[2],u=6===t.length?1:parseInt(t.substring(6,8),16)/255;return{r:r,g:a,b:i,a:u}}throw new Error("Unable to parse "+e)}function te(e){var t=$n.get(e);return{r:t>>16&255,g:t>>8&255,b:t>>0&255,a:1}}function ne(e){var t=Hn.get(e);return{r:t>>16&255,g:t>>8&255,b:t>>0&255,a:1}}function re(e,t,n,r,o){return(e-t)*(o-r)/(n-t)+r}function oe(e,t,n){return Math.min(n,Math.max(t,e))}function ae(e,t){for(var n=[],r=0,o=e.length;r<o;r++){n[r]=[];for(var a=0,i=t[0].length;a<i;a++){for(var u=0,c=0,s=e[0].length;c<s;c++)u+=e[r][c]*t[c][a];n[r][a]=u}}return n}function ie(e,t,n){void 0===n&&(n=0);for(var r,o=[];r=e.exec(t);)o.push(r[n]);return o}function ue(e){function t(e){return e.replace(/^\s+/,"")}function n(e){return 0===e?"":" ".repeat(4*e)}for(var r=/[^{}]+{\s*}/g;r.test(e);)e=e.replace(r,"");for(var o=e.replace(/\s{2,}/g," ").replace(/\{/g,"{\n").replace(/\}/g,"\n}\n").replace(/\;(?![^\(|\"]*(\)|\"))/g,";\n").replace(/\,(?![^\(|\"]*(\)|\"))/g,",\n").replace(/\n\s*\n/g,"\n").split("\n"),a=0,i=[],u=0,c=o.length;u<c;u++){var s=o[u]+"\n";s.match(/\{/)?i.push(n(a++)+t(s)):s.match(/\}/)?i.push(n(--a)+t(s)):i.push(n(a)+t(s))}return i.join("").trim()}function ce(e){var t=Gn.identity();return 0!==e.sepia&&(t=ae(t,Gn.sepia(e.sepia/100))),0!==e.grayscale&&(t=ae(t,Gn.grayscale(e.grayscale/100))),100!==e.contrast&&(t=ae(t,Gn.contrast(e.contrast/100))),100!==e.brightness&&(t=ae(t,Gn.brightness(e.brightness/100))),1===e.mode&&(t=ae(t,Gn.invertNHue())),t}function se(e,t){var n=o(e,3),r=n[0],a=n[1],i=n[2],u=[[r/255],[a/255],[i/255],[1],[1]],c=ae(t,u);return[0,1,2].map(function(e){return oe(Math.round(255*c[e][0]),0,255)})}function le(e){var t=1===e.mode,n=t?"darkSchemeBackgroundColor":"lightSchemeBackgroundColor";return e[n]}function de(e){var t=1===e.mode,n=t?"darkSchemeTextColor":"lightSchemeTextColor";return e[n]}function fe(e){if(Jn.has(e))return Jn.get(e);var t=Q(e),n=$(t);return Jn.set(e,n),n}function he(){Kn.clear(),Jn.clear()}function pe(e,t){return Qn.map(function(t){return e[t]}).concat(Xn.map(function(e){return t[e]})).join(";")}function me(e,t,n,r,a){var i;Kn.has(n)?i=Kn.get(n):(i=new Map,Kn.set(n,i));var u=pe(e,t);if(i.has(u))return i.get(u);var c=$(e),s=null==r?null:fe(r),l=null==a?null:fe(a),d=n(c,s,l),f=V(d),h=f.r,p=f.g,m=f.b,v=f.a,g=ce(t),b=o(se([h,p,m],g),3),y=b[0],S=b[1],w=b[2],k=1===v?K({r:y,g:S,b:w}):G({r:y,g:S,b:w,a:v});return i.set(u,k),k}function ve(e){return e}function ge(e,t){return me(e,t,ve)}function be(e,t){var n=le(t),r=de(t);return me(e,t,ye,r,n)}function ye(e,t,n){var r,o=e.h,a=e.s,i=e.l,u=e.a,c=i<.5;if(c)r=i<.2||a<.12;else{var s=o>200&&o<280;r=a<.24||i>.8&&s}var l=o,d=i;r&&(c?(l=t.h,d=t.s):(l=n.h,d=n.s));var f=re(i,0,1,t.l,n.l);return{h:l,s:d,l:f,a:u}}function Se(e,t){var n=e.h,r=e.s,o=e.l,a=e.a,i=o<.5,u=n>200&&n<280,c=r<.12||o>.8&&u;if(i){var s=re(o,0,.5,0,Yn);if(c){var l=t.h,d=t.s;return{h:l,s:d,l:s,a:a}}return{h:n,s:r,l:s,a:a}}var f=re(o,.5,1,Yn,t.l);if(c){var h=t.h;d=t.s;return{h:h,s:d,l:f,a:a}}var p=n,m=n>60&&n<180;if(m){var v=n>120;p=v?re(n,120,180,135,180):re(n,60,120,60,105)}return{h:p,s:r,l:f,a:a}}function we(e,t){if(0===t.mode)return be(e,t);var n=le(t);return me(e,on(on({},t),{mode:0}),Se,n)}function ke(e){return re(e,205,245,205,220)}function _e(e,t){var n=e.h,r=e.s,o=e.l,a=e.a,i=o>.5,u=o<.2||r<.24,c=!u&&n>205&&n<245;if(i){var s=re(o,.5,1,Zn,t.l);if(u){var l=t.h,d=t.s;return{h:l,s:d,l:s,a:a}}var f=n;return c&&(f=ke(n)),{h:f,s:r,l:s,a:a}}if(u){var h=t.h,p=(d=t.s,re(o,0,.5,t.l,Zn));return{h:h,s:d,l:p,a:a}}var m,v=n;return c?(v=ke(n),m=re(o,0,.5,t.l,Math.min(1,Zn+.05))):m=re(o,0,.5,t.l,Zn),{h:v,s:r,l:m,a:a}}function Ee(e,t){if(0===t.mode)return be(e,t);var n=de(t);return me(e,on(on({},t),{mode:0}),_e,n)}function xe(e,t,n){var r=e.h,o=e.s,a=e.l,i=e.a,u=a<.5,c=a<.2||o<.24,s=r,l=o;c&&(u?(s=t.h,l=t.s):(s=n.h,l=n.s));var d=re(a,0,1,.5,.2);return{h:s,s:l,l:d,a:i}}function Ce(e,t){if(0===t.mode)return be(e,t);var n=de(t),r=le(t);return me(e,on(on({},t),{mode:0}),xe,n,r)}function Me(e,t){return we(e,t)}function Ae(e){var t=[];return t.push("*:not(pre) {"),e.useFont&&e.fontFamily&&t.push("  font-family: "+e.fontFamily+" !important;"),e.textStroke>0&&(t.push("  -webkit-text-stroke: "+e.textStroke+"px !important;"),t.push("  text-stroke: "+e.textStroke+"px !important;")),t.push("}"),t.join("\n")}function Re(e){var t=[];return e.mode===Tn.dark&&t.push("invert(100%) hue-rotate(180deg)"),100!==e.brightness&&t.push("brightness("+e.brightness+"%)"),100!==e.contrast&&t.push("contrast("+e.contrast+"%)"),0!==e.grayscale&&t.push("grayscale("+e.grayscale+"%)"),0!==e.sepia&&t.push("sepia("+e.sepia+"%)"),0===t.length?null:t.join(" ")}function Le(e){return t(this,void 0,void 0,function(){return n(this,function(t){return[2,new Promise(function(t,n){var r=++er;tr.set(r,t),nr.set(r,n),chrome.runtime.sendMessage({type:"fetch",data:e,id:r})})]})})}function Te(){null,null}function Pe(){Te(),rr.forEach(function(e){return URL.revokeObjectURL(e)}),rr.clear()}function Oe(e,t,n,r,o){var a=Boolean(n&&n.style&&n.style.getPropertyPriority(e)),i=t;if(e.startsWith("--"))return null;if(e.indexOf("color")>=0&&"-webkit-print-color-adjust"!==e||"fill"===e||"stroke"===e||"stop-color"===e){var u=Ie(e,t);if(u)return{property:e,value:u,important:a,sourceValue:i}}else if("background-image"===e||"list-style-image"===e){u=ze(t,n,r,o);if(u)return{property:e,value:u,important:a,sourceValue:i}}else if(e.indexOf("shadow")>=0){u=Ue(e,t);if(u)return{property:e,value:u,important:a,sourceValue:i}}return null}function je(e,t,n){var r=[];return t||(r.push("html {"),r.push("    background-color: "+we({r:255,g:255,b:255},e)+" !important;"),r.push("}")),r.push((t?"":"html, body, ")+(n?"input, textarea, select, button":"")+" {"),r.push("    background-color: "+we({r:255,g:255,b:255},e)+";"),r.push("}"),r.push("html, body, "+(n?"input, textarea, select, button":"")+" {"),r.push("    border-color: "+Ce({r:76,g:76,b:76},e)+";"),r.push("    color: "+Ee({r:0,g:0,b:0},e)+";"),r.push("}"),r.push("a {"),r.push("    color: "+Ee({r:0,g:64,b:255},e)+";"),r.push("}"),r.push("table {"),r.push("    border-color: "+Ce({r:128,g:128,b:128},e)+";"),r.push("}"),r.push("::placeholder {"),r.push("    color: "+Ee({r:169,g:169,b:169},e)+";"),r.push("}"),r.push("input:-webkit-autofill,"),r.push("textarea:-webkit-autofill,"),r.push("select:-webkit-autofill {"),r.push("    background-color: "+we({r:250,g:255,b:189},e)+" !important;"),r.push("    color: "+Ee({r:0,g:0,b:0},e)+" !important;"),r.push("}"),e.scrollbarColor&&r.push(Fe(e)),e.selectionColor&&r.push(Ne(e)),r.join("\n")}function qe(e){var t,n;if("auto"===e.selectionColor)t=we({r:0,g:96,b:212},on(on({},e),{grayscale:0})),n=Ee({r:255,g:255,b:255},on(on({},e),{grayscale:0}));else{var r=Q(e.selectionColor),o=$(r);t=e.selectionColor,n=o.l<.5?"#FFF":"#000"}return{backgroundColorSelection:t,foregroundColorSelection:n}}function Ne(e){var t=[],n=qe(e),r=n.backgroundColorSelection,o=n.foregroundColorSelection;return["::selection","::-moz-selection"].forEach(function(e){t.push(e+" {"),t.push("    background-color: "+r+" !important;"),t.push("    color: "+o+" !important;"),t.push("}")}),t.join("\n")}function Fe(e){var t,n,r,o,a,i,u=[];if("auto"===e.scrollbarColor)t=we({r:241,g:241,b:241},e),n=Ee({r:96,g:96,b:96},e),r=we({r:176,g:176,b:176},e),o=we({r:144,g:144,b:144},e),a=we({r:96,g:96,b:96},e),i=we({r:255,g:255,b:255},e);else{var c=Q(e.scrollbarColor),s=$(c),l=s.l>.5,d=function(e){return on(on({},s),{l:oe(s.l+e,0,1)})},f=function(e){return on(on({},s),{l:oe(s.l-e,0,1)})};t=J(f(.4)),n=J(l?f(.4):d(.4)),r=J(s),o=J(d(.1)),a=J(d(.2))}return u.push("::-webkit-scrollbar {"),u.push("    background-color: "+t+";"),u.push("    color: "+n+";"),u.push("}"),u.push("::-webkit-scrollbar-thumb {"),u.push("    background-color: "+r+";"),u.push("}"),u.push("::-webkit-scrollbar-thumb:hover {"),u.push("    background-color: "+o+";"),u.push("}"),u.push("::-webkit-scrollbar-thumb:active {"),u.push("    background-color: "+a+";"),u.push("}"),u.push("::-webkit-scrollbar-corner {"),u.push("    background-color: "+i+";"),u.push("}"),u.push("* {"),u.push("    scrollbar-color: "+t+" "+r+";"),u.push("}"),u.join("\n")}function Be(e,t){var n=t.strict,r=[];return r.push("html, body, "+(n?"body :not(iframe)":"body > :not(iframe)")+" {"),r.push("    background-color: "+we({r:255,g:255,b:255},e)+" !important;"),r.push("    border-color: "+Ce({r:64,g:64,b:64},e)+" !important;"),r.push("    color: "+Ee({r:0,g:0,b:0},e)+" !important;"),r.push("}"),""}function De(e){if(e=e.trim(),ar.has(e))return ar.get(e);var t=Q(e);return ar.set(e,t),t}function We(e){try{return De(e)}catch(e){return null}}function Ie(e,t){if(or.has(t.toLowerCase()))return t;try{var n=De(t);return e.indexOf("background")>=0?function(e){return we(n,e)}:e.indexOf("border")>=0||e.indexOf("outline")>=0?function(e){return Ce(n,e)}:function(e){return Ee(n,e)}}catch(e){return y("Color parse error",e),null}}function ze(e,t,n,r){return null}function Ue(e,t){try{var n=0,r=ie(/(^|\s)([a-z]+\(.+?\)|#[0-9a-f]+|[a-z]+)(.*?(inset|outset)?($|,))/gi,t,2),o=r.map(function(e,o){var a=n,i=t.indexOf(e,n),u=i+e.length;n=u;var c=We(e);return c?function(e){return""+t.substring(a,i)+Me(c,e)+(o===r.length-1?t.substring(u):"")}:function(){return t.substring(a,u)}});return function(e){return o.map(function(t){return t(e)}).join("")}}catch(e){return y("Unable to parse shadow "+t,e),null}}function Ve(){ar.clear(),he(),ir.clear(),Pe(),ur.clear()}function $e(){return sr.map(function(e){var t=e.dataAttr,n=e.customProp,r=e.cssProp;return["["+t+"] {","  "+r+": var("+n+") !important;","}"].join("\n")}).join("\n")}function He(e){var t=[];return e instanceof Element&&e.matches(dr)&&t.push(e),(e instanceof Element||hn&&e instanceof ShadowRoot||e instanceof Document)&&p(t,e.querySelectorAll(dr)),t}function Ge(e,t){Ke(document,e,t),N(document.documentElement,function(n){Ke(n.shadowRoot,e,t)})}function Ke(e,t,n){function r(e){He(e).forEach(function(e){o.has(e)||(o.add(e),t(e))}),N(e,function(r){o.has(e)||(o.add(e),n(r.shadowRoot),Ke(r.shadowRoot,t,n))})}fr.has(e)&&(fr.get(e).disconnect(),hr.get(e).disconnect());var o=new WeakSet,i=z(e,{onMinorMutations:function(e){var t=e.additions;t.forEach(function(e){return r(e)})},onHugeMutations:function(){r(e)}});fr.set(e,i);var u=0,c=null,s=O({seconds:10}),l=O({seconds:2}),d=50,f=[],h=null,p=T(function(e){e.forEach(function(e){lr.includes(e.attributeName)&&t(e.target)})}),m=new MutationObserver(function(e){if(h)f.push.apply(f,a(e));else{u++;var t=Date.now();if(null==c)c=t;else if(u>=d){if(t-c<s)return h=setTimeout(function(){c=null,u=0,h=null;var e=f;f=[],p(e)},l),void f.push.apply(f,a(e));c=t,u=1}p(e)}});m.observe(e,{attributes:!0,attributeFilter:lr.concat(sr.map(function(e){var t=e.dataAttr;return t})),subtree:!0}),hr.set(e,m)}function Je(){fr.forEach(function(e){return e.disconnect()}),hr.forEach(function(e){return e.disconnect()}),fr.clear(),hr.clear()}function Qe(e,t){return lr.map(function(t){return t+'="'+e.getAttribute(t)+'"'}).concat(mr.map(function(e){return e+'="'+t[e]+'"'})).join(" ")}function Xe(e,t){for(var n=0,r=t.length;n<r;n++){var o=t[n];if(e.matches(o))return!0}return!1}function Ye(e,t,n,r){function o(n,o,a){var u=cr[n],c=u.customProp,s=u.dataAttr,l=Oe(o,a,null,r,null);if(l){var d=l.value;"function"==typeof d&&(d=d(t)),e.style.setProperty(c,d),e.hasAttribute(s)||e.setAttribute(s,""),i.delete(n)}}var a=Qe(e,t);if(a!==pr.get(e)){var i=new Set(Object.keys(cr));if(n.length>0&&Xe(e,n))i.forEach(function(t){e.removeAttribute(cr[t].dataAttr)});else{if(e.hasAttribute("bgcolor")){var u=e.getAttribute("bgcolor");(u.match(/^[0-9a-f]{3}$/i)||u.match(/^[0-9a-f]{6}$/i))&&(u="#"+u),o("background-color","background-color",u)}if(e.hasAttribute("color")){u=e.getAttribute("color");(u.match(/^[0-9a-f]{3}$/i)||u.match(/^[0-9a-f]{6}$/i))&&(u="#"+u),o("color","color",u)}if(e instanceof SVGElement){if(e.hasAttribute("fill")){var c=32,s=(u=e.getAttribute("fill"),!1);if(!(e instanceof SVGTextElement)){var l=e.getBoundingClientRect(),d=l.width,f=l.height;s=d>c||f>c}o("fill",s?"background-color":"color",u)}e.hasAttribute("stop-color")&&o("stop-color","background-color",e.getAttribute("stop-color"))}if(e.hasAttribute("stroke")){u=e.getAttribute("stroke");o("stroke",e instanceof SVGLineElement||e instanceof SVGTextElement?"border-color":"color",u)}e.style&&w(e.style,function(e,t){"background-image"===e&&t.indexOf("url")>=0||cr.hasOwnProperty(e)&&o(e,e,t)}),e.style&&e instanceof SVGTextElement&&e.style.fill&&o("fill","color",e.style.getPropertyValue("fill")),h(i,function(t){e.removeAttribute(cr[t].dataAttr)}),pr.set(e,Qe(e,t))}}}function Ze(e,t){br=br||e.content;try{var n=Q(br);e.content=we(n,t)}catch(e){y(e)}}function et(e){var t=document.querySelector(gr);t?Ze(t,e):(yr&&yr.disconnect(),yr=new MutationObserver(function(t){e:for(var n=0;n<t.length;n++)for(var r=t[n].addedNodes,o=0;o<r.length;o++){var a=r[o];if(a instanceof HTMLMetaElement&&a.name===vr){yr.disconnect(),yr=null,Ze(a,e);break e}}}),yr.observe(document.head,{childList:!0}))}function tt(){yr&&(yr.disconnect(),yr=null);var e=document.querySelector(gr);e&&br&&(e.content=br)}function nt(e){return Sr.map(function(t){return t+":"+e[t]}).join(";")}function rt(){function e(e){function a(e,t,n){var r=n.selector,o=n.declarations;if(!r)return;const a=e=>document.createDocumentFragment().querySelector(e),i=e=>{try{a(e)}catch{return!1}return!0};if(!i(r))return;const u=document.querySelector(r);if(void 0!==u&&u){e.insertRule(r+" {}",t);var c=e.cssRules[t].style;o.forEach(function(e){if(("undefined"==typeof wpDarkMode||""===wpDarkMode.includes||u.classList.contains("wp-dark-mode-include"))&&!r.includes(".wp-dark-mode-ignore")&&!u.classList.contains("wp-dark-mode-ignore")){var t=e.property,n=e.value,o=e.important,a=e.sourceValue;"background-image"!==t&&c.setProperty(t,null==n?a:n,o?"important":"")}})}}function i(e){if(null==e)return x;if(C.has(e))return C.get(e);var t={rule:e,rules:[],isGroup:!0};C.set(e,t);var n=i(e.parentRule);return n.rules.push(t),t}function u(){function e(e,t){var n=e.rule;if(n instanceof CSSMediaRule){var r=n.media,o=t.cssRules.length;return t.insertRule("@media "+r.mediaText+" {}",o),t.cssRules[o]}return t}function t(n,r,o){n.rules.forEach(function(n){if(n.isGroup){var a=e(n,r);t(n,a,o)}else o(n,r)})}t(x,M,function(e,t){var n=t.cssRules.length;e.declarations.filter(function(e){var t=e.value;return null==t}).forEach(function(r){var o=r.asyncKey;return _.set(o,{rule:e,target:t,index:n})}),a(t,n,e)})}function c(e){var t=_.get(e);if(void 0!==t){var n=t.rule,r=t.target,o=t.index;r.deleteRule(o),a(r,o,n),_.delete(e)}}var s=e.sourceCSSRules,l=e.theme,d=e.variables,f=e.ignoreImageAnalysis,h=e.force,p=e.prepareSheet,m=e.isAsyncCancelled,v=0===r.size,g=new Set(r.keys()),b=nt(l),y=b!==o,k=[];if(S(s,function(e){if(!e.parentStyleSheet.ownerNode||"wp-dark-mode-custom-css"!==e.parentStyleSheet.ownerNode.getAttribute("id")){var t,o=e.cssText,a=!1;g.delete(o),n.has(o)||(n.set(o,o),a=!0);var i=null;if(d.size>0||o.includes("var(")){var u=L(o,d);n.get(o)!==u&&(n.set(o,u),a=!0,t=U(),t.insertRule(u),i=t.cssRules[0])}if(a){v=!0;var c=[],s=i||e;s&&s.style&&w(s.style,function(t,n){var r=Oe(t,n,e,f,m);r&&c.push(r)});var l=null;if(c.length>0){var h=e.parentRule;l={selector:e.selectorText,declarations:c,parentRule:h},k.push(l)}r.set(o,l),t&&t.deleteRule(0)}else k.push(r.get(o))}}),g.forEach(function(e){n.delete(e),r.delete(e)}),o=b,h||v||y){t++;var _=new Map,E=0,x={rule:null,rules:[],isGroup:!0},C=new WeakMap;k.filter(function(e){return e}).forEach(function(e){var n=e.selector,r=e.declarations,o=e.parentRule,a=i(o),u={selector:n,declarations:[],isGroup:!1},s=u.declarations;a.rules.push(u),r.forEach(function(e){var n=e.property,r=e.value,o=e.important,a=e.sourceValue;if("function"==typeof r){var i=r(l);if(i instanceof Promise){var u=E++,d={property:n,value:null,important:o,asyncKey:u,sourceValue:a};s.push(d);var f=i,h=t;f.then(function(e){e&&!m()&&h===t&&(d.value=e,wr.add(function(){m()||h!==t||c(u)}))})}else s.push({property:n,value:i,important:o,sourceValue:a})}else s.push({property:n,value:r,important:o,sourceValue:a})})});var M=p();u()}}var t=0,n=new Map,r=new Map,o=null;return{modifySheet:e}}function ot(e){return(e instanceof HTMLStyleElement||e instanceof SVGStyleElement||e instanceof HTMLLinkElement&&e.rel&&e.rel.toLowerCase().includes("stylesheet")&&!e.disabled)&&!e.classList.contains("darkreader")&&"print"!==e.media&&!e.classList.contains("stylus")}function at(e,t,n){return void 0===t&&(t=[]),void 0===n&&(n=!0),ot(e)?t.push(e):(e instanceof Element||hn&&e instanceof ShadowRoot||e===document)&&(h(e.querySelectorAll(kr),function(e){return at(e,t,!1)}),n&&N(e,function(e){return at(e.shadowRoot,t,!1)})),t}function it(e,r){function a(){return e instanceof HTMLStyleElement&&e.textContent.trim().match(xn)}function i(){return B?B.sheet.cssRules:a()?null:p()}function u(){B?(e.nextSibling!==B&&e.parentNode.insertBefore(B,e.nextSibling),B.nextSibling!==D&&e.parentNode.insertBefore(D,B.nextSibling)):e.nextSibling!==D&&e.parentNode.insertBefore(D,e.nextSibling)}function c(){D=e instanceof SVGStyleElement?document.createElementNS("http://www.w3.org/2000/svg","style"):document.createElement("style"),D.classList.add("darkreader"),D.classList.add("darkreader--sync"),D.media="screen",_r.add(D)}function s(){return t(this,void 0,void 0,function(){var t,r,i,u,c,s,l,d,p;return n(this,function(n){switch(n.label){case 0:if(!(e instanceof HTMLLinkElement))return[3,7];if(i=o(f(),2),u=i[0],c=i[1],c&&y(c),(u||c||ln)&&(!ln||e.sheet)&&!h(c))return[3,5];n.label=1;case 1:return n.trys.push([1,3,,4]),[4,ut(e)];case 2:return n.sent(),[3,4];case 3:return s=n.sent(),y(s),G=!0,[3,4];case 4:if(z)return[2,null];p=o(f(),2),u=p[0],c=p[1],c&&y(c),n.label=5;case 5:return null!=u?[2,u]:[4,st(e.href)];case 6:return t=n.sent(),r=C(e.href),z?[2,null]:[3,8];case 7:if(!a())return[2,null];t=e.textContent.trim(),r=C(location.href),n.label=8;case 8:if(!t)return[3,13];n.label=9;case 9:return n.trys.push([9,11,,12]),[4,lt(t,r)];case 10:return l=n.sent(),B=dt(e,l),[3,12];case 11:return d=n.sent(),y(d),[3,12];case 12:if(B)return W=q(B,"prev-sibling"),[2,B.sheet.cssRules];n.label=13;case 13:return[2,null]}})})}function l(){var e=i();if(!e)return H||G?null:(H=!0,P(),s().then(function(e){H=!1,O(),e&&T()}).catch(function(e){y(e),H=!1,O()}),null);var t=_(e);return{variables:t}}function d(e,t,n){function r(){D||c(),I&&I.stop(),u(),null==D.sheet&&(D.textContent="");for(var e=D.sheet,t=e.cssRules.length-1;t>=0;t--)e.deleteRule(t);return I?I.run():I=q(D,"prev-sibling",function(){K=!0,o()}),D.sheet}function o(){var o=K;K=!1,U.modifySheet({prepareSheet:r,sourceCSSRules:a,theme:e,variables:t,ignoreImageAnalysis:n,force:o,isAsyncCancelled:function(){return z}})}var a=i();a&&(z=!1,o())}function f(){try{return null==e.sheet?[null,null]:[e.sheet.cssRules,null]}catch(e){return[null,e]}}function h(e){return e&&e.message&&e.message.includes("loading")}function p(){var e=o(f(),2),t=e[0],n=e[1];return n?(y(n),null):t}function m(){k(),xr&&e.sheet||b()}function v(){var e=p();return e?e.length:null}function g(){return v()!==J}function b(){J=v(),S();var t=function(){g()&&(J=v(),T()),xr&&e.sheet?S():Q=requestAnimationFrame(t)};t()}function S(){cancelAnimationFrame(Q)}function w(){function e(){X=!1,z||T()}xr=!0,S(),X||(X=!0,"function"==typeof queueMicrotask?queueMicrotask(e):requestAnimationFrame(e))}function k(){e.addEventListener("__darkreader__updateSheet",w)}function E(){e.removeEventListener("__darkreader__updateSheet",w)}function x(){E(),S()}function M(){V.disconnect(),z=!0,W&&W.stop(),I&&I.stop(),x()}function A(){M(),j(B),j(D)}function R(){V.observe(e,$),e instanceof HTMLStyleElement&&m()}function L(){if(D)if(Z++,Z>Y)y("Style sheet was moved multiple times",e);else{y("Restore style",D,e);var t=null==D.sheet||D.sheet.cssRules.length>0;u(),W&&W.skip(),I&&I.skip(),t&&(K=!0,T())}}for(var T=r.update,P=r.loadingStart,O=r.loadingEnd,N=[],F=e;(F=F.nextElementSibling)&&F.matches(".darkreader");)N.push(F);var B=N.find(function(e){return e.matches(".darkreader--cors")&&!Er.has(e)})||null,D=N.find(function(e){return e.matches(".darkreader--sync")&&!_r.has(e)
})||null,W=null,I=null,z=!1,U=rt(),V=new MutationObserver(function(){T()}),$={attributes:!0,childList:!0,characterData:!0},H=!1,G=!1,K=!1,J=null,Q=null,X=!1,Y=10,Z=0;return{details:l,render:d,pause:M,destroy:A,watch:R,restore:L}}function ut(e){return t(this,void 0,void 0,function(){return n(this,function(t){return[2,new Promise(function(t,n){var r=function(){e.removeEventListener("load",o),e.removeEventListener("error",a)},o=function(){r(),t()},a=function(){r(),n("Link loading failed "+e.href)};e.addEventListener("load",o),e.addEventListener("error",a)})]})})}function ct(e){return x(e.substring(8).replace(/;$/,""))}function st(e){return t(this,void 0,void 0,function(){return n(this,function(t){switch(t.label){case 0:return e.startsWith("data:")?[4,fetch(e)]:[3,3];case 1:return[4,t.sent().text()];case 2:return[2,t.sent()];case 3:return[4,Le({url:e,responseType:"text",mimeType:"text/css"})];case 4:return[2,t.sent()]}})})}function lt(e,o,a){return void 0===a&&(a=new Map),t(this,void 0,void 0,function(){var t,i,u,c,s,l,d,f,h,p,m;return n(this,function(n){switch(n.label){case 0:e=A(e),e=R(e),e=M(e,o),t=ie(xn,e),n.label=1;case 1:n.trys.push([1,10,11,12]),i=r(t),u=i.next(),n.label=2;case 2:return u.done?[3,9]:(c=u.value,s=ct(c),l=b(o,s),d=void 0,a.has(l)?(d=a.get(l),[3,7]):[3,3]);case 3:return n.trys.push([3,6,,7]),[4,st(l)];case 4:return d=n.sent(),a.set(l,d),[4,lt(d,C(l),a)];case 5:return d=n.sent(),[3,7];case 6:return f=n.sent(),y(f),d="",[3,7];case 7:e=e.split(c).join(d),n.label=8;case 8:return u=i.next(),[3,2];case 9:return[3,12];case 10:return h=n.sent(),p={error:h},[3,12];case 11:try{u&&!u.done&&(m=i.return)&&m.call(i)}finally{if(p)throw p.error}return[7];case 12:return e=e.trim(),[2,e]}})})}function dt(e,t){if(!t)return null;var n=document.createElement("style");return n.classList.add("darkreader"),n.classList.add("darkreader--cors"),n.media="screen",n.textContent=t,e.parentNode.insertBefore(n,e.nextSibling),n.sheet.disabled=!0,Er.add(n),n}function ft(e){pn&&h(e.querySelectorAll(":not(:defined)"),function(e){var t=e.tagName.toLowerCase();Rr.has(t)||(Rr.set(t,new Set),pt(t).then(function(){if(Mr){var e=Rr.get(t);Rr.delete(t),Mr(Array.from(e))}})),Rr.get(t).add(e)})}function ht(e){if(Lr=!0,Tr.has(e.detail.tag)){var t=Tr.get(e.detail.tag);t()}}function pt(e){return t(this,void 0,void 0,function(){return n(this,function(t){return[2,new Promise(function(t){if(window.customElements&&"function"==typeof customElements.whenDefined)customElements.whenDefined(e).then(t);else if(Lr)Tr.set(e,t),document.dispatchEvent(new CustomEvent("__darkreader__addUndefinedResolver",{detail:{tag:e}}));else{var n=function(){var r=Rr.get(e);r&&r.size>0&&(r.values().next().value.matches(":defined")?t():requestAnimationFrame(n))};requestAnimationFrame(n)}})]})})}function mt(e){Mr=e}function vt(){Mr=null,Rr.clear(),document.removeEventListener("__darkreader__isDefined",ht)}function gt(e,t,n){function r(e){h.set(e,e.previousElementSibling),m.set(e,e.nextElementSibling)}function o(e){h.delete(e),m.delete(e)}function a(e){return e.previousElementSibling!==h.get(e)||e.nextElementSibling!==m.get(e)}function i(e){var n=e.createdStyles,a=e.removedStyles,i=e.movedStyles;n.forEach(function(e){return r(e)}),i.forEach(function(e){return r(e)}),a.forEach(function(e){return o(e)}),n.forEach(function(e){return f.add(e)}),a.forEach(function(e){return f.delete(e)}),n.size+a.size+i.size>0&&t({created:Array.from(n),removed:Array.from(a),moved:Array.from(i),updated:[]})}function u(e){var t=e.additions,n=e.moves,r=e.deletions,o=new Set,a=new Set,u=new Set;t.forEach(function(e){return at(e).forEach(function(e){return o.add(e)})}),r.forEach(function(e){return at(e).forEach(function(e){return a.add(e)})}),n.forEach(function(e){return at(e).forEach(function(e){return u.add(e)})}),i({createdStyles:o,removedStyles:a,movedStyles:u}),t.forEach(function(e){N(e,d),ft(e)})}function c(e){var t=new Set(at(e)),n=new Set,r=new Set,o=new Set;t.forEach(function(e){f.has(e)||n.add(e)}),f.forEach(function(e){t.has(e)||r.add(e)}),t.forEach(function(e){n.has(e)||r.has(e)||!a(e)||o.add(e)}),i({createdStyles:n,removedStyles:r,movedStyles:o}),N(e,d),ft(e)}function s(e){var n=new Set,r=new Set;e.forEach(function(e){var t=e.target;t.isConnected&&(ot(t)?n.add(t):t instanceof HTMLLinkElement&&t.disabled&&r.add(t))}),n.size+r.size>0&&t({updated:Array.from(n),created:[],removed:Array.from(r),moved:[]})}function l(e){var t=z(e,{onMinorMutations:u,onHugeMutations:c}),n=new MutationObserver(s);n.observe(e,{attributes:!0,attributeFilter:["rel","disabled","media"],subtree:!0}),Ar.push(t,n),Cr.add(e)}function d(e){var t=e.shadowRoot;null==t||Cr.has(t)||(l(t),n(t))}yt();var f=new Set(e),h=new WeakMap,m=new WeakMap;e.forEach(r),l(document),N(document.documentElement,d),mt(function(e){var n=[];e.forEach(function(e){return p(n,at(e.shadowRoot))}),t({created:n,updated:[],removed:[],moved:[]}),e.forEach(function(e){var t=e.shadowRoot;null!=t&&(d(e),N(t,d),ft(t))})}),document.addEventListener("__darkreader__isDefined",ht),ft(document)}function bt(){Ar.forEach(function(e){return e.disconnect()}),Ar.splice(0,Ar.length),Cr=new WeakSet}function yt(){bt(),vt()}function St(e){return(e<16?"0":"")+e.toString(16)}function wt(){return Array.from(crypto.getRandomValues(new Uint8Array(16))).map(function(e){return St(e)}).join("")}function kt(e){function t(t,n){var r=a(e.adoptedStyleSheets),o=r.indexOf(t),i=r.indexOf(n);o!==i-1&&(i>=0&&r.splice(i,1),r.splice(o+1,0,n),e.adoptedStyleSheets=r)}function n(){o=!0;var t=a(e.adoptedStyleSheets);e.adoptedStyleSheets.forEach(function(e){if(Or.has(e)){var n=t.indexOf(e);n>=0&&t.splice(n,1),Pr.delete(e),Or.delete(e)}}),e.adoptedStyleSheets=t}function r(n,r,a){e.adoptedStyleSheets.forEach(function(e){function i(){for(var n=c.cssRules.length-1;n>=0;n--)c.deleteRule(n);return t(e,c),Pr.set(e,c),Or.add(c),c}if(!Or.has(e)){var u=e.rules,c=new CSSStyleSheet,s=r;_(e.cssRules).forEach(function(e,t){return s.set(t,e)});var l=rt();l.modifySheet({prepareSheet:i,sourceCSSRules:u,theme:n,variables:s,ignoreImageAnalysis:a,force:!1,isAsyncCancelled:function(){return o}})}})}var o=!1;return{render:r,destroy:n}}function _t(){function e(e,t,n){return o.value.call(this,e,t,n),this.ownerNode&&!this.ownerNode.classList.contains("darkreader")&&this.ownerNode.dispatchEvent(l),-1}function t(e,t){var n=a.value.call(this,e,t);return this.ownerNode&&!this.ownerNode.classList.contains("darkreader")&&this.ownerNode.dispatchEvent(l),n}function n(e){try{i.value.call(this,e)}catch(e){}this.ownerNode&&!this.ownerNode.classList.contains("darkreader")&&this.ownerNode.dispatchEvent(l)}function r(e){u.value.call(this,e),this.ownerNode&&!this.ownerNode.classList.contains("darkreader")&&this.ownerNode.dispatchEvent(l)}document.dispatchEvent(new CustomEvent("__darkreader__inlineScriptsAllowed"));var o=Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype,"addRule"),a=Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype,"insertRule"),i=Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype,"deleteRule"),u=Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype,"removeRule"),c=function(){Object.defineProperty(CSSStyleSheet.prototype,"addRule",o),Object.defineProperty(CSSStyleSheet.prototype,"insertRule",a),Object.defineProperty(CSSStyleSheet.prototype,"deleteRule",i),Object.defineProperty(CSSStyleSheet.prototype,"removeRule",u),document.removeEventListener("__darkreader__cleanUp",c),document.removeEventListener("__darkreader__addUndefinedResolver",function(e){return s(e)})},s=function(e){customElements.whenDefined(e.detail.tag).then(function(){document.dispatchEvent(new CustomEvent("__darkreader__isDefined",{detail:{tag:e.detail.tag}}))})};document.addEventListener("__darkreader__cleanUp",c),document.addEventListener("__darkreader__addUndefinedResolver",function(e){return s(e)});var l=new Event("__darkreader__updateSheet");Object.defineProperty(CSSStyleSheet.prototype,"addRule",Object.assign({},o,{value:e})),Object.defineProperty(CSSStyleSheet.prototype,"insertRule",Object.assign({},a,{value:t})),Object.defineProperty(CSSStyleSheet.prototype,"deleteRule",Object.assign({},i,{value:n})),Object.defineProperty(CSSStyleSheet.prototype,"removeRule",Object.assign({},u,{value:r}))}function Et(e,t){void 0===t&&(t=document.head||document);var n=t.querySelector("."+e);return n||(n=document.createElement("style"),n.classList.add("darkreader"),n.classList.add(e),n.media="screen"),n}function xt(e,t){void 0===t&&(t=document.head||document);var n=t.querySelector("."+e);return n||(n=document.createElement("script"),n.classList.add("darkreader"),n.classList.add(e)),n}function Ct(e,t){Ir.has(t)&&Ir.get(t).stop(),Ir.set(t,q(e,"parent"))}function Mt(){h(Ir.values(),function(e){return e.stop()}),Ir.clear()}function At(){var e=Et("darkreader--fallback",document);e.textContent=Be(Br,{strict:!0}),document.head.insertBefore(e,document.head.firstChild),Ct(e,"fallback");var t=Et("darkreader--user-agent");t.textContent=je(Br,Wr,Br.styleSystemControls),document.head.insertBefore(t,e.nextSibling),Ct(t,"user-agent");var n=Et("darkreader--text");Br.useFont||Br.textStroke>0?n.textContent=Ae(Br):n.textContent="",document.head.insertBefore(n,e.nextSibling),Ct(n,"text");var r=Et("darkreader--invert");Dr&&Array.isArray(Dr.invert)&&Dr.invert.length>0?r.textContent=[Dr.invert.join(", ")+" {","    filter: "+Re(on(on({},Br),{contrast:0===Br.mode?Br.contrast:oe(Br.contrast-10,0,100)}))+" !important;","}"].join("\n"):r.textContent="",document.head.insertBefore(r,n.nextSibling),Ct(r,"invert");var o=Et("darkreader--inline");o.textContent=$e(),document.head.insertBefore(o,r.nextSibling),Ct(o,"inline");var a=Et("darkreader--override");a.textContent=Dr&&Dr.css?Lt(Dr.css):"",document.head.appendChild(a),Ct(a,"override");var i=Et("darkreader--variables"),u=qe(Br),c=Br.darkSchemeBackgroundColor,s=Br.darkSchemeTextColor,l=Br.lightSchemeBackgroundColor,d=Br.lightSchemeTextColor,f=Br.mode,h=0===f?l:c,p=0===f?d:s;h=we(Q(h),Br),p=Ee(Q(p),Br),i.textContent=[":root {","   --wp-dark-mode-neutral-background: "+h+";","   --wp-dark-mode-neutral-text: "+p+";","   --wp-dark-mode-selection-background: "+u.backgroundColorSelection+";","   --wp-dark-mode-selection-text: "+u.foregroundColorSelection+";","}"].join("\n"),document.head.insertBefore(i,o.nextSibling),Ct(i,"variables");var m=xt("darkreader--proxy");m.textContent="("+_t+")()",document.head.insertBefore(m,i.nextSibling)}function Rt(e){var t=Et("darkreader--inline",e);t.textContent=$e(),e.insertBefore(t,e.firstChild);var n=Et("darkreader--override",e);n.textContent=Dr&&Dr.css?Lt(Dr.css):"",e.insertBefore(n,t.nextSibling),zr.add(e)}function Lt(e){return e.replace(/\${(.+?)}/g,function(e,t){try{var n=De(t);return ge(n,Br)}catch(e){return y(e),t}})}function Tt(){var e=document.querySelector(".darkreader--fallback");e&&(e.textContent="")}function Pt(){return Dr&&Array.isArray(Dr.ignoreImageAnalysis)?Dr.ignoreImageAnalysis:[]}function Ot(){Hr(),qt(E(document.documentElement));var e=at(document),t=e.filter(function(e){return!Nr.has(e)}).map(function(e){return jt(e)}),n=t.map(function(e){return e.details()}).filter(function(e){return e&&e.variables.size>0}).map(function(e){var t=e.variables;return t});0===n.length?(Nr.forEach(function(e){return e.render(Br,jr,Pt())}),0===Vr.size&&Tt()):(n.forEach(function(e){return qt(e)}),$r(function(){0===Vr.size&&Tt()})),t.forEach(function(e){return e.watch()});var r=m(document.querySelectorAll(dr));N(document.documentElement,function(e){Rt(e.shadowRoot);var t=e.shadowRoot.querySelectorAll(dr);t.length>0&&p(r,t)});var o=Dr&&Array.isArray(Dr.ignoreInlineStyle)?Dr.ignoreInlineStyle:[];r.forEach(function(e){return Ye(e,Br,Pt(),o)}),It(document)}function jt(e){function t(){if(!F()||!Kr){Vr.add(o);var e=document.querySelector(".darkreader--fallback");e.textContent||(e.textContent=Be(Br,{strict:!1}))}}function n(){Vr.delete(o),0===Vr.size&&F()&&Tt()}function r(){var e=a.details();e&&(0===e.variables.size?a.render(Br,jr,Pt()):(qt(e.variables),$r()))}var o=++Ur,a=it(e,{update:r,loadingStart:t,loadingEnd:n});return Nr.set(e,a),a}function qt(e){0!==e.size&&(e.forEach(function(e,t){jr.set(t,e)}),jr.forEach(function(e,t){jr.set(t,L(e,jr))}))}function Nt(e){var t=Nr.get(e);t&&(t.destroy(),Nr.delete(e))}function Ft(){0===Vr.size&&Tt()}function Bt(e){var t=Boolean(Gr);Gr=function(){document.hidden||(Dt(),e(),Kr=!0)},t||document.addEventListener("visibilitychange",Gr)}function Dt(){document.removeEventListener("visibilitychange",Gr),Gr=null}function Wt(){function e(){Ot(),zt()}At(),document.hidden?Bt(e):e(),et(Br)}function It(e){if(Array.isArray(e.adoptedStyleSheets)&&e.adoptedStyleSheets.length>0){var t=kt(e);Fr.push(t),t.render(Br,jr,Pt())}}function zt(){var e=Array.from(Nr.keys());gt(e,function(e){var t=e.created,n=e.updated,r=e.removed,o=e.moved,a=r,i=t.concat(n).concat(o).filter(function(e){return!Nr.has(e)}),u=o.filter(function(e){return Nr.has(e)});a.forEach(function(e){return Nt(e)});var c=i.map(function(e){return jt(e)}),s=c.map(function(e){return e.details()}).filter(function(e){return e&&e.variables.size>0}).map(function(e){var t=e.variables;return t});0===s.length?c.forEach(function(e){return e.render(Br,jr,Pt())}):(s.forEach(function(e){return qt(e)}),$r()),c.forEach(function(e){return e.watch()}),u.forEach(function(e){return Nr.get(e).restore()})},function(e){Rt(e),It(e)});var t=Dr&&Array.isArray(Dr.ignoreInlineStyle)?Dr.ignoreInlineStyle:[];Ge(function(e){if(Ye(e,Br,t,Pt()),e===document.documentElement){var n=E(document.documentElement);n.size>0&&(qt(n),$r())}},function(e){Rt(e);var n=e.querySelectorAll(dr);n.length>0&&h(n,function(e){return Ye(e,Br,Pt(),t)})}),B(Ft)}function Ut(){Nr.forEach(function(e){return e.pause()}),Mt(),yt(),Je(),D(Ft)}function Vt(){var e=document.createElement("meta");e.name="darkreader",e.content=qr,document.head.appendChild(e)}function $t(){var e=document.querySelector('meta[name="darkreader"]');return e?e.content!==qr:(Vt(),!1)}function Ht(e,t,n){if(Br=e,Dr=t,Wr=n,document.head){if($t())return;Wt()}else{if(!sn){var r=Et("darkreader--fallback");document.documentElement.appendChild(r),r.textContent=Be(Br,{strict:!0})}var o=new MutationObserver(function(){if(document.head){if(o.disconnect(),$t())return void Kt();Wt()}});o.observe(document,{childList:!0,subtree:!0})}}function Gt(){document.dispatchEvent(new CustomEvent("__darkreader__cleanUp")),j(document.head.querySelector(".darkreader--proxy"))}function Kt(){Jt(),j(document.querySelector(".darkreader--fallback")),document.head&&(tt(),j(document.head.querySelector(".darkreader--user-agent")),j(document.head.querySelector(".darkreader--text")),j(document.head.querySelector(".darkreader--invert")),j(document.head.querySelector(".darkreader--inline")),j(document.head.querySelector(".darkreader--override")),j(document.head.querySelector('meta[name="darkreader"]')),Gt()),zr.forEach(function(e){j(e.querySelector(".darkreader--inline")),j(e.querySelector(".darkreader--override"))}),zr.clear(),h(Nr.keys(),function(e){return Nt(e)}),h(document.querySelectorAll(".darkreader"),j),Fr.forEach(function(e){e.destroy()}),Fr.splice(0)}function Jt(){Dt(),Hr(),Ut(),Ve()}function Qt(e){return t(this,void 0,void 0,function(){var t,r;return n(this,function(n){switch(n.label){case 0:return t=[],ie(Jr,e,1).forEach(function(e){var n=u(e);t.push(n)}),[4,Promise.all(t)];case 1:return r=n.sent(),[2,e.replace(Jr,function(){return'url("'+r.shift()+'")'})]}})})}function Xt(){return t(this,void 0,void 0,function(){function e(e,n){var r=document.querySelector(e);r&&r.textContent&&(t.push("/* "+n+" */"),t.push(r.textContent),t.push(""))}var t,r,o,a,i;return n(this,function(n){switch(n.label){case 0:return t=[Qr],e(".darkreader--fallback","Fallback Style"),e(".darkreader--user-agent","User-Agent Style"),e(".darkreader--text","Text Style"),e(".darkreader--invert","Invert Style"),e(".darkreader--variables","Variables Style"),r=[],document.querySelectorAll(".darkreader--sync").forEach(function(e){h(e.sheet.cssRules,function(e){e&&e.cssText&&r.push(e.cssText)})}),0==r.length?[3,2]:(o=ue(r.join("\n")),t.push("/* Modified CSS */"),i=(a=t).push,[4,Qt(o)]);case 1:i.apply(a,[n.sent()]),t.push(""),n.label=2;case 2:return e(".darkreader--override","Override Style"),[2,t.join("\n")]}})})}function Yt(t,n){void 0===t&&(t={}),void 0===n&&(n=null);var r=on(on({},_n),t);if(r.engine!==wn.dynamicTheme)throw new Error("Theme engine is not supported.");Ht(r,n,Xr),e.enabled=!0}function Zt(){Kt(),e.enabled=!1}function en(){Yr.matches?Yt(Zr.themeOptions,Zr.fixes):Zt()}function tn(e,t){void 0===e&&(e={}),void 0===t&&(t=null),e?(Zr={themeOptions:e,fixes:t},en(),Yr.addEventListener("change",en)):(Yr.removeEventListener("change",en),Zt())}function nn(){return t(this,void 0,void 0,function(){return n(this,function(e){switch(e.label){case 0:return[4,Xt()];case 1:return[2,e.sent()]}})})}var rn,on=function(){return on=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},on.apply(this,arguments)},an="undefined"==typeof navigator?"some useragent":navigator.userAgent.toLowerCase(),un="undefined"==typeof navigator?"some platform":navigator.platform.toLowerCase(),cn=an.includes("chrome")||an.includes("chromium"),sn=an.includes("firefox"),ln=(an.includes("vivaldi"),an.includes("yabrowser"),an.includes("opr")||an.includes("opera"),an.includes("edg"),an.includes("safari")&&!cn),dn=un.startsWith("win"),fn=un.startsWith("mac"),hn=(an.includes("mobile"),"function"==typeof ShadowRoot),pn=(rn=an.match(/chrom[e|ium]\/([^ ]+)/),rn&&rn[1]&&rn[1],function(){try{return document.querySelector(":defined"),!0}catch(e){return!1}}()),mn=function(){try{return new CSSStyleSheet,!0}catch(e){return!1}}(),vn=function(e){return t(void 0,void 0,void 0,function(){return n(this,function(t){return[2,Promise.reject(new Error(["Embedded DarkMode cannot access a cross-origin resource",e,"Overview your URLs and CORS policies or use","`DarkMode.setFetchMethod(fetch: (url) => Promise<Response>))`.","See if using `DarkMode.setFetchMethod(window.fetch)`","before `DarkMode.enable()` works."].join(" ")))]})})};window.chrome||(window.chrome={}),chrome.runtime||(chrome.runtime={});var gn=new Set;if("function"==typeof chrome.runtime.sendMessage){var bn=chrome.runtime.sendMessage;chrome.runtime.sendMessage=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];l.apply(void 0,a(e)),bn.apply(chrome.runtime,e)}}else chrome.runtime.sendMessage=l;if(chrome.runtime.onMessage||(chrome.runtime.onMessage={}),"function"==typeof chrome.runtime.onMessage.addListener){var yn=chrome.runtime.onMessage.addListener;chrome.runtime.onMessage.addListener=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];d.apply(void 0,a(e)),yn.apply(chrome.runtime.onMessage,e)}}else chrome.runtime.onMessage.addListener=d;var Sn,wn={cssFilter:"cssFilter",svgFilter:"svgFilter",staticTheme:"staticTheme",dynamicTheme:"dynamicTheme"},kn={darkScheme:{background:"#181a1b",text:"#e8e6e3"},lightScheme:{background:"#dcdad7",text:"#181a1b"}},_n={mode:1,brightness:100,contrast:100,grayscale:0,sepia:0,useFont:!1,fontFamily:fn?"Helvetica Neue":dn?"Segoe UI":"Open Sans",textStroke:0,engine:wn.dynamicTheme,stylesheet:"",darkSchemeBackgroundColor:kn.darkScheme.background,darkSchemeTextColor:kn.darkScheme.text,lightSchemeBackgroundColor:kn.lightScheme.background,lightSchemeTextColor:kn.lightScheme.text,scrollbarColor:fn?"":"auto",selectionColor:"auto",styleSystemControls:!0},En=/url\((('.+?')|(".+?")|([^\)]*?))\)/g,xn=/@import\s*(url\()?(('.+?')|(".+?")|([^\)]*?))\)?;?/g,Cn=/\/\*[\s\S]*?\*\//g,Mn=/@font-face\s*{[^}]*}/g,An=/var\((--[^\s,\(\)]+),?\s*([^\(\)]*(\([^\(\)]*\)[^\(\)]*)*\s*)\)/g,Rn=new Set;if(!F()){var Ln=function(){F()&&(document.removeEventListener("readystatechange",Ln),Rn.forEach(function(e){return e()}),Rn.clear())};document.addEventListener("readystatechange",Ln)}var Tn,Pn=1e3,On=new Map,jn=new WeakMap,qn=null,Nn=/^rgba?\([^\(\)]+\)$/,Fn=/^hsla?\([^\(\)]+\)$/,Bn=/^#[0-9a-f]+$/i,Dn=/rgba?|\(|\)|\/|,|\s/gi,Wn=[255,255,255,1],In={"%":100},zn=/hsla?|\(|\)|\/|,|\s/gi,Un=[360,1,1,1],Vn={"%":100,deg:360,rad:2*Math.PI,turn:1},$n=new Map(Object.entries({aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgrey:11119017,darkgreen:25600,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,grey:8421504,green:32768,greenyellow:11403055,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgrey:13882323,lightgreen:9498256,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074})),Hn=new Map(Object.entries({ActiveBorder:3906044,ActiveCaption:0,AppWorkspace:11184810,Background:6513614,ButtonFace:16777215,ButtonHighlight:15329769,ButtonShadow:10461343,ButtonText:0,CaptionText:0,GrayText:8355711,Highlight:11720703,HighlightText:0,InactiveBorder:16777215,InactiveCaption:16777215,InactiveCaptionText:0,InfoBackground:16514245,InfoText:0,Menu:16185078,MenuText:16777215,Scrollbar:11184810,ThreeDDarkShadow:0,ThreeDFace:12632256,ThreeDHighlight:16777215,ThreeDLightShadow:16777215,ThreeDShadow:0,Window:15527148,WindowFrame:11184810,WindowText:0,"-webkit-focus-ring-color":15046400}).map(function(e){var t=o(e,2),n=t[0],r=t[1];return[n.toLowerCase(),r]})),Gn={identity:function(){return[[1,0,0,0,0],[0,1,0,0,0],[0,0,1,0,0],[0,0,0,1,0],[0,0,0,0,1]]},invertNHue:function(){return[[.333,-.667,-.667,0,1],[-.667,.333,-.667,0,1],[-.667,-.667,.333,0,1],[0,0,0,1,0],[0,0,0,0,1]]},brightness:function(e){return[[e,0,0,0,0],[0,e,0,0,0],[0,0,e,0,0],[0,0,0,1,0],[0,0,0,0,1]]},contrast:function(e){var t=(1-e)/2;return[[e,0,0,0,t],[0,e,0,0,t],[0,0,e,0,t],[0,0,0,1,0],[0,0,0,0,1]]},sepia:function(e){return[[.393+.607*(1-e),.769-.769*(1-e),.189-.189*(1-e),0,0],[.349-.349*(1-e),.686+.314*(1-e),.168-.168*(1-e),0,0],[.272-.272*(1-e),.534-.534*(1-e),.131+.869*(1-e),0,0],[0,0,0,1,0],[0,0,0,0,1]]},grayscale:function(e){return[[.2126+.7874*(1-e),.7152-.7152*(1-e),.0722-.0722*(1-e),0,0],[.2126-.2126*(1-e),.7152+.2848*(1-e),.0722-.0722*(1-e),0,0],[.2126-.2126*(1-e),.7152-.7152*(1-e),.0722+.9278*(1-e),0,0],[0,0,0,1,0],[0,0,0,0,1]]}},Kn=new Map,Jn=new Map,Qn=["r","g","b","a"],Xn=["mode","brightness","contrast","grayscale","sepia","darkSchemeBackgroundColor","darkSchemeTextColor","lightSchemeBackgroundColor","lightSchemeTextColor"],Yn=.4,Zn=.55;(function(e){e[e.light=0]="light",e[e.dark=1]="dark"})(Tn||(Tn={}));var er=0,tr=new Map,nr=new Map;chrome.runtime.onMessage.addListener(function(e){var t=e.type,n=e.data,r=e.error,o=e.id;if("fetch-response"===t){var a=tr.get(o),i=nr.get(o);tr.delete(o),nr.delete(o),r?i&&i(r):a&&a(n)}});var rr=new Set,or=new Set(["inherit","transparent","initial","currentcolor","none","unset"]),ar=new Map,ir=new Map,ur=new Map,cr={"background-color":{customProp:"--wp-dark-mode-inline-bgcolor",cssProp:"background-color",dataAttr:"data-darkreader-inline-bgcolor"},"background-image":{customProp:"--wp-dark-mode-inline-bgimage",cssProp:"background-image",dataAttr:"data-darkreader-inline-bgimage"},"border-color":{customProp:"--wp-dark-mode-inline-border",cssProp:"border-color",dataAttr:"data-darkreader-inline-border"},"border-bottom-color":{customProp:"--wp-dark-mode-inline-border-bottom",cssProp:"border-bottom-color",dataAttr:"data-darkreader-inline-border-bottom"},"border-left-color":{customProp:"--wp-dark-mode-inline-border-left",cssProp:"border-left-color",dataAttr:"data-darkreader-inline-border-left"},"border-right-color":{customProp:"--wp-dark-mode-inline-border-right",cssProp:"border-right-color",dataAttr:"data-darkreader-inline-border-right"},"border-top-color":{customProp:"--wp-dark-mode-inline-border-top",cssProp:"border-top-color",dataAttr:"data-darkreader-inline-border-top"},"box-shadow":{customProp:"--wp-dark-mode-inline-boxshadow",cssProp:"box-shadow",dataAttr:"data-darkreader-inline-boxshadow"},color:{customProp:"--wp-dark-mode-inline-color",cssProp:"color",dataAttr:"data-darkreader-inline-color"},fill:{customProp:"--wp-dark-mode-inline-fill",cssProp:"fill",dataAttr:"data-darkreader-inline-fill"},stroke:{customProp:"--wp-dark-mode-inline-stroke",cssProp:"stroke",dataAttr:"data-darkreader-inline-stroke"},"outline-color":{customProp:"--wp-dark-mode-inline-outline",cssProp:"outline-color",dataAttr:"data-darkreader-inline-outline"},"stop-color":{customProp:"--wp-dark-mode-inline-stopcolor",cssProp:"stop-color",dataAttr:"data-darkreader-inline-stopcolor"}},sr=Object.values(cr),lr=["style","fill","stop-color","stroke","bgcolor","color"],dr=lr.map(function(e){return"["+e+"]"}).join(", "),fr=new Map,hr=new Map,pr=new WeakMap,mr=["brightness","contrast","grayscale","sepia","mode"],vr="theme-color",gr='meta[name="'+vr+'"]',br=null,yr=null,Sr=["mode","brightness","contrast","grayscale","sepia","darkSchemeBackgroundColor","darkSchemeTextColor","lightSchemeBackgroundColor","lightSchemeTextColor"],wr=P(),kr='style, link[rel*="stylesheet" i]:not([disabled])',_r=new WeakSet,Er=new WeakSet,xr=!1;document.addEventListener("__darkreader__inlineScriptsAllowed",function(){xr=!0});var Cr,Mr,Ar=[],Rr=new Map,Lr=!1;document.addEventListener("__darkreader__inlineScriptsAllowed",function(){Lr=!0});var Tr=new Map,Pr=new WeakMap,Or=new WeakSet,jr=new Map,qr=wt(),Nr=new Map,Fr=[],Br=null,Dr=null,Wr=null,Ir=new Map,zr=new Set,Ur=0,Vr=new Set,$r=T(function(e){Nr.forEach(function(e){return e.render(Br,jr,Pt())}),Fr.forEach(function(e){return e.render(Br,jr,Pt())}),e&&e()}),Hr=function(){$r.cancel()},Gr=null,Kr=!document.hidden,Jr=/url\(\"(blob\:.*?)\"\)/g,Qr='/*\n                        _______\n                       /       \\\n                      .==.    .==.\n                     ((  ))==((  ))\n                    / "=="    "=="\\\n                   /____|| || ||___\\\n       ________     ____    ________  ___    ___\n       |  ___  \\   /    \\   |  ___  \\ |  |  /  /\n       |  |  \\  \\ /  /\\  \\  |  |  \\  \\|  |_/  /\n       |  |   )  /  /__\\  \\ |  |__/  /|  ___  \\\n       |  |__/  /  ______  \\|  ____  \\|  |  \\  \\\n_______|_______/__/ ____ \\__\\__|___\\__\\__|___\\__\\____\n|  ___  \\ |  ____/ /    \\   |  ___  \\ |  ____|  ___  \\\n|  |  \\  \\|  |___ /  /\\  \\  |  |  \\  \\|  |___|  |  \\  \\\n|  |__/  /|  ____/  /__\\  \\ |  |   )  |  ____|  |__/  /\n|  ____  \\|  |__/  ______  \\|  |__/  /|  |___|  ____  \\\n|__|   \\__\\____/__/      \\__\\_______/ |______|__|   \\__\\\n                https://darkreader.org\n*/',Xr=function(){try{return window.self!==window.top}catch(e){return console.warn(e),!0}}(),Yr=matchMedia("(prefers-color-scheme: dark)"),Zr={themeOptions:null,fixes:null},eo=s;e.auto=tn,e.disable=Zt,e.enable=Yt,e.exportGeneratedCSS=nn,e.setFetchMethod=eo,Object.defineProperty(e,"__esModule",{value:!0})});