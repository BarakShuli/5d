var fiveD = fiveD || {};
fiveD = {
    init: function () {
		$("#accordion").accordion({
            heightStyle: "fill"
        });

        $(".updateTab").click(function () {
            $(".updatetabsList .selectedTab").removeClass("selectedTab");
            $(this).addClass("selectedTab");
        });

        $(".ui-accordion-header").addClass('').click(function () {
            if ($(this).hasClass('ui-accordion-header-active')) {
                $(this).find('.arrow').removeClass('down-arrow').addClass('up-arrow');
                $(this).siblings().find('.arrow').removeClass('up-arrow').addClass('down-arrow');
            } else {
                $(this).find('.arrow').removeClass('up-arrow').addClass('down-arrow');
            }
        });
    }


}



$(document).ready(function () {
    fiveD.init();
})