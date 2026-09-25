<?php
/**
 * Kontaktformular Südlicht Studio
 * Läuft auf dem IONOS Webspace (PHP 8). Versand über die PHP mail() Funktion von IONOS.
 * Keine Datenbank, keine Speicherung der Nachricht auf dem Server.
 */
declare(strict_types=1);

const TO         = 'info@suedlicht-studio.de';
const FROM       = 'info@suedlicht-studio.de'; // muss ein Postfach der eigenen Domain sein
const MIN_SECS   = 3;    // schneller ausgefüllt = Bot
const MAX_PER_HR = 5;    // Anfragen pro IP und Stunde

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

function done(bool $ok, string $error = ''): never {
    global $wantsJson;
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($ok ? 200 : 400);
        echo json_encode(['ok' => $ok, 'error' => $error], JSON_UNESCAPED_UNICODE);
    } else {
        header('Location: ' . ($ok ? '/kontakt/danke/' : '/kontakt/?fehler=1'), true, 303);
    }
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: /kontakt/', true, 303);
    exit;
}

$clean = static fn(string $k, int $max): string =>
    mb_substr(trim(str_replace(["\r", "\0"], '', (string)($_POST[$k] ?? ''))), 0, $max);

// Spam-Schutz: Honeypot und Zeitfalle. Bots bekommen ein stilles "ok".
if ($clean('website', 200) !== '') done(true);
$t = (int)($_POST['t'] ?? 0);
if ($t > 0 && (time() * 1000 - $t) < MIN_SECS * 1000) done(true);

// Einfache Begrenzung pro IP (nur gehashte IP, wird nach einer Stunde bedeutungslos)
$bucket = sys_get_temp_dir() . '/sl_' . hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . date('YmdH'));
$hits = is_file($bucket) ? (int)file_get_contents($bucket) : 0;
if ($hits >= MAX_PER_HR) done(false, 'Zu viele Anfragen in kurzer Zeit');
@file_put_contents($bucket, (string)($hits + 1));

$name    = $clean('name', 120);
$email   = $clean('email', 160);
$tel     = $clean('telefon', 40);
$termin  = $clean('termin', 160);
$art     = $clean('art', 60);
$msg     = mb_substr(trim(str_replace("\0", '', (string)($_POST['nachricht'] ?? ''))), 0, 5000);
$consent = ($_POST['datenschutz'] ?? '') === 'ja';

if ($name === '' || $msg === '' || !$consent) done(false, 'Bitte fülle alle Pflichtfelder aus');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) done(false, 'Die E-Mail Adresse ist ungültig');
// Header-Injection ausschließen
if (preg_match('/[\n\r]/', $name . $email)) done(false, 'Ungültige Eingabe');

$subject = 'Anfrage über die Website: ' . ($art !== '' ? $art : 'Projekt') . ' – ' . $name;
$body = "Neue Anfrage über suedlicht-studio.de\n"
      . str_repeat('-', 40) . "\n"
      . "Art:      $art\n"
      . "Name:     $name\n"
      . "E-Mail:   $email\n"
      . "Telefon:  " . ($tel !== '' ? $tel : '–') . "\n"
      . "Termin:   " . ($termin !== '' ? $termin : '–') . "\n"
      . str_repeat('-', 40) . "\n\n"
      . $msg . "\n\n"
      . str_repeat('-', 40) . "\n"
      . 'Gesendet am ' . date('d.m.Y, H:i') . " Uhr. Einwilligung Datenschutz: ja\n";

$headers = [
    'From'                      => 'Südlicht Website <' . FROM . '>',
    'Reply-To'                  => $email,
    'MIME-Version'              => '1.0',
    'Content-Type'              => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit',
    'X-Mailer'                  => 'suedlicht-studio.de',
];

$sent = mail(TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers, '-f' . FROM);
done($sent, $sent ? '' : 'Der Mailserver hat nicht geantwortet');
