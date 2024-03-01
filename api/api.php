<?php
include_once './dbincludes.php';

if ($conn->connect_error) {
    die("Anslutningen misslyckades: " . $conn->connect_error);
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PATCH, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['REQUEST_URI'];
$parts = explode('/', $path);
$num_parts = count($parts);

if ($num_parts > 6) {
    $action = $parts[6];
}

$userid = filter_input(INPUT_GET, 'userid', FILTER_SANITIZE_NUMBER_INT);

switch ($method) {
    case 'OPTIONS':
        handleOptions();
        break;
    case 'GET':
        handleGet();
        break;
    case 'PATCH':
        handlePatch();
        break;
    case 'POST':
        handlePost();
        break;
    case 'DELETE':
        handleDelete();
        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => $method . " metoden är inte tillåten"]);
}

$conn->close();
exit;

function handleOptions()
{
    header('Access-Control-Allow-Methods: GET, PATCH, POST, DELETE');
    header('Access-Control-Allow-Headers: Content-Type');
}

function handleGet()
{
    header('Content-Type: application/json');
    $tasks = getTasks();

    if (isset($tasks)) {
        http_response_code(200);
        echo json_encode($tasks);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Hittade inga objekt i din att göra lista"]);
    }
}

function handlePatch()
{
    global $conn;

    $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);
    $reminder = filter_input(INPUT_GET, 'reminder', FILTER_SANITIZE_NUMBER_INT);

    if (isset($id, $reminder)) {
        $sql = "UPDATE tasks SET reminder = ? WHERE id = ?";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ii', $reminder, $id);
        $result = $stmt->execute();

        if ($result) {
            http_response_code(200);
            echo json_encode(["message" => "Operationen lyckades"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Internt serverfel"]);
        }

        $stmt->close();
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Felaktig inmatningsdata"]);
    }
}

function handlePost()
{
    global $action;
    $action();
}

function handleDelete()
{
    global $conn;

    $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);

    if (isset($id)) {
        $sql = "DELETE FROM tasks WHERE id = ?";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $id);
        $result = $stmt->execute();

        if ($result) {
            http_response_code(200);
            echo json_encode(["message" => "Operationen lyckades"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Internt serverfel"]);
        }

        $stmt->close();
    } else {
        http_response_code(400);
        echo json_encode((["error" => "Felaktig inmatningsdata"]));
    }
}

function getTasks()
{
    global $conn;
    global $userid;

    $sql = "SELECT * FROM tasks WHERE userid = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $userid);
    $stmt->execute();

    $result = $stmt->get_result();

    $data = null;

    if ($result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    $stmt->close();
    return $data;
}

function getUser($username)
{
    global $conn;

    $sql = "SELECT * FROM users WHERE username = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $stmt->execute();

    $result = $stmt->get_result();

    $data = null;

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data = $row;
        }
    }

    $stmt->close();
    return $data;
}

function addTask()
{
    global $conn;
    global $userid;

    $data = json_decode(file_get_contents("php://input"));

    $task = filter_var($data->task, FILTER_DEFAULT);
    $date = filter_var($data->date, FILTER_DEFAULT);
    $reminder = filter_var($data->reminder, FILTER_VALIDATE_BOOL);

    if ($task && $date && isset($reminder)) {
        $sql = "INSERT INTO tasks (userid, task, date, reminder) VALUES (?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param('issi', $userid, $task, $date, $reminder);
        $result = $stmt->execute();

        if ($result === TRUE) {
            http_response_code(200);
            echo json_encode(["message" => "Operationen lyckades"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Internt serverfel"]);
        }

        $stmt->close();
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Felaktig inmatningsdata"]);
    }
}

function login()
{
    $data = json_decode(file_get_contents("php://input"));

    $username = filter_var($data->username, FILTER_DEFAULT);
    $password = filter_var($data->password, FILTER_DEFAULT);

    if ($username && $password) {
        $user = getUser($username);

        if ($user) {
            if (password_verify($password, $user['password'])) {
                http_response_code(200);
                $_SESSION['userid'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                echo json_encode(["message" => "Operationen lyckades", "userid" => $_SESSION['userid'], "username" => $_SESSION['username']]);
            } else {
                http_response_code(401);
                echo json_encode(["error" => "Fel lösenord"]);
            }
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Användaren finns inte"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Felaktig inmatningsdata"]);
    }
}

function logout()
{
    session_unset();
    session_destroy(); //uninitialized
}

function register()
{
    global $conn;

    $data = json_decode(file_get_contents("php://input"));

    $username = $data->username;
    $email = $data->email;
    $password = $data->password;

    if (isset($username, $email, $password) && !empty($username) && !empty($email) && !empty($password)) {
        $sql = "SELECT * FROM users WHERE username = ?";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $username);
        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows <= 0) {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

            $stmt = $conn->prepare($sql);
            $stmt->bind_param('sss', $username, $email, $hashedPassword);
            $result = $stmt->execute();

            if ($result) {
                http_response_code(200);
                echo json_encode(["message" => "Operationen lyckades"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Internt serverfel"]);
            }

            $stmt->close();
        } else {
            http_response_code(409);
            echo json_encode(["error" => "Användarnamnet är upptaget"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Felaktig inmatningsdata"]);
    }
}
