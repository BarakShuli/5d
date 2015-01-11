var fiveD = fiveD || {};
fiveD.invest = {
    init: function () {
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

        $(".followItem").draggable({
            helper: "clone",
            containment:$("#investigationContent"),
            stop: function (event, ui) {
                fiveD.invest.renderPerson(ui);
                fiveD.invest.initDroppedEvent();
            }
        });
        
        
    }
}

fiveD.invest.renderPerson = function (ui) {
    var html = [];
    var x = ui.offset.top - $("#investigationContent").offset().top;
    var y = ui.offset.left - $("#investigationContent").offset().left;
    console.log(x, y);
    html.push('<div class="followItem droppedFollowItem" style="position:absolute;left:' + y + 'px;top:' + x + 'px">');
    html.push(' <div class="red_circle follow-list-circle">19</div>');
    html.push(' <div class="followItem-description">');
    html.push('  <div class="followItem-name">Lorern Ispum</div>');
    html.push('  <div class="followItem-id">#1234567899</div>');
    html.push(' </div>');
    html.push('  <img class="peopleImage" src="img/sanda.jpg"/>');
    html.push('  <img class="maskImage" src="img/masking_for_faces_icon.png"/>');
    html.push('</div>');
    $("#investigationContent").append(html.join("\n"));
}

fiveD.invest.initDroppedEvent = function () {
    $(".droppedFollowItem").draggable({
        containment: $("#investigationContent")
    });
}


$(document).ready(function () {
    fiveD.invest.init();
})