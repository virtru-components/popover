/**
 * Module dependencies.
 */

var Tip = require('tip');
var $ = require('jquery');
var inherit = require('inherit');

// default delay for showing the tooltip on mouseover
var DEFAULT_SHOW_DELAY = 500;


/**
 * Expose `Popover`.
 */

module.exports = Popover;

/**
 * Initialize a `Popover` with the given `content`
 * and optional `title`.
 *
 * @param {Mixed} content
 * @param {Mixed} title
 * @api public
 */

function Popover(content, title) {
  this.popover = $(require('./template'));
  Tip.call(this, this.popover);
  this.classname = 'virtru-popover';
  $(this.el).addClass('popover');

  if (title) {
    this.title(title)
  } else {
    this.hideTitle();
  }

  this.content(content);
  if (Popover.effect) {
    this.effect(Popover.effect);
  }
}

/**
 * Inherits from `Tip.prototype`.
 */

inherit(Popover, Tip);

/**
 * Replace `content`.
 *
 * @param {Mixed} content
 * @return {Popover}
 * @api public
 */

Popover.prototype.content = function(content){
  this.popover.find('.virtru-popover-content').empty().append(content);
  return this;
};

/**
 * Change `title`.
 *
 * @param {String} title
 * @return {Popover}
 * @api public
 */

Popover.prototype.title = function(title){
  this.popover.find('.virtru-popover-title').empty().append(title);
  return this;
};

/**
 * Hide the title.
 *
 * @return {Popover}
 * @api private
 */

Popover.prototype.hideTitle = function(){
  this.popover.find('.virtru-popover-title').remove();
  return this;
};

/**
 * Sets a delay for showing tooltips
 *
 * @param {Number} ms (optional)
 * @return {Tip}
 * @api public
 */

Popover.prototype.setShowTimer = function(ms) {
  if(!ms && ms !== 0) {
    ms = DEFAULT_SHOW_DELAY;
  }
  this.showDelay = ms;
  return this;
};

/**
 * Hide the tip with optional `ms` delay.
 *
 * Emits "hide" event.
 *
 * @param {Number} ms
 * @return {Tip}
 * @api public
 */

Popover.prototype.hide = function(ms){
  // clear the show timer
  if(this._showTimer) {
    clearTimeout(this._showTimer);
  }

  // continue normally
  Tip.prototype.hide.call(this, ms);
  return this;
};

/**
 * Sets up a delay before actually showing the tooltip
 *
 * @param {String|Element|Number} el or x
 * @param {Number} [y]
 * @return {Tip}
 * @api public
 */

Popover.prototype.show = function(el){
  if(this.showDelay) {
    // if timer already exists, get rid of it
    if(this._showTimer) {
      clearTimeout(this._showTimer);
    }

    // set a delay for showing the popover
    var self = this;
    this._showTimer = setTimeout(function() {
      Tip.prototype.show.call(self, el);
    }, this.showDelay);
    return this;
  }

  // show the popover
  Tip.prototype.show.call(this, el);
  return this;
};