window.EduMon.Gui = new function Gui() {
	var that = this;

	var countFeedMessages = 0;
	var dialogOpened = 0;

	/**
	 * Add message to newsfeed
	 * @param {String} type Message type can be "info", "success", "warning" and "danger"
	 * @param {String} title The message title
	 * @param {String} message The html message to display
	 */
	this.showFeedMessage = function showFeedMessage(type, title, message) {
		countFeedMessages++;
		that.updateFeedCountView();
		$("#alertcontainer")
			.prepend($("<div/>",{class:"alert alert-dismissable alert-"+type})
					.css("opacity","0")
					.slideDown(300,function(){
						$(this).animate({opacity:1},200);
					})
					.append($("<button/>",{type:"button",class:"close"}).text("x")
						.one("click",function(e){
							countFeedMessages--;
							that.updateFeedCountView();
							$(this).parent()
							.css("visibility","hidden")
							.slideUp(200,function(){
								$(this).remove();
							});
						}))
					.append($("<h4/>").text(title))
					.append($("<p/>").html(message))
					);
	};

	this.updateFeedCountView = function updateFeedCountView() {
		$("#feedcounter").html("<span class=\"badge\">"+countFeedMessages+"</span> Nachricht"+(countFeedMessages!==1?"en":""));
	};

	this.showDialog = function showDialog(dialogid) {
		if (this.dialogOpened){
			throw "Cannot open another dialog. Use switchDialog() instead of openDialog()";
			return;
		}
		this.dialogOpened = 1;
		$("#dialogcontent").empty();
		this.blockDialog(1);
		$("#layercontainer").show();
		$("#dialogcontainer").fadeIn(200);
		$("#dialogcontent").load("dialogs/"+dialogid+".html", function(){
			$("#dialogcontainer").scrollTop(0);
			that.blockDialog(0);
		});
	};

	this.switchDialog = function switchDialog(dialogid) {
		this.blockDialog(1);
		$("#dialogcontent").load("dialogs/"+dialogid+".html", function(){
			$("#dialogcontainer").scrollTop(0);
			that.blockDialog(0);
		});
	};

	this.blockDialog = function setDialogBlock(blocked) {
		if (blocked){
			$("#loadinglayer").show();
		} else {
			$("#loadinglayer").hide();
		}
	};

	this.closeDialog = function closeDialog() {
		$("#dialogcontainer").fadeOut(100,function(){
			$("#layercontainer").hide();
			$("#dialogcontent").empty();
			that.dialogOpened = 0;
		});
	};

	this.showToast = function showToast(message) {
		$("#toastlist")
			.prepend($("<li/>")
					.append($("<div/>").text(message))
					.one("click",function(e){
						$(this).remove();
					})
					.delay(2000)
					.fadeOut(1000,function(){
						$(this).remove();
					}));
	};
};
