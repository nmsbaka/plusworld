// Hover time out
!function(n){n.fn.hoverTimeout=function(t,u,e,i){return this.each(function(){var o=null,c=n(this);c.hover(function(){clearTimeout(o),o=setTimeout(function(){u.call(c)},t)},function(){clearTimeout(o),o=setTimeout(function(){i.call(c)},e)})})}}(jQuery);!function(i){i.simpleSpy=function(t,e){var n=this;n.$el=i(t),n.init=function(){n.options=i.extend({},i.simpleSpy.defaultOptions,e);var t=n.$el,s=!0,o=[],p=n.options.limit,a=0,f=t.find("> .items:first").outerHeight(!0),m=t.find("> .items:first").height();t.find("> .items").each(function(){o.push('<div class="items">'+i(this).html()+"</div>")}),a=o.length,t.wrap('<div class="spyWrapper" />').parent().css({height:f*n.options.limit}),t.find("> .items").filter(":gt("+(n.options.limit-1)+")").remove(),t.bind("stop",function(){s=!1}).bind("start",function(){s=!0});var l=function(){if(s){var e=i(o[p]).css({height:0,opacity:0}).prependTo(t);t.find("> .items:last").animate({opacity:0},1e3,function(){e.animate({height:m},1e3).animate({opacity:1},1e3),i(this).remove()}),p++,p>=a&&(p=0)}setTimeout(l,n.options.interval)};l()},n.init()},i.simpleSpy.defaultOptions={limit:4,interval:4e3},i.fn.simpleSpy=function(t){return this.each(function(){new i.simpleSpy(this,t)})}}(jQuery);

(function (n) {
	var i,
	f;
	n.fn.metrojs = {
		capabilities : null,
		checkCapabilities : function (t, i) {
			return (n.fn.metrojs.capabilities == null || typeof i != "undefined" && i == !0) && (n.fn.metrojs.capabilities = new n.fn.metrojs.MetroModernizr(t)),
			n.fn.metrojs.capabilities
		}
	},
	i = n.fn.metrojs,
	f = 99e3,
	n.fn.liveTile = function (t) {
		var r,
		i;
		if (u[t]) {
			for (r = [], i = 1; i <= arguments.length; i++)
				r[i - 1] = arguments[i];
			return u[t].apply(this, r)
		}
		return typeof t != "object" && t ? (n.error("Method " + t + " does not exist on n.liveTile"), null) : u.init.apply(this, arguments)
	},
	n.fn.liveTile.contentModules = {
		modules : {},
		addContentModule : function (n, t) {
			typeof this.modules != "object" && (this.modules = {}),
			this.modules[n] = t
		},
		hasContentModule : function (n) {
			return typeof n == "undefined" || typeof this.modules != "object" ? !1 : typeof this.modules[n] != "undefined"
		}
	},
	n.fn.liveTile.defaults = {
		mode : "slide",
		speed : 500,
		initDelay : -1,
		delay : 5e3,
		stops : "100%",
		stack : !1,
		direction : "vertical",
		animationDirection : "forward",
		tileSelector : ">div,>li,>p,>img,>a",
		tileFaceSelector : ">div,>li,>p,>img,>a",
		ignoreDataAttributes : !1,
		click : null,
		link : "",
		newWindow : !1,
		bounce : !1,
		pauseOnHover : !1,
		playOnHover : !1,
		repeatCount : -1,
		appendBack : !0,
		alwaysTrigger : !1,
		flipListOnHover : !1,
		currentIndex : 0,
		startNow : !0,
		useModernizr : typeof window.Modernizr != "undefined",
		useHardwareAccel : !0,
		faces : {
			$front : null,
			$back : null
		},
		animationComplete : function () {},
		triggerDelay : function () {
			return Math.random() * 3e3
		},
		swap : "",
		swapFront : "-",
		swapBack : "-",
		contentModules : []
	};
	var u = {
		init : function (r) {
			var u = {};
			return n.extend(u, n.fn.liveTile.defaults, r),
			i.checkCapabilities(u),
			n.fn.liveTile.contentModules.hasContentModule("image") || n.fn.liveTile.contentModules.addContentModule("image", e.imageSwap),
			n.fn.liveTile.contentModules.hasContentModule("html") || n.fn.liveTile.contentModules.addContentModule("html", e.htmlSwap),
			n(this).each(function (r, f) {
				var o = n(f),
				e = t.initTileData(o, u);
				e.faces = t.prepTile(o, e),
				e.doAction = function (n) {
					var t = null;
					switch (e.mode) {
					case "slide":
						t = e.slide,
						e.loopCount = n;
						break;
					case "carousel":
						t = e.carousel,
						e.loopCount = n;
						break;
					case "flip":
						t = e.flip,
						e.loopCount = n;
						break;
					case "flip-list":
						t = e.flipList,
						e.loopCount = n
					}
					typeof t == "function" && (t(n), e.hasRun = !0),
					n == e.timer.repeatCount && (e.runEvents = !1)
				},
				e.slide = function (n) {
					t.slide(o, n)
				},
				e.carousel = function (n) {
					t.carousel(o, n)
				},
				e.flip = function (n) {
					t.flip(o, n)
				},
				e.flipList = function (n) {
					t.flipList(o, n)
				},
				e.timer = new n.fn.metrojs.TileTimer(e.delay, e.doAction, e.repeatCount),
				o.data("LiveTile", e),
				(e.mode !== "flip-list" || e.flipListOnHover == !1) && (e.pauseOnHover ? t.bindPauseOnHover(o) : e.playOnHover && t.bindPlayOnHover(o)),
				(e.link.length > 0 || typeof e.click == "function") && o.css({
					cursor : "pointer"
				}).bind("click.liveTile", function () {
					var n = !0;
					typeof e.click == "function" && (n = e.click(o, e) || !1),
					n && e.link.length > 0 && (e.newWindow ? window.open(e.link) : window.location = e.link)
				}),
				e.useHardwareAccel && i.capabilities.canTransition && t.bindBounce(o, e),
				e.startNow && e.mode != "none" && (e.runEvents = !0, e.timer.start(e.initDelay))
			})
		},
		goto : function (t) {
			var i,
			r = typeof t,
			u;
			if (r !== "number" && isNaN(t))
				if (r === "string")
					if (t == "next")
						i = {
							index : -99,
							delay : 0
						};
					else if (t.indexOf("prev") === 0)
						i = {
							index : -100,
							delay : 0
						};
					else {
						n.error(t + ' is not a recognized action for .liveTile("goto")');
						return
					}
				else
					r === "object" && (typeof t.delay == "undefined" && (t.delay = 0), u = typeof t.index, u === "undefined" ? t.index = 0 : u === "string" && (t.index === "next" ? t.index = -99 : t.index.indexOf("prev") === 0 && (t.index = -100)), i = t);
			else
				i = {
					index : parseInt(t, 10),
					delay : 0
				};
			return n(this).each(function (t, r) {
				var o = n(r),
				u = o.data("LiveTile"),
				s = o.data("metrojs.tile"),
				f = i.index,
				e;
				if (s.animating !== !0) {
					if (u.mode === "carousel") {
						if (e = u.faces.$listTiles.filter(".active").index(), f === -100 ? (u.tempValues.animationDirection = typeof i.animationDirection == "undefined" ? "backward" : i.animationDirection, f = e === 0 ? u.faces.$listTiles.length - 1 : e - 1) : f === -99 && (u.tempValues.animationDirection = typeof i.animationDirection == "undefined" ? "forward" : i.animationDirection, f = e + 1), e == f)
							return;
						u.currentIndex = f == 0 ? u.faces.$listTiles.length : f - 1
					} else
						u.currentIndex = f;
					u.runEvents = !0,
					u.timer.start(i.delay >= 0 ? i.delay : u.delay)
				}
			})
		},
		play : function (t) {
			var i,
			r = typeof t;
			return r === "undefined" ? i = {
				delay : -1
			}
			 : r === "number" ? i = {
				delay : t
			}
			 : r === "object" && (typeof t.delay == "undefined" && (t.delay = -1), i = t),
			n(this).each(function (t, r) {
				var f = n(r),
				u = f.data("LiveTile");
				u.runEvents = !0,
				i.delay < 0 && !u.hasRun && (i.delay = u.initDelay),
				u.timer.start(i.delay >= 0 ? i.delay : u.delay)
			})
		},
		animate : function () {
			return n(this).each(function (t, i) {
				var r = n(i),
				u = r.data("LiveTile");
				u.doAction()
			})
		},
		stop : function () {
			return n(this).each(function (t, i) {
				var u = n(i),
				r = u.data("LiveTile");
				r.hasRun = !1,
				r.runEvents = !1,
				r.timer.stop(),
				window.clearTimeout(r.eventTimeout),
				window.clearTimeout(r.flCompleteTimeout),
				window.clearTimeout(r.completeTimeout),
				r.mode === "flip-list" && (window.clearTimeout(r.completeTimeout), r.faces.$listTiles.each(function (t, i) {
						var r = n(i).data("metrojs.tile");
						window.clearTimeout(r.eventTimeout),
						window.clearTimeout(r.flCompleteTimeout),
						window.clearTimeout(r.completeTimeout)
					}))
			})
		},
		pause : function () {
			return n(this).each(function (t, i) {
				var u = n(i),
				r = u.data("LiveTile");
				r.timer.pause(),
				r.runEvents = !1,
				window.clearTimeout(r.eventTimeout),
				window.clearTimeout(r.flCompleteTimeout),
				window.clearTimeout(r.completeTimeout),
				r.mode === "flip-list" && r.faces.$listTiles.each(function (t, i) {
					var r = n(i).data("metrojs.tile");
					window.clearTimeout(r.eventTimeout),
					window.clearTimeout(r.flCompleteTimeout),
					window.clearTimeout(r.completeTimeout)
				})
			})
		},
		restart : function (t) {
			var i,
			r = typeof t;
			return r === "undefined" ? i = {
				delay : -1
			}
			 : r === "number" ? i = {
				delay : t
			}
			 : r === "object" && (typeof t.delay == "undefined" && (t.delay = -1), i = t),
			n(this).each(function (t, r) {
				var f = n(r),
				u = f.data("LiveTile");
				i.delay < 0 && !u.hasRun && (i.delay = u.initDelay),
				u.hasRun = !1,
				u.runEvents = !0,
				u.timer.restart(i.delay >= 0 ? i.delay : u.delay)
			})
		},
		rebind : function (t) {
			return n(this).each(function (i, r) {
				var f = n(r);
				typeof t != "undefined" ? (typeof t.timer != "undefined" && t.timer != null && t.timer.stop(), t.hasRun = !1, u.init.apply(r, t)) : u.init.apply(r, {})
			})
		},
		destroy : function (i) {
			var u = typeof i,
			r;
			return u === "undefined" ? r = {
				removeCss : !1
			}
			 : u === "boolean" ? r = {
				removeCss : option
			}
			 : u === "object" && (typeof i.removeCss == "undefined" && (i.removeCss = !1), r = i),
			n(this).each(function (i, u) {
				var e = n(u),
				f = e.data("LiveTile");
				e.unbind(".liveTile"),
				t.unbindMsBounce(e, f),
				f.timer.stop(),
				window.clearTimeout(f.eventTimeout),
				window.clearTimeout(f.flCompleteTimeout),
				window.clearTimeout(f.completeTimeout),
				f.faces.$listTiles != null && f.faces.$listTiles.each(function (t, i) {
					var u = n(i),
					e;
					f.mode === "flip-list" && (e = u.data("metrojs.tile"), window.clearTimeout(e.eventTimeout), window.clearTimeout(e.flCompleteTimeout), window.clearTimeout(e.completeTimeout)),
					r.removeCss ? (u.removeClass("ha"), u.find(f.tileFaceSelector).unbind(".liveTile").removeClass("bounce flip-front flip-back ha slide slide-front slide-back").css({
							transform : "",
							transition : "",
							margin : "",
							cursor : ""
						})) : u.find(f.tileFaceSelector).unbind(".liveTile"),
					u.removeData("metrojs.tile")
				}).unbind(".liveTile"),
				f.faces.$front != null && r.removeCss && f.faces.$front.removeClass("flip-front flip-back ha slide slide-front slide-back").css({
					transform : "",
					transition : ""
				}),
				f.faces.$back != null && r.removeCss && f.faces.$back.removeClass("flip-front flip-back ha slide slide-front slide-back").css({
					transform : "",
					transition : "",
					margin : "",
					cursor : ""
				}),
				e.removeClass("ha"),
				e.removeData("LiveTile"),
				e.removeData("metrojs.tile"),
				f = null
			})
		}
	},
	t = {
		getDataOrDefault : function (n, t, i) {
			return typeof n.data(t) != "undefined" ? n.data(t) : i
		},
		initTileData : function (i, r) {
			var f = !r.ignoreDataAttributes,
			u = {
				speed : f ? this.getDataOrDefault(i, "speed", r.speed) : r.speed,
				delay : f ? this.getDataOrDefault(i, "delay", r.delay) : r.delay,
				stops : f ? this.getDataOrDefault(i, "stops", r.stops) : r.stops,
				stack : f ? this.getDataOrDefault(i, "stack", r.stack) : r.stack,
				mode : f ? this.getDataOrDefault(i, "mode", r.mode) : r.mode,
				direction : f ? this.getDataOrDefault(i, "direction", r.direction) : r.direction,
				useHardwareAccel : f ? this.getDataOrDefault(i, "ha", r.useHardwareAccel) : r.useHardwareAccel,
				repeatCount : f ? this.getDataOrDefault(i, "repeat", r.repeatCount) : r.repeatCount,
				swap : f ? this.getDataOrDefault(i, "swap", r.swap) : r.swap,
				appendBack : f ? this.getDataOrDefault(i, "appendback", r.appendBack) : r.appendBack,
				currentIndex : f ? this.getDataOrDefault(i, "start-index", r.currentIndex) : r.currentIndex,
				animationDirection : f ? this.getDataOrDefault(i, "slide-direction", r.animationDirection) : r.animationDirection,
				startNow : f ? this.getDataOrDefault(i, "start-now", r.startNow) : r.startNow,
				tileSelector : f ? this.getDataOrDefault(i, "tile-selector", r.tileSelector) : r.tileSelector,
				tileFaceSelector : f ? this.getDataOrDefault(i, "face-selector", r.tileFaceSelector) : r.tileFaceSelector,
				bounce : f ? this.getDataOrDefault(i, "bounce", r.bounce) : r.bounce,
				link : f ? this.getDataOrDefault(i, "link", r.link) : r.link,
				newWindow : f ? this.getDataOrDefault(i, "new-window", r.newWindow) : r.newWindow,
				alwaysTrigger : f ? this.getDataOrDefault(i, "always-trigger", r.alwaysTrigger) : r.alwaysTrigger,
				flipListOnHover : f ? this.getDataOrDefault(i, "flip-onhover", r.flipListOnHover) : r.flipListOnHover,
				pauseOnHover : f ? this.getDataOrDefault(i, "pause-onhover", r.pauseOnHover) : r.pauseOnHover,
				playOnHover : f ? this.getDataOrDefault(i, "play-onhover", r.playOnHover) : r.playOnHover,
				runEvents : !1,
				isReversed : !1,
				loopCount : 0,
				contentModules : {},
				listData : [],
				height : i.height(),
				width : i.width(),
				tempValues : {}

			},
			e,
			o,
			h,
			c;
			u.margin = u.direction === "vertical" ? u.height / 2 : u.width / 2,
			u.stops = typeof r.stops == "object" && r.stops instanceof Array ? r.stops : ("" + u.stops).split(","),
			u.stops.length === 1 && u.stops.push("0px");
			var s = u.swap.replace(" ", "").split(","),
			l = f ? this.getDataOrDefault(i, "swap-front", r.swapFront) : r.swapFront,
			a = f ? this.getDataOrDefault(i, "swap-back", r.swapBack) : r.swapBack;
			for (u.swapFront = l === "-" ? s : l.replace(" ", "").split(","), u.swapBack = a === "-" ? s : a.replace(" ", "").split(","), e = 0; e < u.swapFront.length; e++)
				u.swapFront[e].length > 0 && n.inArray(u.swapFront[e], s) === -1 && s.push(u.swapFront[e]);
			for (e = 0; e < u.swapBack.length; e++)
				u.swapBack[e].length > 0 && n.inArray(u.swapBack[e], s) === -1 && s.push(u.swapBack[e]);
			for (u.swap = s, e = 0; e < s.length; e++)
				s[e].length > 0 && typeof n.fn.liveTile.contentModules.modules[s[e]] != "undefined" && (u.contentModules[s[e]] = n.fn.liveTile.contentModules.modules[s[e]]);
			u.initDelay = f ? this.getDataOrDefault(i, "initdelay", r.initDelay) : r.initDelay,
			u.delay < -1 ? u.delay = r.triggerDelay(1) : u.delay < 0 && (u.delay = 3500 + Math.random() * 4501),
			u.initDelay < 0 && (u.initDelay = u.delay),
			o = {};
			for (h in u.contentModules)
				n.extend(o, u.contentModules[h].data);
			n.extend(o, r, u),
			o.mode === "flip-list" ? (c = i.find(o.tileSelector).not(".tile-title"), c.each(function (i, r) {
					var e = n(r),
					u = {
						direction : f ? t.getDataOrDefault(e, "direction", o.direction) : o.direction,
						link : f ? t.getDataOrDefault(e, "link", "") : "",
						faces : {
							$front : null,
							$back : null
						},
						height : e.height(),
						width : e.width(),
						isReversed : !1
					};
					u.margin = u.direction === "vertical" ? u.height / 2 : u.width / 2,
					o.listData.push(u)
				})) : o.mode === "carousel" && (o.stack = !0, c = i.find(o.tileSelector).not(".tile-title"), c.each(function (i, r) {
					var u = n(r),
					e = {
						bounce : f ? t.getDataOrDefault(u, "bounce", !1) : !1,
						link : f ? t.getDataOrDefault(u, "link", "") : "",
						newWindow : f ? t.getDataOrDefault(u, "new-window", "") : ""
					};
					o.listData.push(e)
				}));
			for (h in o.contentModules)
				typeof o.contentModules[h].initData == "function" && o.contentModules[h].initData(o, i);
			return u = null,
			o
		},
		prepTile : function (u, e) {
			var o,
			s,
			h,
			c,
			l,
			a;
			u.addClass(e.mode),
			o = {
				$tileFaces : null,
				$listTiles : null,
				$front : null,
				$back : null
			};
			switch (e.mode) {
			case "slide":
				o.$tileFaces = u.find(e.tileFaceSelector).not(".tile-title"),
				o.$front = e.faces.$front != null && e.faces.$front.length > 0 ? e.faces.$front.addClass("slide-front") : o.$tileFaces.first().addClass("slide-front"),
				o.$back = e.faces.$back != null && e.faces.$back.length > 0 ? e.faces.$back.addClass("slide-back") : o.$tileFaces.length > 1 ? o.$tileFaces.last().addClass("slide-back") : e.appendBack ? n('<div class="slide-back"><\/div>').appendTo(u) : n("<div><\/div>"),
				e.stack == !0 && (e.direction === "vertical" ? o.$back.css({
						top : -e.height + "px"
					}) : o.$back.css({
						left : -e.width + "px"
					})),
				u.data("metrojs.tile", {
					animating : !1
				}),
				i.capabilities.canTransition && e.useHardwareAccel && (u.addClass("ha"), o.$front.addClass("ha"), o.$back.addClass("ha"));
				break;
			case "carousel":
				o.$listTiles = u.find(e.tileSelector).not(".tile-title"),
				a = o.$listTiles.length,
				u.data("metrojs.tile", {
					animating : !1
				}),
				e.currentIndex = Math.min(e.currentIndex, a - 1),
				o.$listTiles.each(function (r, u) {
					var f = n(u).addClass("slide"),
					o = e.listData[r];
					r == e.currentIndex ? f.addClass("active") : e.animationDirection === "forward" ? e.direction === "vertical" ? f.css({
						top : e.height + "px"
					}) : f.css({
						left : e.width + "px"
					}) : e.animationDirection === "backward" && (e.direction === "vertical" ? f.css({
							top : -e.height + "px"
						}) : f.css({
							left : -e.width + "px"
						})),
					t.bindLink(f, o),
					e.useHardwareAccel && i.capabilities.canTransition && t.bindBounce(f, o),
					f = null,
					o = null
				}),
				i.capabilities.canFlip3d && e.useHardwareAccel && (u.addClass("ha"), o.$listTiles.addClass("ha"));
				break;
			case "flip-list":
				o.$listTiles = u.find(e.tileSelector).not(".tile-title"),
				o.$listTiles.each(function (u, o) {
					var a = n(o).addClass("tile-" + (u + 1)),
					p = a.find(e.tileFaceSelector).first().addClass("flip-front").css({
							margin : "0px"
						}),
					v,
					y,
					w;
					a.find(e.tileFaceSelector).length === 1 && e.appendBack == !0 && a.append("<div><\/div>"),
					v = a.find(e.tileFaceSelector).last().addClass("flip-back").css({
							margin : "0px"
						}),
					e.listData[u].faces.$front = p,
					e.listData[u].faces.$back = v,
					a.data("metrojs.tile", {
						animating : !1,
						count : 1,
						completeTimeout : null,
						flCompleteTimeout : null,
						index : u
					}),
					y = a.data("metrojs.tile"),
					i.capabilities.canFlip3d && e.useHardwareAccel ? (a.addClass("ha"), p.addClass("ha"), v.addClass("ha"), s = e.listData[u].direction === "vertical" ? "rotateX(180deg)" : "rotateY(180deg)", h = r.appendStyleProperties({}, ["transform"], [s]), v.css(h)) : (c = e.listData[u].direction === "vertical" ? {
							height : "100%",
							width : "100%",
							marginTop : "0px",
							opacity : "1"
						}
						 : {
						height : "100%",
						width : "100%",
						marginLeft : "0px",
						opacity : "1"
					}, l = e.listData[u].direction === "vertical" ? {
							height : "0px",
							width : "100%",
							marginTop : e.listData[u].margin + "px",
							opacity : "0"
						}
						 : {
						height : "100%",
						width : "0px",
						marginLeft : e.listData[u].margin + "px",
						opacity : "0"
					}, p.css(c), v.css(l)),
					w = function () {
						y.count++,
						y.count >= f && (y.count = 1)
					},
					e.flipListOnHover ? (p.bind("mouseout.liveTile", function () {
							e.runEvents && t.flip(a, y.count, e, w)
						}), v.bind("mouseout.liveTile", function () {
							e.runEvents && t.flip(a, y.count, e, w)
						})) : e.listData[u].link.length > 0 && a.css({
						cursor : "pointer"
					}).bind("click.liveTile", function () {
						window.location = e.listData[u].link
					})
				});
				break;
			case "flip":
				o.$tileFaces = u.find(e.tileFaceSelector).not(".tile-title"),
				o.$front = e.faces.$front != null && e.faces.$front.length > 0 ? e.faces.$front.addClass("flip-front") : o.$tileFaces.first().addClass("flip-front"),
				o.$back = e.faces.$back != null && e.faces.$back.length > 0 ? e.faces.$back.addClass("flip-back") : o.$tileFaces.length > 1 ? o.$tileFaces.last().addClass("flip-back") : e.appendBack ? n('<div class="flip-back"><\/div>').appendTo(u) : n("<div><\/div>"),
				u.data("metrojs.tile", {
					animating : !1
				}),
				i.capabilities.canFlip3d && e.useHardwareAccel ? (u.addClass("ha"), o.$front.addClass("ha"), o.$back.addClass("ha"), s = e.direction === "vertical" ? "rotateX(180deg)" : "rotateY(180deg)", h = r.appendStyleProperties({}, ["transform"], [s]), o.$back.css(h)) : (c = e.direction === "vertical" ? {
						height : "100%",
						width : "100%",
						marginTop : "0px",
						opacity : "1"
					}
					 : {
					height : "100%",
					width : "100%",
					marginLeft : "0px",
					opacity : "1"
				}, l = e.direction === "vertical" ? {
						height : "0px",
						width : e.width + "px",
						marginTop : e.margin + "px",
						opacity : "0"
					}
					 : {
					height : e.height + "px",
					width : "0px",
					marginLeft : e.margin + "px",
					opacity : "0"
				}, o.$front.css(c), o.$back.css(l))
			}
			return o
		},
		bindPauseOnHover : function (t) {
			function f() {
				u || r.runEvents && (r.timer.pause(), u = !0, r.mode === "flip-list" && r.faces.$listTiles.each(function (t, i) {
						window.clearTimeout(n(i).data("metrojs.tile").completeTimeout)
					}))
			}
			function e() {
				u && (r.runEvents && r.timer.start(r.hasRun ? r.delay : r.initDelay), u = !1)
			}
			var r = t.data("LiveTile"),
			u = !1;
			i.capabilities.canTouch ? window.navigator.msPointerEnabled ? (t[0].addEventListener("MSPointerOver", f, !1), t[0].addEventListener("MSPointerOut", e, !1)) : (t.bind("touchstart.liveTile", f), t.bind("touchend.liveTile", e)) : (t.bind("mouseover.liveTile", f), t.bind("mouseout.liveTile", e))
		},
		bindPlayOnHover : function (n) {
			function f() {
				if (!r) {
					var i = t.startNow ? !t.isReversed : t.isReversed;
					window.clearTimeout(t.eventTimeout),
					(t.runEvents && i || !t.hasRun) && (r = !0, u.play.apply(n[0], [0]))
				}
			}
			function e() {
				r && (window.clearTimeout(t.eventTimeout), t.eventTimeout = window.setTimeout(function () {
							var i = t.startNow ? t.isReversed : !t.isReversed;
							t.runEvents && i && u.play.apply(n[0], [0]),
							r = !1
						}, t.speed))
			}
			var t = n.data("LiveTile"),
			r = !1;
			n.addClass("noselect"),
			i.capabilities.canTouch ? window.navigator.msPointerEnabled ? (n[0].addEventListener("MSPointerDown", f, !1), n.bind("mouseleave.liveTile", e)) : (n.bind("touchstart.liveTile", f), n.bind("touchend.liveTile", e)) : n.bind({
				"mouseenter.liveTile" : function (n) {
					f(n)
				},
				"mouseleave.liveTile" : function (n) {
					e(n)
				}
			})
		},
		bindBounce : function (n, t) {
			if (t.bounce) {
				var i = r.appendStyleProperties({}, ["TransitionProperty", "TransitionDuration"], ["scale", "200ms"]);
				n.addClass("bounce"),
				function () {
					function e(r) {
						i = {
							x : r.pageX,
							y : r.pageY
						},
						n.addClass("bounce-dwn"),
						t = !0
					}
					function r() {
						t === !0 && o()
					}
					function o() {
						n.removeClass("bounce-dwn"),
						t = !1,
						i = f
					}
					var t = !1,
					u = 10,
					f = {
						x : 0,
						y : 0
					},
					i = f;
					window.navigator.msPointerEnabled ? (n[0].addEventListener("MSPointerDown", e, !1), n[0].addEventListener("MSPointerCancel", r, !1), n[0].addEventListener("MSPointerOut", r, !1), n[0].addEventListener("MSPointerUp", r, !1)) : (n.bind("mousedown.liveTile touchstart.liveTile", e), n.bind("mouseup.liveTile touchend.liveTile, mouseout.liveTile touchcancel.liveTile", r))
				}
				()
			}
		},
		unbindMsBounce : function (n, t) {
			t.bounce && window.navigator.msPointerEnabled && (n[0].removeEventListener("MSPointerDown", bounceDown, !1), n[0].removeEventListener("MSPointerCancel", bounceUp, !1), n[0].removeEventListener("MSPointerOut", bounceUp, !1))
		},
		bindLink : function (n, t) {
			t.link.length > 0 && n.css({
				cursor : "pointer"
			}).bind("click.liveTile", function () {
				t.newWindow ? window.open(t.link) : window.location = t.link
			})
		},
		slide : function (t, u, f, e, o) {
			var s = typeof f == "undefined" ? t.data("LiveTile") : f,
			c = t.data("metrojs.tile");
			if (c.animating == !0 || t.is(":animated")) {
				s = null,
				c = null;
				return
			}
			s.isReversed = s.mode !== "carousel" ? u % 2 == 0 : !0,
			s.timer.pause();
			var h = {},
			p = {},
			k = typeof e == "undefined" ? s.currentIndex : e,
			l = n.trim(s.stops[Math.min(k, s.stops.length - 1)]),
			w = l.indexOf("px"),
			a = 0,
			v = 0,
			d = s.direction === "vertical" ? s.height : s.width,
			y = s.direction === "vertical" ? "top" : "left",
			b = function () {
				typeof o == "undefined" ? (s.currentIndex = s.currentIndex + 1, s.currentIndex > s.stops.length - 1 && (s.currentIndex = 0)) : o();
				for (var n in s.contentModules)
					s.contentModules[n].action(s, s.faces.$front, s.faces.$back, s.currentIndex);
				s.animationComplete(s, s.faces.$front, s.faces.$back),
				(s.timer.repeatCount > 0 || s.timer.repeatCount == -1) && s.timer.count != s.timer.repeatCount && s.timer.start(s.delay),
				s = null,
				c = null
			};
			if (w > 0 ? (v = parseInt(l.substring(0, w), 10), a = v - d + "px") : (v = parseInt(l.replace("%", ""), 10), a = v - 100 + "%"), i.capabilities.canTransition && s.useHardwareAccel) {
				if (typeof c.animating != "undefined" && c.animating == !0)
					return;
				c.animating = !0,
				h = r.appendStyleProperties(h, ["TransitionProperty", "TransitionDuration"], [y, s.speed + "ms"]),
				s.direction === "vertical" ? h.top = l : h.left = l,
				s.faces.$front.css(h),
				s.stack == !0 && (s.direction === "vertical" ? h.top = a : h.left = a, s.faces.$back.css(h)),
				window.clearTimeout(s.completeTimeout),
				s.completeTimeout = window.setTimeout(function () {
						c.animating = !1,
						b()
					}, s.speed)
			} else
				h[y] = l, p[y] = a, c.animating = !0, s.faces.$front.stop().animate(h, s.speed, "linear", function () {
					c.animating = !1,
					b()
				}), s.stack == !0 && s.faces.$back.stop().animate(p, s.speed, "linear", function () {})
		},
		carousel : function (n, i) {
			var u = n.data("LiveTile"),
			s = n.data("metrojs.tile"),
			v,
			o,
			f;
			if (s.animating == !0 || u.faces.$listTiles.length <= 1) {
				s = null;
				return
			}
			u.timer.pause();
			var e = u.faces.$listTiles.filter(".active"),
			h = e.index(),
			l = Math.max(u.currentIndex, 0),
			a = l != h ? l : h,
			c = a + 1 >= u.faces.$listTiles.length ? 0 : a + 1;
			if (h == c) {
				s = null,
				e = null;
				return
			}
			v = typeof u.tempValues.animationDirection == "string" && u.tempValues.animationDirection.length > 0 ? u.tempValues.animationDirection : u.animationDirection,
			u.tempValues.animationDirection = null,
			o = u.faces.$listTiles.eq(c),
			f = r.appendStyleProperties({}, ["TransitionDuration"], ["0s"]),
			v === "backward" ? (u.direction === "vertical" ? f.top = "-100%" : f.left = "-100%", u.faces.$front = e, u.faces.$back = o, u.stops = ["100%"]) : (u.direction === "vertical" ? f.top = "100%" : f.left = "100%", u.faces.$front = o, u.faces.$back = e, u.stops = ["0px"]),
			o.css(f),
			window.setTimeout(function () {
				(u.timer.repeatCount > 0 || u.timer.repeatCount == -1) && u.timer.count != u.timer.repeatCount && u.timer.start(u.delay),
				t.slide(n, i, u, 0, function () {
					e.css(f).removeClass("active"),
					o.addClass("active"),
					u.currentIndex = c,
					s = null,
					e = null,
					o = null
				})
			}, 200)
		},
		flip : function (n, t, u, f) {
			var h = n.data("metrojs.tile"),
			b;
			if (h.animating == !0) {
				anidata = null;
				return
			}
			var e = typeof u == "object" ? u : n.data("LiveTile"),
			o,
			s,
			a,
			w,
			k,
			d,
			p = typeof f == "undefined",
			c = 0,
			v = t % 2 == 0;
			if (e.mode === "flip-list" ? (c = h.index, o = e.listData[c].faces.$front, s = e.listData[c].faces.$back, e.listData[c].isReversed = v, a = e.listData[c].direction, height = e.listData[c].height, width = e.listData[c].width, margin = e.listData[c].margin) : (o = e.faces.$front, s = e.faces.$back, e.isReversed = v, a = e.direction, height = e.height, width = e.width, margin = e.margin), i.capabilities.canFlip3d && e.useHardwareAccel) {
				w = v ? "360deg" : "180deg",
				k = a === "vertical" ? "rotateX(" + w + ")" : "rotateY(" + w + ")",
				d = r.appendStyleProperties({}, ["transform", "transition"], [k, "all " + e.speed + "ms ease 0s"]);
				var g = v ? "540deg" : "360deg",
				it = a === "vertical" ? "rotateX(" + g + ")" : "rotateY(" + g + ")",
				rt = r.appendStyleProperties({}, ["transform", "transition"], [it, "all " + e.speed + "ms ease 0s"]);
				o.css(d),
				s.css(rt),
				b = function () {
					h.animating = !1;
					var t,
					i,
					n;
					if (v) {
						t = a === "vertical" ? "rotateX(0deg)" : "rotateY(0deg)",
						i = r.appendStyleProperties({}, ["transform", "transition"], [t, "all 0s ease 0s"]),
						o.css(i);
						for (n in e.contentModules)
							e.contentModules[n].action(e, o, s, c);
						p ? e.animationComplete(e, o, s) : f(e, o, s),
						o = null,
						s = null,
						e = null,
						h = null
					} else {
						for (n in e.contentModules)
							e.contentModules[n].action(e, s, o, c);
						p ? e.animationComplete(e, s, o) : f(e, s, o)
					}
				},
				e.mode === "flip-list" ? (window.clearTimeout(e.listData[c].completeTimeout), e.listData[c].completeTimeout = window.setTimeout(b, e.speed)) : (window.clearTimeout(e.completeTimeout), e.completeTimeout = window.setTimeout(b, e.speed))
			} else {
				var l = e.speed / 2,
				nt = a === "vertical" ? {
					height : "0px",
					width : "100%",
					marginTop : margin + "px",
					opacity : "0"
				}
				 : {
					height : "100%",
					width : "0px",
					marginLeft : margin + "px",
					opacity : "0"
				},
				tt = a === "vertical" ? {
					height : "100%",
					width : "100%",
					marginTop : "0px",
					opacity : "1"
				}
				 : {
					height : "100%",
					width : "100%",
					marginLeft : "0px",
					opacity : "1"
				},
				y;
				v ? (h.animating = !0, s.stop().animate(nt, {
						duration : l
					}), y = function () {
					h.animating = !1,
					o.stop().animate(tt, {
						duration : l,
						complete : function () {
							for (var n in e.contentModules)
								e.contentModules[n].action(e, o, s, c);
							p ? e.animationComplete(e, o, s) : f(e, o, s),
							h = null,
							o = null,
							s = null
						}
					})
				}, e.mode === "flip-list" ? (window.clearTimeout(e.listData[h.index].completeTimeout), e.listData[h.index].completeTimeout = window.setTimeout(y, l)) : (window.clearTimeout(e.completeTimeout), e.completeTimeout = window.setTimeout(y, l))) : (h.animating = !0, o.stop().animate(nt, {
						duration : l
					}), y = function () {
					h.animating = !1,
					s.stop().animate(tt, {
						duration : l,
						complete : function () {
							for (var n in e.contentModules)
								e.contentModules[n].action(e, s, o, c);
							p ? e.animationComplete(e, s, o) : f(e, s, o),
							o = null,
							s = null,
							e = null,
							h = null
						}
					})
				}, e.mode === "flip-list" ? (window.clearTimeout(e.listData[h.index].completeTimeout), e.listData[h.index].completeTimeout = window.setTimeout(y, l)) : (window.clearTimeout(e.completeTimeout), e.completeTimeout = window.setTimeout(y, l)))
			}
		},
		flipList : function (i) {
			var r = i.data("LiveTile"),
			u = r.speed,
			e = !1;
			r.timer.pause(),
			r.faces.$listTiles.each(function (i, o) {
				var h = n(o),
				s = h.data("metrojs.tile"),
				a = r.triggerDelay(i),
				l = r.speed + Math.max(a, 0),
				c = r.alwaysTrigger;
				c || (c = Math.random() * 351 > 150 ? !0 : !1),
				c && (e = !0, u = Math.max(l + r.speed, u), window.clearTimeout(s.flCompleteTimeout), s.flCompleteTimeout = window.setTimeout(function () {
							t.flip(h, s.count, r, function () {
								s.count++,
								s.count >= f && (s.count = 1),
								h = null,
								s = null
							})
						}, l))
			}),
			e && (window.clearTimeout(r.flCompleteTimeout), r.flCompleteTimeout = window.setTimeout(function () {
						for (var n in r.contentModules)
							r.contentModules[n].action(r, null, null, -1);
						r.animationComplete(r, null, null),
						(r.timer.repeatCount > 0 || r.timer.repeatCount == -1) && r.timer.count != r.timer.repeatCount && r.timer.start(r.delay)
					}, u + r.speed))
		}
	},
	r = {
		stylePrefixes : "Webkit Moz O ms Khtml ".split(" "),
		domPrefixes : "-webkit- -moz- -o- -ms- -khtml- ".split(" "),
		appendStyleProperties : function (t, i, r) {
			for (var f, u = 0; u <= i.length - 1; u++)
				for (f = 0; f <= this.stylePrefixes.length - 1; f++)
					t[n.trim(this.domPrefixes[f] + i[u])] = r[u];
			return t
		},
		shuffleArray : function (n) {
			for (var t = []; n.length; )
				t.push(n.splice(Math.random() * n.length, 1));
			while (t.length)
				n.push(t.pop());
			return n
		}
	},
	e = {
		htmlSwap : {
			data : {
				frontContent : [],
				frontIsRandom : !0,
				frontIsInGrid : !1,
				backContent : [],
				backIsRandom : !0,
				backIsInGrid : !1
			},
			initData : function (i, r) {
				var u = {
					backBag : [],
					backIndex : 0,
					backStaticIndex : 0,
					backStaticRndm : -1,
					prevBackIndex : -1,
					frontBag : [],
					frontIndex : 0,
					frontStaticIndex : 0,
					frontStaticRndm : -1,
					prevFrontIndex : -1
				};
				u.frontIsRandom = i.ignoreDataAttributes ? i.frontIsRandom : t.getDataOrDefault(r, "front-israndom", i.frontIsRandom),
				u.frontIsInGrid = i.ignoreDataAttributes ? i.frontIsInGrid : t.getDataOrDefault(r, "front-isingrid", i.frontIsInGrid),
				u.backIsRandom = i.ignoreDataAttributes ? i.backIsRandom : t.getDataOrDefault(r, "back-israndom", i.backIsRandom),
				u.backIsInGrid = i.ignoreDataAttributes ? i.backIsInGrid : t.getDataOrDefault(r, "back-isingrid", i.backIsInGrid),
				u.doSwapFront = n.inArray("html", i.swapFront) > -1 && i.frontContent instanceof Array && i.frontContent.length > 0,
				u.doSwapBack = n.inArray("html", i.swapBack) > -1 && i.backContent instanceof Array && i.backContent.length > 0,
				i.htmlSwap = typeof i.htmlSwap != "undefined" ? n.extend(u, i.htmlSwap) : u,
				i.htmlSwap.doSwapFront && (i.htmlSwap.frontBag = this.prepBag(i.htmlSwap.frontBag, i.frontContent, i.htmlSwap.prevFrontIndex), i.htmlSwap.frontStaticRndm = i.htmlSwap.frontBag.pop()),
				i.htmlSwap.doSwapBack && (i.htmlSwap.backBag = this.prepBag(i.htmlSwap.backBag, i.backContent, i.htmlSwap.prevBackIndex), i.htmlSwap.backStaticRndm = i.htmlSwap.backBag.pop())
			},
			prepBag : function (n, t, i) {
				var f,
				u;
				for (n = [], f = 0, u = 0; u < t.length; u++)
					(u != i || n.length === 1) && (n[f] = u, f++);
				return r.shuffleArray(n)
			},
			getFrontSwapIndex : function (n) {
				var t = 0;
				return n.htmlSwap.frontIsRandom ? (n.htmlSwap.frontBag.length === 0 && (n.htmlSwap.frontBag = this.prepBag(n.htmlSwap.frontBag, n.frontContent, n.htmlSwap.prevFrontIndex)), t = n.htmlSwap.frontIsInGrid ? n.htmlSwap.frontStaticRndm : n.htmlSwap.frontBag.pop()) : t = n.htmlSwap.frontIsInGrid ? n.htmlSwap.frontStaticIndex : n.htmlSwap.frontIndex,
				t
			},
			getBackSwapIndex : function (n) {
				var t = 0;
				return n.htmlSwap.backIsRandom ? (n.htmlSwap.backBag.length === 0 && (n.htmlSwap.backBag = this.prepBag(n.htmlSwap.backBag, n.backContent, n.htmlSwap.prevBackIndex)), t = n.htmlSwap.backIsInGrid ? n.htmlSwap.backStaticRndm : n.htmlSwap.backBag.pop()) : t = n.htmlSwap.backIsInGrid ? n.htmlSwap.backStaticIndex : n.htmlSwap.backIndex,
				t
			},
			action : function (n, t, i, r) {
				if (n.htmlSwap.doSwapFront || n.htmlSwap.doSwapBack) {
					var f = n.mode === "flip-list",
					u = 0,
					e = f ? n.listData[Math.max(r, 0)].isReversed : n.isReversed;
					if (f && r == -1) {
						e ? n.htmlSwap.doSwapBack && (n.htmlSwap.backBag.length === 0 && (n.htmlSwap.backBag = this.prepBag(n.htmlSwap.backBag, n.backContent, n.htmlSwap.backStaticRndm)), n.htmlSwap.backStaticRndm = n.htmlSwap.backBag.pop(), n.htmlSwap.backStaticIndex++, n.htmlSwap.backStaticIndex >= n.backContent.length && (n.htmlSwap.backStaticIndex = 0)) : n.htmlSwap.doSwapFront && (n.htmlSwap.frontBag.length === 0 && (n.htmlSwap.frontBag = this.prepBag(n.htmlSwap.frontBag, n.frontContent, n.htmlSwap.frontStaticRndm)), n.htmlSwap.frontStaticRndm = n.htmlSwap.frontBag.pop(), n.htmlSwap.frontStaticIndex++, n.htmlSwap.frontStaticIndex >= n.frontContent.length && (n.htmlSwap.frontStaticIndex = 0));
						return
					}
					if (e) {
						if (!n.htmlSwap.doSwapBack)
							return;
						u = this.getBackSwapIndex(n),
						n.htmlSwap.prevBackIndex = u,
						i.html(n.backContent[n.htmlSwap.backIndex]),
						n.htmlSwap.backIndex++,
						n.htmlSwap.backIndex >= n.backContent.length && (n.htmlSwap.backIndex = 0),
						f || (n.htmlSwap.backStaticIndex++, n.htmlSwap.backStaticIndex >= n.backContent.length && (n.htmlSwap.backStaticIndex = 0))
					} else {
						if (!n.htmlSwap.doSwapFront)
							return;
						u = this.getFrontSwapIndex(n),
						n.htmlSwap.prevFrontIndex = u,
						n.mode === "slide" ? data.startNow ? i.html(n.frontContent[u]) : t.html(n.frontContent[u]) : i.html(n.frontContent[u]),
						n.htmlSwap.frontIndex++,
						n.htmlSwap.frontIndex >= n.frontContent.length && (n.htmlSwap.frontIndex = 0),
						f || (n.htmlSwap.frontStaticIndex++, n.htmlSwap.frontStaticIndex >= n.frontContent.length && (n.htmlSwap.frontStaticIndex = 0))
					}
				}
			}
		},
		imageSwap : {
			data : {
				preloadImages : !1,
				imageCssSelector : ">img,>a>img",
				frontImages : [],
				frontIsRandom : !0,
				frontIsBackgroundImage : !1,
				frontIsInGrid : !1,
				backImages : null,
				backIsRandom : !0,
				backIsBackgroundImage : !1,
				backIsInGrid : !1
			},
			initData : function (i, r) {
				var u = {
					backBag : [],
					backIndex : 0,
					backStaticIndex : 0,
					backStaticRndm : -1,
					frontBag : [],
					frontIndex : 0,
					frontStaticIndex : 0,
					frontStaticRndm : -1,
					prevBackIndex : -1,
					prevFrontIndex : -1
				};
				u.imageCssSelector = i.ignoreDataAttributes ? i.imageCssSelector : t.getDataOrDefault(r, "image-css", i.imageCssSelector),
				u.frontIsRandom = i.ignoreDataAttributes ? i.frontIsRandom : t.getDataOrDefault(r, "front-israndom", i.frontIsRandom),
				u.frontIsInGrid = i.ignoreDataAttributes ? i.frontIsInGrid : t.getDataOrDefault(r, "front-isingrid", i.frontIsInGrid),
				u.frontIsBackgroundImage = i.ignoreDataAttributes ? i.frontIsBackgroundImage : t.getDataOrDefault(r, "front-isbg", i.frontIsBackgroundImage),
				u.backIsRandom = i.ignoreDataAttributes ? i.backIsRandom : t.getDataOrDefault(r, "back-israndom", i.backIsRandom),
				u.backIsInGrid = i.ignoreDataAttributes ? i.backIsInGrid : t.getDataOrDefault(r, "back-isingrid", i.backIsInGrid),
				u.backIsBackgroundImage = i.ignoreDataAttributes ? i.backIsBackgroundImage : t.getDataOrDefault(r, "back-isbg", i.backIsBackgroundImage),
				u.doSwapFront = n.inArray("image", i.swapFront) > -1 && i.frontImages instanceof Array && i.frontImages.length > 0,
				u.doSwapBack = n.inArray("image", i.swapBack) > -1 && i.backImages instanceof Array && i.backImages.length > 0,
				i.imgSwap = typeof i.imgSwap != "undefined" ? n.extend(u, i.imgSwap) : u,
				i.imgSwap.doSwapFront && (i.imgSwap.frontBag = this.prepBag(i.imgSwap.frontBag, i.frontImages, i.imgSwap.prevFrontIndex), i.imgSwap.frontStaticRndm = i.imgSwap.frontBag.pop(), i.preloadImages && n(i.frontImages).metrojs.preloadImages(function () {})),
				i.imgSwap.doSwapBack && (i.imgSwap.backBag = this.prepBag(i.imgSwap.backBag, i.backImages, i.imgSwap.prevBackIndex), i.imgSwap.backStaticRndm = i.imgSwap.backBag.pop(), i.preloadImages && n(i.backImages).metrojs.preloadImages(function () {}))
			},
			prepBag : function (n, t, i) {
				var f,
				u;
				for (n = [], f = 0, u = 0; u < t.length; u++)
					(u != i || t.length === 1) && (n[f] = u, f++);
				return r.shuffleArray(n)
			},
			getFrontSwapIndex : function (n) {
				var t = 0;
				return n.imgSwap.frontIsRandom ? (n.imgSwap.frontBag.length === 0 && (n.imgSwap.frontBag = this.prepBag(n.imgSwap.frontBag, n.frontImages, n.imgSwap.prevFrontIndex)), t = n.imgSwap.frontIsInGrid ? n.imgSwap.frontStaticRndm : n.imgSwap.frontBag.pop()) : t = n.imgSwap.frontIsInGrid ? n.imgSwap.frontStaticIndex : n.imgSwap.frontIndex,
				t
			},
			getBackSwapIndex : function (n) {
				var t = 0;
				return n.imgSwap.backIsRandom ? (n.imgSwap.backBag.length === 0 && (n.imgSwap.backBag = this.prepBag(n.imgSwap.backBag, n.backImages, n.imgSwap.prevBackIndex)), t = n.imgSwap.backIsInGrid ? n.imgSwap.backStaticRndm : n.imgSwap.backBag.pop()) : t = n.imgSwap.backIsInGrid ? n.imgSwap.backStaticIndex : n.imgSwap.backIndex,
				t
			},
			setImageProperties : function (t, i, r) {
				var f = {},
				u = {};
				typeof i.src != "undefined" && (r ? f.backgroundImage = "url('" + i.src + "')" : u.src = i.src),
				typeof i.alt != "undefined" && (u.alt = i.alt),
				typeof i.css == "object" ? t.css(n.extend(f, i.css)) : t.css(f),
				typeof i.attr == "object" ? t.attr(n.extend(u, i.attr)) : t.attr(u)
			},
			action : function (n, t, i, r) {
				var f,
				e,
				s;
				if (n.imgSwap.doSwapFront || n.imgSwap.doSwapBack) {
					var o = n.mode === "flip-list",
					u = 0,
					h = o ? n.listData[Math.max(r, 0)].isReversed : n.isReversed;
					if (o && r == -1) {
						h ? n.imgSwap.doSwapBack && (n.imgSwap.backBag.length === 0 && (n.imgSwap.backBag = this.prepBag(n.imgSwap.backBag, n.backImages, n.imgSwap.backStaticRndm)), n.imgSwap.backStaticRndm = n.imgSwap.backBag.pop(), n.imgSwap.backStaticIndex++, n.imgSwap.backStaticIndex >= n.backImages.length && (n.imgSwap.backStaticIndex = 0)) : n.imgSwap.doSwapFront && (n.imgSwap.frontBag.length === 0 && (n.imgSwap.frontBag = this.prepBag(n.imgSwap.frontBag, n.frontImages, n.imgSwap.frontStaticRndm)), n.imgSwap.frontStaticRndm = n.imgSwap.frontBag.pop(), n.imgSwap.frontStaticIndex++, n.imgSwap.frontStaticIndex >= n.frontImages.length && (n.imgSwap.frontStaticIndex = 0));
						return
					}
					if (h) {
						if (!n.imgSwap.doSwapBack)
							return;
						u = this.getBackSwapIndex(n),
						n.imgSwap.prevBackIndex = u,
						f = i,
						e = f.find(n.imgSwap.imageCssSelector),
						s = typeof n.backImages[u] == "object" ? n.backImages[u] : {
							src : n.backImages[u]
						},
						this.setImageProperties(e, s, n.imgSwap.backIsBackgroundImage),
						n.imgSwap.backIndex++,
						n.imgSwap.backIndex >= n.backImages.length && (n.imgSwap.backIndex = 0),
						o || (n.imgSwap.backStaticIndex++, n.imgSwap.backStaticIndex >= n.backImages.length && (n.imgSwap.backStaticIndex = 0))
					} else {
						if (!n.imgSwap.doSwapFront)
							return;
						u = this.getFrontSwapIndex(n),
						n.imgSwap.prevFrontIndex = u,
						f = n.mode === "slide" ? t : i,
						e = f.find(n.imgSwap.imageCssSelector),
						s = typeof n.frontImages[u] == "object" ? n.frontImages[u] : {
							src : n.frontImages[u]
						},
						this.setImageProperties(e, s, n.imgSwap.frontIsBackgroundImage),
						n.imgSwap.frontIndex++,
						n.imgSwap.frontIndex >= n.frontImages.length && (n.imgSwap.frontIndex = 0),
						o || (n.imgSwap.frontStaticIndex++, n.imgSwap.frontStaticIndex >= n.frontImages.length && (n.imgSwap.frontStaticIndex = 0))
					}
					f = null,
					e = null
				}
			}
		}
	};
	n.fn.metrojs.TileTimer = function (n, t, i) {
		var r = this;
		this.timerId = null,
		this.interval = n,
		this.action = t,
		this.count = 0,
		this.repeatCount = typeof i == "undefined" ? 0 : i,
		this.start = function (t) {
			window.clearTimeout(this.timerId),
			r.timerId = window.setTimeout(function () {
					r.action(r.count + 1),
					r.count++,
					r.count >= f && (r.count = 0),
					(r.repeatCount > 0 || r.repeatCount == -1) && (r.count != r.repeatCount ? r.start(n) : r.stop())
				}, t)
		},
		this.stop = function () {
			r.timerId = window.clearTimeout(this.timerId),
			r.reset()
		},
		this.resume = function () {
			(r.repeatCount > 0 || r.repeatCount == -1) && r.count != r.repeatCount && r.start(n)
		},
		this.pause = function () {
			r.timerId = window.clearTimeout(this.timerId)
		},
		this.reset = function () {
			r.count = 0
		},
		this.restart = function (n) {
			r.stop(),
			r.start(n)
		}
	},
	n.fn.metrojs.theme = {
		loadDefaultTheme : function (n) {
			var t,
			i,
			r;
			typeof n == "undefined" || n == null ? n = n.fn.metrojs.theme.defaults : (t = n.fn.metrojs.theme.defaults, n.extend(t, n), n = t),
			i = typeof window.localStorage != "undefined",
			r = function (n) {
				return typeof window.localStorage[n] != "undefined" && window.localStorage[n] != null
			},
			!i || r("Metro.JS.AccentColor") && r("Metro.JS.BaseAccentColor") ? i ? (n.accentColor = window.localStorage["Metro.JS.AccentColor"], n.baseTheme = window.localStorage["Metro.JS.BaseAccentColor"], n(n.accentCssSelector).addClass(n.accentColor).data("accent", n.accentColor), n(n.baseThemeCssSelector).addClass(n.baseTheme), typeof(n.loaded == "function") && n.loaded(n.baseTheme, n.accentColor)) : (n(n.accentCssSelector).addClass(n.accentColor).data("accent", n.accentColor), n(n.baseThemeCssSelector).addClass(n.baseTheme), typeof(n.loaded == "function") && n.loaded(n.baseTheme, n.accentColor), typeof n.preloadAltBaseTheme != "undefined" && n.preloadAltBaseTheme && n([n.baseTheme == "dark" ? n.metroLightUrl : n.metroDarkUrl]).metrojs.preloadImages(function () {})) : (window.localStorage["Metro.JS.AccentColor"] = n.accentColor, window.localStorage["Metro.JS.BaseAccentColor"] = n.baseTheme, n(n.accentCssSelector).addClass(n.accentColor).data("accent", n.accentColor), n(n.baseThemeCssSelector).addClass(n.baseTheme), typeof(n.loaded == "function") && n.loaded(n.baseTheme, n.accentColor), typeof n.preloadAltBaseTheme != "undefined" && n.preloadAltBaseTheme && n([n.baseTheme == "dark" ? n.metroLightUrl : n.metroDarkUrl]).metrojs.preloadImages(function () {}))
		},
		applyTheme : function (n, t, i) {
			var u,
			r,
			f,
			e;
			typeof i == "undefined" || i == null ? i = n.fn.metrojs.theme.defaults : (u = n.fn.metrojs.theme.defaults, n.extend(u, i), i = u),
			typeof n != "undefined" && n != null && (typeof window.localStorage != "undefined" && (window.localStorage["Metro.JS.BaseAccentColor"] = n), r = n(i.baseThemeCssSelector), r.length > 0 && (n == "dark" ? r.addClass("dark").removeClass("light") : n == "light" && r.addClass("light").removeClass("dark"))),
			typeof t != "undefined" && t != null && (typeof window.localStorage != "undefined" && (window.localStorage["Metro.JS.AccentColor"] = t), f = n(i.accentCssSelector), f.length > 0 && (e = !1, f.each(function () {
						var i,
						n;
						n(this).addClass(t),
						i = n(this).data("accent"),
						i != t && (n = n(this).attr("class").replace(i, ""), n = n.replace(/(\s)+/, " "), n(this).attr("class", n), n(this).data("accent", t), e = !0)
					}), e && typeof i.accentPicked == "function" && i.accentPicked(t)))
		},
		appendAccentColors : function (t) {
			var r,
			i;
			typeof t == "undefined" || t == null ? t = n.fn.metrojs.theme.defaults : (r = n.fn.metrojs.theme.defaults, n.extend(r, t), t = r);
			var u = "",
			f = t.accentColors,
			e = t.accentListTemplate;
			for (i = 0; i < f.length; i++)
				u += e.replace(/\{0\}/g, f[i]);
			n(u).appendTo(t.accentListContainer)
		},
		appendBaseThemes : function (t) {
			var r,
			i;
			typeof t == "undefined" || t == null ? t = n.fn.metrojs.theme.defaults : (r = n.fn.metrojs.theme.defaults, n.extend(r, t), t = r);
			var u = "",
			f = t.baseThemes,
			e = t.baseThemeListTemplate;
			for (i = 0; i < f.length; i++)
				u += e.replace(/\{0\}/g, f[i]);
			n(u).appendTo(t.baseThemeListContainer)
		},
		defaults : {
			baseThemeCssSelector : "body",
			accentCssSelector : ".tiles",
			accentColor : "blue",
			baseTheme : "dark",
			accentColors : ["amber", "brown", "cobalt", "crimson", "cyan", "magenta", "lime", "indigo", "green", "emerald", "mauve", "olive", "orange", "pink", "red", "sienna", "steel", "teal", "violet", "yellow"],
			baseThemes : ["light", "dark"],
			accentListTemplate : "<li><a href='javascript:;' title='{0}' class='accent {0}'><\/a><\/li>",
			accentListContainer : ".theme-options",
			baseThemeListTemplate : "<li><a href='javascript:;' title='{0}' class='accent {0}'><\/a><\/li>",
			baseThemeListContainer : ".base-theme-options"
		}
	},
	n.fn.applicationBar = function (t) {
		var i = typeof n.fn.metrojs.theme != "undefined" ? n.fn.metrojs.theme.defaults : {},
		r,
		u,
		f;
		n.extend(i, n.fn.applicationBar.defaults, t),
		typeof n.fn.metrojs.theme != "undefined" && (r = n.fn.metrojs.theme, t.shouldApplyTheme && r.loadDefaultTheme(i), u = i.accentListContainer + " a", n(u).live("click", function () {
				var n = n(this).attr("class").replace("accent", "").replace(" ", "");
				r.applyTheme(null, n, i),
				typeof i.accentPicked == "function" && i.accentPicked(n)
			}), f = i.baseThemeListContainer + " a", n(f).live("click", function () {
				var n = n(this).attr("class").replace("accent", "").replace(" ", "");
				r.applyTheme(n, null, i),
				typeof i.themePicked == "function" && i.themePicked(n)
			})),
		n(this).each(function () {
			var n = n(this);
			navigator.userAgent.match(/(Android|webOS|iPhone|iPod|BlackBerry|PIE|IEMobile)/i) && (navigator.userAgent.match(/(IEMobile\/1)/i) || navigator.userAgent.match(/(iPhone OS [56789])/i) || n.css({
					position : "absolute",
					bottom : "0px"
				})),
			n.animateAppBar = function (t) {
				var r = t ? i.collapseHeight : i.expandHeight;
				t ? n.removeClass("expanded") : n.hasClass("expanded") || n.addClass("expanded"),
				n.stop().animate({
					height : r
				}, {
					duration : i.duration
				})
			},
			n.find("a.etc").click(function () {
				n.animateAppBar(n.hasClass("expanded"))
			}),
			i.bindKeyboard == !0 && n(document.documentElement).keyup(function (t) {
				t.keyCode == 38 ? t.target && t.target.tagName.match(/INPUT|TEXTAREA|SELECT/i) == null && (n.hasClass("expanded") || n.animateAppBar(!1)) : t.keyCode == 40 && t.target && t.target.tagName.match(/INPUT|TEXTAREA|SELECT/i) == null && n.hasClass("expanded") && n.animateAppBar(!0)
			})
		})
	},
	n.fn.applicationBar.defaults = {
		applyTheme : !0,
		themePicked : function () {},
		accentPicked : function () {},
		loaded : function () {},
		duration : 300,
		expandHeight : "320px",
		collapseHeight : "60px",
		bindKeyboard : !0,
		metroLightUrl : "images/metroIcons_light.jpg",
		metroDarkUrl : "images/metroIcons.jpg",
		preloadAltBaseTheme : !1
	},
	n.fn.metrojs.preloadImages = function (n) {
		var t = n(this).toArray(),
		i = n("<img style='display:none;' />").appendTo("body");
		n(this).each(function () {
			i.attr({
				src : this
			}).load(function () {
				for (var r = n(this).attr("src"), i = 0; i < t.length; i++)
					t[i] == element && t.splice(i, 1);
				t.length == 0 && n()
			})
		}),
		i.remove()
	},
	n.fn.metrojs.MetroModernizr = function (t) {
		if (typeof t == "undefined" && (t = {
					useHardwareAccel : !0,
					useModernizr : typeof window.Modernizr != "undefined"
				}), this.canTransform = !1, this.canTransition = !1, this.canTransform3d = !1, this.canAnimate = !1, this.canTouch = !1, this.canFlip3d = t.useHardwareAccel, t.useHardwareAccel == !0)
			if (t.useModernizr == !1)
				if (typeof window.MetroModernizr != "undefined")
					this.canTransform = window.MetroModernizr.canTransform, this.canTransition = window.MetroModernizr.canTransition, this.canTransform3d = window.MetroModernizr.canTransform3d, this.canAnimate = window.MetroModernizr.canAnimate, this.canTouch = window.MetroModernizr.canTouch;
				else {
					window.MetroModernizr = {};
					var i = "metromodernizr",
					r = document.documentElement,
					e = document.head || document.getElementsByTagName("head")[0],
					u = document.createElement(i),
					o = u.style,
					s = " -webkit- -moz- -o- -ms- ".split(" "),
					l = "Webkit Moz O ms Khtml".split(" "),
					f = function (n, t) {
						for (var i in n)
							if (o[n[i]] !== undefined && (!t || t(n[i], u)))
								return !0
					},
					h = function (n, t) {
						var i = n.charAt(0).toUpperCase() + n.substr(1),
						r = (n + " " + l.join(i + " ") + i).split(" ");
						return !!f(r, t)
					},
					a = function () {
						var n = !!f(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]);
						return n && "webkitPerspective" in r.style && (n = c(["@media (", s.join("transform-3d),("), i, ")", "{#metromodernizr{left:9px;position:absolute;height:3px;}}"].join(""), function (n) {
									return n.offsetHeight === 3 && n.offsetLeft === 9
								})),
						n
					},
					c = function (n, t) {
						var f = document.createElement("style"),
						u = document.createElement("div"),
						o;
						return f.textContent = n,
						e.appendChild(f),
						u.id = i,
						r.appendChild(u),
						o = t(u),
						f.parentNode.removeChild(f),
						u.parentNode.removeChild(u),
						!!o
					};
					function jc() {
						return canTouch = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || typeof window.navigator.msMaxTouchPoints != "undefined" && window.navigator.msMaxTouchPoints > 0 || c(["@media (", s.join("touch-enabled),("), i, ")", "{#metromodernizr{top:9px;position:absolute}}"].join(""), function (cc) {
								return cc.offsetTop === 9
							})
					}
					this.canTransform = !!f(["transformProperty", "WebkitTransform", "MozTransform", "OTransform", "msTransform"]),
					this.canTransition = h("transitionProperty"),
					this.canTransform3d = a(),
					this.canAnimate = h("animationName"),
					this.canTouch = jc(),
					window.MetroModernizr.canTransform = this.canTransform,
					window.MetroModernizr.canTransition = this.canTransition,
					window.MetroModernizr.canTransform3d = this.canTransform3d,
					window.MetroModernizr.canAnimate = this.canAnimate,
					window.MetroModernizr.canTouch = this.canTouch,
					r = null,
					e = null,
					u = null,
					o = null
				}
			else
				this.canTransform = n("html").hasClass("csstransforms"), this.canTransition = n("html").hasClass("csstransitions"), this.canTransform3d = n("html").hasClass("csstransforms3d"), this.canAnimate = n("html").hasClass("cssanimations"), this.canTouch = n("html").hasClass("touch") || typeof window.navigator.msMaxTouchPoints != "undefined" && window.navigator.msMaxTouchPoints > 0;
		this.canFlip3d = this.canFlip3d && this.canAnimate && this.canTransform && this.canTransform3d
	}
})(jQuery);
(function(a,b,c){function f(a){var b=document.documentElement.style,c;if(typeof b[a]=="string")return a;a=d(a);for(var f=0,g=e.length;f<g;f++){c=e[f]+a;if(typeof b[c]=="string")return c}}function d(a){return a.charAt(0).toUpperCase()+a.slice(1)}var e="Moz Webkit Khtml O Ms".split(" "),g=f("transform"),h={csstransforms:function(){return!!g},csstransforms3d:function(){var a=!!f("perspective");if(a){var c=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),d="@media ("+c.join("transform-3d),(")+"modernizr)",e=b("<style>"+d+"{#modernizr{height:3px}}"+"</style>").appendTo("head"),g=b('<div id="modernizr" />').appendTo("html");a=g.height()===3,g.remove(),e.remove()}return a},csstransitions:function(){return!!f("transitionProperty")}};if(a.Modernizr)for(var i in h)Modernizr.hasOwnProperty(i)||Modernizr.addTest(i,h[i]);else a.Modernizr=function(){var a={_version:"1.6ish: miniModernizr for Isotope"},c=" ",d,e;for(e in h)d=h[e](),a[e]=d,c+=" "+(d?"":"no-")+e;b("html").addClass(c);return a}();if(Modernizr.csstransforms){var j=Modernizr.csstransforms3d?{translate:function(a){return"translate3d("+a[0]+"px, "+a[1]+"px, 0) "},scale:function(a){return"scale3d("+a+", "+a+", 1) "}}:{translate:function(a){return"translate("+a[0]+"px, "+a[1]+"px) "},scale:function(a){return"scale("+a+") "}},k=function(a,c,d){var e=b.data(a,"isoTransform")||{},f={},h,i={},k;f[c]=d,b.extend(e,f);for(h in e)k=e[h],i[h]=j[h](k);var l=i.translate||"",m=i.scale||"",n=l+m;b.data(a,"isoTransform",e),a.style[g]=n};b.cssNumber.scale=!0,b.cssHooks.scale={set:function(a,b){k(a,"scale",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.scale?d.scale:1}},b.fx.step.scale=function(a){b.cssHooks.scale.set(a.elem,a.now+a.unit)},b.cssNumber.translate=!0,b.cssHooks.translate={set:function(a,b){k(a,"translate",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.translate?d.translate:[0,0]}}}var l=b.event,m;l.special.smartresize={setup:function(){b(this).bind("resize",l.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",l.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",m&&clearTimeout(m),m=setTimeout(function(){jQuery.event.handle.apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Isotope=function(a,c){this.element=b(c),this._create(a),this._init()};var n=["overflow","position","width","height"];b.Isotope.settings={resizable:!0,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:Modernizr.csstransforms&&!b.browser.opera?{opacity:0,scale:.001}:{opacity:0},visibleStyle:Modernizr.csstransforms&&!b.browser.opera?{opacity:1,scale:1}:{opacity:1},animationEngine:b.browser.opera?"jquery":"best-available",animationOptions:{queue:!1,duration:800},sortBy:"original-order",sortAscending:!0,resizesContainer:!0,transformsEnabled:!0,itemPositionDataEnabled:!1},b.Isotope.prototype={_create:function(c){this.options=b.extend({},b.Isotope.settings,c),this.styleQueue=[],this.elemCount=0;var d=this.element[0].style;this.originalStyle={};for(var e=0,f=n.length;e<f;e++){var g=n[e];this.originalStyle[g]=d[g]||null}this.element.css({overflow:"hidden",position:"relative"}),this._updateAnimationEngine(),this._updateUsingTransforms();var h={"original-order":function(a,b){return b.elemCount},random:function(){return Math.random()}};this.options.getSortData=b.extend(this.options.getSortData,h),this.reloadItems();var i=b(document.createElement("div")).prependTo(this.element);this.offset=i.position(),i.remove();var j=this;setTimeout(function(){j.element.addClass(j.options.containerClass)},0),this.options.resizable&&b(a).bind("smartresize.isotope",function(){j.resize()})},_getAtoms:function(a){var b=this.options.itemSelector,c=b?a.filter(b).add(a.find(b)):a,d={position:"absolute"};this.usingTransforms&&(d.left=0,d.top=0),c.css(d).addClass(this.options.itemClass),this.updateSortData(c,!0);return c},_init:function(a){this.$filteredAtoms=this._filter(this.$allAtoms),this._sort(),this.reLayout(a)},option:function(a){if(b.isPlainObject(a)){this.options=b.extend(!0,this.options,a);var c;for(var e in a)c="_update"+d(e),this[c]&&this[c]()}},_updateAnimationEngine:function(){var a=this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,"");switch(a){case"css":case"none":this.isUsingJQueryAnimation=!1;break;case"jquery":this.isUsingJQueryAnimation=!0;break;default:this.isUsingJQueryAnimation=!Modernizr.csstransitions}this._updateUsingTransforms()},_updateTransformsEnabled:function(){this._updateUsingTransforms()},_updateUsingTransforms:function(){this.usingTransforms=this.options.transformsEnabled&&Modernizr.csstransforms&&Modernizr.csstransitions&&!this.isUsingJQueryAnimation,this.getPositionStyles=this.usingTransforms?this._translate:this._positionAbs},_filter:function(a){var b=this.options.filter===""?"*":this.options.filter;if(!b)return a;var c=this.options.hiddenClass,d="."+c,e=a.filter(d),f=e;if(b!=="*"){f=e.filter(b);var g=a.not(d).not(b).addClass(c);this.styleQueue.push({$el:g,style:this.options.hiddenStyle})}this.styleQueue.push({$el:f,style:this.options.visibleStyle}),f.removeClass(c);return a.filter(b)},updateSortData:function(a,c){var d=this,e=this.options.getSortData,f,g;a.each(function(){f=b(this),g={};for(var a in e)g[a]=e[a](f,d);b.data(this,"isotope-sort-data",g),c&&d.elemCount++})},_sort:function(){var a=this.options.sortBy,b=this._getSorter,c=this.options.sortAscending?1:-1,d=function(d,e){var f=b(d,a),g=b(e,a);f===g&&a!=="original-order"&&(f=b(d,"original-order"),g=b(e,"original-order"));return(f>g?1:f<g?-1:0)*c};this.$filteredAtoms.sort(d)},_getSorter:function(a,c){return b.data(a,"isotope-sort-data")[c]},_translate:function(a,b){return{translate:[a,b]}},_positionAbs:function(a,b){return{left:a,top:b}},_pushPosition:function(a,b,c){b+=this.offset.left,c+=this.offset.top;var d=this.getPositionStyles(b,c);this.styleQueue.push({$el:a,style:d}),this.options.itemPositionDataEnabled&&a.data("isotope-item-position",{x:b,y:c})},layout:function(a,b){var c=this.options.layoutMode;this["_"+c+"Layout"](a);if(this.options.resizesContainer){var d=this["_"+c+"GetContainerSize"]();this.styleQueue.push({$el:this.element,style:d})}this._processStyleQueue(),b&&b.call(a),this.isLaidOut=!0},_processStyleQueue:function(){var a=this.isLaidOut?this.isUsingJQueryAnimation?"animate":"css":"css",c=this.options.animationOptions,d=this._isInserting&&this.isUsingJQueryAnimation,e;b.each(this.styleQueue,function(b,f){e=d&&f.$el.hasClass("no-transition")?"css":a,f.$el[e](f.style,c)}),this.styleQueue=[]},resize:function(){this["_"+this.options.layoutMode+"ResizeChanged"]()&&this.reLayout()},reLayout:function(a){this["_"+this.options.layoutMode+"Reset"](),this.layout(this.$filteredAtoms,a)},addItems:function(a,b){var c=this._getAtoms(a);this.$allAtoms=this.$allAtoms.add(c),b&&b(c)},insert:function(a,b){this.element.append(a);var c=this;this.addItems(a,function(a){var d=c._filter(a,!0);c._addHideAppended(d),c._sort(),c.reLayout(),c._revealAppended(d,b)})},appended:function(a,b){var c=this;this.addItems(a,function(a){c._addHideAppended(a),c.layout(a),c._revealAppended(a,b)})},_addHideAppended:function(a){this.$filteredAtoms=this.$filteredAtoms.add(a),a.addClass("no-transition"),this._isInserting=!0,this.styleQueue.push({$el:a,style:this.options.hiddenStyle})},_revealAppended:function(a,b){var c=this;setTimeout(function(){a.removeClass("no-transition"),c.styleQueue.push({$el:a,style:c.options.visibleStyle}),c._processStyleQueue(),delete c._isInserting,b&&b(a)},10)},reloadItems:function(){this.$allAtoms=this._getAtoms(this.element.children())},remove:function(a){this.$allAtoms=this.$allAtoms.not(a),this.$filteredAtoms=this.$filteredAtoms.not(a),a.remove()},shuffle:function(){this.updateSortData(this.$allAtoms),this.options.sortBy="random",this._sort(),this.reLayout()},destroy:function(){var c=this.usingTransforms;this.$allAtoms.removeClass(this.options.hiddenClass+" "+this.options.itemClass).each(function(){this.style.position=null,this.style.top=null,this.style.left=null,this.style.opacity=null,c&&(this.style[g]=null)});var d=this.element[0].style;for(var e=0,f=n.length;e<f;e++){var h=n[e];d[h]=this.originalStyle[h]}this.element.unbind(".isotope").removeClass(this.options.containerClass).removeData("isotope"),b(a).unbind(".isotope")},_getSegments:function(a){var b=this.options.layoutMode,c=a?"rowHeight":"columnWidth",e=a?"height":"width",f=a?"rows":"cols",g=this.element[e](),h,i=this.options[b]&&this.options[b][c]||this.$filteredAtoms["outer"+d(e)](!0)||g;h=Math.floor(g/i),h=Math.max(h,1),this[b][f]=h,this[b][c]=i},_checkIfSegmentsChanged:function(a){var b=this.options.layoutMode,c=a?"rows":"cols",d=this[b][c];this._getSegments(a);return this[b][c]!==d},_masonryReset:function(){this.masonry={},this._getSegments();var a=this.masonry.cols;this.masonry.colYs=[];while(a--)this.masonry.colYs.push(0)},_masonryLayout:function(a){var c=this,d=c.masonry;a.each(function(){var a=b(this),e=Math.ceil(a.outerWidth(!0)/d.columnWidth);e=Math.min(e,d.cols);if(e===1)c._masonryPlaceBrick(a,d.colYs);else{var f=d.cols+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.colYs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryPlaceBrick(a,g)}})},_masonryPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=this.masonry.columnWidth*d,h=c;this._pushPosition(a,g,h);var i=c+a.outerHeight(!0),j=this.masonry.cols+1-f;for(e=0;e<j;e++)this.masonry.colYs[d+e]=i},_masonryGetContainerSize:function(){var a=Math.max.apply(Math,this.masonry.colYs);return{height:a}},_masonryResizeChanged:function(){return this._checkIfSegmentsChanged()},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0}},_fitRowsLayout:function(a){var c=this,d=this.element.width(),e=this.fitRows;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.x!==0&&f+e.x>d&&(e.x=0,e.y=e.height),c._pushPosition(a,e.x,e.y),e.height=Math.max(e.y+g,e.height),e.x+=f})},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResizeChanged:function(){return!0},_cellsByRowReset:function(){this.cellsByRow={index:0},this._getSegments(),this._getSegments(!0)},_cellsByRowLayout:function(a){var c=this,d=this.cellsByRow;a.each(function(){var a=b(this),e=d.index%d.cols,f=~~(d.index/d.cols),g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.$filteredAtoms.length/this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.offset.top}},_cellsByRowResizeChanged:function(){return this._checkIfSegmentsChanged()},_straightDownReset:function(){this.straightDown={y:0}},_straightDownLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,0,c.straightDown.y),c.straightDown.y+=d.outerHeight(!0)})},_straightDownGetContainerSize:function(){return{height:this.straightDown.y}},_straightDownResizeChanged:function(){return!0},_masonryHorizontalReset:function(){this.masonryHorizontal={},this._getSegments(!0);var a=this.masonryHorizontal.rows;this.masonryHorizontal.rowXs=[];while(a--)this.masonryHorizontal.rowXs.push(0)},_masonryHorizontalLayout:function(a){var c=this,d=c.masonryHorizontal;a.each(function(){var a=b(this),e=Math.ceil(a.outerHeight(!0)/d.rowHeight);e=Math.min(e,d.rows);if(e===1)c._masonryHorizontalPlaceBrick(a,d.rowXs);else{var f=d.rows+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.rowXs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryHorizontalPlaceBrick(a,g)}})},_masonryHorizontalPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=c,h=this.masonryHorizontal.rowHeight*d;this._pushPosition(a,g,h);var i=c+a.outerWidth(!0),j=this.masonryHorizontal.rows+1-f;for(e=0;e<j;e++)this.masonryHorizontal.rowXs[d+e]=i},_masonryHorizontalGetContainerSize:function(){var a=Math.max.apply(Math,this.masonryHorizontal.rowXs);return{width:a}},_masonryHorizontalResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0}},_fitColumnsLayout:function(a){var c=this,d=this.element.height(),e=this.fitColumns;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.y!==0&&g+e.y>d&&(e.x=e.width,e.y=0),c._pushPosition(a,e.x,e.y),e.width=Math.max(e.x+f,e.width),e.y+=g})},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResizeChanged:function(){return!0},_cellsByColumnReset:function(){this.cellsByColumn={index:0},this._getSegments(),this._getSegments(!0)},_cellsByColumnLayout:function(a){var c=this,d=this.cellsByColumn;a.each(function(){var a=b(this),e=~~(d.index/d.rows),f=d.index%d.rows,g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.$filteredAtoms.length/this.cellsByColumn.rows)*this.cellsByColumn.columnWidth}},_cellsByColumnResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_straightAcrossReset:function(){this.straightAcross={x:0}},_straightAcrossLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,c.straightAcross.x,0),c.straightAcross.x+=d.outerWidth(!0)})},_straightAcrossGetContainerSize:function(){return{width:this.straightAcross.x}},_straightAcrossResizeChanged:function(){return!0}},b.fn.imagesLoaded=function(a){var b=this.find("img"),c=[],d=this,e=b.length;if(!b.length){a.call(this);return this}b.one("load error",function(){--e===0&&(e=b.length,b.one("load error",function(){--e===0&&a.call(d)}).each(function(){this.src=c.shift()}))}).each(function(){c.push(this.src),this.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="});return this};var o=function(a){this.console&&console.error(a)};b.fn.isotope=function(a){if(typeof a=="string"){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var d=b.data(this,"isotope");if(!d)o("cannot call methods on isotope prior to initialization; attempted to call method '"+a+"'");else{if(!b.isFunction(d[a])||a.charAt(0)==="_"){o("no such method '"+a+"' for isotope instance");return}d[a].apply(d,c)}})}else this.each(function(){var c=b.data(this,"isotope");c?(c.option(a),c._init()):b.data(this,"isotope",new b.Isotope(a,this))});return this}})(window,jQuery);
// Creat Ticker
function createTicker(){var b=jQuery(".breaking-news ul").children();tickerItems=new Array();b.each(function(a){tickerItems.push(jQuery(this).html())});i=0;rotateTicker()}function rotateTicker(){if(i==tickerItems.length){i=0}tickerText=tickerItems[i];c=0;typetext();setTimeout("rotateTicker()",5000);i++}var isInTag=false;function typetext(){var b=tickerText.substr(c,1);if(b=="<"){isInTag=true}if(b==">"){isInTag=false}jQuery(".breaking-news ul").html(tickerText.substr(0,c++));if(c<tickerText.length+1){if(isInTag){typetext()}else{setTimeout("typetext()",28)}}else{c=1;tickerText=""}}
// Active
function actinave(e){var h=window.location.href;e("#navi a").each(function(){if(this.href===h){var a=e(this).parents("li").children("a").addClass("current")}});e("#navi ul").removeClass("hidden");e("#navi li").hoverTimeout(100,function(){e(this).parent("ul").css("overflow","visible");e(this).children("ul").filter(":not(:animated)").slideDown()},500,function(){e(this).parent("ul").css("overflow","visible");e(this).children("ul").slideUp(800,"easeInExpo")});e("#mobilenav").click(function(){e("#navi").slideToggle();e(this).toggleClass("active");return false});e("#top_mobilenav").click(function(){e("#PageList1 ul").slideToggle();e(this).toggleClass("active");return false});function f(){if(e(window).width()>767){e("#navi").css("display","block").removeClass("suball")}else{if(e(window).width()<=767&&e("#mobilenav").attr("class")==="active"){e("#navi").css("display","block").addClass("suball")}else{if(e(window).width()<=767&&e("#mobilenav").attr("class")!=="active"){e("#navi").css("display","none").addClass("suball")}}}}function g(){if(e(window).width()>767){e("#PageList1 ul").css("display","block")}else{if(e(window).width()<=767&&e("#top_mobilenav").attr("class")==="active"){e("#PageList1 ul").css("display","block")}else{if(e(window).width()<=767&&e("#top_mobilenav").attr("class")!=="active"){e("#PageList1 ul").css("display","none")}}}}f();g();e(window).resize(f);e(window).resize(g)}function seach(a){(function(e){var l={blogURL:"",srcBlank:"",findText:"Search results for keyword",NotfindText:"No result!",Showthumb:true,LoadingText:"Searching...",scrthumbSize:50,summaryLength:100};l=e.extend({},l,a);var b=e("#ajax-search-form"),f=b.find(":text");b.append('<div id="search-result"></div>');var d=e("#search-result");b.on("submit",function(){var g=f.val();d.show().html('<div class="load">'+l.LoadingText+"</div>");e.get((l.blogURL===""?window.location.protocol+"//"+window.location.host:l.blogURL)+"/feeds/posts/summary?alt=json-in-script&q="+g+"&max-results=9999",function(z){var q=z.feed.entry,o,n,h,p,k="";if(q!==undefined){k="<h4>"+l.findText+" &quot;"+g+"&quot;</h4>";k+='<a class="close" href="/">&times;</a><ol>';for(var m=0;m<q.length;m++){var A=new RegExp(g,"ig"),h=q[m].title.$t.replace(A,"<mark>"+g+"</mark>");for(var y=0;y<q[m].link.length;y++){if(q[m].link[y].rel=="alternate"){p=q[m].link[y].href}}if(l.summaryLength>0){if("content"in q[m]){o=q[m].content.$t}else{if("summary"in q[m]){o=q[m].summary.$t}else{o=""}}o=o.replace(/<\S[^>]*>/g,"");if(o.length>l.summaryLength){o=o.substring(0,l.summaryLength)+"..."}o=o.replace(A,"<mark>"+g+"</mark>")}if(l.Showthumb===true){if("media$thumbnail"in q[m]){n=q[m].media$thumbnail.url.replace(/\/s[0-9]+\-c/g,"/s"+l.scrthumbSize+"-c")}else{n=l.srcBlank}}k+='<li><a href="'+p+'" >'+(l.Showthumb===true?'<img width="'+l.scrthumbSize+'" height="'+l.scrthumbSize+'" src="'+n+'"/>':"")+"<strong>"+h+"</strong></a>"+(l.summaryLength>0?"<p>"+o+"</p>":"")+"</li>"}k+="</ol>";d.html(k)}else{d.html('<a class="close" href="/">&times;</a><strong>'+l.NotfindText+"</strong>")}},"jsonp");return false});b.on("click",".close",function(){d.fadeOut();return false})})(jQuery)}

// Recent Post
function showrecentposts(A){var w; j=(showRandomImg)?Math.floor((imgr.length+1)*Math.random()):0;img=new Array();for(var o=0;o<A.feed.entry.length;o++){var x=A.feed.entry[o];if(x==undefined)
return;var g=x.title.$t;var r=x.author[0].name.$t;var f;var p;if(o==A.feed.entry.length){break}
for(var l=0;l<x.link.length;l++){if(x.link[l].rel=="alternate"){p=x.link[l].href;break}}
for(var l=0;l<x.link.length;l++){if(x.link[l].rel=="replies"&&x.link[l].type=="text/html"){f=x.link[l].title.split(" ")[0];break}}
if("content"in x){var t=x.content.$t}else{if("summary"in x){var t=x.summary.$t}else{var t=""}}
postdate=x.published.$t;if(j>imgr.length-1){j=0}
img[o]=imgr[j];s=t;a=s.indexOf("<img");b=s.indexOf('src="',a);c=s.indexOf('"',b+5);d=s.substr(b+5,c-b-5);if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!="")){img[o]=d}
var q=[1,2,3,4,5,6,7,8,9,10,11,12];var z=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var v=postdate.split("-")[2].substring(0,2);var h=postdate.split("-")[1];var u=postdate.split("-")[0];for(var e=0;e<q.length;e++){if(parseInt(h)==q[e]){h=z[e];break}}
var n=v+" "+h+" "+u;w+='<div class="cat-dark-top"><div><span class="cat-dark-text"><span class="cat-dark-byline">'+n+'</span><h3><a href="'+p+'">'+g+'</a></h3><p>'+removeHtmlTag(t,summaryPosti)+'...</p></span></div></div><div><div><img src="'+img[o]+'" width="280" height="auto" class=""/></div></div>';j++}
return w;}

// Recent Comment
function recentComments(k){if(k.feed.entry==null||k.feed.entry==false||k.feed.entry==undefined)
return;var w;for(var q=0;q<4;q++){var o=k.feed.entry[q];var u;if(q==k.feed.entry.length){break}
for(var s=0;s<o.link.length;s++){if(o.link[s].rel=="alternate"){u=o.link[s].href;break}}
u=u.replace("#","#comment-");var i=u.split("#");i=i[0];var r=i.split("/");r=r[5];r=r.split(".html");r=r[0];var v=r.replace(/-/g," ");v=v.link(i);if("content"in o){var p=o.content.$t}else{if("summary"in o){var p=o.summary.$t}else{var p=""}}
var n=/<\S[^>]*>>/g;p=p.replace(n,"");if(q==0){w+='<li style="clear:both">';}else{w+='<li style="clear:both">';}
w+='<div style="display:inline;float:left;margin-right:10px;"><img class="align-left" width="35" height="35" src="'+o.author[0].gd$image.src+'"/></div><div style="margin-left:50px;">'+o.author[0].name.$t+" :<br/>  ";if(p.length<70){w+='<a href="'+u+'">'+p+'</a>';}else{p=p.substring(0,70);var t=p.lastIndexOf(" ");p=p.substring(0,t);w+='<a href="'+u+'">'+p+'... </a>';}}
w+='</div></li>';return w;}

// Count Number post
function sumposts(json) { 
	return json.feed.openSearch$totalResults.$t; 
}
// Count Number comment
function numcomments(json) { 
 return json.feed.openSearch$totalResults.$t;
}
// Remove Html Tag
function removeHtmlTag(strx,chop){
	var s = strx.split("<");
	for(var i=0;i<s.length;i++){
		if(s[i].indexOf(">")!=-1){
			s[i] = s[i].substring(s[i].indexOf(">")+1,s[i].length);
		}
	}
	s =  s.join("");
	s = s.substring(0,chop-1);
	return s;
}
// Show Clock
function showclock(){
    var digital = new Date();
    var hours=digital.getHours();
    var minutes=digital.getMinutes();
    var seconds=digital.getSeconds();
    var dn='AM';
    if (hours>12) {
    dn='PM';
    hours=hours-12;
    }
    if (hours==0) hours=12;
    if (minutes<=9) minutes='0'+minutes;
    if (seconds<=9) seconds='0'+seconds;

    miReloj='<b><span style="color:#fff;font-size:50px;">'
    + hours + '</span> : <span style="color:#fff;font-size:50px;">'
    + minutes + '</span> : <span style="color:#fff;font-size:50px;">'
    + seconds + '</span></b><span style="color:#fff;font-size:25px;margin-left:5px;">'
    + dn + '</span>';
    document.getElementById('livetime').innerHTML=miReloj;
    //
    setTimeout('showclock()',1000);
}
// Transfer mobile
function a(){var b=window.location.href,c=b.split("?");switch(c.length){case 1:return b+"?m=1";case 2:return 0<=c[1].search("(^|&)m=")?null:b+"&m=1";default:return null}}var d=navigator.userAgent;if(-1!=d.indexOf("Mobile")&&-1!=d.indexOf("WebKit")&&-1==d.indexOf("iPad")||-1!=d.indexOf("Opera Mini")||-1!=d.indexOf("IEMobile")){var e=a();e&&window.location.replace(e)};
// Get thumbnail
function byThumb(e,b){var c=document.getElementById(e),d=c.getElementsByTagName("img");for(var a=0;a<d.length;a++){d[a].src=d[a].src.replace(/\/s72\-c/,"/w"+b);d[a].width=b}}
// Tiles
function isotope(){var a=jQuery(".blog-posts");a.isotope({itemSelector:".item-list",resizable:true,masonry:{columnWidth:a.width()/3}})};
// Loadmore
(function(e){var h="https://lh3.googleusercontent.com/-FiCzyOK4Mew/T4aAj2uVJKI/AAAAAAAAPaY/x23tjGIH7ls/s32/ajax-loader.gif";var i="";var b=null;var a="div.blog-posts";var d=false;var g=e(window);var k=e(document);var f=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;function c(m){e.getScript("http://"+m+".disqus.com/blogger_index.js")}function j(){if(d){return}d=true;if(!i){b.hide();return}b.find("a").hide();b.find("img").show();e.get(i,"alt=html").done(function(o){var m=e("<div></div>").append(o.replace(f,""));var n=m.find("a.blog-pager-older-link");if(n){i=n.attr("href")}else{i="";b.hide()}var p=m.find(a).children(".date-outer");e(a).append(p);byThumb("Blog1",0);if(window._gaq){window._gaq.push(["_trackPageview",i])}if(window.gapi&&window.gapi.plusone&&window.gapi.plusone.go){window.gapi.plusone.go()}if(window.disqus_shortname){c(window.disqus_shortname)}if(window.FB&&window.FB.XFBML&&window.FB.XFBML.parse){window.FB.XFBML.parse()}e(a).isotope("insert",p);setTimeout(function(){e(a).isotope("insert",p)},1000);b.find("img").hide();b.find("a").show();d=false})}function l(){if(_WidgetManager._GetAllData().blog.pageType=="item"){return}i=e("a.blog-pager-older-link").attr("href");if(!i){return}var n=e('<a class="loadpost" href="javascript:;">Load more </a>');n.click(j);var m=e('<img class="imgload" src="'+h+'" style="display: none;">');b=e('<div style="text-align: center; font-size: 140%;margin-top:40px;margin-bottom:40px;"></div>');b.append(n);b.append(m);b.insertBefore(e("#blog-pager"));e("#blog-pager").hide()}e(document).ready(l)})(jQuery);

// Scroll to top
(function($){var newerLink=$('a.blog-pager-newer-link1');var olderLink=$('a.blog-pager-older-link1');$.get(newerLink.attr('href'),function(data){newerLink.html('<h6>Next</h6><h5>'+$(data).find('h1.post-title').text()+'</h5>');},"html");$.get(olderLink.attr('href'),function(data2){olderLink.html('<h6>Previous</h6><h5>'+$(data2).find('h1.post-title').text()+'</h5>');},"html");$(document).ready(function(){var offset=220;var duration=500;jQuery(window).scroll(function(){if(jQuery(this).scrollTop()>offset){jQuery('.back-to-top').fadeIn(duration);}else{jQuery('.back-to-top').fadeOut(duration);}});jQuery('.back-to-top').click(function(event){event.preventDefault();jQuery('html, body').animate({scrollTop:0},duration);return false;});});})(jQuery);
// Menu
(function(window){'use strict';function classReg(className){return new RegExp("(^|\\s+)"+className+"(\\s+|$)")}var hasClass,addClass,removeClass;if('classList'in document.documentElement){hasClass=function(elem,c){return elem.classList.contains(c)};addClass=function(elem,c){elem.classList.add(c)};removeClass=function(elem,c){elem.classList.remove(c)}}else{hasClass=function(elem,c){return classReg(c).test(elem.className)};addClass=function(elem,c){if(!hasClass(elem,c)){elem.className=elem.className+' '+c}};removeClass=function(elem,c){elem.className=elem.className.replace(classReg(c),' ')}}function toggleClass(elem,c){var fn=hasClass(elem,c)?removeClass:addClass;fn(elem,c)}var classie={hasClass:hasClass,addClass:addClass,removeClass:removeClass,toggleClass:toggleClass,has:hasClass,add:addClass,remove:removeClass,toggle:toggleClass};if(typeof define==='function'&&define.amd){define(classie)}else{window.classie=classie}})(window);(function(){function mobilecheck(){var check=false;(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check=true})(navigator.userAgent||navigator.vendor||window.opera);return check}function init(){var menu=document.getElementById('bt-menu'),trigger=menu.querySelector('a.bt-menu-trigger'),triggerPlay=document.querySelector('a.bt-menu-trigger-out'),eventtype=mobilecheck()?'touchstart':'click',resetMenu=function(){classie.remove(menu,'bt-menu-open');classie.add(menu,'bt-menu-close')},closeClickFn=function(ev){resetMenu();overlay.removeEventListener(eventtype,closeClickFn)};var overlay=document.createElement('div');overlay.className='bt-overlay';menu.appendChild(overlay);trigger.addEventListener(eventtype,function(ev){ev.stopPropagation();ev.preventDefault();if(classie.has(menu,'bt-menu-open')){resetMenu()}else{classie.remove(menu,'bt-menu-close');classie.add(menu,'bt-menu-open');overlay.addEventListener(eventtype,closeClickFn)}});if(triggerPlay){triggerPlay.addEventListener(eventtype,function(ev){ev.stopPropagation();ev.preventDefault();classie.remove(menu,'bt-menu-close');classie.add(menu,'bt-menu-open');overlay.addEventListener(eventtype,closeClickFn)})}}init()})();

