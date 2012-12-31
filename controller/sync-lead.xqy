xquery version "1.0-ml";

import module namespace mkto="mkto" at "../lib/marketo.xqy";
import module namespace users="users" at "../lib/users.xqy";
import module namespace cookies = "http://parthcomp.com/cookies" at "../lib/cookies.xqy";

let $asset := xdmp:get-request-field('asset')
let $cookie := cookies:get-cookie('_mkto_trk')[1]
let $user := users:getCurrentUser()
let $email := $user/email/string()

let $_ :=

try {
    mkto:associate-lead-via-asset($email, $cookie, $asset)
} catch ($e)  {
    (xdmp:log(concat('mkto:associate-lead-via-asset failed ', $e/string())))
}

return "ok"
    