if(typeof jQuery != 'undefined') {
	$(function() {
		// cache selectors
		var body = $('body');
		var main = $('#main');
		body.addClass('jsenabled');
		if(!$.support.opacity) {
			$('th:last-child, td:last-child, tr:last-child, tbody:last-child, .utility a:last-child, .widget div li:last-child, .lists li:last-child','#content').addClass('last');
			$('.features section:nth-child(even)', main).addClass('even');
			$('.features section:nth-child(odd)', main).addClass('odd');
		}
		// search field default value
		function hasPlaceholderSupport() {
			var input = document.createElement('input');
			return ('placeholder' in input);
		}
		if(hasPlaceholderSupport() == false) {
			var searchField = $('#s_inp','#header');
			var labelText = searchField.prev().text();
			searchField
				.val(labelText)
				.addClass('default')
				.focus(function() {
					if($(this).val() == labelText) {
						$(this).val('').removeClass('default');
					}
				})
				.blur(function() {
					if($(this).val() == '') {$(this).val(labelText).addClass('default')}
				})
				.prev()
					.hide();
		}
		var valText = 'Type to filter TOC';
		$('#tab_content .default','#api_sub')
			.val(valText)
			.addClass('default')
			.focus(function() {
				if($(this).val() == valText) {
					$(this).val('').removeClass('default');
				}
			})
			.blur(function() {
				if($(this).val() == '') {$(this).val(valText).addClass('default');}
			});
		// end search field default value
		// side nav accordion functionality
		$('body:not(.blog) #sub li').each(function() {
			if($(this).children('span').length) {
				$(this).addClass('active');
			}
		});
		$('#sub li > span').click(function() {
			var that = $(this);
			if(that.parent().hasClass('active')) {
				that.next().slideUp(function() {
					that.parent().removeClass('active');
				});
			}
			else {
				that.next().slideDown().end().parent().addClass('active');
			}
		});
		$('#sub li').find('.current').parent().show().closest('li').addClass('active');
		// end side nav accordion functionality
		$('.features thead th:first-child').addClass('title').append($('.features caption').text()).closest('table').children('caption').remove();
		// general class if window width smaller than container width
		if($(window).width() <= 1100) {
			body.addClass('sticky');
		}
		$(window).resize(function() {
			if($(this).width() <= 1100) {
				body.addClass('sticky');
			}
			else {
				if(body.hasClass('sticky')) {
					body.removeClass('sticky');
				}
			}
		});
		// end general class
		// utility form stuff
		var root = $('.utility');
		var btn = root.find('form input[type=image]');
		root
			.contents()
				.wrapAll($('<div>', {'class': 'u_wrapper'}))
				.end()
			.find('form')
				.after(
					$('<a>', {'class': 'search'}).append(
						$('<img>', {
							src: btn.attr('src'),
							title: btn.attr('title')
						})
					)
				)
				.submit(function() {
					$(this).find('input[type=image]').prop('disabled',true);
				})
				.end()
			.find('.search')
				.click(function(e) {
					e.preventDefault();
					$(this).prev().addClass('active').find('input[type=text]').focus();
				});
		var inside = false;
		root.find('form').hover(function(){ 
		    inside=true; 
			}, function(){ 
		    inside=false; 
		});
		body.mouseup(function(){ 
	    if(!inside) {
	    	root.find('form.active').removeClass('active');
	    }
		});
		if(jQuery().tooltip) {
			$('.utility a img, .utility input[type=image], .stip').tooltip({
				showURL: false,
				track: true,
				top: -8
			});
		}
		// end utility form stuff
		$('.post + .pagination',main).clone().insertBefore(main);
		// comments tab position at right 
		var pos = parseInt($('#comments .action').css('top'), 10);
		$('#comments .action').css('top', pos+$('#breadcrumb + section > h2').height()+'px');
		// end comments tab position
		// blog heading change
		if($('.blog #main article.post').length == 1) {
      /* EDL: we don't need this; the XSLT takes care of this
			var h3 = $('.blog #main article.post:only-child header h3').hide();
			$('.blog #breadcrumb + section > h2').text(h3.text());
      */
			$('#comments .action').css('top', pos+$('#breadcrumb + section > h2').height()+'px');
		}
		//end blog heading change
		// home page close button(s)
		$('.removable').each(function() {
			var sectionHeight = $(this).height();
			var paddingb = $(this).css('padding-bottom');
			var paddingt = $(this).css('padding-top');
            var id = $(this).attr('id');
            var c = 'rundmc-r-' + id;

            if ($.cookie(c) === 'closed') {
				$(this).addClass('closed');
				$(this).height(35).css('padding-bottom', 5).css('padding-top', 15);
            }

			$(this).append($('<a>', {'class': 'close'})).children('.close').click(function() {
                if($(this).parent().hasClass('closed')) {
                    $(this).parent().children(".row").animate({opacity: 1.0});
					$(this).parent().animate({height: sectionHeight,'padding-bottom':paddingb},500, function() {
						$(this).removeClass('closed').find('.more').css('position','absolute');
                        $.cookie(c, 'open');
					});
				}
				else {
                    $(this).parent().children(".row").animate({opacity: 0.0});
					$(this).parent().animate({height: 35,'padding-bottom': 5, 'padding-top': 15},500, function() {
						$(this).addClass('closed');
                        $.cookie(c, 'closed');
					}).find('.more').css('position','static');
				}
			});
		});

        $('.hide-if-href-empty').each(function() {
            if ( $(this).attr('href') == "" ) {
                $(this).hide();
            }
        });

        $("#iemail").keyup(function() {
            var b = $(":button:contains('Download')");
            var email = $("#iemail").val();
            if ($("#iaccept").is(":checked") && isValidEmailAddress(email)) {
                b.button("enable");
            } else {
                b.button("disable");
            }
            $("#confirm-dialog").dialog.email = email;
        });

        $("#iaccept").click(function() {
            var b = $(":button:contains('Download')");
            if ($("#iaccept").is(":checked") && 
                ($("#iemail").is(":hidden") || isValidEmailAddress($("#iemail").val()))) {
                b.button("enable");
            } else {
                b.button("disable");
            }
        });

        $('a.confirm-download').each(function() {
            var href = $(this).attr("href");
            $(this).click(function() {
                $(":button:contains('Download')").button('disable');
                $("#iaccept").removeAttr('checked');
                $("#confirm-dialog").dialog.href = href;
                if ($(this).hasClass('collect-email')) {
                    $("#download-confirm-email").show();
                }
                $("#confirm-dialog").dialog('open');
                return false;
            });
        });

        if(jQuery().dialog) {
        	$("#confirm-dialog").dialog({
            resizable: false,
            autoOpen: false,
            title: 'MarkLogic Server Download Confirmation',
            width: 550,
            modal: true,
            buttons: {
                Download: function() {
                    var u = $(this).dialog.href;
                    _gaq.push(['_trackPageview', u],
                              ['_trackEvent', 'start-download', u]);
                    try {
                        var s = '/start-download' + u.replace(/\?.*/, "");
                        mktoMunchkinFunction('clickLink', { href: s } );
                    } catch (err) {}

                    try {
                        if ($(this).dialog.email) {
                            $.ajax({
                                type: 'POST',
                                url: "/sync-lead",
                                data: {
                                    email: $(this).dialog.email,
                                    asset: u
                                }
                            });
                        }
                    } catch (err) {}

                    $(this).dialog('close');

                    document.location = u + '?r=dmc';
                },
                Cancel: function() {
                    var u = $(this).dialog.href;
                    _gaq.push(['_trackEvent', 'cancel-download', u]);
                    try {
                        var s = '/cancel-download' + u.replace(/\?.*/, "");
                        mktoMunchkinFunction('clickLink', { href: s } );
                    } catch (err) {}
                    $(this).dialog('close');
                }
           	}
        	});
       	}
		if(jQuery().fancybox) {
			$('a[rel=detail]',main).each(function() {
				var ref = $(this).attr('href');
				$(this).append(
					$('<span>',{'class':'caption',text: 'Enlarge image'})
				).fancybox({
					transitionIn: 'elastic',
					transitionOut: 'elastic'
				});
			});
		}
		var apiCaption = $('.api_table caption',main).text();
		$('.api_table',main).find('caption').remove().end().before(
			$('<div>', {
				'class': 'api_caption',
				text: apiCaption
			})
		);
		if($('#page_content').length) {
		$('body:not(.sticky) #page_content')
			.append($('<div>', {'class': 'shadow'}))
			.scroll(function() {
				if($(this).scrollLeft() > 0) {
					$(this).children('.shadow').fadeIn('fast');
				}
				else {
					$(this).children('.shadow').fadeOut('fast');
				}
			});
		}

        $(document).ready(function() {


                    
            if (navigator.appVersion.indexOf("10_7") != -1) {
                $('.showScroll').addClass('lion');
            }

            $('div#diagram101 .component').mouseover(function(){
                $(this).data('old-border-color', $(this).css('border-color'));
                // $(this).css('border-color', 'black');
            });
            $('div#diagram101 .component').mouseout(function(){
                // $(this).css('border-color', $(this).data('old-border-color'));
            });

            $('div.qtips[title]').qtip({ 
                style: {
                    width: 300,
                    padding: 5,
                    color: 'black',
                    tip: {
                        corner: 'bottomLeft'
                    },
                    border: {
                        color: 'black',
                        radius: 2,
                        width: 1
                    }
                },
                show: 'mouseover',
                hide: { when: 'mouseout', fixed: true },
                position: {
                    corner: {
                        target: 'center',
                        tooltip: 'leftBottom'
                    },
                    adjust: {
                        y: -20
                    }
                }
            });

            //Hide login and signup when we're on a signup page
            // console.log(window.location.pathname);
            if (window.location.pathname == '/people/signup' || 
                window.location.pathname == '/people/fb-signup') {
                    $('#login-menu-nav').hide();
            }

            $('input#email').focus();

            $("#session-trigger").click(function(e) {
                e.preventDefault();
                $("#session-menu").toggle();
                $(this).toggleClass("menu-open");
            });

            $("#login-trigger").click(function(e) {
                e.preventDefault();
                $("#login-menu").toggle();
                $(this).toggleClass("menu-open");
            });

			$(document).bind('keydown.drop-down-menu', function(event) {
                if (event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE) {
                    $('.drop-down-menu').each(function() {
                        $(this).hide();
                        $(this).removeClass("menu-open");
                    });
					event.preventDefault();
                }
            });


            $("fieldset.drop-down-menu").mouseup(function() {
                return false;
            });

            $(document).mouseup(function(e) {
                if ($(e.target).parents("fieldset.drop-down-menu").length == 0) { // hide if the click is outside of a menu
                    $('.drop-down-menu').each(function() {
                        $(this).hide();
                        $(this).removeClass("menu-open");
                    });
                }
            });            

            $("#local-login").click(function(e) {
                $("#local-login-form").toggle().appendTo('#login-menu');
            });

            $("#login_submit").click(function(e) {
                $.ajax({
                    type: 'POST',
                    url: '/login', /* could get from form */
                    data: {
                        'email': $('#local-login-form').find('#email').val(),
                        'password': $('#local-login-form').find('#password').val()
                    }, 
                    success: function( data ) {
                        if (data.status === 'ok') {
                            $('#login-error').text("");
                            $('#login-menu').hide();
                            $('#login-trigger').removeClass("menu-open");

                            $('#signup-trigger').hide();
                            $('#login-trigger').hide();
                            $('#session-trigger span').text(data.name);
                            $('#session-trigger').show();
                        } else {
                            $('#login-error').text(data.status);
                        }
                    },
                    dataType: 'json'
                });
            });

            $("#logout").click(function(e) {

                $("session-trigger span").text("");
                $('#session-trigger').hide();
                $('#session-menu').hide();
                $('#signup-trigger').show();
                $('#login-trigger').show();

                $.ajax({
                    type: 'POST',
                    url: '/logout',
                    success: function( data ) {
                        // Stop busy indicator
                        // Adjust page if need be
                        window.location = "/";
                    },
                    dataType: 'json'
                });
            });

            $("#fb-login").click(function(e) {

                // console.log("fb-login");
                $('#login-error').text("");
                $("#login-menu").hide();
                $("#signup-trigger").hide();
                $("#login-trigger").hide();

                FB.getLoginStatus(function(response) {

                    if (response.status === 'connected') {

                        doFBLogin(response);


                    } else {
                        FB.login(function(response){
                            if (response.authResponse) {
                                doFBLogin(response);
                            } else {
                                $('#signup-trigger').show();
                                $('#login-trigger').show();
                            };
                        }, {"scope": "email"} );
                    }
                });
            });

            $("#profile-save").click(function(e) {
                e.preventDefault();
                if (! $('#profile-form').validate().form()) {
                    return;
                }
                $('#profile-form').cleanDirty(); // could do in success I spose
                $('#changes-saved span').hide("");
                $('this').attr('disabled', 'disabled');
                $.ajax({
                    type: 'POST',
                    url: '/save-profile',
                    success: function( data ) {
                        $('#session-trigger span').text(data.name);
                        $('#changes-saved').text('Changes saved').removeClass("failed-save").addClass("successful-save").fadeIn('slow', function() {
                            $(this).fadeOut('slow');
                        });
                    },
                    error: function( data ) {
                        $('#changes-saved').removeClass("successful-save").addClass("failed-save").text("Save failed").fadeIn('slow', function() {
                            $(this).fadeOut('slow');
                        });
                    },
                    finished: function( data ) {
                        $('this').removeAttr('disabled');
                    },
                    data: $('#profile-form').serialize(),
                    dataType: 'json'
                });
            });
        });

        var d = $('.yearpicker').attr('data-value');
        var now = new Date().getFullYear();
        for (i = now; i < now + 10 ; i++)
        {
            $('.yearpicker').append($('<option />').val(i).html(i));
        }
        $('.yearpicker').append($('<option />').html('N/A'));
        $('.yearpicker').val(d);
        

            $("#vidwrap").click(function(e) {
                var rel = $(this).attr('rel');
                $(this).children().replaceWith('<iframe width="460" height="259" src="http://www.youtube.com/embed/'+ rel+'?autoplay=1&rel=0" frameborder="0" allowfullscreen=""></iframe>');
            });

            $('#playlist > li').click(function(e){
                //dont do anything if click on show me link
                if($(e.target).is('a')){
                    // let event fire
                } else {
                    e.preventDefault();
                    //the magic
                    $(this).addClass('active').siblings('li').removeClass('active');
                    var player = $('vidwrap iframe');
                    var rel = $(this).attr('rel');
                    if (player) {
                        $('#vidwrap').children().replaceWith('<iframe width="460" height="259" src="http://www.youtube.com/embed/'+ rel+'?autoplay=1&rel=0" frameborder="0" allowfullscreen=""></iframe>');
                    } else {
                        $('#vidwrap iframe').attr('src','http://www.youtube.com/embed/'+rel+'?autoplay=1');
                    }
                }
            });

		    $(function(){
			    $('#slider').anythingSlider({
                    buildArrows: false,
                    buildStartStop: false,
                    theme: 'default',
                    startSlide: 1,
                    resizeContents: true,
                    navigationFormatter : function(i, panel){ 
                        return ['Line chart', 'Bar chart', 'Pie chart', 'Heat map', 'Point map'][i - 1]; 
                    } 
                });
		    });


        //$("#signup-form input[type=text], #signup-form input[type=password]").blur(function(event) {
            // Ajax validation tbd
        //});

        //$('#signup-form').submit(function(e) {
		    // e.preventDefault();
        //});

		// add new functions before this comment
	});
};

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function doFBLogin(response) {

    var signedRequest = response.authResponse ? response.authResponse.signedRequest : null;

    FB.api('/me', 'get', { access_token:response.authResponse.accessToken }, function(response) {

        if (!response || response.error) {
            alert('Communication with Facebook graph failed');
            // console.log(response.error)
            $('#signup-trigger').show();
            $('#login-trigger').show();
        } else {
            // console.log(response);


            $.ajax({
                type: 'POST',
                url: '/fb-login',
                data: {
                    signedRequest: signedRequest,
                    facebookID: response.id,
                    email: response.email,
                    name: response.name
                },
                success: function(data) {
                    if (data.status === 'ok') {
                        $('#session-trigger span').text(data.name);
                        $('#session-trigger').show();
                    } else {
                        $("#login-trigger").show();
                        $('#login-error').text(data.status);
                        $("#login-menu").show();
                    }
                }
            });
        }
    });
}


function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};
