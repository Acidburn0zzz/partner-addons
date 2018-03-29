/*
    © 2018 Savoir-faire Linux <https://savoirfairelinux.com>
    License LGPL-3.0 or later (http://www.gnu.org/licenses/LGPL.html).
*/
odoo.define('google_city_validation', function (require) {
    "use strict";

    var core = require('web.core');
    var form_widgets = require('web.form_widgets'); 

    var CityWidget = form_widgets.FieldChar.extend({
        init: function (field_manager, node) {
            this._super(field_manager, node);
            this.on("change:value", this, function() {
                this.onchangeCity();
            });
        },
        start: function() {
            this._super();
            this.geocoder = new google.maps.Geocoder();
        },
        onchangeCity: function() {
            var request = {'address': this.get_value()};
            var self = this;

            self.geocoder.geocode(request, function(results, status) {
                if (status != 'OK' || !results[0].types.includes("locality")) {
                    alert("This city doesn't exist.");
                }
            });
        },
    })

    core.form_widget_registry.add('google_city_validation', CityWidget);
});
