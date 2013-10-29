/**
 * Module dependencies.
 */

var Tip = require('tip');
var $ = require('jquery');
var inherit = require('inherit');

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
