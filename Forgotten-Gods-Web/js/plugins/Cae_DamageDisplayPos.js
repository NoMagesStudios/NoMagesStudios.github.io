// ==================================================
// Cae_DamageDisplayPos.js
// ==================================================

/*:
 * @plugindesc v1.0 - Adjust the damage sprite display position.
 * @author Caethyril
 * @help You can set a new default position in the plugin parameters.
 * You can also set unique positions per battler using notetags in their notebox~
 * 
 * Actor/Enemy notetags:
 *    <damageSpriteX: +20>
 *      - this battler's damage popups will appear 20 px further right.
 *    <damageSpriteX: -30>
 *      - this battler's damage popups will appear 30 px further left.
 *    <damageSpriteY: +40>
 *      - this battler's damage popups will appear 40 px further down.
 *    <damageSpriteY: -50>
 *      - this battler's damage popups will appear 50 px further up.
 *    You can use evals or fixed numbers in these notetags.
 * 
 * Terms of use:
 *    Free to use and modify.
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Update log:
 *   1.0: Initial release.
 * 
 * @param --- Actors ---
 * @text --- Actors ---
 * @type select
 * @desc Options for actor damage sprite positioning.
 * 
 * @param Actor X
 * @text Default X Offset
 * @parent --- Actors ---
 * @type combo
 * @option -this.bitmap.width/2
 * @option -32
 * @option 0
 * @option this.bitmap.width/2
 * @desc The damage popup X-offset for actors without notetags.
 * Evals permitted. Default: 0.
 * @default -32
 * 
 * @param Actor Y
 * @text Default Y Offset
 * @parent --- Actors ---
 * @type combo
 * @option -this.bitmap.height
 * @option -8
 * @option 0
 * @desc The damage popup Y-offset for actors without notetags.
 * Evals permitted. Default: 0.
 * @default 0
 * 
 * @param --- Enemies ---
 * @text --- Enemies ---
 * @type select
 * @desc Options for enemy damage sprite positioning.
 * 
 * @param Enemy X
 * @text Default X Offset
 * @parent --- Enemies ---
 * @type combo
 * @option -this.bitmap.width/2
 * @option -32
 * @option 0
 * @option this.bitmap.width/2
 * @desc The damage popup X-offset for enemies without notetags.
 * Evals permitted. Default: 0
 * @default 0
 * 
 * @param Enemy Y
 * @text Default Y Offset
 * @parent --- Enemies ---
 * @type combo
 * @option -this.bitmap.height
 * @option -8
 * @option 0
 * @desc The damage popup Y-offset for enemies without notetags.
 * Evals permitted. Default: -8.
 * @default -8
 */

var Imported = Imported || {};
Imported.Cae_DamageDisplayPos = 1.0;

var CAE = CAE || {};
CAE.DamageDisplayPos = CAE.DamageDisplayPos || {};

(function(_) {

'use strict';

    const PLUGIN_NAME = 'Cae_DamageDisplayPos';
    const ERR_PRE     = PLUGIN_NAME + '.js ';
    const ERR_NOPARAM = ERR_PRE + 'could not find its parameters!\nCheck the plugin file is named correctly and try again.';

    const TAG_X = 'damageSpriteX';
    const TAG_Y = 'damageSpriteY';

// ======== Parameter stuff ======== //

    _.params = PluginManager.parameters(PLUGIN_NAME);
    if (!_.params) throw new Error(ERR_NOPARAM);

    _.aX = _.params['Actor X'] || '';
    _.aY = _.params['Actor Y'] || '';
    _.eX = _.params['Enemy X'] || '';
    _.eY = _.params['Enemy Y'] || '';

// ============ Utility ============ //

    // Try-catch eval with default return value
    _.tryEval = function(text, dFault) {
        if (!text) return '';
        try {
            return eval(text);
        } catch (ex) {
            console.error(ex);
            return _.tryEval(dFault, 0);
        }
    };

    // Handler for other battler types, for compatibility
    _.specialTag = function(sprite) { return ''; };

    // Gets relevant notetag from appropriate database object
    _.getTag = function(sprite, isX) {
        let res = sprite._battler;
        if (!res) return '';
        if (res.isActor()) {
            res = res.actor();
        } else if (res.isEnemy()) {
            res = res.enemy();
        } else {
            return _.specialTag(sprite);
        }
        return res.meta[isX ? TAG_X : TAG_Y];
    };

// ========== Alterations ========== //

    _.Sprite_Actor_damageOffsetX = Sprite_Actor.prototype.damageOffsetX;
    Sprite_Actor.prototype.damageOffsetX = function() {
        return _.tryEval.call(this, _.getTag(this, true) || _.aX, _.Sprite_Actor_damageOffsetX.apply(this, arguments));
    };

    _.Sprite_Actor_damageOffsetY = Sprite_Actor.prototype.damageOffsetY;
    Sprite_Actor.prototype.damageOffsetY = function() {
        return _.tryEval.call(this, _.getTag(this, false) || _.aY, _.Sprite_Actor_damageOffsetY.apply(this, arguments));
    };

    _.Sprite_Enemy_damageOffsetX = Sprite_Enemy.prototype.damageOffsetX;
    Sprite_Enemy.prototype.damageOffsetX = function() {
        return _.tryEval.call(this, _.getTag(this, true) || _.eX, _.Sprite_Enemy_damageOffsetX.apply(this, arguments));
    };

    _.Sprite_Enemy_damageOffsetY = Sprite_Enemy.prototype.damageOffsetY;
    Sprite_Enemy.prototype.damageOffsetY = function() {
        return _.tryEval.call(this, _.getTag(this, false) || _.eY, _.Sprite_Enemy_damageOffsetY.apply(this, arguments));
    };

})(CAE.DamageDisplayPos);
