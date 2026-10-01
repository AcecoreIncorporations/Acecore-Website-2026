<?php
/**
 * Acecore Dynamic Pricing API (cPanel / PHP Native)
 * Endpoint: /api/pricing or /api/pricing.php
 */

require_once __DIR__ . '/config.php';

handle_cors_preflight();

$dataFile = __DIR__ . '/pricing.json';

if (!file_exists($dataFile)) {
    send_json_response(500, [
        'success' => false,
        'error' => 'pricing.json data file missing.'
    ]);
}

$rawJson = file_get_contents($dataFile);
$pricing = json_decode($rawJson, true);

if (!$pricing) {
    send_json_response(500, [
        'success' => false,
        'error' => 'Corrupt pricing data file.'
    ]);
}

$method = $_SERVER['REQUEST_METHOD'];
$planId = isset($_GET['id']) ? trim($_GET['id']) : '';

// 1. GET Requests
if ($method === 'GET') {
    if ($planId !== '') {
        foreach ($pricing['plans'] as $plan) {
            if ($plan['id'] === $planId) {
                send_json_response(200, [
                    'success' => true,
                    'data' => $plan
                ]);
            }
        }
        send_json_response(404, [
            'success' => false,
            'error' => "Plan not found: {$planId}"
        ]);
    }

    send_json_response(200, [
        'success' => true,
        'data' => $pricing
    ]);
}

// 2. PUT / POST Updates (Optional dynamic update)
if ($method === 'PUT' || $method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        send_json_response(400, [
            'success' => false,
            'error' => 'Invalid JSON payload.'
        ]);
    }

    // Update single plan if planId is provided
    if ($planId !== '') {
        $found = false;
        foreach ($pricing['plans'] as &$p) {
            if ($p['id'] === $planId) {
                if (isset($input['solar'])) $p['prices']['solar'] = $input['solar'];
                if (isset($input['powercell'])) $p['prices']['powercell'] = $input['powercell'];
                if (isset($input['amount'])) $p['amount'] = (int)$input['amount'];
                $found = true;
                break;
            }
        }
        if (!$found) {
            send_json_response(404, [
                'success' => false,
                'error' => "Plan not found: {$planId}"
            ]);
        }
    } else {
        // Full update
        if (isset($input['plans']) && is_array($input['plans'])) {
            $pricing['plans'] = $input['plans'];
        }
        if (isset($input['copy']) && is_array($input['copy'])) {
            $pricing['copy'] = $input['copy'];
        }
        if (isset($input['modes']) && is_array($input['modes'])) {
            $pricing['modes'] = $input['modes'];
        }
    }

    $pricing['updatedAt'] = gmdate('Y-m-d\TH:i:s\Z');
    file_put_contents($dataFile, json_encode($pricing, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

    send_json_response(200, [
        'success' => true,
        'message' => 'Pricing updated successfully.',
        'data' => $pricing
    ]);
}

// Route not allowed
send_json_response(405, [
    'success' => false,
    'error' => "Method {$method} not allowed."
]);
