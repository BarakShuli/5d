var fiveD = fiveD || {};
fiveD.invest = {
    init: function () {
        alert("sadas");
        $("#accordion").accordion({
            heightStyle: "content"
        });

        $(".ui-accordion-header").addClass('').click(function () {
            if ($(this).hasClass('ui-accordion-header-active')) {
                $(this).find('.arrow').removeClass('down-arrow').addClass('up-arrow');
                $(this).siblings().find('.arrow').removeClass('up-arrow').addClass('down-arrow');
            } else {
                $(this).find('.arrow').removeClass('up-arrow').addClass('down-arrow');
            }
        });

        $(".followItem").draggable({helper: "clone" });
    }


}



$(document).ready(function () {
    fiveD.invest.init();
})