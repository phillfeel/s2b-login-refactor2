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
        slides[i].childNodes[7].classList.remove("show");
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].childNodes[1].classList.add("active");
    slides[slideIndex - 1].childNodes[7].classList.add("show");

    checkActive(slides[slideIndex - 1].childNodes[1], slides[slideIndex - 1]);
}

// --- CHANGE LANGUAGE --- //

var allDictionary = {
    dictRussian: {
        nameLanguage: "Русский",
        id1: "Логин",
        id2: "Пароль",
        id3: "Войти",
        id4: "Все права защищены",
        id5: "Договор оферты",
        id6: "Логин и пароль должны быть больше 3 символов",
        id7: "Облачная платформа для управления цифровыми поверхностями",
        id8: "Самое доступное решение в области Digital Signage для экранов"
    },
    dictEnglish: {
        nameLanguage: "English",
        id1: "Login",
        id2: "Password",
        id3: "sign in",
        id4: "All right is reserved",
        id5: "Terms and Conditions",
        id6: "Login and password must be more than 3 characters",
        id7: "Cloud-based digital surface management platform",
        id8: "The most affordable Digital Signage solution for media screens",
    },
    dictSpain: {
        nameLanguage: "España",
        id1: "el login",
        id2: "contraseña",
        id3: "registrarse",
        id4: "Todos los derechos estan reservados",
        id5: "Términos y Condiciones",
        id6: "El inicio de sesión y la contraseña deben tener más de 3 caracteres",
        id7: "Plataforma de gestión de superficie digital basada en la nube",
        id8: "La solución de señalización digital más asequible para pantallas",
    },
    dictChinese: {
        nameLanguage:  "中文",
        id1: "登錄",
        id2: "密碼",
        id3: "登入",
        id4: "保留所有權利",
        id5: "條款和條件",
        id6: "登錄名和密碼必須超過3個字符",
        id7: "基於雲的數字表面管理平台",
        id8: "最實惠的屏幕數字標牌解決方案"
    },
    dictFrance: {
        nameLanguage: "Français",
        id1: "S'identifier",
        id2: "Mot de passe",
        id3: "Entrer",
        id4: "Tous les droits sont réservés",
        id5: "Offre de contrat",
        id6: "Le nom d'utilisateur et le mot de passe doivent comporter plus de 3 caractères",
        id7: "Plateforme de gestion de surface numérique basée sur le cloud",
        id8: "La solution d'affichage numérique la plus abordable pour les écrans"
    }
}

function changeLanguage(language) {
    var allTranslate = document.getElementsByClassName('translation');
    var slideH3 = document.getElementsByClassName('text slide');
    for (translate of allTranslate) {
        for (elem of slideH3) {
            if (language === "中文") {
                elem.style.textIndent = "7em";
            } else {
                elem.style.textIndent = "0";
            }
        };
        for (var key in allDictionary) { 
            var anyDict = allDictionary[key]
            if(anyDict.nameLanguage === language){
                var newWord = anyDict[translate.id];
                if (translate.id === "id1" || translate.id === "id2") {
                    translate.placeholder = newWord;
                } else {
                    translate.innerText = newWord;
                }
            }
        };
    };
};

// --- DROPDOWN --- //

function Dropdown(o) {
    this.options = o;
    window.getdd = function (elem) {
        var idDropdown = elem.closest('.dropdown').parentElement.id;
        return window.dropdowns[idDropdown];
    }
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
        if (!window.dropdowns) window.dropdowns = {};
        window.dropdowns[this.options.id] = this;
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
        for (var dd in window.dropdowns)
            window.dropdowns[dd].hide();

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