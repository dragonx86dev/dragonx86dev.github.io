(function () {
    'use strict';

    function start() {
        var proxy = {
            path_image: 'nl.imagetmdb.com/',
            path_api: 'tmdb-api.rootu.top/3/'
        };
    
        Lampa.TMDB.image = function (url) {
            var base = Lampa.Utils.protocol() + 'image.tmdb.org/' + url;
            return 'http://' + (Lampa.Storage.field('proxy_tmdb') ? proxy.path_image + url : base).replace(/\/\//g, '/');
        };

        Lampa.TMDB.api = function (url) {
            var base = Lampa.Utils.protocol() + 'api.themoviedb.org/3/' + url;
            return 'http://' + (Lampa.Storage.field('proxy_tmdb') ? proxy.path_api + url : base).replace(/\/\//g, '/');
        };


        window.lampa_settings.disable_features.dmca = true;
        window.lampa_settings.disable_features.lgbt = true;

        window.lampa_settings.dcma = [];
        window.lampa_settings.lgbt = [];   

        Lampa.Utils.dcma = function () { return undefined };
        Lampa.Storage.set('lgbt_content_block', {
            name: 'lgbt_content_block',
            type: 'trigger',
            default: false
        });
        Object.defineProperty(Lampa.VPN, 'is', {
            get: function() {
                return function(need_array = []) {
                    console.log('Глобальный перехват is:', need_array);
                    return false; // Ваша логика
                };
            },
            configurable: true
        });
        

        console.log(`vpn region = ${Lampa.VPN.is(['ru', 'by'])}`);
    }

    start();
})();
