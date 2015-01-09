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
    }
}



$(document).ready(function () {
    fiveD.init();
})