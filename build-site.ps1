# Creates the "docs" folder: the finished website. GitHub Pages serves this folder.
# Every page is saved as complete HTML, so search engines can read prices, notes and
# structured data straight away. Run this after changing anything in js/data.js.
# Needs Google Chrome installed. Double-click "Build Site.bat" to run it.
param([int]$Port = 8090, [int]$DebugPort = 9390)

$ErrorActionPreference = 'Stop'
$root = [IO.Path]::GetFullPath($PSScriptRoot)
$out = Join-Path $root 'docs'
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$stamp = Get-Date -Format 'yyyyMMddHHmm'
$pages = 'index.html', 'shop.html', 'guide.html', 'contact.html', 'hawas-og.html', 'hawas-fire.html', 'rebel.html', 'vulcan-feu.html'

# 1. Read the web address from data.js
$data = [IO.File]::ReadAllText((Join-Path $root 'js\data.js'))
$siteUrl = [regex]::Match($data, 'siteUrl:\s*"([^"]+)"').Groups[1].Value.TrimEnd('/')

# 2. Start a private local server for this build
$server = Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$root\run-site.ps1`" -Port $Port -NoBrowser" -WindowStyle Hidden -PassThru
Start-Sleep -Seconds 2

# 3. Open each page in Chrome and save the finished HTML
$prof = Join-Path $env:TEMP ('fragnivo-build-' + (Get-Random))
$browser = Start-Process $chrome -ArgumentList "--headless=new --disable-gpu --remote-debugging-port=$DebugPort --user-data-dir=`"$prof`" about:blank" -PassThru
Start-Sleep -Seconds 2
$ws = ((Invoke-RestMethod "http://127.0.0.1:$DebugPort/json") | Where-Object { $_.type -eq 'page' } | Select-Object -First 1).webSocketDebuggerUrl
$sock = New-Object System.Net.WebSockets.ClientWebSocket
$ct = [Threading.CancellationToken]::None
$sock.ConnectAsync([Uri]$ws, $ct).Wait()
$script:id = 0
function Send-Cdp($method, $params) {
  $script:id++
  $b = [Text.Encoding]::UTF8.GetBytes((@{ id = $script:id; method = $method; params = $params } | ConvertTo-Json -Depth 6 -Compress))
  $sock.SendAsync((New-Object ArraySegment[byte] (, $b)), 'Text', $true, $ct).Wait()
  $buf = New-Object byte[] 1048576
  while ($true) {
    $ms = New-Object IO.MemoryStream
    do { $r = $sock.ReceiveAsync((New-Object ArraySegment[byte] (, $buf)), $ct); $r.Wait(); $ms.Write($buf, 0, $r.Result.Count) } while (-not $r.Result.EndOfMessage)
    $t = [Text.Encoding]::UTF8.GetString($ms.ToArray())
    if ($t -match ('^\{"id":' + $script:id + '[,}]')) { return $t }
  }
}
# Removes what only exists while the page is running, then returns the page as text
$clean = @'
(function(){
  document.querySelectorAll('.thread,.drawer').forEach(function(n){n.remove()});
  document.querySelectorAll('.in').forEach(function(n){n.classList.remove('in')});
  document.querySelectorAll('[style*="--py"]').forEach(function(n){n.style.removeProperty('--py');if(!n.getAttribute('style'))n.removeAttribute('style')});
  document.querySelectorAll('[data-quiz]').forEach(function(n){n.innerHTML=''});
  document.querySelectorAll('.slide').forEach(function(n,i){n.removeAttribute('style');n.removeAttribute('inert');n.classList.toggle('is-on',i===0)});
  document.querySelectorAll('.hero__ticks i').forEach(function(n,i){n.classList.toggle('is-on',i===0)});
  document.querySelectorAll('[data-hero]').forEach(function(n){n.classList.remove('is-drag')});
  if(document.body.dataset.page==='home')document.body.classList.remove('hero-dark');
  document.querySelectorAll('.card[hidden]').forEach(function(n){n.hidden=false});
  ['is-scrolled','head-hidden','has-order','drawer-open','menu-open'].forEach(function(c){document.body.classList.remove(c)});
  if(!document.body.className)document.body.removeAttribute('class');
  document.documentElement.setAttribute('data-built','');
  document.documentElement.removeAttribute('class');
  return '<!doctype html>\n'+document.documentElement.outerHTML;
})()
'@
try {
  if (Test-Path $out) { Get-ChildItem $out -Force | Remove-Item -Recurse -Force } else { New-Item -ItemType Directory $out | Out-Null }
  Copy-Item (Join-Path $root 'css') $out -Recurse
  Copy-Item (Join-Path $root 'js') $out -Recurse
  Copy-Item (Join-Path $root 'assets') $out -Recurse
  foreach ($page in $pages) {
    [void](Send-Cdp 'Page.navigate' @{ url = "http://localhost:$Port/$page" })
    Start-Sleep -Milliseconds 1800
    $res = (Send-Cdp 'Runtime.evaluate' @{ expression = $clean; returnByValue = $true }) | ConvertFrom-Json
    $html = $res.result.result.value
    $html = $html.Replace('href="css/style.css"', "href=`"css/style.css?v=$stamp`"").Replace('src="js/data.js"', "src=`"js/data.js?v=$stamp`"").Replace('src="js/main.js"', "src=`"js/main.js?v=$stamp`"")
    if (-not $html -or $html -notmatch 'site-foot') { throw "Could not build $page" }
    [IO.File]::WriteAllText((Join-Path $out $page), $html, (New-Object Text.UTF8Encoding $false))
    Write-Host "Built $page"
  }
} finally {
  $sock.Dispose()
  Stop-Process -Id $browser.Id -Force -ErrorAction SilentlyContinue
  Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
}

# 4. Search engine files
[IO.File]::WriteAllText((Join-Path $out '.nojekyll'), '')
$today = Get-Date -Format 'yyyy-MM-dd'
$urls = $pages | ForEach-Object {
  $loc = if ($_ -eq 'index.html') { "$siteUrl/" } else { "$siteUrl/$_" }
  "  <url><loc>$loc</loc><lastmod>$today</lastmod></url>"
}
$sitemap = "<?xml version=`"1.0`" encoding=`"UTF-8`"?>`n<urlset xmlns=`"http://www.sitemaps.org/schemas/sitemap/0.9`">`n" + ($urls -join "`n") + "`n</urlset>`n"
[IO.File]::WriteAllText((Join-Path $out 'sitemap.xml'), $sitemap, (New-Object Text.UTF8Encoding $false))
[IO.File]::WriteAllText((Join-Path $out 'robots.txt'), "User-agent: *`nAllow: /`n`nSitemap: $siteUrl/sitemap.xml`n", (New-Object Text.UTF8Encoding $false))
Write-Host "Done. The finished website is in the docs folder."
