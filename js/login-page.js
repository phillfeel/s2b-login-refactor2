// --- VALIDATION FORM --- //

function changeColorField() {
    var fieldValidations = document.querySelectorAll(".field-validation-valid");
    var btnLogin = document.getElementById("btn-login");
    btnLogin.onclick = function (){
        fieldValidations.forEach((element) => {
            if(element.getAttribute("data-valmsg-for")==="Email"){
                var loginField = document.querySelector('input[name="Email"]');
                loginField.style.border = "1px solid #ed4a30"; 
            }
            if(element.getAttribute("data-valmsg-for")==="Password"){
                var passwordField = document.querySelector('input[name="Password"]');
                passwordField.style.border = "1px solid #ed4a30"; 
            }
        });
    };
};

changeColorField();

//--- SLIDER ---//

var slideIndex = 0;
showSlides();

function checkActive(elAct, elBlock) {
    if (elAct.classList.contains('active')) {
        elBlock.style.visibility = "visible";
        setTimeout(showSlides, 5000);
    } 
};

function showSlides() {
    var slides = document.getElementsByClassName("mySlides");
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.visibility = "hidden";
        slides[i].childNodes[1].classList.remove("active");
        slides[i].childNodes[5].classList.remove("show");
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].childNodes[1].classList.add("active");
    slides[slideIndex - 1].childNodes[5].classList.add("show");

    checkActive(slides[slideIndex - 1].childNodes[1], slides[slideIndex - 1]);
}

// --- CHANGE LANGUAGE --- //

var allDictionary = {
    dictRussian: {
        nameLanguage: "Русский",
        login_txt: "Логин",
        password_txt: "Пароль",
        button_txt: "Войти",
        rights_txt: "Все права защищены",
        offer_txt: "Договор оферты",
        slide_txt1: "Облачная платформа для управления цифровыми поверхностями",
        slide_txt2: "Самое доступное решение в области Digital Signage для экранов"
    },
    dictEnglish: {
        nameLanguage: "English",
        login_txt: "Login",
        password_txt: "Password",
        button_txt: "sign in",
        rights_txt: "All rights is reserved",
        offer_txt: "Terms and Conditions",
        slide_txt1: "Cloud-based digital surface management platform",
        slide_txt2: "The most affordable Digital Signage solution for media screens",
    },
    dictSpain: {
        nameLanguage: "España",
        login_txt: "el login",
        password_txt: "contraseña",
        button_txt: "registrarse",
        rights_txt: "Todos los derechos estan reservados",
        offer_txt: "Términos y Condiciones",
        slide_txt1: "Plataforma de gestión de superficie digital basada en la nube",
        slide_txt2: "La solución de señalización digital más asequible para pantallas",
    },
    dictChinese: {
        nameLanguage:  "中文",
        login_txt: "登錄",
        password_txt: "密碼",
        button_txt: "登入",
        rights_txt: "保留所有權利",
        offer_txt: "條款和條件",
        slide_txt1: "基於雲的數字表面管理平台",
        slide_txt2: "最實惠的屏幕數字標牌解決方案"
    },
    dictFrance: {
        nameLanguage: "Français",
        login_txt: "S'identifier",
        password_txt: "Mot de passe",
        button_txt: "Entrer",
        rights_txt: "Tous les droits sont réservés",
        offer_txt: "Offre de contrat",
        slide_txt1: "Plateforme de gestion de surface numérique basée sur le cloud",
        slide_txt2: "La solution d'affichage numérique la plus abordable pour les écrans"
    }
}

function changeLanguage(language) {
    var allTranslate = document.getElementsByClassName('for_translation');
    var slideH3 = document.getElementsByClassName('text slide');
    for (translate of allTranslate) {
        for (var key in allDictionary) { 
            var anyDict = allDictionary[key]
            if(anyDict.nameLanguage === language){
                var newWord = anyDict[translate.id];
                if (translate.id === "login_txt" || translate.id === "password_txt") {
                    translate.placeholder = newWord;
                } else {
                    translate.innerText = newWord;
                }
            }
        };
    };
};

// --- DROPDOWN --- //

var dropdowns = {};

function getdd (elem){
	var id = elem.closest('.dropdown').parentElement.id;
  return dropdowns[id];
}

function Dropdown(o) {
    this.options = o;

    this.init = function () {
        this.elem = document.getElementById(this.options.id);
        var htmlDropdown =
            `<div class='dropdown'>
    			<div class='dropdown_value'></div>
		          <div class='dropdown_arrow'>▾</div>
		          <div class='dropdown_panel'>
		          	<div class='dropdown_items'></div>
		          </div>
		    </div>`;
        var self = this;
        document.addEventListener("mousedown", function () {
            if (self.isVisible) self.hide();
        });
        if (dropdowns) dropdowns = {};
        dropdowns[this.options.id] = this;
        this.elem.style.display = 'inline-block';
        this.elem.innerHTML = htmlDropdown;
        var elem = this.elem;
        this.items = elem.querySelector(".dropdown_items");
        this.value = elem.querySelector(".dropdown_value");
        this.panel = elem.querySelector(".dropdown_panel");
        this.arrow = elem.querySelector(".dropdown_arrow");
        var self = this;
        this.value.innerHTML = this.options.val;
        var data = this.options.data;
        var htmlDropdown = "";
        data.forEach(function (elem) {
            htmlDropdown += `<div class='dropdown_item' onmousedown='var self=getdd(this);self.clicked(this)'>${elem}</div>`;
        });
        this.items.innerHTML = htmlDropdown;
        this.elem.addEventListener('mousedown', function () {
            event.stopPropagation();

            if (self.isVisible)
                self.hide();
            else
                self.show();
        });
    }
    this.clicked = function (elem) {
        event.stopPropagation();
        this.hide();
        var newval = elem.innerHTML;
        this.value.innerHTML = newval;
        changeLanguage(newval);
        if (this.options.cb)
            this.options.cb(newval);
    }
    this.show = function () {
        for (var dd in dropdowns)
            dropdowns[dd].hide();

        this.isVisible = true;
        this.items.style.transform = 'translate(0px,0px)';
        this.arrow.style.transform = 'rotate(180deg)';
    }
    this.hide = function () {
        if (!this.items) return;

        this.isVisible = false;
        this.items.style.transform = 'translate(0px,-255px)';
        this.arrow.style.transform = 'rotate(0deg)';
    }
    this.init();
    return this;
}

var dd = new Dropdown({
    id: 'dd1',
    val: 'Русский',
    data:["Русский", "English", "España", "中文", "Français"],
    cb: function (newval) {
    },
});