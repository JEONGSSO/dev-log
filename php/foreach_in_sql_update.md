```php
   $sql = "
            UPDATE table SET sort_no = :val WHERE sort_no = :key
        ";
   $sth = $db->prepare($sql);
   foreach ($arrData['sort'] as $key => $val) {
      $key++;
      $sth->param(":key", $key);
      $sth->param(":val", $val);
      $sth->execute();
   }
```

이렇게 scroll로 업데이트를 sort_no 로 하려고 했으나
이 방법은

모든 sort_no가 마지막 값으로 변경되는 현상이 있었다.

해결방안 모색 중...

