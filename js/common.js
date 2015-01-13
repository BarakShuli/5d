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

        $(".updateTab").click(function () {
            $(".updatetabsList .selectedTab").removeClass("selectedTab");
            $(this).addClass("selectedTab");
        });

        $(".follow-list-sort").click(function () {
            $("#followSection .selectedTab").removeClass("selectedTab");
            $(this).addClass("selectedTab");
        });



        $(".taskItemContent").click(function () {
            var taskId = $(this).attr("taskId");
            localStorage.setItem("taksId", taskId);
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
            $(this).find(".taskItemContent").html(data[index].description);

            $(this).find(".taskItemContent").attr("taskId", data[index].id);
        });
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
});