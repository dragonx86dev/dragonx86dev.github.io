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

        window.lampa_settings.dcma = [];

        Lampa.Utils.dcma = function () { return undefined };
        var defaultSource = Lampa.Storage.get('source', 'cub');

        Lampa.Listener.follow('request_secuses', function (event) {
            if (event.data.blocked) {
                window.lampa_settings.dcma = [];

                var active = Lampa.Activity.active();
                active.source = 'tmdb';
                Lampa.Storage.set('source', 'tmdb', true);

                setTimeout(function () {
                    setTimeout(function () {
                        Lampa.Activity.replace(active);
                        Lampa.Storage.set('source', defaultSource, true);
                    }, 300);
                    Lampa.Controller.toggle('content');
                }, 250);
            }
        });
    }

    function startPlugin() {
      window.plugin_antidcma_ready = true;
      if (window.appready) {
        start();
      }
      else {
        Lampa.Listener.follow('app', function (e) {
          if (e.type === 'ready') start();
        });
      }
    }
    if (!window.plugin_antidcma_ready) startPlugin();
})();
