(function () {
    'use strict';

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
})();
