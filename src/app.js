
var HelloWorldLayer = cc.Layer.extend({
    _bShaking: false,

    ctor:function () {
        this._super();
        var sprite = new cc.Sprite(res.HelloWorld_png);
        sprite.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        sprite.setScale(1.1);
        this.addChild(sprite);

        var button = new ccui.Button(res.CloseNormal_png);
        button.setTouchEnabled(true);
        button.addTouchEventListener(this._onButtonTouched, this);
        button.setPosition(cc.winSize.width - button.getContentSize().width, button.getContentSize().height);
        this.addChild(button);
    },

    _onButtonTouched: function (sender, type) {
        if (ccui.Widget.TOUCH_ENDED == type) {
            this._runShakeAction();
        }
    },

    _runShakeAction: function () {
        if (!this._bShaking) {
            this._bShaking = true;
            var shake = new Shake(0.5, 5, 5);
            var callback = new cc.CallFunc(this._onShakeActionComplete, this);
            var action = new cc.Sequence(shake, callback);
            this.runAction(action);
        }
    },

    _onShakeActionComplete: function () {
        this._bShaking = false;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

