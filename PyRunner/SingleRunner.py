import threading
import requests
import subprocess
import time

server_ip = 'logic.autojs.org'
threads_num = 16
train_device = 'RTX-A4000'

test_mode = True
if test_mode:
    server_ip = '127.0.0.1:8000'
    threads_num = 4


def http_get(interface, params):
    return requests.get('http://%s/api/%s' % (server_ip, interface), params=params).json()

def run_thread(index=-1):
    response = http_get('runner/get', {'msg': train_device})
    print(response)
    if response['result'] != 200:
        return

    task = response['value']['id']
    file = 'Temp' + str(index) + '-' + response['value']['name']
    f = open(file, "w")
    f.write(response['value']['code'])
    f.close()

    cmd = 'python ' + file
    popen = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
    while popen.poll() is None:
        line = popen.stdout.readline()
        print(line)
        # print(str(line,'UTF-8'))
        time.sleep(0.1)



def start():
    for i in range(threads_num):
        threading.Thread(target=run_thread(), name="RunThread-" + str(i), args=(i,))
start()
