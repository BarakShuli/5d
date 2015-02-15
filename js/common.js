var fiveD = fiveD || {};
fiveD = {

    dataObj : "",

    taskBulletTypeObj : {
        gray   : "grayBullet",
        orange : "orengeBullet",
        green  : "greenBullet"
    },
    notificationIconTypeObj : {
        info    : "info",
        warning : "warning"
    },

    followListCircleType : {
        red    : "red_circle ",
        orange : "orange-circle ",
        blue   : "blue-circle "
    },

    init: function () {
		$("#accordion").accordion({
            heightStyle: "fill"
		});

		$("#tasksAccordion").accordion({
		    heightStyle: "content"
		});

        $(".updateTab").click(function () {
            $(".updatetabsList .selectedTab").removeClass("selectedTab");
            $(this).addClass("selectedTab");
        });

        $(".follow-list-sort").click(function () {
            $("#followSection .selectedTab").removeClass("selectedTab");
            $(this).addClass("selectedTab");
        });



        $(".taskDescription").click(function () {
            var taskId = $(this).prev().attr("taskId");
            var morePeople = $(this).prev().attr("morePeople");
            var showExtraData = $(this).prev().attr("showExtraData");
            localStorage.setItem("taksId", taskId);
            localStorage.setItem("morePeople", morePeople);
            localStorage.setItem("showExtraData", showExtraData);
            window.location = "investigation.html";
        });

        $(".ui-accordion-header").addClass('').click(function () {
            if ($(this).hasClass('ui-accordion-header-active')) {
                $(this).find('.arrow').removeClass('down-arrow').addClass('up-arrow');
                $(this).siblings().find('.arrow').removeClass('up-arrow').addClass('down-arrow');
            } else {
                $(this).find('.arrow').removeClass('up-arrow').addClass('down-arrow');
            }
        });
    },

    tasksDataInit : function(){
        var self = this, data = self.dataObj.task;
        $(".taskItem .taskContainer").each(function(index){
            $(this).find(".taskItemBullet").addClass(self.taskBulletTypeObj[data[index].type]);
            $(this).find(".accordion-circle").addClass(self.followListCircleType[data[index].type]);
            $(this).find(".accordion-circle").html(data[index].rank);
            $(this).find(".taskItemContent").html(data[index].title);
            $(this).next().html(data[index].description);
            $(this).attr("taskId", data[index].taskId);
            $(this).attr("morePeople", data[index].morePeople);
            $(this).attr("showExtraData", data[index].showExtraData);

        });
    },

    updateListDataInit: function(updateListType){
        var html = [], data = "";
        if (updateListType) {
            data = this.dataObj[updateListType][0];
        } else {
            data = this.dataObj.updateCase[0];
        }
        $("#updateItemlist").mCustomScrollbar("destroy");
        $("#updateItemlist").fadeOut().hide().html("");
        for (var item in data) {
                html = [];
                html.push('<div class="updateItem" itemId="' + item + '">');
                html.push(' <img src="img/' + data[item].imgUrl + '" width="210" height="138" />');
                html.push(' <div class="updateItemData">');
                html.push('  <div class="clearAfter">');
                html.push('   <div class="timeAndDate">' + data[item].timeAndDate + '</div>');
                html.push('   <div class="writtenBy">By ' + data[item].writtenBy + '</div>');
                html.push('  </div>');
                html.push('  <div class="title">' + data[item].title + '</div>');
                html.push('  <div class="description">' + data[item].shortDescription + '</div>');
                html.push('  <div class="learnMoreLink">Learn More</div>');
                html.push(' </div>');
                html.push('</div>');
                $("#updateItemlist").append(html.join("\n"));
        }
        $("#updateItemlist").fadeIn("fast");
        if (Object.keys(data).length > 3) {
            $("#updateItemlist").mCustomScrollbar({
                scrollButtons: { enable: true },
                theme: "minimal-dark",
                scrollbarPosition: "outside"
            });
        }
        

    },

    notificationDataInit : function(){
        var self = this,  data = self.dataObj.notification;
        $("#notificationSection .notificationItem").each(function(index){
            $(this).find(".notificationItemTitle").html(data[index].title);
            $(this).find(".notificationItemTitle").before().addClass(self.notificationIconTypeObj[data[index].type]);
            $(this).find(".notificationItemContent").html(data[index].description);

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

    openCasesDataInit : function(){
        var self = this, data = self.dataObj.openCase;
        $("#accordionSection .ui-accordion-header").each(function(index){
            $(this).find(".accordion-circle").addClass(self.followListCircleType[data[index].type]);
            $(this).find(".accordion-circle").html(data[index].rank);
            $(this).find(".accordion-description .accordion-name").html(data[index].name);
            $(this).find(".accordion-description .accordion-id").html(data[index].id);
        });

        $("#accordionSection .ui-accordion-content").each(function(index){
            $(this).find("#reporter").html(data[index].reporter);
            $(this).find("#status").html(data[index].status);
            $(this).find("#owner").html(data[index].owner);
            $(this).find("#tasks").html(data[index].tasks);
            $(this).find("#firstPerson").html(data[index].people[0]);
            $(this).find("#otherPeople").html(data[index].people.length-1 + " others");
        });

    },

    getContentData : function(){
        var self = this;
        $.ajax({
            url: "json/indexContent.json",
            dataType: 'json',
            async: false,
            success: function(data) {
                self.dataObj = data;
            },
            error : function(){}
        });
    }
}

$(document).ready(function () {
    fiveD.init();
    fiveD.getContentData();
    fiveD.tasksDataInit();
    fiveD.notificationDataInit();
    fiveD.followListDataInit();
    fiveD.openCasesDataInit();
    fiveD.updateListDataInit(false);
});