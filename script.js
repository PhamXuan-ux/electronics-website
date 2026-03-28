document.addEventListener('DOMContentLoaded', function () {
    // Địa chỉ (nếu có)
    const addressBtn = document.querySelector(".address-toggle");
    const addressForm = document.querySelector(".address-form");
    const closeBtn = document.querySelector(".close-btn");
    if (addressBtn && addressForm && closeBtn) {
        addressBtn.addEventListener("click", function (e) {
            e.preventDefault();
            addressForm.style.display = "flex";
        });
        closeBtn.addEventListener("click", function () {
            addressForm.style.display = "none";
        });
    }

    // Ward options for each district (nếu có)
    const wardsByDistrict = {
        HaiChau: ["Thach Thang", "Hai Chau 1", "Hai Chau 2", "Phuoc Ninh", "Hoa Thuan Dong", "Hoa Thuan Tay"],
        ThanhKhe: ["Thanh Khe Dong", "Thanh Khe Tay", "Xuan Ha", "Tam Thuan", "Thac Gian", "An Khe", "Chinh Gian", "Tan Chinh", "Vinh Trung"],
        SonTra: ["An Hai Bac", "An Hai Dong", "An Hai Tay", "Man Thai", "Nai Hien Dong", "Phuoc My", "Tho Quang"],
        NguHanhSon: ["My An", "Khue My", "Hoa Hai", "Hoa Quy"],
        LienChieu: ["Hoa Khanh Bac", "Hoa Khanh Nam", "Hoa Hiep Bac", "Hoa Hiep Nam", "Hoa Minh"],
        CamLe: ["Hoa Tho Dong", "Hoa Tho Tay", "Hoa An", "Hoa Phat", "Hoa Xuan"],
        HoaVang: ["Hoa Chau", "Hoa Nhon", "Hoa Phong", "Hoa Phu", "Hoa Son", "Hoa Tien", "Hoa Lien", "Hoa Bac", "Hoa Ninh"]
    };
    const districtSelect = document.getElementById("district");
    const wardSelect = document.getElementById("ward");
    if (districtSelect && wardSelect) {
        districtSelect.addEventListener("change", function () {
            const selectedDistrict = this.value;
            const wards = wardsByDistrict[selectedDistrict] || [];
            wardSelect.innerHTML = '<option value="">-- Select Ward --</option>';
            wards.forEach(function (ward) {
                const option = document.createElement("option");
                option.value = ward;
                option.textContent = ward;
                wardSelect.appendChild(option);
            });
        });
    }

    // Slider (nếu có)
    const rightBtn = document.querySelector('.fa-chevron-right');
    const leftBtn = document.querySelector('.fa-chevron-left');
    const wrapper = document.querySelector('.slider-content-left-top-wrapper');
    const titleItems = document.querySelectorAll('.slider-content-left-bottom li');
    const slides = document.querySelectorAll('.slider-content-left-top-wrapper a');
    if (wrapper && rightBtn && leftBtn && titleItems.length && slides.length) {
        const totalSlides = slides.length;
        let currentIndex = 0;
        let slideInterval;
        function updateSlider() {
            wrapper.style.transform = `translateX(-${currentIndex * 20}%)`;
            titleItems.forEach(item => item.classList.remove('active'));
            titleItems[currentIndex].classList.add('active');
        }
        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }
        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        }
        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        function stopAutoSlide() {
            clearInterval(slideInterval);
        }
        rightBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
        leftBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
        titleItems.forEach(item => {
            item.addEventListener('click', () => {
                stopAutoSlide();
                currentIndex = parseInt(item.getAttribute('data-index'));
                updateSlider();
                startAutoSlide();
            });
        });
        wrapper.addEventListener('mouseenter', stopAutoSlide);
        wrapper.addEventListener('mouseleave', startAutoSlide);
        updateSlider();
        startAutoSlide();
    }
    // Tìm kiếm sản phẩm trong products-container-1
    const searchInput = document.querySelector('nav ul li input[type="text"]');
    const searchIcon = document.querySelector('nav ul li .fa-magnifying-glass');
    if (searchInput && searchIcon) {
        function searchProducts() {
            const keyword = searchInput.value.trim().toLowerCase();
            const products = document.querySelectorAll('#products-container-1 .product');
            let found = false;
            products.forEach(product => {
                const title = product.querySelector('.product-title')?.textContent.toLowerCase() || '';
                const specs = product.querySelector('.product-specs')?.textContent.toLowerCase() || '';
                if (title.includes(keyword) || specs.includes(keyword)) {
                    product.style.display = '';
                    found = true;
                } else {
                    product.style.display = 'none';
                }
            });
            // Hiển thị thông báo nếu không tìm thấy sản phẩm
            const searchResult = document.getElementById('searchResult');
            if (searchResult) {
                if (!found) {
                    searchResult.innerHTML = '<p>Product not found</p>';
                } else {
                    searchResult.innerHTML = '';
                }
            }
        }
        searchIcon.addEventListener('click', searchProducts);
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') searchProducts();
        });
    }

    // Hiện popup chi tiết sản phẩm khi click BUY NOW hoặc ảnh
    document.querySelectorAll('.buy-button, .product-image').forEach(btn => {
        btn.addEventListener('click', function () {
            const product = btn.closest('.product');
            const img = product.querySelector('.product-image img')?.src || '';
            const title = product.querySelector('.product-title')?.textContent || '';
            const specs = product.querySelector('.product-specs')?.textContent || '';
            const price = product.querySelector('.current-price')?.textContent || '';
            if (document.getElementById('detailMainImg')) document.getElementById('detailMainImg').src = img;
            if (document.getElementById('detailTitle')) document.getElementById('detailTitle').textContent = title;
            if (document.getElementById('detailSpecs')) document.getElementById('detailSpecs').textContent = specs;
            if (document.getElementById('detailPrice')) document.getElementById('detailPrice').textContent = price;
            if (document.getElementById('productDetailModal')) document.getElementById('productDetailModal').style.display = 'flex';
            if (document.getElementById('qtyInput')) document.getElementById('qtyInput').value = 1;
        });
    });

    // Đóng popup chi tiết sản phẩm
    const closeDetailBtn = document.querySelector('.close-detail-btn');
    if (closeDetailBtn) {
        closeDetailBtn.onclick = function () {
            document.getElementById('productDetailModal').style.display = 'none';
        };
    }

    // Tăng/giảm số lượng
    const qtyPlus = document.getElementById('qtyPlus');
    const qtyMinus = document.getElementById('qtyMinus');
    if (qtyPlus && qtyMinus) {
        qtyPlus.onclick = function () {
            let v = parseInt(document.getElementById('qtyInput').value) || 1;
            document.getElementById('qtyInput').value = v + 1;
        };
        qtyMinus.onclick = function () {
            let v = parseInt(document.getElementById('qtyInput').value) || 1;
            if (v > 1) document.getElementById('qtyInput').value = v - 1;
        };
    }




    // Thêm kiểm tra số lượng âm
    const qtyInput = document.getElementById('qtyInput');
    if (qtyInput) {
        qtyInput.addEventListener('change', function () {
            if (this.value < 1) {
                alert('Quantity must be at least 1!');
                this.value = 1;
            }
        });
    }

    // Chọn màu và dung lượng
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.onclick = function () {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
    });
    document.querySelectorAll('.storage-btn').forEach(btn => {
        btn.onclick = function () {
            document.querySelectorAll('.storage-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
    });


    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.onclick = function () {
            const name = document.getElementById('detailTitle')?.textContent || '';
            const img = document.getElementById('detailMainImg')?.src || '';
            const priceText = document.getElementById('detailPrice')?.textContent.replace(/[^\d]/g, '');
            const price = parseInt(priceText) || 0;
            const quantity = parseInt(document.getElementById('qtyInput')?.value) || 1;

            const colorBtn = document.querySelector('.color-btn.active');
            const color = colorBtn ? colorBtn.style.background : '';
            const storageBtn = document.querySelector('.storage-btn.active');
            const storage = storageBtn ? storageBtn.textContent : '';
            // Thêm kiểm tra
            if (!color || !storage) {
                alert('Please select color and capacity before adding to cart!');
                return;
            }
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            let found = cart.find(item => item.name === name && item.color === color && item.storage === storage);

            if (found) {
                found.quantity += quantity;
            } else {
                cart.push({ name, img, price, quantity, color, storage });
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            updateCartCount();
            document.getElementById('productDetailModal').style.display = 'none';
        };
    }

    // Mở popup giỏ hàng
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.onclick = function () {
            renderCartTable();
            document.getElementById('cartModal').style.display = 'flex';
        };
    }

    // Đóng popup giỏ hàng
    const closeCartBtn = document.querySelector('.close-cart-btn');
    if (closeCartBtn) {
        closeCartBtn.onclick = function () {
            document.getElementById('cartModal').style.display = 'none';
        };
    }

    // Render bảng giỏ hàng
    function renderCartTable() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let html = `
      <table class="cart-table">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Color</th>
            <th>Capacity</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
    `;
        let subtotal = 0;
        cart.forEach((item, idx) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            html += `
          <tr>
            <td><img src="${item.img}" alt=""></td>
            <td>${item.name}</td>
            <td>
              ${item.color ? `<span style="display:inline-block;width:18px;height:18px;border-radius:50%;background:${item.color};border:1px solid black;vertical-align:middle;"></span>` : ''}
            </td>
            <td>
              ${item.storage ? item.storage : ''}
            </td>
            <td>${item.price.toLocaleString()}đ</td>
            <td>
              <button class="qty-minus" data-idx="${idx}">-</button>
              <span>${item.quantity}</span>
              <button class="qty-plus" data-idx="${idx}">+</button>
            </td>
            <td>${itemTotal.toLocaleString()}đ</td>
            <td><button class="remove-cart-item" data-idx="${idx}"><i class="fa-regular fa-trash-can"></i></button></td>
          </tr>
        `;
        });
        html += `</tbody></table>`;
        document.getElementById('cartTableContainer').innerHTML = html;
        document.getElementById('cartSubtotal').textContent = subtotal.toLocaleString() + 'đ';
        document.getElementById('cartTotal').innerHTML = '<b>' + subtotal.toLocaleString() + 'đ</b>';

        // Sự kiện tăng/giảm/xoá
        document.querySelectorAll('.qty-minus').forEach(btn => {
            btn.onclick = function () {
                const idx = btn.getAttribute('data-idx');
                if (cart[idx].quantity > 1) {
                    cart[idx].quantity--;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCartTable();
                    updateCartCount();
                }
            };
        });
        document.querySelectorAll('.qty-plus').forEach(btn => {
            btn.onclick = function () {
                const idx = btn.getAttribute('data-idx');
                cart[idx].quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCartTable();
                updateCartCount();
            };
        });
        document.querySelectorAll('.remove-cart-item').forEach(btn => {
            btn.onclick = function () {
                const idx = btn.getAttribute('data-idx');
                cart.splice(idx, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCartTable();
                updateCartCount();
            };
        });
    }

    // Badge số lượng trên nút giỏ hàng
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const badge = document.getElementById('cart-count');
        if (badge) {
            if (count > 0) {
                badge.textContent = count;
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    // Gọi cập nhật badge khi load trang
    updateCartCount();
});