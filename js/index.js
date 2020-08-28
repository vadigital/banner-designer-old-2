$(document).ready(function() {

    switchBannerType()

    // Listen to form fields
    $('.primary-headline').keyup(function() {
      var primaryHeadline = $(this).val();
      $('.banner-text h1').html(primaryHeadline);
    });
    $('.secondary-headline').keyup(function() {
      var secondaryHeadline = $(this).val();
      $('.banner-text h2').html(secondaryHeadline);
    });
    $('.terms-and-conditions').keyup(function() {
      var termsConditions = $(this).val();
      $('.banner-text h4').html(termsConditions);
    });

    // Listen to custom banner height
    $('.custom-height').keyup(function() {
      var customHeight = $(this).val();
      $('#page.is-custom-banner, #page .banner').css('height',customHeight);
    });
    $('.custom-width').keyup(function() {
      var customWidth = $(this).val();
      $('#page.is-custom-banner, #page .banner').css('width',customWidth);
    });

    // Save banner image only
    $('.save-image-only').click(function() {
      $('.banner .banner-text, .edit-image, .filter').attr('data-html2canvas-ignore',true);
      saveImage()
    });

    // Save banner with text and search box
    $('.save-full-banner').click(function() {
      $('.banner .banner-text, .edit-image, .filter').removeAttr('data-html2canvas-ignore');
      saveImage()
    });

    // Save banner with text and search box
    $('.edit-image').click(function() {
      if (!$(this).hasClass('active')) {
        $(this).text('Save Changes');
        $(this).addClass('active');
        $('.banner .container, .filter, .save-actions, .select-logos').hide();
        $('.device-toggle').css('opacity','0');
        $('#banner-image').addClass('drag-and-resize');
      } else {
        $(this).text('Reposition Image');
        $(this).removeClass('active');
        $('.banner .container, .filter, .save-actions, .select-logos').show();
        $('.device-toggle').css('opacity','1');
        $('#banner-image').removeClass('drag-and-resize');
      }
    });

    $('.darken-image').click(function() {
      if (!$(this).hasClass('active')) {
        $('#banner-image').addClass('filtered');
        $('.banner').removeClass('lighten');
        $('.filter').removeClass('active');
        $(this).addClass('active');
      } else {
        $('#banner-image').removeClass('filtered');
        $(this).removeClass('active');
      }
    });

     $('.lighten-image').click(function() {
      if (!$(this).hasClass('active')) {
        $('#banner-image').addClass('filtered');
        $('.banner').addClass('lighten');
        $('.filter').removeClass('active');
        $(this).addClass('active');
      } else {
        $('#banner-image').removeClass('filtered');
        $('.banner').removeClass('lighten');
        $(this).removeClass('active');
      }
    });

    // Remove logo box
    $('.select-logos .remove').click(function() {
      if ($('.select-logos').hasClass('has-logos')) {
        $('.select-logos').removeClass('has-logos');
        $('.select-logos .choose-file').show();
        $('#logos').attr('src', '');
        $('.select-logos').attr('data-html2canvas-ignore');
      } else {
        $('.select-logos').fadeOut(100);
        $('.select-logos').attr('data-html2canvas-ignore');
      }
    });
});


function switchBannerType() {
   $('.device-toggle .option').click(function() {
    var deviceType = $(this).attr('data-device');

    // Reset custom options
    $('#page, #page .banner').removeAttr('style');
    $('.custom-height, .custom-width').val('');

    $('.device-toggle .option').removeClass('is-active');
    $('#page').removeClass('is-desktop-banner is-mobile-banner is-custom-banner is-responsive-desktop-banner is-responsive-mobile-banner');
    $('#page').addClass('is-' + deviceType + '-banner');
    $(this).addClass('is-active');
    switchCharacterLimit(deviceType);
    checkIfResponsive(deviceType);
  });
}

function checkIfResponsive(device) {
  if (device == 'responsive-desktop') {
    $("#banner-image").css("width","100%");
  } else {
    $("#banner-image").css("width","auto");
  }
}


function switchCharacterLimit(device) {
  $('.form-fields .style-fields').show();
  $('.form-fields .custom-fields').hide();
  var primaryChars = 40;
  var secondaryChars = 120;

  if (device == 'mobile') {
    var primaryChars = 40;
    var secondaryChars = 40;
  }

  if (device == 'custom') {
    $('.form-fields .style-fields').hide();
    $('.form-fields .custom-fields').show();
  }

  $('.primary-chars').text(primaryChars);
  $('.primary-headline').attr('maxlength', primaryChars);

  $('.secondary-chars').text(secondaryChars);
  $('.secondary-headline').attr('maxlength', secondaryChars);

}

function changeColor() {
  var headlineColor = $('.headline-color').val();
  var termsColor = $('.terms-color').val();
  $('.banner-text h1, .banner-text h2').css('color',headlineColor);
  $('.banner-text h4').css('color',termsColor);
}

function readBanner(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#banner-image').attr('src', e.target.result);
      $('#page').addClass('has-image');
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function readLogos(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#logos').attr('src', e.target.result);
      $('.select-logos').removeAttr('data-html2canvas-ignore');
      $('.select-logos').addClass('has-logos');
      $('.select-logos .choose-file').hide();
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function clearText(thefield) {
  if( thefield.defaultValue == thefield.value )
  thefield.value = ''
} 

function saveImage() {
  html2canvas($('.banner'), {
    letterRendering: true,
    onrendered: function (canvas) {
      var a = document.createElement('a');
      // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
      a.href = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
      a.download = 'new-banner.jpg';
      a.click();
    }
  });
}