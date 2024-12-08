(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.TWEEN = factory());
}(this, (function () { 'use strict';

    var Group = /** @class */ (function () {
        function Group() {
            this._tweens = {};
            this._tweensAddedDuringUpdate = {};
        }
        Group.prototype.getAll = function () {
            var _this = this;
            return Object.keys(this._tweens).map(function (tweenId) {
                return _this._tweens[tweenId];
            });
        };
        Group.prototype.removeAll = function () {
            this._tweens = {};
        };
        Group.prototype.add = function (tween) {
            this._tweens[tween.getId()] = tween;
            this._tweensAddedDuringUpdate[tween.getId()] = tween;
        };
        Group.prototype.remove = function (tween) {
            delete this._tweens[tween.getId()];
            delete this._tweensAddedDuringUpdate[tween.getId()];
        };
        Group.prototype.update = function (time, preserve) {
            if (time === void 0) { time = now(); }
            if (preserve === void 0) { preserve = false; }
            var tweenIds = Object.keys(this._tweens);
            if (tweenIds.length === 0) {
                return false;
            }
            // Tweens are updated in "batches". If you add a new tween during an
            // update, then the new tween will be updated in the next batch.
            // If you remove a tween during an update, it may or may not be updated.
            // However, if the removed tween was added during the current batch,
            // then it will not be updated.
            while (tweenIds.length > 0) {
                this._tweensAddedDuringUpdate = {};
                for (var i = 0; i < tweenIds.length; i++) {
                    var tween = this._tweens[tweenIds[i]];
                    if (tween && tween.update(time) === false && !preserve) {
                        delete this._tweens[tweenIds[i]];
                    }
                }
                tweenIds = Object.keys(this._tweensAddedDuringUpdate);
            }
            return true;
        };
        return Group;
    }());

    /**
     * Tween.js - Licensed under the MIT license
     * https://github.com/tweenjs/tween.js
     * ----------------------------------------------
     *
     * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
     * Thank you all, you're awesome!
     */
    var _Group = new Group();
    /**
     * Controlling groups of tweens
     *
     * Using the TWEEN singleton to manage your tweens can cause issues in large apps with many components.
     * In these cases, you may want to create your own smaller groups of tweens.
     */
    var TWEEN = _Group;
    // This is the best way to export things in a way that's compatible with both ES
    // Modules and CommonJS, without build hacks, and so as not to break the
    // existing API.
    // https://github.com/rollup/rollup/issues/1961#issuecomment-423037881
    var getAll = TWEEN.getAll.bind(TWEEN);
    var removeAll = TWEEN.removeAll.bind(TWEEN);
    var add = TWEEN.add.bind(TWEEN);
    var remove = TWEEN.remove.bind(TWEEN);
    var update = TWEEN.update.bind(TWEEN);
    var nextId = 0;
    /**
     * Tweens a value from one number to another over time.
     */
    var Tween = /** @class */ (function () {
        function Tween(_object, _group) {
            if (_group === void 0) { _group = TWEEN; }
            this._object = _object;
            this._group = _group;
            this._isPaused = false;
            this._pauseStart = 0;
            this._valuesStart = {};
            this._valuesEnd = {};
            this._valuesStartRepeat = {};
            this._duration = 1000;
            this._initialRepeat = 0;
            this._repeat = 0;
            this._yoyo = false;
            this._isPlaying = false;
            this._reversed = false;
            this._delayTime = 0;
            this._startTime = 0;
            this._easingFunction = Easing.Linear.None;
            this._interpolationFunction = Interpolation.Linear;
            this._chainedTweens = [];
            this._onStartCallback = null;
            this._onStartCallbackFired = false;
            this._onUpdateCallback = null;
            this._onRepeatCallback = null;
            this._onCompleteCallback = null;
            this._onStopCallback = null;
            this._id = nextId++;
        }
        Tween.prototype.getId = function () {
            return this._id;
        };
        /**
         * Starts the tween running. Can be called multiple times, after stopping and starting the tween.
         */
        Tween.prototype.start = function (time) {
            if (time === void 0) { time = now(); }
            this._group.add(this);
            this._isPaused = false;
            this._isPlaying = true;
            this._onStartCallbackFired = false;
            this._startTime = time;
            this._startTime += this._delayTime;
            this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat);
            return this;
        };
        /**
         * Stops the tween and removes it from the tween manager.
         */
        Tween.prototype.stop = function () {
            if (!this._isPlaying) {
                return this;
            }
            this._group.remove(this);
            this._isPlaying = false;
            if (this._onStopCallback !== null) {
                this._onStopCallback(this._object);
            }
            this.stopChainedTweens();
            return this;
        };
        /**
         * Stops any chained tweens.
         */
        Tween.prototype.stopChainedTweens = function () {
            for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
                this._chainedTweens[i].stop();
            }
            return this;
        };
        /**
         * Group to which this tween belongs.
         */
        Tween.prototype.group = function (group) {
            this._group = group;
            return this;
        };
        /**
         * Delay time in ms.
         */
        Tween.prototype.delay = function (amount) {
            this._delayTime = amount;
            return this;
        };
        /**
         * Start playing after this amount of time in ms.
         */
        Tween.prototype.startAt = function (time) {
            this._startTime = time;
            return this;
        };
        /**
         * Sets the tween duration in ms.
         */
        Tween.prototype.duration = function (d) {
            this._duration = d;
            return this;
        };
        /**
         * Modifies the property of the object being tweened.
         * @param property Name of the property.
         * @param value Target value.
         */
        Tween.prototype.to = function (properties, duration) {
            if (duration !== undefined) {
                this._duration = duration;
            }
            this._valuesEnd = Object.create(properties);
            return this;
        };
        /**
         * Starts the interpolation from these values.
         */
        Tween.prototype.start = function (time) {
            if (time === void 0) { time = now(); }
            if (this._isPlaying) {
                return this;
            }
            this._group.add(this);
            this._isPlaying = true;
            this._onStartCallbackFired = false;
            this._startTime = time;
            this._startTime += this._delayTime;
            for (var property in this._valuesEnd) {
                // Check if an Array was provided as property value
                if (this._valuesEnd[property] instanceof Array) {
                    if (this._valuesEnd[property].length === 0) {
                        continue;
                    }
                    // Create a local copy of the Array with the start value at the front
                    this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);
                }
                // If `to()` specifies a property that doesn't exist in the source object,
                // we should not set that property in the object
                if (this._object[property] === undefined) {
                    continue;
                }
                // Save the starting value, but only once.
                if (typeof this._valuesStart[property] === 'undefined') {
                    this._valuesStart[property] = this._object[property];
                }
                if (this._valuesStart[property] instanceof Array === false) {
                    this._valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
                }
                this._valuesStartRepeat[property] = this._valuesStart[property] || 0;
            }
            return this;
        };
        Tween.prototype.stop = function () {
            if (!this._isPlaying) {
                return this;
            }
            this._group.remove(this);
            this._isPlaying = false;
            if (this._onStopCallback !== null) {
                this._onStopCallback(this._object);
            }
            this.stopChainedTweens();
            return this;
        };
        Tween.prototype.end = function () {
            this.update(Infinity);
            return this;
        };
        Tween.prototype.pause = function (time) {
            if (time === void 0) { time = now(); }
            if (this._isPaused || !this._isPlaying) {
                return this;
            }
            this._isPaused = true;
            this._pauseStart = time;
            this._group.remove(this);
            return this;
        };
        Tween.prototype.resume = function (time) {
            if (time === void 0) { time = now(); }
            if (!this._isPaused || !this._isPlaying) {
                return this;
            }
            this._isPaused = false;
            this._startTime += time - this._pauseStart;
            this._pauseStart = 0;
            this._group.add(this);
            return this;
        };
        /**
         * Stops and removes all tweens from the group.
         */
        TWEEN.removeAll = function () {
            return _Group.removeAll();
        };
        /**
         * Updates all tweens in the group.
         */
        TWEEN.update = function (time, preserve) {
            if (time === void 0) { time = now(); }
            if (preserve === void 0) { preserve = false; }
            return _Group.update(time, preserve);
        };
        return TWEEN;
    }());

    /**
     * Easing functions
     */
    var Easing = {
        Linear: {
            None: function (k) {
                return k;
            },
        },
        Quadratic: {
            In: function (k) {
                return k * k;
            },
            Out: function (k) {
                return k * (2 - k);
            },
            InOut: function (k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k;
                }
                return -0.5 * (--k * (k - 2) - 1);
            },
        },
        Cubic: {
            In: function (k) {
                return k * k * k;
            },
            Out: function (k) {
                return --k * k * k + 1;
            },
            InOut: function (k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k * k;
                }
                return 0.5 * ((k -= 2) * k * k + 2);
            },
        },
    };

    /**
     * Interpolation functions
     */
    var Interpolation = {
        Linear: function (v, k) {
            var m = v.length - 1;
            var f = m * k;
            var i = Math.floor(f);
            var fn = Interpolation.Utils.Linear;
            if (k < 0) {
                return fn(v[0], v[1], f);
            }
            if (k > 1) {
                return fn(v[m], v[m - 1], m - f);
            }
            return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
        },
        Utils: {
            Linear: function (p0, p1, t) {
                return (p1 - p0) * t + p0;
            },
        },
    };

    // Get the current time in milliseconds
    function now() {
        return Date.now();
    }

    // Export the TWEEN object for use in Node.js and the browser
    return TWEEN;

})));
