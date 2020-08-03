$.ajax({
    url: `/ready-to-wear/${id}`,
    dataType: 'json',
    success: data => {
        $.each(data, (index, product) => {
            $product = $("div", { class: "product" }).append(
                $("img", { src: `${__dirname + product.photo}` })
            );
            $(".product-list").append($product);
        })
    }
});