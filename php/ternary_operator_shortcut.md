삼항 연산자 단축 문법

```php
// Elvis operator (Falsy 값으로 판단)

$val = $_GET['user'] ?: 'default';

var_dump(true ?: 'default'); // true
var_dump(false ?: 'default'); // default

var_dump('' ?: 'default'); // default
var_dump('good' ?: 'default'); // good

var_dump(null ?: 'default'); // default

var_dump([] ?: 'default'); // default

// Null Coalescing Operator (NULL 일때만 TRUE)

$val = $_GET['user'] ?? 'default';
```

https://www.codementor.io/@sayantinideb/ternary-operator-in-php-how-to-use-the-php-ternary-operator-x0ubd3po6
https://stackoverflow.com/questions/1993409/operator-the-elvis-operator-in-php
