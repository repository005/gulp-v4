<!-- standart shipping php -->
<?php
if (isset($_POST)) {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];

  $subject = "Регистрация участников";
  $mailTo = "asmolette@mail.ru";
  $headers = "От: ".$email;
  $txt = "Вы получили письмо. \n\n
    Имя: ".$name."\n
    E-mail: ".$email."\n
    Телефон: ".$phone."\n\n
  ";

  mail($mailTo, $subject, $txt, $headers);
}
