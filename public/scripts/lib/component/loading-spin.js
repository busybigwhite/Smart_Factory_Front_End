'use strict';

var $ = window.jQuery = require('jquery');
var _ = require('lodash');
var Spinner = require('spin');

var DEFAULT_OPTS = {
    length   : 7,          // The length of each line
    width    : 4,          // The line thickness
    radius   : 10,         // The radius of the inner circle
    color    : '#5bc0de',  // #rgb or #rrggbb
    speed    : 0.6,         // Rounds per second
    trail    : 60,         // Afterglow percentage
    zIndex   : 100,        // Use a high z-index by default
    className: 'Spinner',
    position: 'absolute',
    top      : '50%',
    left     : '50%'
};


exports = module.exports = loadingSpin;


function loadingSpin(opts) {

    var spinner = {};

    spinner.opts = _.extend({}, DEFAULT_OPTS, opts);

    spinner.element = new Spinner(spinner.opts);

    spinner.decorator = null;

    /**
     * Initialize spinner to specific DOM object.
     *
     * @public
     * @method int
     * @param {DOM} t DOM target to be spinner container.
     */
    spinner.init = function(t) {
        this.target = t;
    };

    /**
     * Get spinner exists or not.
     *
     * @public
     * @method exists
     * @return {boolean}
     */
    spinner.exists = function() {
        if ( ! (this.element && this.element.el)) { return false; }
        return this.element.el === document.getElementsByClassName(this.opts.className)[0];
    };

    /**
     * Run spinner.
     *
     * @public
     * @method start
     */
    spinner.start = function() {
        this.element.spin(this.target);
        if (this.decorator) {
            $(this.target).append(this.decorator);
        }
    };

    /**
     * Stop spinner.
     *
     * @public
     * @method stop
     */
    spinner.stop = function() {
        this.element.stop();
        if (this.decorator) {
            $(this.target).children().last().remove();
        }
    };

    /**
     * Decorate UI.
     *
     * @public
     * @method decorate
     * @param {DOMObject} el
     * @param {Object} opts
     */
    spinner.decorate = function(el, opts) {
        var $el = $(el);
        if (opts) {
            _.each(opts, function(val, key) {
                $el.css(key, val);
            });
        }
        this.decorator = $el;
        return this;
    };

    return spinner;
}
