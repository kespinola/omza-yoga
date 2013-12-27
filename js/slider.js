(function(){

	var $doc = $(document);

	$.fn.slider = function () {

		function slider () {
			var 
			$this = $(this),
			$bg = $this.find('.slider-bg'),
			$inner = $this.find('.slider-i'),
			$btn = $this.find('.slider-btn');
		

			// No double-slider
			if ($this.data('omza-slider')) {
				return;
			}
			$this.data('omza-slider', 1);

			function sliderUpdate(pct, leftFill) {
				pct = Math.max(0, Math.min(pct, 100));
				$inner.css('width', pct+'%');
				$inner.data('pct', pct);
				$inner.toggleClass('full', pct > 97);
				$btn.css('left', leftFill+'px');
			}

			function slideMousemove(e) {
				var width = $bg.width();
				var left = $inner.offset().left;
				var fill = e.pageX - left;
				sliderUpdate(fill*100/width, fill+734);
				e.stopPropagation();
				$this.addClass('on');
			}

			$bg.on('mousedown', function() {
				$this.on('mousemove', slideMousemove);
			}).on('mouseup', function() {
				$doc.trigger('filter');
				$this.off('mousemove', slideMousemove);
			}).on('click', function(e) {
				$doc.trigger('filter');
				slideMousemove(e);
			});

			$doc.on('click', function () {
				$this.off('mousemove', slideMousemove);
			});

			var initial = $this.data('pct') !== undefined ? (+$this.data('pct')) : 50;
			sliderUpdate(initial);

			return this;
		}

		this.each(slider);
	};
})(window);