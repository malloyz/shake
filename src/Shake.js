/**
 * Created by malloyzhu on 2016/3/11.
 */

var Shake = cc.ActionInterval.extend({
    _initialX: 0,
    _initialY: 0,
    _strengthX: 0,
    _strengthY: 0,

    ctor: function (duration, strengthX, strengthY) {
        cc.ActionInterval.prototype.ctor.call(this);
        this.initWithDuration(duration, strengthX, strengthY);
    },

    initWithDuration: function (duration, strengthX, strengthY) {
        if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
            this._strengthX = strengthX;
            this._strengthY = strengthY;
            return true;
        }
        return false;
    },

    _fgRangeRand: function (min, max) {
        return cc.random0To1() * (max - min) + min;
    },

    update: function (dt) {
        var randX = this._fgRangeRand(-this._strengthX, this._strengthX);
        var randY = this._fgRangeRand(-this._strengthY, this._strengthY);
        this.target.setPosition(this._initialX + randX, this._initialY + randY);
    },
    
    startWithTarget: function (target) {
        cc.ActionInterval.prototype.startWithTarget.call(this, target);
        this._initialX = target.getPositionX();
        this._initialY = target.getPositionY();
    },

    clone: function () {
        var action = new Shake();
        this._cloneDecoration(action);
        action.initWithDuration(this._duration, this._strengthX, this._strengthY);
        return action;
    },

    reverse: function () {
        var action = new Shake();
        this._cloneDecoration(action);
        action.initWithDuration(this._duration, -this._strengthX, -this._strengthY);
        this._reverseEaseList(action);
        return action;
    },

    stop: function () {
        this.target.setPosition(this._initialX, this._initialY);
        cc.ActionInterval.prototype.stop.call(this);
    }
});
