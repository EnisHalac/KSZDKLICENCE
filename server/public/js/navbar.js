$(document).ready(function() {
  // Function to open cart sidebar
  $('.open-cart-btn').click(function() {
      $('.cart-sidebar').css('width', '250px');
      loadCartItems(); // Load cart items when opening the cart
  });

  // Function to close cart sidebar
  $('.close-cart').click(function() {
      $('.cart-sidebar').css('width', '0');
  });

  // Add item to cart
  $('.add-to-cart-btn').click(function() {
      var productId = $('.item-id').text();
      productId = productId.length > 24 ? productId.substring(0, 24) : productId;
      var productName = $('.item-title').text();
      var productCategory = $('.item-category').text();
      var productPrice = $('.price-title').text();
      var productImage = $('.image-wrapper img:visible').attr('src');
      var quantity = $('#quantity').text();
      var sizeElement = $('#selectedSize');
      var size = sizeElement.length && sizeElement.val() ? sizeElement.val() : null;

      if (!size) {
          alert('Morate odabrati veličinu prije dodavanja proizvoda u korpu.');
          return;
      }
      console.log(productCategory)
      $.post('/add-to-cart', {
          id: productId,
          name: productName,
          price: productPrice,
          imageUrl: productImage,
          quantity: quantity,
          size: size,
          productCategory: productCategory
      }, function(data) {
          if (data.success) {
              updateCartCount();
              loadCartItems();
          }
      });
  });
});

function loadCartItems() {
  $.get('/cart-items', function(data) {
      var cartContent = $('.cart-content');
      cartContent.empty();
      data.cart.forEach(function(item, index) {
          var cartItem = '<div class="cart-item">' +
                         '<img src="' + item.imageUrl + '" alt="' + item.name + '">' +
                         '<div class="cart-item-details">' +
                         '<h3>' + item.name + ' ' + item.size + '</h3>' +
                         '<p>' + item.price + '</p>' +
                         '<p>Količina: ' + item.quantity + '</p>' +
                         '<button class="delete-item-btn" data-index="' + index + '">' +
                         '<i class="fa fa-trash"></i></button>' +
                         '</div>' +
                         '</div>';
          cartContent.append(cartItem);
      });

      // Attach click event to delete buttons
      $('.delete-item-btn').click(function() {
          var index = $(this).data('index');
          $.post('/delete-from-cart', { index: index }, function(data) {
              if (data.success) {
                  loadCartItems(); // Reload cart items
                  updateCartCount(); // Update cart count
              }
          });
      });
  });
}

function updateCartCount() {
  $.get('/cart-items', function(data) {
      $('.cart-item-count').text(data.cart.length);
  });
}

function openDropdown() {
  var dropdownContent = document.getElementById("myDropdown");
  if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
  } else {
      dropdownContent.style.display = "block";
      document.addEventListener('click', closeDropdown);
      event.stopPropagation();
  }
}

function closeDropdown(event) {
  var dropdownContent = document.getElementById("myDropdown");
  if (!dropdownContent.contains(event.target)) {
      dropdownContent.style.display = "none";
      document.removeEventListener('click', closeDropdown);
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
