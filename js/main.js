var app = {
    campaignsHandler: function(){
       

        // retrievedata from local storage
        var retrievedData = localStorage.getItem("obj");

        //old object for use incase there's is one...{}
        var campaigns = JSON.parse(retrievedData);
        console.log(campaigns);

        

        //our campaigns is either old campaign or new one
        var campaigns = campaigns || {};

        //number of users in campaign old or new......must be an array
        campaigns.users = campaigns.users || [];

        
        //if I should click on edit button and there's a user index to edit do this
        if (campaigns.shouldIedit === true && campaigns.userIndex !== "") {
          //get user 
          var user = campaigns.users[campaigns.userIndex];
          // a new textarea array to store our textarea values
          var textareas = [];
          console.log(user);
          //change title to current edited
          $("#campaign_title").html(user.header);
          //change image source to current user source
          $("#wizardPicturePreview").attr("src", user.banner);
          //load editor content
          $("#editor").html(user.editor);
        
          // fill our cloneContainer with social media in user
          $(".cloneContainer").html(user.media);

          // for some reasons the textareasand input are empty, fill them up with their contents
          $('.cloneContainer').find(".fadeIn").find(".form-control").each(function (index, value) {
              $(this).val(user.text[index]);
          });

          // add event listerner to this again..I guess the previous isn't in the DOM
          $(".cloneContainer").find(".remove").bind("click", function(){
            $(this).parent().remove();
          });
          console.log(user.media);
          //CHANGE #publish id to saveUser to prevent it from adding to users instead of editing user
          $("#publish").attr("id", "saveUser");

          //on click on saveUser button change user keys
          $("#saveUser").on("click", function(){
            // gather all the content of the textareas and input available
            $('.cloneContainer').find(".fadeIn").find(".form-control").each(function () {
              textareas.push($(this).val());
            });
            // image source equals the current photo source
            user.banner =  $("#wizardPicturePreview").attr("src");
            user.header = $('#editor').find("h3").clone().text();
            var $fullrow = '<td><a href="add_campaign.html" class="c-red"> ' + user.header +' </a></td><td>Social</td><td><a class="btn btn-dark" data-toggle="modal" href="#modal-id">Add</a></td><td class="text-center"><div class="event-date"><div class="event-month"><span class="dots">&nbsp;</span><span title=" ' + thisMonth + ' "> ' + thisMonth + '</span><span class="dots">&nbsp;</span></div><div class="event-day"> ' + thisDate + '</div><div class="event-day-txt"> ' + thisDay + '</div></div></td><td class="text-center"><span class="label label-success w-300">Active</span></td><td class="text-center"> <a href="add_campaign.html" data-rel="tooltip" title="Edit this Event" class="edit btn btn-sm btn-icon btn-rounded btn-default"><i class="fa fa-pencil"></i></a><a href="#" data-rel="tooltip" title="Delete this Event" class="delete btn btn-sm btn-icon btn-rounded btn-default"><i class="fa fa-times"></i></a></td>'
            user.image = '<img src=" ' +  user.banner + ' " alt="mars" class="img-responsive" />';
            user.main = '<tr><td><a href="add_campaign.html" class="magnific" title="Bruno Mars"> ' + user.image + '</a></td> ' + $fullrow  + ' </tr>';
            user.media = $('.cloneContainer').clone().html();
            user.editor = $("#editor").clone().html();
            user.text = textareas;
            campaigns.saveCampaign();
            campaigns.updateCampaign();
            window.location.href = "campaign.html";
          });
          
        }

        var $container = $(".page-notes"),
        $campaignList = $container.find('#campaigns'),
        $noData = $container.find('#no-data'),
        $yesData = $container.find('#yes-data'),
        $table = $campaignList.find("#events-table"),
        $tableBody = $table.find("tbody"),
        $addCampaign = $container.find('#publish'),
        $editRow = $tableBody.find("table .edit"),
        $deleteRow = $tableBody.find("table .delete");

        var campaignsParameters = {
          shouldIedit: false,
          userIndex: '',
          allUsers: campaigns.users.length,
          deletedUser: 0,
          //lets add functions
          showData: function(){
            if ($tableBody.length > 0) {
                $yesData.css("display", "block");
                $noData.css("display", "none");
            }
            else{
                $yesData.css("display", "none");
                $noData.css("display", "block");
            }
          },
          deleteCampaign: function(){
            console.log($tableBody.find(".delete"));
            /*$tableBody.find(".delete").bind("click", function(){
                $(this).parent().parent().remove();
                campaigns.users.splice(i, 1);
                alert("This is gone " + i);
              }); */
          },
          updateCampaign: function(){
            for (var i = 0; i < campaigns.users.length; i++) {
              $tableBody.append(campaigns.users[i].main);  
            }
            this.shouldIedit = false;
            this.userIndex = "";
            //this.showData();
            this.saveCampaign();
          },

          addCampaign : function(){
            var $editor = $('#editor').clone().html();
            var $header = $('#editor').find("h3").clone().text();
            var $paragraph = $("editor").find("p").clone().text();
            var $banner = $(".picture").find("img#wizardPicturePreview").clone();
            var $cloneContainer = $('.cloneContainer').clone().html();
            var textareas = [];

            $('.cloneContainer').find(".fadeIn").find(".form-control").each(function () {
                textareas.push($(this).val());
            });

            var $image =  '<img src=" ' + $banner.attr("src") + ' " alt="mars" class="img-responsive" />';

            var $fullrow = '<td><a href="#" class="c-red"> ' + $header +' </a></td><td>Social</td><td><a class="button" data-toggle="modal" href="#modal-id">Add</a></td><td class="text-center"><div class="event-date"><div class="event-month"><span class="dots">&nbsp;</span><span title=" ' + thisMonth + ' "> ' + thisMonth + '</span><span class="dots">&nbsp;</span></div><div class="event-day"> ' + thisDate + '</div><div class="event-day-txt"> ' + thisDay + '</div></div></td><td class="text-center"><span class="label label-success w-300">Active</span></td><td class="text-center"> <a href="add_campaign.html" data-rel="tooltip" title="Edit this Event" class="edit btn btn-sm btn-icon btn-rounded btn-default"><i class="fa fa-pencil"></i></a><a href="#" data-rel="tooltip" title="Delete this Event" class="delete btn btn-sm btn-icon btn-rounded btn-default"><i class="fa fa-times"></i></a></td>'
            
            campaigns.users.unshift({
                id: campaigns.users.length,
                main: '<tr><td><a href="add_campaign.html" class="magnific" title="Bruno Mars"> ' + $image + '</a></td> ' + $fullrow  + ' </tr>',
                header: $header,
                image: $image,
                banner: $banner.attr("src"),
                editor: $editor,
                media: $cloneContainer,
                text : textareas,
                getUser: function(){
                  var user = {
                    userId: this.id,
                    social: this.media.children('.fadeIn'),
                    book: this.editor.children(),
                    photo: this.image
                  };
                  //return user;
                  console.log(user);
                }
            });
            
            //update users data
            this.updateCampaign();
            // hide icon and show table 
            this.showData();
            //save to localstorage
            //this.deleteCampaign();
            console.log(campaigns);
            this.saveCampaign();
            window.location.href = "campaign.html";
        
          },
          saveCampaign: function(e){
            localStorage.setItem("obj", JSON.stringify(campaigns));
          },
          editUser: function(userdata){
            var $editor = $('#editor');
            var $header = $editor.find("h3");
            var $paragraph = $editor.find("p");
            var $banner = $(".picture").find("img#wizardPicturePreview");
            var $cloneContainer = $('#cloneContainer');

            //console.log(userdata);
          },
          editCampaign: function(){
            $($editRow).each(function (index, value) {
                $(this).bind("click", function(){
                //THIS RETURN USER INFO..... 
                campaigns.users[index].getUser(); 
              });      
            }); 
          }

        };

        $.extend(campaigns, campaignsParameters);
        console.log(campaigns);

        $addCampaign.on('click', function(){
          campaigns.addCampaign();
        });


        if (campaigns.users.length > 0) {
          $("#total_users").html(campaigns.allUsers);
          $("#deleted_user").html(campaigns.deletedUser);
          //$("#deleted_user").html(campaigns.deletedUser);
          campaigns.updateCampaign();
          campaigns.showData();
        }

        
        
        //campaigns.editCampaign();
        $("#events-table a.edit").each(function(index, value){
          $(this).bind('click', function (e) {
            e.preventDefault();
            if (confirm("Are you sure to edit this campaign ?") == false) {
                return;
            }
            var nRow = $(this).parents('tr')[0];
            console.log(nRow);
            campaigns.shouldIedit = true;
            campaigns.userIndex = index;
            campaigns.saveCampaign();
            window.location.href = "add_campaign.html";
          });
        });


        $("#events-table a.delete").each(function(index, value){
          $(this).bind('click', function (e) {
            e.preventDefault();
            if (confirm("Are you sure to delete this campaign ?") == false) {
                return;
            }
            var nRow = $(this).parents('tr')[0];
            console.log(nRow);
            oTable.fnDeleteRow(nRow);
            campaigns.users.splice(index, 1);
            campaigns.deletedUser += 1;
            campaigns.saveCampaign();
            campaigns.showData();
            window.location.href = "campaign.html";
          });
        });


    }
}