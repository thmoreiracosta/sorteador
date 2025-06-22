<?php
header("Content-Type: application/json");

$dados = json_decode(file_get_contents("php://input"), true);
$usados = $dados["usados"] ?? [];

$possiveis = array_diff(range(1, 100), $usados);

if (empty($possiveis)) {
  echo json_encode(["numero" => null]);
  exit;
}

$numero = $possiveis[array_rand($possiveis)];

echo json_encode(["numero" => $numero." "]);
