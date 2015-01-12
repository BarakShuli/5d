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
        orange : "orange_circle ",
        blue   : "blue_circle "
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
        $(".taskItem").children().each(function(index){
            $(this).find(".taskItemBullet").addClass(self.taskBulletTypeObj[data[index].type]);
            $(this).find(".taskItemContent").html(data[index].description);
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
            $(this).find(".accordion-description .accordion-name").html(data[index].id);
        });

    },

    getContentData : function(){
        this.dataObj = {
            "openCase" : [
                {
                    "id": 1111111,
                    "type" : "red",
                    "name": "111 111",
                    "rank": 90

                },
                {
                    "id": 1111111,
                    "type" : "blur",
                    "name": "333 333",
                    "rank": 13

                },
                {
                    "id": 1111111,
                    "type" : "red",
                    "name": "999 999",
                    "rank": 12

                },
                {
                    "id": 1111111,
                    "type" : "orange",
                    "name": "777 777",
                    "rank": 11

                }
            ],
            "notification": [
                {
                    "type": "info",
                    "title": "3 minutes ago",
                    "description": "some text some text some text some text some text some text some text some text some text"
                },
                {
                    "type": "info",
                    "title": "10:16 AM",
                    "description": "some text some text some text some text some text some text some text some text some text "
                },
                {
                    "type": "warning",
                    "title": "Yesterday, 4:29 PM",
                    "description": "some text some text some text some text some text some text some text some text some text "
                }
            ],
            "followList": [
                {
                    "id": 1111111,
                    "type" : "red",
                    "name": "111 111",
                    "image": "sanda.jpg",
                    "rank": 90
                },
                {
                    "id": 22222222,
                    "type" : "red",
                    "name": "222 222",
                    "image": "sanda.jpg",
                    "rank": 50
                },
                {
                    "id": 3333333,
                    "type" : "blue",
                    "name": "333 333",
                    "image": "sanda.jpg",
                    "rank": 9
                },
                {
                    "id": 4444444,
                    "type" : "orange",
                    "name": "444 444",
                    "image": "sanda.jpg",
                    "rank": 34
                },
                {
                    "id": 5555555,
                    "type" : "red",
                    "name": "555 555",
                    "image": "sanda.jpg",
                    "rank": 67
                },
                {
                    "id": 6666666,
                    "type" : "blue",
                    "name": "666 666",
                    "image": "sanda.jpg",
                    "rank": 12
                },
                {
                    "id": 77777,
                    "type" : "blue",
                    "name": "777 777",
                    "image": "sanda.jpg",
                    "rank": 87
                },
                {
                    "id": 888888,
                    "type" : "orange",
                    "name": "888 888",
                    "image": "sanda.jpg",
                    "rank": 34
                },
                {
                    "id": 99999,
                    "type" : "red",
                    "name": "999 999",
                    "image": "sanda.jpg",
                    "rank": 41
                }
            ],

            "task" : [
                {
                    "type" : "gray",
                    "description" : "some text some text some text"

                },
                {
                    "type" : "gray",
                    "description" : "some text some text some text"
                },
                {
                    "type" : "orange",
                    "description" : "some text some text some text"
                },
                {
                    "type" : "green",
                    "description" : "some text some text some text"

                },
                {
                    "type" : "green",
                    "description" : "some text some text some text"
                },
                {
                    "type" : "orange",
                    "description" : "some text some text some text"
                }
            ]
        }
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