console.log("Please don't add any unnecessary script else it could happen something wrong, if happened then reload the website to resolve")
// 
$('.filteringBox').fadeOut()
// needed function
function getRandomFromList(l) {
    return l[Math.floor(Math.random() * l.length)];
}
function isNumber(n) {
    {
        return !isNaN(parseInt(n));
    }
}
// vars
let mn,
    mx
const monitor = document.getElementById("monitor"),
    srBtn = document.getElementById("search-btn"),
    srch = document.getElementById("search-input"),
    toggle = document.querySelector("#toggle"),
    nav = document.querySelector("nav"),
    main = document.querySelector("main"),
    logo = document.querySelector("#logo"),
    logo2 = document.querySelector("#logo2"),
    topbar = document.querySelector(".topbar"),
    navitems = document.getElementsByClassName("nav-item"),
    navLiList = document.querySelectorAll("nav ul li"),
    clickedNavLiElm = document.querySelectorAll('.clicked'),
    tr = document.querySelectorAll("tbody tr"),
    detailsBox = document.getElementById("detailsBox"),
    order_no = document.getElementsByClassName("order-no"),
    copyrightBox = document.querySelector(".copyright"),
    footer = document.querySelector("footer"),
    filterOrders = document.getElementById("filter-orders"),
    prodprimCst = document.getElementsByClassName("product-net-cost"),
    applyFilter = document.getElementById("apply-filtering"),
    resetFilter = document.getElementById("reset-filtering"),
    tbody = document.getElementById("tbody"),
    // fixed list vars 
    cstmrNms = ["sohel", "rubel", "kuhel", "muhel", "duhel", "kadir", "bodir", "rodith", "mego", "pekho", "balukho"],
    detL = ['info', 'details', 'detail', 'information', 'show', 'display', 'open'],
    sttsCls = ['cash-on-delivery', 'returned', 'cash-on-delivery-paid', 'delivered', 'on-the-way', 'paid', 'preparing']




jQuery(document).ready(function ($) {



    // date time related set up 
    let current = new Date()
    $(".current-month").text((current.toLocaleDateString('en-US', { month: 'long' })).slice(0, 3))
    let cYrMonDy = current.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }),
        cWkdyNm = current.toLocaleString('en-US', { weekday: 'long' }),
        cHrMn12 = current.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })




    // functions for nav li

    monitor.classList.add("clicked")
    function clickedNavLi() {
        navLiList.forEach((li) =>
            li.classList.remove('clicked'));
        this.classList.add('clicked');
        if (innerWidth < 1024) {
            $("nav, .nav, .active").css({ "left": "-70vw" })
        }

    }

    navLiList.forEach((li) =>
        li.addEventListener("click", clickedNavLi)
    )


    // searchbox related 
    function searchOnEnter(v, e) {
        if (e.key === "Enter") {
            searchIt(v)
        }
    }

    srch.addEventListener("keypress", function (e) {
        searchOnEnter(this.value, e)
    });
    srch.addEventListener("input", function () {
        if (this.value.length === 0) {
            resetSearchResult()
        }
    })
    srBtn.addEventListener("click", () => {
        searchIt(srch.value)
    })

    // nav related 


    function setNav() {
        nav.classList.toggle('active')
        main.classList.toggle('main-expand')
        toggle.classList.toggle('toggle-add')
        logo.classList.toggle("hide")
        logo2.classList.toggle("none")
        topbar.classList.toggle("rmcollapse")
        detailsBox.classList.toggle("details-collapse")
        copyrightBox.classList.toggle("ds-none")
        footer.classList.toggle("w70")
    }
    toggle.onclick = function () {
        localStorage.setItem("navsaved", nav.classList[nav.classList.length - 1])
        setNav()
    }
    if (localStorage.getItem('navsaved') === 'nav') {
        setNav()
    }


    //-------order no and info setting of td head 



    const stObj = {
        "Paid": "was purchased",
        "Cash on delivery paid":"was bought and paid product cost by cash",
        "Cash on delivery": "was bought",
        "Returned": "got returned his money for this product. Because he returned the product before return the product instantly",
        "Returning": "will get his money soon (in progress now) for this product. Because he returned the product instantly",
        "Preparing": " is preparing now to deliver (packaging and others)",
        "On the way": " is on the way of customer's delivery place",
        "Delivered": "  is deilvered to customer",
        "Returned": " is returned. Because cutomer returned it"
    }


    // monitoring table and details related -------------------------------------------------------------------
    function runAdding(e, i) {
        e.innerText = i
        const orn = i,
            nm = getRandomFromList(cstmrNms),
            prd = e.parentElement.nextElementSibling,
            cst = prd.nextElementSibling,
            netCost = parseFloat(cst.innerText.slice(1, cst.innerText.length)),
            discst = ((netCost / 100) * 5),
            txcst = ((netCost / 100) * 4),
            primCst = netCost + discst - txcst,
            pSt = cst.nextElementSibling,
            dSt = pSt.nextElementSibling,
            b = dSt.nextElementSibling.firstElementChild.firstElementChild
        b.addEventListener("click", function () {

            detailsBox.innerHTML =
                `

<div id="detailsHead">
<p id="order-no">Order No ${orn}</p>
<a class="btn-small"  id="nextOrder">Next<i class="px-5 bi bi-arrow-right"></i></a>
<a class="btn-small"  id="previousOrder">Previous<i class="px-5 bi bi-arrow-left"></i></a>
<div class="closeDetails">
<div class="icon flex-center"><i title="Close" class="btn bi bi-x-lg"></i></div>
</div>
</div>
<div id="detailsBody">



<div class="paymentDetails">
    
<h5 class="title tpad">Payment Details </h5>
<hr>

<div class="infoBox">
<p><b>Current payment status : </b>${pSt.innerText} ($${primCst.toFixed(2)})</p>
<p><b>Status describe : </b>${nm} ${stObj[pSt.innerText]} ${prd.innerText}</p>
<p><b>Payment method : </b>${pSt.innerText.includes("Paid") ? "Bank" : "Cash"}</p>
<p><b>Payment Date : </b>${cYrMonDy} (${cWkdyNm})</p>
<p><b>Payment Time : </b>${cHrMn12}</p>

</div>
<div class="details-btnBox">
<a class="${pSt.innerText.includes("Paid") ? 'btn-small' : 'btn-small half-opacity'}">Show bank
    details</a>
</div>

</div>

<div class="deliveryDetails">

<h5 class="title tpad">Delivery Details </h5>
<hr>

<div class="infoBox">
    <p><b>Current payment status : </b>${dSt.innerText}</p>
    <p><b>Status describe : </b>Product ${stObj[dSt.innerText]}</p>
    <p><b>Delivered on : </b>${cYrMonDy} (${cWkdyNm})</p>
    <p><b>Delivered at : </b>${cHrMn12}</p>
    <p><b>Delivery person : </b>${nm}</p>
    <p><b>Delivery Person's phone : </b>+1(234) 567-8910</p>
    <p><b>Delivery Person's email : </b>deliveryperson123@gmail.com</p>
    <div class="details-btnBox">
        <a class="btn-small">Show delivery person information</a>
    </div>
</div>
</div>

<div class="customerDetails">

<h5 class="title tpad">Customer Details </h5>
<hr>

<div class="dbox">
    <div class="infoBox">
        <p><b>Customer name :</b> ${nm}</p>
        <p><b>Customer email :</b> customeremail@gmail.com</p>
        <p><b>Customer phone :</b> Private</p>
    </div>
    <div class="details-imgBox">
        <img src="../images/customer.png">
    </div>


    <div class="address-infoBox">
        <h6 class="sub-title">${nm}'s address</h6>
        <p> <span>State : </span> <span class="address-value"></span></p>
        <p> <span>City : </span> <span class="address-value"></span></p>
        <p> <span>Village : </span> <span class="address-value"></span></p>
        <p> <span>Street Address : </span> <span class="address-value"></span></p>
        <p> <span>House No / Mail Box : </span> <span class="address-value"></span></p>
    </div>



    <div class="address-infoBox">
        <h6 class="sub-title">${nm}'s delivery address</h6>
        <p> <span>State : </span> <span class="address-value"></span></p>
        <p> <span>City : </span> <span class="address-value"></span></p>
        <p> <span>Village : </span> <span class="address-value"></span></p>
        <p> <span>Street Address : </span> <span class="address-value"></span></p>
        <p> <span>House No / Mail Box : </span> <span class="address-value"></span></p>
    </div>

</div>
<div class="details-btnBox">
    <p><a class="btn-small">Customer profile</a></p>
</div>

</div>


<div class="productDetails">
<div>
    
    <h5 class="title tpad">Product Details </h5>
    <hr>
    
</div>
<div class="dbox">
    <div class="infoBox">
        <div class="priceCounterBox">
            <h5>Price</h5>
            <div class="body-box">
                <div>
                    <p class"price-title">Primary Price </p>
                    <p class="price-value">$${primCst.toFixed(2)}</p>
                </div>
                <div>
                    <p class"price-title">(-) Discount (5%) </p>
                    <p class="price-value">$${discst.toFixed(2)}</p>
                </div>
                <div>
                    <p class"price-title">(+) Tax (4%) </p>
                    <p class="price-value">$${txcst.toFixed(2)}</p>
                </div>
                <hr>
                <div>
                    <p class"price-title">Net price </p>
                    <p class="price-value">$${netCost.toFixed(2)}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="details-imgBox">
        <img src="../images/shirt.png">
    </div>
</div>
<p>Product name : ${prd.innerText}</p>
<h4>About product ${prd.innerText}</h4>
<div id="description-product" value="" readonly></div>
<div class="details-btnBox">
    <p><a class="btn-small">Product More Information</a></p>
</div>
</div>






</div>


`
            const n = document.getElementById("nextOrder"),
                p = document.getElementById("previousOrder")
            // adding show more and show less to description text
            const dscPr = document.getElementById("description-product")
            const dTx = `Organic hemp Organic cotton T shirt cotton viscose t shirt
        55%organic 
        cotton45% 
        jerseyWeight: 160gsm, 210gsm, 260gsm(washed)Clothes are comfortable for skin.
        >> Fabric Type:Jersey
        >> Sleeve:Short Sleeve 
        >>Classic Fit: our roomiest silhouette. Cut for a lower armhole and a fuller sleeve.
        Size medium has a 29" body length (front and back), a 20" shoulder, a 44" chest, and a 35" sleeve length. Sleeve length is taken from the center back of the neck and changes 1" between sizes.
        Crewneck. Long sleeves with ribbed cuffs.
        Signature embroidered Pony at the left chest.
        Cotton. Machine washable. Imported.`
            let w;
            let bctxt;
            if (dTx.length > 400) {
                w = dTx.slice(0, 400)
                bctxt = dTx.slice(400, dTx.length)

                dscPr.innerHTML = w.replaceAll('\n', "<br>") + `<span id="read-more-text">... Show more</span><span id="backupTxtAdd"></span><span id="read-less-text">... Show less</span>`



            }
            let rmt = document.getElementById("read-more-text");
            let rlt = document.getElementById("read-less-text");
            let bctxel = document.getElementById("backupTxtAdd");
            let pv;
            rmt.addEventListener("click", function () {
                rlt.style.display = 'block'
                rmt.style.display = 'none'
                bctxel.innerHTML = bctxt.replaceAll('\n', "<br>")
                dscPr.style.height = pv + "px"
                pv = parseInt(dscPr.style.height.replace('px', ''))
            })
            rlt.addEventListener("click", function () {
                bctxel.innerHTML = ''
                rlt.style.display = 'none'
                rmt.style.display = 'block'
                dscPr.style.height = (parseInt(dscPr.style.height.replace('px', '')) - pv) + "px"
            })




            // showing details box
            let accessArrowKey = true
            detailsBox.style.display = "block"
            $("body").css({ "overflow-y": "hidden" })
            $(".closeDetails").click(function () {
                document.getElementById("order-no").click()
                detailsBox.style.display = "none"
                $("body").css({ "overflow-y": "scroll" })
                accessArrowKey = false
            })
            srch.addEventListener("focus", function () {
                accessArrowKey = false
            })
            srch.addEventListener("blur", function () {
                detailsBox.style.display === 'none' ? accessArrowKey = false : accessArrowKey = true
            })
            let i = b.parentElement.parentElement.parentElement;

            n.addEventListener("click", function () {
                try {
                    i.nextElementSibling.lastElementChild.firstElementChild.firstElementChild.click()
                } catch (i) {

                }
            })
            p.addEventListener("click", function () {
                try {
                    i.previousElementSibling.lastElementChild.firstElementChild.firstElementChild.click()
                } catch (i) {

                }
            })
            document.onkeydown = (e) => {
                if (detailsBox.style.display !== 'none') {

                    if (accessArrowKey) {

                        if (e.keyCode === 37) {
                            n.click()

                        }
                        else if (e.keyCode === 39) {
                            p.click()

                        }
                    }
                }
            }



        }
        )
    }
    function a() {
        setTimeout(() => {
            (Array.from(order_no).reverse().slice(100, 201)).forEach(function (e, i) {
                runAdding(e, i + 101)
            })
        }, 0);
    }
    function b() {
        setTimeout(() => {
            (Array.from(order_no).reverse().slice(0, 100)).forEach(function (e, i) {
                runAdding(e, i + 1)
            })
        }, 0);
    }
    function getTable() {
        a()
        b()
    }
    getTable()
    //---------------------------------------------------------------------------------------------------------


    const goUp = document.getElementById("goUp")
    goUp.addEventListener("click", function () {
        window.scroll(0, 0)
        tbodyTr(true)
    })

    // adding heavy event -----
    $(window).on('load resize', function () {
        let r = localStorage.getItem('r')
        let w = window.innerWidth;
        if (601 > w) {
            localStorage.setItem('r', 'm')
            $("#closeNav").click(function () {
                $(".nav, .active").css({ "left": "-70vw" })
            })
            $("#toggle").click(function () {
                $(".nav, .active").css({ "left": "0" })
            })
            $("#closeNav").css({ "color": "white!important" })

        }
        else if (1025 > w) {
            localStorage.setItem('r', 'm')
            $("#closeNav").click(function () {
                $(".nav, .active").css({ "left": "-70vw" })
            })
            $("#toggle").click(function () {
                $(".nav, .active").css({ "left": "0" })
            })
            $("#closeNav").css({ "color": "white!important" })
        }
        else {

            if (r == 'm') {
                $("#toggle").click()
                localStorage.setItem('r', 'n')
            }
        }
    })


    // filtering ------------
    $("#filter-orders").click(function () {
        $('.filteringBox').fadeToggle(200)
        $('#monitorOrders thead').addClass("zIndexNone")
    })
    $("#closeFiltering").click(function () {
        $('.filteringBox').fadeOut(200)
        $('#monitorOrders thead').removeClass("zIndexNone")
    })




    // searching function ------

    function detailsBoxNone() {
        $("#detailsBox").attr("style", "display:none;")
    }
    function tbodyTr(show = false) {
        $("tbody tr").attr("style", `display:${show ? 'table-row' : 'none'}`)

    }
    // searching
    function searchIt(v) {
        // add a logic to find by  product name in search
        if (v.length > 1) {
            v = v.toLowerCase().trim()
            const vL = (v.split(/\s{1,}/g).join(' ')).toLowerCase().split(' '),
                y = (vL.length === 3) && (isNumber(vL[0].slice(1, (vL[0].length) - 1))) && (vL[1] === 'to') && (isNumber(vL[2].slice(1, (vL[2].length) - 1))),
                k = v.split(/\s{1,}/g).join('-'),
                m = sttsCls.filter(function (s) {
                    return k === s
                }),
                p = v.replace(/[,\/#!$%\^&\*;:{}=\_`~()]/g, '').replace(/\s+/g, ' ').trim()

            if ((m.length !== 0) && (m.length !== 7)) {
                tbodyTr()
                for (let i = 0; i < m.length; i++) {
                    $(`.${m[i]}`).parent().parent().attr('style', 'display:table-row')
                }
            }
            else {

                tbodyTr()
                try {
                    Array.from(tr).forEach(function (t) {
                        const n = t.firstElementChild.firstElementChild.innerText.replace(/(^.+)(\w\d+\w)(.+$)/i, '$2'),
                            c = parseFloat(t.firstElementChild.nextElementSibling.nextElementSibling.innerText.replace('$', ''))
                        if ((vL.includes(n)) && (vL.some(s => detL.includes(s)))) {

                            t.lastElementChild.firstElementChild.firstElementChild.click()
                        }
                        else if ((vL.includes(n)) && (vL.includes('order'))) {

                            detailsBoxNone()
                            t.style = 'display:table-row'
                        }
                        else if ((t.firstElementChild.nextElementSibling.firstElementChild.innerText.toLowerCase()).includes(p) && (v.length > 2)) {

                            t.style = 'display:table-row'
                        }
                        else if ((c === (parseFloat(p))) && (vL.length === 1)) {
                            t.style = 'display:table-row'
                        }
                        else if (y) {
                            let i = parseFloat(t.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.innerText.replace('$', ''))
                            if ((parseFloat(vL[0].replace('$', '')) <= i) && (i <= parseFloat(vL[2].replace('$', '')))) {
                                t.style = 'display:table-row'
                            }
                        }

                    })
                } catch (e) {

                }
            }
        }

    }

    function resetSearchResult() {
        tbodyTr(true)
        $(".filteringBox").removeClass('right-set')
        document.body.setAttribute("style", "overflow-y:scroll;")

    }
    //filtering

    $('#minPrice,#maxPrice').change(function () {
        $('#apply-filtering').removeClass('half-opacity')
    })

    function runFilter() {

        let x

        mn = $("#minPrice").val().length > 0 ? $("#minPrice").val() : 0
        mx = $("#maxPrice").val().length > 0 ? $("#maxPrice").val() : 100_000

        $(this).addClass('half-opacity')
        tbodyTr()
        $("input[type='monitorbox']").each(function () {
            if ($(this).is(':monitored')) {
                let e = $('.' + ($(this).val())).parent()
                $(e).each(function () {
                    x = parseFloat($(this).prev().prev().text().replace('$', ''))
                    if ((x >= mn) && (x <= mx)) {
                        $(this).parent().attr('style', 'display:table-row')
                    }
                })
            }
        })
    }
    $('#apply-filtering').click(function () {
        runFilter()
    })
    $("input[type='monitorbox']").click(function () {
        $("#reset-filtering").removeClass("half-opacity")
        $("#apply-filtering").removeClass("half-opacity")
    })

    resetFilter.addEventListener("click", function () {
        $("input[type='monitorbox']").prop("monitored", true)
        this.classList.add('half-opacity')
    })

    // customers // ==================================================================================>>


})



function hideNav() {
    document.getElementById("closeNav").click()

}
