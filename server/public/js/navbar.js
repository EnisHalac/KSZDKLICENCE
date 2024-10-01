function openDropdown(dropdownId) {
    var dropdownContent = document.getElementById(dropdownId);
    
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        // Zatvori sve otvorene dropdownove prije otvaranja trenutnog
        closeAllDropdowns();
        
        dropdownContent.style.display = "block";
        document.addEventListener('click', function(event) {
            closeDropdown(event, dropdownId);
        });
        event.stopPropagation();
    }
  }
  
  function closeDropdown(event, dropdownId) {
    var dropdownContent = document.getElementById(dropdownId);
    if (!dropdownContent.contains(event.target)) {
        dropdownContent.style.display = "none";
        document.removeEventListener('click', closeDropdown);
    }
  }
  
  // Funkcija za zatvaranje svih dropdownova
  function closeAllDropdowns() {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
        dropdowns[i].style.display = "none";
    }
  }
  
  $(document).ready(function() {
    var currentUrl = window.location.pathname;
  
    $('.navbar-links a').each(function() {
        var linkUrl = $(this).attr('href');
  
        if (currentUrl === linkUrl) {
            $(this).addClass('active');
        }
    });
  
    $('.hamburger-menu').click(function() {
        $('.navbar-links').toggleClass('active');
        $('.navbar-links').toggleClass('fixed'); // Add or remove fixed class
    });
  
    // Close dropdown on outside click
    $(document).click(function(event) {
        if (!$(event.target).closest('.dropdown').length && !$(event.target).closest('.hamburger-menu').length) {
            $('.dropdown-content').hide();
        }
    });
  });
  