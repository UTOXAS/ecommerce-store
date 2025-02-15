import subprocess
import time
import webbrowser
import requests
import ctypes
import os
import psutil
import sys
import threading


def run_command(command, shell=False, capture_output=False):
    try:
        if capture_output:
            process = subprocess.Popen(
                command,
                shell=shell,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                bufsize=1,
                universal_newlines=True,
            )
        else:
            process = subprocess.Popen(
                command,
                shell=shell,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            )
        return process
    except Exception as e:
        print(f"Error running command: {command}")
        print(e)
        return None


def is_server_running(url, timeout=5):
    """Check if the server is running by making a request to the URL."""
    try:
        response = requests.get(url, timeout=timeout)
        return response.status_code == 200
    except requests.exceptions.RequestException:
        return False


def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except Exception:
        return False


def is_process_running(process_name):
    """Check if a process is already running by name."""
    for proc in psutil.process_iter(["pid", "name"]):
        if process_name.lower() in proc.info["name"].lower():
            return proc
    return None


def terminate_process(process_name):
    """Terminate a process by name."""
    process = is_process_running(process_name)
    if process:
        print(f"Terminating {process_name} (PID: {process.info['pid']})...")
        process.terminate()
        process.wait()
        print(f"{process_name} terminated.")
    else:
        print(f"{process_name} is not running.")


def open_chrome(url):
    """Open Chrome with the specified URL."""
    # Path to Chrome executable (update this if your Chrome is installed elsewhere)
    chrome_paths = [
        "C:/Program Files/Google/Chrome/Application/chrome.exe",  # Windows default
        "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",  # Windows (x86)
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",  # macOS
        "/usr/bin/google-chrome",  # Linux
        "/usr/bin/chromium-browser",  # Linux (Chromium)
    ]

    for path in chrome_paths:
        if os.path.exists(path):
            webbrowser.register("chrome", None, webbrowser.BackgroundBrowser(path))
            webbrowser.get("chrome").open(url)
            return

    print("Chrome not found. Please open the browser manually and navigate to:", url)


def wait_for_services():
    """Wait until both MongoDB and Node.js server are running before opening Chrome."""
    server_url = "http://localhost:5000"
    max_attempts = 30
    attempt = 0

    print("Waiting for both MongoDB and Node.js server to start...")
    while attempt < max_attempts:
        is_process_running_bool = is_process_running("mongod")
        is_server_running_bool = is_server_running(server_url)
        if is_process_running_bool and is_server_running_bool:
            print("Bot MongoDB and Node.js are running!")
            open_chrome(server_url)
            return

        # if note is_process_running_bool:

        attempt += 1
        time.sleep(1)

    print("Services did not start within the expected time. Exiting...")


def print_output(process):
    """Print the stdout and stderr of the process in real-time."""
    while True:
        output = process.stdout.readline()
        if output:
            print(output.strip())

        error = process.stderr.readline()
        if error:
            print(error.strip(), file=sys.stderr)

        if process.poll() is not None:
            break


# def check_mongodb_running(max_attempts=30, interval=1):
#     """Check if MongoDB is running by verifying its default port (27017)."""
#     attempt = 0
#     while attempt < max_attempts:
#         try:
#             response = requests.get("http://localhost:27017", timeout=5)
#             if response.status_code == 404:
#                 return True
#         except requests.exceptions.RequestException:
#             pass
#         attempt += 1
#         time.sleep(interval)
#     return False


def run_node_process():
    npm_process = run_command(["npm", "run", "dev"], shell=True, capture_output=False)
    npm_log_thread = threading.Thread(target=print_output, args=(npm_process,))
    # mongo_log_thread.daemon = True
    npm_log_thread.daemon = True
    # mongo_log_thread.start()
    npm_log_thread.start()


def main():

    if not is_admin():
        ctypes.windll.shell32.ShellExecuteW(
            None, "runas", sys.executable, " ".join(sys.argv), None, 1
        )
        sys.exit()

    print("Running with administrative privileges!")

    terminate_process("mongod")
    terminate_process("node")

    # 1. Start mongod
    print("Starting MongoDB...")
    mongod_process_thread = threading.Thread(target=run_command, args=(["mongod"],))
    mongod_process_thread.start()
    # mongod_process = run_command(["mongod"])
    print("Starting npm run dev...")
    # npm_process = run_command(["npm", "run", "dev"], shell=True, capture_output=False)
    npm_process_thread = threading.Thread(
        # target=run_command, args=(["npm", "run", "dev"], True)
        target=run_node_process
    )

    npm_process_thread.start()

    # Give MongoDB some time to start
    # time.sleep(5)

    wait_for_services()

    # terminate_process("node")

    # # 2. Run npm run dev
    # print("Starting npm run dev...")
    # npm_process_thread = run_command(
    #     ["npm", "run", "dev"], shell=True, capture_output=False
    # )

    # mongo_log_thread = threading.Thread(
    #     target=print_output, args=(mongod_process_thread,)
    # )
    # npm_log_thread = threading.Thread(target=print_output, args=(npm_process_thread,))
    # # mongo_log_thread.daemon = True
    # npm_log_thread.daemon = True
    # # mongo_log_thread.start()
    # npm_log_thread.start()

    # # Wait for the server to start successfully
    # server_url = "http://localhost:5000"
    # max_attempts = 30  # Maximum number of attempts to check if the server is running
    # attempt = 0
    # mongodb_running = False
    # node_server_running = False

    # print("Waiting for MongoDB and the Node.js server to start...")
    # while attempt < max_attempts:
    #     if not mongodb_running:
    #         # print("Wait ")
    #         mongodb_running = check_mongodb_running(max_attempts=1, interval=0)
    #     if not node_server_running:
    #         node_server_running = is_server_running(server_url)
    #     if mongodb_running and node_server_running:
    #         print("Both MongoDB and the Node.js server are running!")
    #         break
    #     # if is_server_running(server_url):
    #     #     print("Server is running!")
    #     #     break
    #     attempt += 1
    #     time.sleep(1)  # Wait 1 second before retrying
    # else:
    #     print("One or both services did not start within the expected time. Exiting...")
    #     mongod_process_thread.terminate()
    #     npm_process_thread.terminate()
    #     return

    # # 3. Open Chrome on localhost:5000
    # print("Opening Chrome on localhost:5000...")
    # open_chrome(server_url)

    try:
        # Keep the script running to keep the processes alive
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Stopping processes...")
        mongod_process_thread.terminate()
        npm_process_thread.terminate()


if __name__ == "__main__":
    main()
