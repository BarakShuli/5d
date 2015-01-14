var fiveD = fiveD || {};
fiveD.invest = {
    init: function () {
        $("#accordion").accordion({
            heightStyle: "content"
        });
        if (localStorage.getItem("taksId") !== undefined) {
            //this.renderPerson();
            this.renderPersonDataMainLayout(false);
            this.renderPersonDataMainLayout("renderPersonGISContent");
            this.renderPersonDataMainLayout("renderPersonLinksContent");
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
            var functionName = $(this).attr("functionName");
            $("mainLayoutTabs .selected").removeClass("selected");
            $(this).addClass("selected");
            $(".personDataMainLayout .rightSide").html(fiveD.invest[functionName]());

        });
        
    }
}

fiveD.invest.renderPerson = function (ui, container) {
    var html = [], x = 100, y=100;
    if (ui !== undefined && ui !== false) {
        x = ui.offset.top - $("#investigationContent").offset().top;
        y = ui.offset.left - $("#investigationContent").offset().left;
    }
    else if (ui === false) {
        console.log("asasa->", $(container).get(0).offsetLeft);
        x = $(container).get(0).offsetTop;
        y = $(container).get(0).offsetLeft;
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

fiveD.invest.renderPersonDataMainLayout = function (funcName) {
    var html = [], invokfunction = "renderPersonIDContent";
    if (funcName !== false) {
        invokfunction = funcName;
    }
    html.push('<div class="personDataMainLayout ' + invokfunction + '">');
    html.push('    <section class="LeftSide">');
    html.push('        <div class="followItem">');
    html.push('            <div class="red_circle follow-list-circle">89</div>');
    html.push('            <div class="followItem-description">');
    html.push('                <div class="followItem-name">Lorern Ispum</div>');
    html.push('                <div class="followItem-id">#1234567899</div>');
    html.push('            </div>');
    html.push('            <img class="peopleImage" src="img/sanda.jpg"/>');
    html.push('            <img class="maskImage" src="img/masking_for_faces_icon.png"/>');
    html.push('        </div>');
    html.push('        <ul class="mainLayoutTabs">');
    html.push('            <li class="selected" functionName="renderPersonIDContent">ID</li>');
    html.push('            <li functionName="renderPersonGISContent">GIS</li>');
    html.push('            <li functionName="renderPersonLinksContent">Links</li>');
    html.push('            <li functionName="renderPersonDataContent">Data</li>');
    html.push('            <li functionName="renderPersonNotesContent">Notes</li>');
    html.push('        </ul>');
    html.push('        <div class="clearAfter">');
    html.push('            <div class="zoomIcon"></div>');
    html.push('            <div class="smallAddIcon"></div>');
    html.push('        </div>');
    html.push('    </section>');
    html.push('    <section class="rightSide">');
    html.push('         <div class="topRightToolBar clearAfter">');
    html.push('             <div class="closeIcon" onclick="fiveD.invest.closeWindow(this);"></div>');
    html.push('             <div class="sepIcon"></div>');
    html.push('             <div class="minIcon" onclick="fiveD.invest.minimizeWindow(this);"></div>');
    html.push('         </div>');
    html.push(          fiveD.invest[invokfunction]());
    html.push('    </section>');
    html.push('</div>');
    $("#investigationContent").append(html.join("\n"));
}


fiveD.invest.minimizeWindow = function (obj) {
    var container = $(obj).closest(".personDataMainLayout");
    this.renderPerson(false, container);
    container.remove();
    this.initDraggableEvent();
}

fiveD.invest.closeWindow = function (obj) {
    var container = $(obj).closest(".personDataMainLayout");
    container.remove();
}

fiveD.invest.renderPersonIDContent = function () {
    var html = [];
    html.push('<div id="idSection">');
    html.push('    <span class="age">33</span>');
    html.push('    <span class="small-line">|</span>');
    html.push('    <span id="gender">Female</span>');
    html.push('    <table>');
    html.push('        <tbody>');
    html.push('        <tr>');
    html.push('             <td class="table-title">Date of Birth</td>');
    html.push('             <td class="table-title">Age</td>');
    html.push('         </tr>');
    html.push('         <tr>');
    html.push('             <td id="dateOfBirth" class="table-data">111111</td>');
    html.push('             <td id="class" class="data">24</td>');
    html.push('         </tr>');
    html.push('         <tr>');
    html.push('             <td class="table-title">Country of Birth</td>');
    html.push('             <td class="table-title">Marital Status</td>');
    html.push('         </tr>');
    html.push('         <tr>');
    html.push('             <td id="countryOfBith" class="table-data">3333333</td>');
    html.push('             <td id="maritalStatus" class="table-data">444444</td>');
    html.push('         </tr>');
    html.push('         <tr>');
    html.push('             <td class="table-title">Nationalities</td>');
    html.push('             <!--<td></td>-->');
    html.push('         </tr>');
    html.push('         <tr>');
    html.push('             <td id="nationalities" class="table-data">5555555555</td>');
    html.push('             <!--<td></td>-->');
    html.push('         </tr>');
    html.push('         <tr>');
    html.push('             <td class="table-title">Residence</td>');
    html.push('             <!--<td></td>-->');
    html.push('         </tr>');
    html.push('         <tr>');
    html.push('             <td id="residence" class="table-data">ffff ffff ffff</td>');
    html.push('             <!--<td></td>-->');
    html.push('         </tr>');
    html.push('         </tbody>');
    html.push('     </table>');
    html.push('     <hr/>');
    html.push('     <div id="affilliation">');
    html.push('         <div class="table-title">Alliffication</div>');
    html.push('         <div class="data-underline">fffffffff</div>');
    html.push('         <div class="data-underline">aaaaaaaaaa</div>');
    html.push('         <div class="data-underline">bbbbbbbbbb</div>');
    html.push('     </div>');
    html.push('     <div id="rolePosition">');
    html.push('         <div class="table-title">Role/Position</div>');
    html.push('         <div class="table-data">Admin</div>');
    html.push('     </div>');
    html.push(' </div>');
    return html.join("\n");
}

fiveD.invest.renderPersonGISContent = function () {
    var html = [];
    html.push('<div id="GISSection">GIS');
    html.push(' </div>');
    return html.join("\n");
}

fiveD.invest.renderPersonLinksContent = function () {
    var html = [];
    html.push('<div id="linksSection">LINKS');
    html.push(' </div>');
    return html.join("\n");
}

fiveD.invest.renderPersonDataContent = function () {
    var html = [];
    html.push('<div id="dataSection">DATA');
    html.push(' </div>');
    return html.join("\n");
}

fiveD.invest.renderPersonNotesContent = function () {
    var html = [];
    html.push('<div id="notesSection">NOTES');
    html.push(' </div>');
    return html.join("\n");
}

fiveD.invest.initDraggableEvent = function () {
    $(".droppedFollowItem").draggable({
        containment: $("#investigationContent")
    });
}


$(document).ready(function () {
    fiveD.invest.init();
})