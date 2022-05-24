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

def java_time():
    return int(time.time()*1000)

def run_thread(index=-1):
    response = http_get('runner/get', {'msg': train_device})
    print(response)
    if response['result'] != 200:
        return

    task = response['value']['id']
    name = response['value']['name']
    file = 'Temp' + str(index) + '-' + name
    f = open(file, "w")
    f.write(response['value']['code'])
    f.close()

    cmd = 'python ' + file
    popen = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
    http_get('runner/result/add',{
        'task': task,
        'id': 0,
        'type': 'start',
        'msg': name,
        'time': java_time()
    })
    id = 1
    while popen.poll() is None:
        line_b = popen.stdout.readline()
        line = str(line_b,'UTF-8')
        print('t'+str(index)+' run: '+line)
        http_get('runner/result/add',{
            'task': task,
            'id': id,
            'type': 'output',
            'msg': line,
            'time': java_time()
        })
        id += 1
        time.sleep(0.1)
    http_get('runner/result/add',{
        'task': task,
        'id': id,
        'type': 'end',
        'msg': name,
        'time': java_time()
    })



def start():
    for i in range(threads_num):
        threading.Thread(target=run_thread(), name="RunThread-" + str(i), args=(i,))
start()
