var fiveD = fiveD || {};
fiveD.invest = {
    init: function () {
        $("#accordion").accordion({
            heightStyle: "content"
        });
        if (localStorage.getItem("taksId") !== undefined) {
            this.renderPerson();
            this.initDraggableEvent();
        }
        $(".ui-accordion-header").addClass('').click(function () {
            if ($(this).hasClass('ui-accordion-header-active')) {
                $(this).find('.arrow').removeClass('down-arrow').addClass('up-arrow');
                $(this).siblings().find('.arrow').removeClass('up-arrow').addClass('down-arrow');
            } else {
                $(this).find('.arrow').removeClass('up-arrow').addClass('down-arrow');
            }
        });

        $(".cloneFollowItem").draggable({
            helper: "clone",
            containment:$("#investigationContent"),
            stop: function (event, ui) {
                fiveD.invest.renderPerson(ui);
                fiveD.invest.initDraggableEvent();
            }
        });
        
        $("#mainLayoutTabs li").click(function () {
            $("#mainLayoutTabs .selected").removeClass("selected");
            $(this).addClass("selected");
        });
        
    }
}

fiveD.invest.renderPerson = function (ui) {
    var html = [], x = 100, y=100;
    if (ui !== undefined) {
        x = ui.offset.top - $("#investigationContent").offset().top;
        y = ui.offset.left - $("#investigationContent").offset().left;
    }
    html.push('<div class="followItem droppedFollowItem" style="position:absolute;left:' + y + 'px;top:' + x + 'px">');
    html.push(' <div class="red_circle follow-list-circle">19</div>');
    html.push(' <div class="followItem-description">');
    html.push('  <div class="followItem-name">Lorern Ispum</div>');
    html.push('  <div class="followItem-id">#1234567899</div>');
    html.push(' </div>');
    html.push('  <img class="peopleImage" src="img/sanda.jpg"/>');
    html.push('  <img class="maskImage" src="img/masking_for_faces_icon.png"/>');
    html.push('</div>');
    //$("#investigationContent").append(html.join("\n"));
}

fiveD.invest.renderPersonDataMainLayout = function (ui) {
    var html = [], x = 100, y = 100;
    if (ui !== undefined) {
        x = ui.offset.top - $("#investigationContent").offset().top;
        y = ui.offset.left - $("#investigationContent").offset().left;
    }
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

fiveD.invest.initDraggableEvent = function () {
    $(".droppedFollowItem").draggable({
        containment: $("#investigationContent")
    });
}


$(document).ready(function () {
    fiveD.invest.init();
})