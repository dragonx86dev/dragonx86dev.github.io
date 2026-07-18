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
        window.lampa_settings.disable_features.install_proxy = true;

        window.lampa_settings.dcma = [];
        window.lampa_settings.lgbt = [];   

        Lampa.Storage.set('lgbt_content_block', false);   
        Lampa.Utils.dcma = function () { return undefined };

        try {
            Object.defineProperty(Lampa.VPN, 'is', {
                get: function() {
                    return function(need_array = []) {
                        console.log('Глобальный перехват is:', need_array);
                        return false; // Ваша логика
                    };
                },
                configurable: true // Позволяет перезаписать существующее свойство
            });
            console.log('VPN.is успешно переопределен глобально');
        } catch(e) {
            console.error('Не удалось переопределить VPN.is:', e);
        }

        console.log(`vpn region = ${Lampa.VPN.is(['ru', 'by'])}`);
    }

    start();
})();
