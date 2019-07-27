{
  //phone validation

  $.validator.addMethod(
   "regex",
   function(value, element, regexp) {
       var check = false;
       return this.optional(element) || regexp.test(value);
   },
   "Проверьте правильность данных."
 );

 $('#contact-form').validate({
   rules: {
     username: {
       required: true,
       minlength: 1
       // regex: /[А-яЁё]/gi
     },
     email: {
       required: true,
       regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     },
     message: {
       required: true,
       minlength: 1
     }
   },
   messages: {
     username: {
       required: "Данное поле обязательно для заполнения"
       },
       email: {
       required: "Данное поле обязательно для заполнения",
       email: "Введите корректный email адрес",
       },
       message: {
         required: "Данное поле обязательно для заполнения"
       }
   }
 });

 $('#contacts-checkbox').on('click', () => {
   checkForm();
 });

 function checkForm() {
   
   if ($('#contacts-checkbox').length < 1) {
     return;
   }
   

   if (document.querySelector('#contacts-checkbox input').checked) {
     $('#contacts-send-btn').attr('disabled', false);
   } else {
     $('#contacts-send-btn').attr('disabled', true);
   }
 }

 checkForm();
}
