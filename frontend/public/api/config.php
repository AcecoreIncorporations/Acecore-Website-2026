<?php
/**
 * Acecore cPanel API Configuration
 * 
 * You can configure your SMTP credentials either via:
 * 1. Environment variables set in cPanel, or
 * 2. Editing the values directly below.
 */

// --- SMTP Configuration ---
// If left empty (''), the system operates in Preview Mode or uses server mail()
define('SMTP_HOST', getenv('SMTP_HOST') ?: '');
define('SMTP_PORT', (int)(getenv('SMTP_PORT') ?: 587));
define('SMTP_SECURE', getenv('SMTP_SECURE') === 'true' || SMTP_PORT === 465);
define('SMTP_USER', getenv('SMTP_USER') ?: '');
define('SMTP_PASS', getenv('SMTP_PASS') ?: '');

// --- Notification Recipient & Sender ---
define('CONTACT_TO_EMAIL', getenv('CONTACT_TO_EMAIL') ?: 'support@acecore.tech');
define('CONTACT_FROM_EMAIL', getenv('CONTACT_FROM_EMAIL') ?: (SMTP_USER ?: 'support@acecore.tech'));

// --- Helper: CORS & JSON Header ---
function send_json_response($status, $data) {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept');
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

// --- Helper: Handle CORS Preflight ---
function handle_cors_preflight() {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept');
        header('Access-Control-Max-Age: 86400');
        exit;
    }
}
