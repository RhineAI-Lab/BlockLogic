import threading
import requests
import subprocess
import time

server_ip = 'logic.autojs.org'
threads_num = 8
train_device = 'RTX-A4000'

test_mode = True
if test_mode:
    server_ip = '127.0.0.1:8000'


def http_get(interface, params):
    return requests.get('http://%s/api/%s' % (server_ip, interface), params=params).json()

def java_time():
    return int(time.time()*1000)

class State():
    id = 0
    continue_flag = True
    last_time = -1

    def __init__(self, id):
        self.id = id


def run_thread(index):
    while True:
        try:
            response = http_get('runner/get', {'msg': train_device})
        except Exception as e:
            time.sleep(1)
            continue
        if response['result'] == 201:
            time.sleep(1)
            continue
        print('T'+str(index)+' Task: '+str(response))
        if response['result'] != 200:
            continue

        task = response['value']['id']
        name = response['value']['name']
        # print(response['value']['code'])
        file = 'Temp' + str(index) + '-' + name
        f = open(file, "w", encoding="utf-8")
        f.write(response['value']['code'])
        f.close()

        def upload_result(type, msg, id):
            return http_get('runner/result/add', {
                'task': task,
                'id': id,
                'type': type,
                'msg': msg,
                'time': java_time()
            })
        def force_upload_result(type, msg, id):
            for i in range(200):
                try:
                    response = upload_result(type, msg, id)
                    if response['result']==200:
                        break
                    else:
                        print(response)
                except Exception as e:
                    print(e)
                    time.sleep(0.5)
                    continue

        cmd = 'python ' + file
        popen = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
        force_upload_result('start', name, 0)
        def popen_subscribe(is_err, state):
            while state.continue_flag:
                try:
                    if is_err:
                        line_b = popen.stderr.read()
                    else:
                        line_b = popen.stdout.readline()

                    if line_b and len(line_b) != 0:
                        line = str(line_b,'UTF-8')
                        if line.endswith('\n') and len(line)>1:
                            line = line[:len(line)-1]
                        print('T' + str(index) + (' Error' if is_err else ' Output') + str(state.id) + ': ' + line)
                        threading.Thread(target=force_upload_result, args=('error' if is_err else 'output', line, state.id)).start()
                        state.id+=1

                    if state.last_time==-1 and not popen.poll() is None and (is_err or len(line_b) == 0):
                        state.last_time = time.time()
                    if state.last_time!=-1 and state.last_time+0.3<time.time():
                        state.continue_flag = False
                except Exception as e:
                    print('T' + str(index) +' RunError' + str(state.id) + ': ' + str(e))
            if is_err:
                force_upload_result('end', name, state.id)
                print('T'+str(index)+' TaskEnd')
        state = State(1)
        threading.Thread(target=popen_subscribe, args=(True, state)).start()
        popen_subscribe(False, state)


def start():
    if test_mode:
        for i in range(threads_num):
            threading.Thread(target=run_thread, name="RunThread-" + str(i), args=(i,)).start()
    else:
        run_thread(0)
start()

while True:
    pass
