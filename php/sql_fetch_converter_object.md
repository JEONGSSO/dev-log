sql fetch 배열을 객체로 변환

(배열 안에 고유한 키가 있을경우)

```php

$object = new stdClass();

$list = $user->getList();

foreach ($list as $key => $value) {
  $object -> {$list[$key]['code']} = [
    'pay' => $value['pay'],
    'active' => $value['active']
  ];
}

var_dump($object);

```
