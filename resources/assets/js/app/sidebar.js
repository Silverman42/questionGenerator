(function(){
  const SidebarView = function () {
	this.sidebar =$('#js-qg-sidebar');
	this.remove_icon =$('#js-qg-sidebar--remove-icon');
	this.burger = $('#js-qg-burger');
	this.link = $('.js-qg-sublink');
	this.toogleClass = 'qg-sidebar--unhide';
	this.link_toogleClass = 'qg-sidebar--sublink--unhide';
	// body...
  };
  const SidebarController = function() {
	this.view = new SidebarView;
	this.toogleClass = this.view.toogleClass;
	this.link_toogleClass = this.view.link_toogleClass;
	this.sidebar = this.view.sidebar;
  };
  SidebarController.prototype.init = function() {
	let toogleClass = this.toogleClass;
	let link_toogleClass = this.link_toogleClass;
	let sidebar = this.sidebar;
	this.view.remove_icon.click(function (e) {
		e.preventDefault();
		classToggle.remove( toogleClass , sidebar);
	});
	this.view.burger.click(function(e){
		e.preventDefault();
		classToggle.add( toogleClass , sidebar);
	});
	this.view.link.click(function(e){
		e.preventDefault();
		var target = $(this).attr('href');
		target = $(target);
		classToggle.toggle( link_toogleClass , target);
	});
  };
  let sidebar = new SidebarController;
  sidebar.init();
  console.log('happy');
})();