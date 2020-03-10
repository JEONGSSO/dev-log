# jquery click, keypress combine 

```php
   var noteAddUserCallBack = function() {...}

   $('.btn_add').click(noteAddUserCallBack);
   $('#input').keypress(function (event) {
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13') noteAddUserCallBack();
   });
```