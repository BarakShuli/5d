var fiveD = fiveD || {};
fiveD.invest = {

    dataObj : null,
    isTimeLineTextMsgClosed : false,
    peopleListCircleType : {
        red    : "red_circle",
        orange : "orange-circle",
        blue   : "blue-circle"
    },

    init: function () {
        this.renderPeopleItems();

        $("#accordion").accordion({
            heightStyle: "content",
            activate: function (event, ui) {
                $(".cloneFollowItem").draggable({
                    helper: "clone",
                    revert: "invalid"
                });
            }
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
            revert: "invalid"
        });

        $("#investigationContent").droppable({
            accept: ".cloneFollowItem",
            activeClass: "custom-state-active",
            drop: function (event, ui) {
                if ($(ui.draggable).attr("type") === "gisCase") {
                    fiveD.invest.renderGisCase(ui, false, $(ui.draggable).attr("entityId"));
                } else {
                    fiveD.invest.renderPerson(ui, false, $(ui.draggable).attr("entityId"));
                }
                fiveD.invest.initDraggableEvent();
            }
        });


        $("#txtFrom").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            onClose: function (selectedDate) {
                $("#txtTo").datepicker("option", "minDate", selectedDate);
            }
        });
        $("#txtTo").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            onClose: function (selectedDate) {
                $("#txtFrom").datepicker("option", "maxDate", selectedDate);
            }
        });

        this.initEntityDataTabsEvent();
    },

    peopleListDataInit : function(){
        var self = this, data = self.dataObj.peopleList[0], entityId = -1;
        $("#peopleList .followItem").each(function(index){
            entityId = $(this).attr("entityId");
            $(this).find(".follow-list-circle").addClass(self.peopleListCircleType[data[entityId].type]);
            $(this).find(".follow-list-circle").html(data[entityId].rank);
            $(this).find(".followItem-description .followItem-name").html(data[entityId].name);
            $(this).find(".followItem-description .followItem-id").html(data[entityId].id);
            $(this).find(".peopleImage").attr('src', 'img/' + data[entityId].image);
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

fiveD.invest.initEntityDataTabsEvent = function () {
    $(".mainLayoutTabs li").click(function () {
        var functionName = $(this).attr("functionName");
        var entityId = $(this).closest(".personDataMainLayout").attr("entityId");
        $(this).closest(".mainLayoutTabs").find(".selected").removeClass("selected");
        $(this).addClass("selected");
        $(this).closest(".personDataMainLayout").find(".rightSide .rightSideContent").html(fiveD.invest[functionName](entityId));
    });
}

fiveD.invest.setSelectedTab = function (activeTabContent, obj) {
    var className = "selected";
    if(activeTabContent === "renderPersonGISContent" && obj === "userGIS"){
        return className;
    }else if(activeTabContent === "renderPersonLinksContent" && obj === "userLinks"){
        return className;
    }else if(activeTabContent === "renderPersonIDContent" && obj === "userId"){
        return className;
    } else if (activeTabContent === "renderPersonDataContent" && obj === "userData") {
        return className;
    }
}

fiveD.invest.renderPeopleItems = function () {
    var html = [];
    var data = this.dataObj.peopleList[0];
    for (var item in data) {
        if (item < 5) {
            html = [];
            html.push('<div class="followItem cloneFollowItem" entityId="' + data[item].id + '">');
            html.push(' <div class="follow-list-circle"></div>');
            html.push(' <div class="followItem-description">');
            html.push('  <div class="followItem-name"></div>');
            html.push('  <div class="followItem-id"></div>');
            html.push(' </div>');
            html.push('  <img class="peopleImage" src="img/sanda.jpg"/>');
            html.push('  <img class="maskImage" src="img/masking_for_faces_icon.png"/>');
            html.push('</div>');
            $("#peopleList").append(html.join("\n"));
        }
    }  
}


fiveD.invest.renderGISCaseItems = function () {
    var html = [];
    var data = this.dataObj.gisCase["1"];
    html = [];
    html.push('<div class="followItem cloneFollowItem" type="gisCase" entityId="' + data.id + '">');
    html.push(' <div class="follow-list-circle '+this.peopleListCircleType[data.type]+'">'+data.rank+'</div>');
    html.push(' <div class="followItem-description">');
    html.push('  <div class="followItem-name">' + data.name + '</div>');
    html.push('  <div class="followItem-id">' + data.id + '</div>');
    html.push(' </div>');
    html.push('  <img class="peopleImage" src="img/sanda.jpg"/>');
    html.push('  <img class="maskImage" src="img/masking_for_faces_icon.png"/>');
    html.push('</div>');
    $("#gisCase").append(html.join("\n"));
}

fiveD.invest.renderPerson = function (ui, container, entityId) {
    var html = [], x = 100, y = 100, data = this.dataObj.peopleList[0];
    if (ui !== undefined && ui !== false) {
        x = ui.offset.top - $("#investigationContent").offset().top;
        y = ui.offset.left - $("#investigationContent").offset().left;
    }
    else if (ui === false) {
        x = $(container).get(0).offsetTop;
        y = $(container).get(0).offsetLeft;
    }
    html.push('<div class="followItem droppedFollowItem" style="position:absolute;left:' + y + 'px;top:' + x + 'px" entityId="' + data[entityId].id + '" ondblclick="fiveD.invest.extendEntity(this)">');
    html.push(' <div class="' + this.peopleListCircleType[data[entityId].type] + ' follow-list-circle">' + data[entityId].rank + '</div>');
    html.push(' <div class="followItem-description">');
    html.push('  <div class="followItem-name">' + data[entityId].name + '</div>');
    html.push('  <div class="followItem-id">' + data[entityId].id + '</div>');
    html.push(' </div>');
    html.push('  <img class="peopleImage" src="img/' + data[entityId].image + '"/>');
    html.push('  <img class="maskImage" src="img/masking_for_faces_icon.png"/>');
    html.push('</div>');
    $("#investigationContent").append(html.join("\n"));
}

fiveD.invest.renderGisCase = function (ui, container, entityId) {
    var html = [], x = 100, y = 100, data = this.dataObj.peopleList[0];
    if (ui !== undefined && ui !== false) {
        x = ui.offset.top - $("#investigationContent").offset().top;
        y = ui.offset.left - $("#investigationContent").offset().left;
    }
    else if (ui === false) {
        x = $(container).get(0).offsetTop;
        y = $(container).get(0).offsetLeft;
    }
	html.push('<div class="followItem droppedFollowItem" style="position:absolute;left:' + y + 'px;top:' + x + 'px" entityType="gisCase" entityId="' + data[entityId].id + '" ondblclick="fiveD.invest.extendEntity(this)">');
    html.push(' <div class="' + this.peopleListCircleType[data[entityId].type] + ' follow-list-circle">' + data[entityId].rank + '</div>');
    html.push(' <div class="followItem-description">');
    html.push('  <div class="followItem-name">' + data[entityId].name + '</div>');
    html.push('  <div class="followItem-id">' + data[entityId].id + '</div>');
    html.push(' </div>');
    html.push('  <img class="peopleImage" src="img/' + data[entityId].image + '"/>');
    html.push('  <img class="maskImage" src="img/masking_for_faces_icon.png"/>');
    html.push('</div>');
    $("#investigationContent").append(html.join("\n"));
}

fiveD.invest.changeTimeLineUI = function (obj) {
    var stepId = parseInt($(obj).attr("stepId"));
    if (stepId + 1 <= 3) {
        if (stepId + 1 === 3) {
            if (stepId === 2 && this.isTimeLineTextMsgClosed === false) {
                $(".showMSGBox").show();
            } else if (this.isTimeLineTextMsgClosed === true) {
                $(obj).attr("stepId", stepId + 1)
                $(obj).removeClass("timeLine_" + (stepId));
                $(obj).addClass("timeLine_" + (stepId + 1));
            }
        } else {
            $(obj).attr("stepId", stepId + 1)
            $(obj).removeClass("timeLine_" + (stepId));
            $(obj).addClass("timeLine_" + (stepId + 1));
        }
        
    }
    
}

fiveD.invest.renderPersonDataMainLayout = function (funcName, obj) {
    var html = [], invokfunction = "renderPersonIDContent", x = 0, y = 0, style = "", taskId = "", personData = "";
    if (obj === false) {
        taskId = localStorage.getItem("taksId");
    } else {
        taskId = $(obj).attr("entityId");
    }

    if(funcName !== false){
		invokfunction = funcName;
	}
	if (funcName !== false && obj === false) {
        html.push('<div class="personDataMainLayout ' + invokfunction + '" entityId="' + taskId + '">');
    }else if ((funcName === false && obj !== false) || (funcName !== false && obj !== false)){
        x = $(obj).get(0).offsetTop;
        y = $(obj).get(0).offsetLeft;
        style = "position:absolute;left:" + y + "px;top:" + x + "px";
        html.push('<div class="personDataMainLayout" style="' + style + '"" entityId="' + taskId + '">');
    }else if (funcName === false &&  obj === false){
        html.push('<div class="personDataMainLayout ' + invokfunction + '" entityId="' + taskId + '">');
    }
    
    this.getContentData();
    if (obj !== false) {
        personData = this.dataObj["gisCase"]["1"];
    } else {
        personData = this.dataObj["peopleList"][0][parseInt(taskId)];
    }
    

    html.push('    <section class="LeftSide">');
    html.push('        <div class="followItem">');
    html.push('            <div class="' + this.peopleListCircleType[personData.type] + ' follow-list-circle"' + '>' + personData.rank + '</div>');
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
    html.push('            <li class="userData ' + this.setSelectedTab(invokfunction, "userData") + '" functionName="renderPersonDataContent">Data</li>');
    html.push('            <li class="userRiskFactors ' + this.setSelectedTab(invokfunction, "userRiskFactors") + '" functionName="renderPersonRiskFactorsContent">Risk Factors</li>');
    html.push('            <li class="userNotifications ' + this.setSelectedTab(invokfunction, "userNotifications") + '" functionName="renderPersonNotificationsContent">Notifications</li>');
    html.push('            <li class="userNotes ' + this.setSelectedTab(invokfunction, "userNotes") + '" functionName="renderPersonNotesContent">Notes</li>');
    html.push('        </ul>');
    html.push('        <div class="clearAfter">');
    html.push('            <div class="zoomIcon"></div>');
    html.push('            <div class="smallAddIcon"></div>');
    html.push('        </div>');
    html.push('    </section>');
    html.push('    <section class="rightSide">');

    html.push('         <div class="rightSideContent">' + fiveD.invest[invokfunction](taskId) + "</div>");
    html.push('    </section>');
    html.push('    <div class="topRightToolBar clearAfter">');
    html.push('         <div class="closeIcon" onclick="fiveD.invest.closeWindow(this);"></div>');
    html.push('         <div class="sepIcon"></div>');
    html.push('         <div class="minIcon" onclick="fiveD.invest.minimizeWindow(this);"></div>');
    html.push('    </div>');
    html.push('</div>');
    $("#investigationContent").append(html.join("\n"));
    $(".personDataMainLayout").draggable({
        containment: $("#investigationContent"),
        cursor: "move"
    })
}

fiveD.invest.closeTimeLineWindow = function (obj) {
    $(obj).closest(".showMSGBox").hide();
    this.isTimeLineTextMsgClosed = true;

}

fiveD.invest.minimizeWindow = function (obj) {
    var container = $(obj).closest(".personDataMainLayout");
    this.renderPerson(false, container, localStorage.getItem("taksId"));
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
    if ($(obj).attr("entityType") === "gisCase") {
        this.renderPersonDataMainLayout("renderPersonGISContent", container);
    } else {
        this.renderPersonDataMainLayout(false, container);
    }
    
    this.removeEntityItem(obj);
    this.initEntityDataTabsEvent();
 }

fiveD.invest.renderPersonIDContent = function (entityId) {
    var html = [], personData = "";
    personData = this.dataObj["peopleList"][0][parseInt(entityId)];
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
    html.push('             <td id="class" class="table-data">' + personData.age + '</td>');
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
                            var nationalities = personData.nationalities[0];
                            for(var item in personData.nationalities){
                                if(item > 0){
                                    nationalities = nationalities + ", " + personData.nationalities[item];
                                }
                            }
    html.push('             <td id="nationalities" class="table-data">' + nationalities + '</td>');
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
                        for(var item in personData.alliffication){
                            html.push('<div class="data-underline">' + personData.alliffication[item] + '</div>');
                        }
    html.push('     </div>');
    html.push('     <div id="rolePosition">');
    html.push('         <div class="table-title">Role/Position</div>');
    html.push('         <div class="table-data">' + personData.rolePosition + '</div>');
    html.push('     </div>');
    html.push(' </div>');
    this.setSelectedTab();
    return html.join("\n");
}

fiveD.invest.renderBuildingEntity = function (obj) {
    var obj = $(obj).closest(".personDataMainLayout");
	this.renderPersonDataMainLayout("renderPersonDataContent", obj);
}

fiveD.invest.setSelectedGisTab = function (selectedItem) {
    $(".gisTabs li").removeClass("selected");
    $(selectedItem).addClass("selected");
    $("#GISSection").addClass("GISSectionNight");
}

fiveD.invest.setSecondSelectedGisTab = function () {
    $("#GISSection").addClass("GISSection_3");
}

fiveD.invest.renderPersonGISContent = function (taskId) {
    var html = [];
    html.push('<div class="top-nav top-nav-GIS">');
    html.push('     <ul class="gisTabs">');
    html.push('          <li class="selected" onclick="fiveD.invest.setSelectedGisTab(this)">Day time</li>');
    html.push('          <li onclick="fiveD.invest.setSelectedGisTab(this)">24 hrs</li>');
    html.push('          <li onclick="fiveD.invest.setSelectedGisTab(this)">Night time</li>');
    html.push('     </ul>');
    html.push('     <div id="rangeDateTime"><label for="from">From</label>&nbsp;<input type="text" id="txtFrom" name="txtFrom">&nbsp;<label for="txtTo">to</label>&nbsp;<input type="text" id="txtTo" name="txtTo"><div class="btnDateRangeDone" onclick="fiveD.invest.setSecondSelectedGisTab()">Done</div></div>');
    html.push('</div>');
    html.push('<div id="GISSection" ondblclick="fiveD.invest.renderBuildingEntity(this)">');
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

fiveD.invest.renderPersonRiskFactorsContent = function (taskId) {
    var html = [], personData = "";
    personData = this.dataObj["peopleList"][0][parseInt(taskId)];
    html.push('<img src="' + personData.riskFactorsImg + '" width="420px" height="483px" />');
    html.push('<div class="bottom-nav">');
    html.push('     <ul class="clearAfter">');
    html.push('         <li>Follow</li>');
    html.push('         <li>Ask more info</li>');
    html.push('         <li>Alert</li>');
    html.push('     </ul>');
    html.push('</div>');
    return html.join("\n");
}

fiveD.invest.renderPersonNotificationsContent = function (taskId) {
    var html = [];
    html.push('<div id="dataSection">Notifications');
    html.push(' </div>');
    return html.join("\n");
}

fiveD.invest.changeLinkTabimage = function () {
    $("#linksSection").addClass("links_2");
}

fiveD.invest.renderPersonLinksContent = function (taskId) {
    var html = [];
    html.push('<div class="top-nav top-nav-LINKS">');
    html.push('     <ul class="clearAfter">');
    html.push('          <li class="selected">Location</li>');
    html.push('          <li>Connection</li>');
    html.push('          <li>Organization</li>');
    html.push('     </ul>');
    html.push('</div>');
    html.push('<div id="linksSection" onclick="fiveD.invest.changeLinkTabimage();"></div>');
    html.push('<div class="bottom-nav">');
    html.push('     <ul class="clearAfter">');
    html.push('         <li>Follow</li>');
    html.push('         <li>Ask more info</li>');
    html.push('         <li>Alert</li>');
    html.push('     </ul>');
    html.push('</div>');
    return html.join("\n");
}

/*Police report (15.08.2015 20:31): 
Domestic complaint regarding noise and suspicious persons, Arabic-speaking, in the usually empty apartment – 23B. */

fiveD.invest.renderPersonDataContent = function (taskId) {
    var html = [];
    
    html.push('<div id="dataSection">Police report (15.08.2015 20:31):<br /> Domestic complaint regarding noise and suspicious persons, Arabic-speaking, in the usually empty apartment &#45; 23B.</div>');
    html.push('<div class="bottom-nav">');
    html.push('     <ul class="clearAfter">');
    html.push('         <li>Follow</li>');
    html.push('         <li>Ask more info</li>');
    html.push('         <li>Alert</li>');
    html.push('     </ul>');
    html.push('</div>');
    return html.join("\n");
}

fiveD.invest.renderPersonNotesContent = function (taskId) {
    var html = [];
    html.push('<div id="notesSection">NOTES');
    html.push(' </div>');
    return html.join("\n");
}

fiveD.invest.initDraggableEvent = function () {
    $(".droppedFollowItem").draggable({
        containment: $("#investigationContent"),
        cursor: "move",
        revert: "invalid"
    });
}


$(document).ready(function () {
    fiveD.invest.getContentData();
    fiveD.invest.init();
    fiveD.invest.peopleListDataInit();
    fiveD.invest.renderGISCaseItems();
})