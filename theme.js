jQuery((function($) {
    var animationStarted = false;

    function formatNumber(number, decimalPlaces) {
        var symbols = [
            { value: 1, symbol: '' },
            { value: 1e3, symbol: 'k' },
            { value: 1e6, symbol: 'M' },
            { value: 1e9, symbol: 'G' },
            { value: 1e12, symbol: 'T' },
            { value: 1e15, symbol: 'P' },
            { value: 1e18, symbol: 'E' }
        ];

        var symbol = symbols.slice().reverse().find(function(item) {
            return number >= item.value;
        });

        return symbol ? (number / symbol.value).toFixed(decimalPlaces).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + symbol.symbol : "0";
    }

    $(window).scroll(function() {
        if (!animationStarted && $('.counter').length > 0) {
            var counterOffsetTop = $('.counter').offset().top - window.innerHeight;
            if ($(window).scrollTop() > counterOffsetTop) {
                $('.count-number').each(function() {
                    var $this = $(this);
                    var countTo = parseInt($this.attr('data-count'));
                    $({ countNum: 0 }).animate({
                        countNum: countTo
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(formatNumber(Math.floor(this.countNum), 1));
                        },
                        complete: function() {
                            $this.text(formatNumber(this.countNum, 1));
                        }
                    });
                });
                animationStarted = true;
            }
        }
    });
}));
