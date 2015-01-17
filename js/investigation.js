var fiveD = fiveD || {};
fiveD.invest = {

    dataObj : null,

    followListCircleType : {
        red    : "red_circle",
        orange : "orange-circle",
        blue   : "blue-circle"
    },

    init: function () {
        $("#accordion").accordion({
            heightStyle: "content"
        });
        if (localStorage.getItem("taksId") !== undefined) {
            //this.renderPerson();
            this.renderPersonDataMainLayout(false, false);
            this.renderPersonDataMainLayout("renderPersonGISContent", false);
            this.renderPersonDataMainLayout("renderPersonLinksContent", false);
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

        $(".mainLayoutTabs li").click(function () {
            var functionName = $(this).attr("functionName");
            $(this).closest(".mainLayoutTabs").find(".selected").removeClass("selected");
            $(this).addClass("selected");
            $(this).closest(".personDataMainLayout").find(".rightSide .rightSideContent").html(fiveD.invest[functionName]());

        });
    },

    followListDataInit : function(){
        var self = this, data = self.dataObj.followList;
        $("#followList .followItem").each(function(index){
            $(this).find(".follow-list-circle").addClass(self.followListCircleType[data[index].type]);
            $(this).find(".follow-list-circle").html(data[index].rank);
            $(this).find(".followItem-description .followItem-name").html(data[index].name);
            $(this).find(".followItem-description .followItem-id").html(data[index].id);
            $(this).find(".peopleImage").attr('src','img/' + data[index].image);
        });
    },

    getContentData : function(){
        var self = this;
        $.ajax({
            url: "json/investigateContent.json",
            dataType: 'json',
            async: false,
            success: function(data) {
                self.dataObj = data;
            },
            error : function(){}
        });
    }
}

fiveD.invest.setSelectedTab = function (activeTabContent, obj) {
    var className = "selected";
    if(activeTabContent === "renderPersonGISContent" && obj === "userGIS"){
        return className;
    }else if(activeTabContent === "renderPersonLinksContent" && obj === "userLinks"){
        return className;
    }else if(activeTabContent === "renderPersonIDContent" && obj === "userId"){
        return className;
    }
}


fiveD.invest.renderPerson = function (ui, container) {
    var html = [], x = 100, y=100;
    if (ui !== undefined && ui !== false) {
        x = ui.offset.top - $("#investigationContent").offset().top;
        y = ui.offset.left - $("#investigationContent").offset().left;
    }
    else if (ui === false) {
        x = $(container).get(0).offsetTop;
        y = $(container).get(0).offsetLeft;
    }
    html.push('<div class="followItem droppedFollowItem" style="position:absolute;left:' + y + 'px;top:' + x + 'px" ondblclick="fiveD.invest.extendEntity(this)">');
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

fiveD.invest.renderPersonDataMainLayout = function (funcName, obj) {
    var html = [], invokfunction = "renderPersonIDContent", x = 0, y = 0, style = "", taskId = "", personData = "";
    if (funcName !== false) {
        invokfunction = funcName;
        html.push('<div class="personDataMainLayout '+ invokfunction +'">');
    }else if (funcName === false && obj !== false){
        x = $(obj).get(0).offsetTop;
        y = $(obj).get(0).offsetLeft;
        style = "position:absolute;left:" + y + "px;top:" + x + "px";
        html.push('<div class="personDataMainLayout" style="' + style + '"">');
    }else if (funcName === false &&  obj === false){
        html.push('<div class="personDataMainLayout '+ invokfunction +'">');
    }

    taskId = localStorage.getItem("taksId");
    this.getContentData();
    personData = this.dataObj["followList"][parseInt(taskId)];

    html.push('    <section class="LeftSide">');
    html.push('        <div class="followItem">');
    html.push('            <div class="' + this.followListCircleType[personData.type] + ' follow-list-circle"' + '>89</div>');
    html.push('            <div class="followItem-description">');
    html.push('                <div class="followItem-name">' + personData.name + '</div>');
    html.push('                <div class="followItem-id">' + personData.id + '</div>');
    html.push('            </div>');
    html.push('            <img class="peopleImage" src="img/' + personData.image + '"/>');
    html.push('            <img class="maskImage" src="img/masking_for_faces_icon.png"/>');
    html.push('        </div>');
    html.push('        <ul class="mainLayoutTabs">');
    html.push('            <li class="userId '+ this.setSelectedTab(invokfunction, "userId") +'" functionName="renderPersonIDContent">ID</li>');
    html.push('            <li class="userGIS '+ this.setSelectedTab(invokfunction, "userGIS") +'" functionName="renderPersonGISContent">GIS</li>');
    html.push('            <li class="userLinks '+ this.setSelectedTab(invokfunction, "userLinks") +'" functionName="renderPersonLinksContent">Links</li>');
    html.push('            <li class="userData '+ this.setSelectedTab(invokfunction, "userData") +'" functionName="renderPersonDataContent">Data</li>');
    html.push('            <li class="userNotes '+ this.setSelectedTab(invokfunction, "userNotes") +'" functionName="renderPersonNotesContent">Notes</li>');
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
    html.push('         <div class="rightSideContent">' +  fiveD.invest[invokfunction]() + "</div>");
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

fiveD.invest.removeEntityItem = function (obj) {
    var container = $(obj).closest(".followItem");
    container.remove();
}

fiveD.invest.extendEntity = function (obj) {
    var container = $(obj).closest(".followItem");
    this.renderPersonDataMainLayout(false, container);
    this.removeEntityItem(obj);
}

fiveD.invest.renderPersonIDContent = function () {
    var html = [], personData = "";
    personData = this.dataObj["followList"][parseInt(localStorage.getItem("taksId"))];
    html.push('<div id="idSection">');
    html.push('    <span class="age">' + personData.age + '</span>');
    html.push('    <span class="small-line">|</span>');
    html.push('    <span id="gender">' + personData.gender + '</span>');
    html.push('    <table>');
    html.push('        <tbody>');
    html.push('        <tr>');
    html.push('             <td class="table-title">Date of Birth</td>');
    html.push('             <td class="table-title">Age</td>');
    html.push('         </tr>');
    html.push('         <tr>');
    html.push('             <td id="dateOfBirth" class="table-data">' + personData.dateOfBirth + '</td>');
    html.push('             <td id="class" class="data">' + personData.age + '</td>');
    html.push('         </tr>');
    html.push('         <tr>');
    html.push('             <td class="table-title">Country of Birth</td>');
    html.push('             <td class="table-title">Marital Status</td>');
    html.push('         </tr>');
    html.push('         <tr>');
    html.push('             <td id="countryOfBith" class="table-data">' + personData.countryOfBirth + '</td>');
    html.push('             <td id="maritalStatus" class="table-data">' + personData.maritalStatus + '</td>');
    html.push('         </tr>');
    html.push('         <tr>');
    html.push('             <td class="table-title">Nationalities</td>');
    html.push('             <!--<td></td>-->');
    html.push('         </tr>');
    html.push('         <tr>');
    html.push('             <td id="nationalities" class="table-data">' + personData.nationalities + '</td>');
    html.push('             <!--<td></td>-->');
    html.push('         </tr>');
    html.push('         <tr>');
    html.push('             <td class="table-title">Residence</td>');
    html.push('             <!--<td></td>-->');
    html.push('         </tr>');
    html.push('         <tr>');
    html.push('             <td id="residence" class="table-data">' + personData.residence + '</td>');
    html.push('             <!--<td></td>-->');
    html.push('         </tr>');
    html.push('         </tbody>');
    html.push('     </table>');
    html.push('     <div class="id-section-line-dot"></div>');
    html.push('     <div id="affilliation">');
    html.push('         <div class="table-title">Alliffication</div>');
    html.push('         <div class="data-underline">fffffffff</div>');
    html.push('         <div class="data-underline">aaaaaaaaaa</div>');
    html.push('         <div class="data-underline">bbbbbbbbbb</div>');
    html.push('     </div>');
    html.push('     <div id="rolePosition">');
    html.push('         <div class="table-title">Role/Position</div>');
    html.push('         <div class="table-data">' + personData.rolePosition + '</div>');
    html.push('     </div>');
    html.push(' </div>');
    this.setSelectedTab();
    return html.join("\n");
}

fiveD.invest.renderPersonGISContent = function () {
    var html = [];
    html.push('<div class="top-nav top-nav-GIS">');
    html.push('     <ul class="clearAfter">');
    html.push('          <li class="selected">Day time</li>');
    html.push('          <li>24 hrs</li>');
    html.push('          <li>Night time</li>');
    html.push('     </ul>');
    html.push('</div>');
    html.push('<div id="GISSection">');
    html.push('</div>');
    html.push('<div class="bottom-nav">');
    html.push('     <ul class="clearAfter">');
    html.push('         <li>Follow</li>');
    html.push('         <li>Ask more info</li>');
    html.push('         <li>Alert</li>');
    html.push('     </ul>');
    html.push('</div>');
    return html.join("\n");


}

fiveD.invest.renderPersonLinksContent = function () {
    var html = [];
    html.push('<div class="top-nav top-nav-LINKS">');
    html.push('     <ul class="clearAfter">');
    html.push('          <li class="selected">Location</li>');
    html.push('          <li>Connection</li>');
    html.push('          <li>Organization</li>');
    html.push('     </ul>');
    html.push('</div>');
    html.push('<div id="linksSection">');
    html.push('</div>');
    html.push('<div class="bottom-nav">');
    html.push('     <ul class="clearAfter">');
    html.push('         <li>Follow</li>');
    html.push('         <li>Ask more info</li>');
    html.push('         <li>Alert</li>');
    html.push('     </ul>');
    html.push('</div>');
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
    fiveD.invest.getContentData();
    fiveD.invest.followListDataInit();
})