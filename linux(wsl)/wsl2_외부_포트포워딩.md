wsl2에서 localhost host로 외부 접속이 불가능한데 이를 위해서

```bash
If (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
  $arguments = "& '" + $myinvocation.mycommand.definition + "'"
  Start-Process powershell -Verb runAs -ArgumentList $arguments
  Break
}

$remoteport = bash.exe -c "ifconfig eth0 | grep 'inet '"
$found = $remoteport -match '\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}';

if ( $found ) {
  $remoteport = $matches[0];
}
else {
  Write-Output "The Script Exited, the ip address of WSL 2 cannot be found";
  exit;
}

$ports = @(3000, 3001, 5000, 5500, 19000, 19002, 19006);

Invoke-Expression "netsh interface portproxy reset";

for ( $i = 0; $i -lt $ports.length; $i++ ) {
  $port = $ports[$i];
  Invoke-Expression "netsh interface portproxy add v4tov4 listenport=$port connectport=$port connectaddress=$remoteport";
}

Invoke-Expression "netsh interface portproxy show v4tov4";
```

메모장으로 작성 후 파워쉘 관리자 권한 실행한다음 해당 파일을 실행하고

192.168로 시작되는 IPv4 아이피를 찾아 접속하면 포워딩 완료

## 참조

https://www.leafcats.com/318
