# -*- coding:utf-8 -*-
import subprocess
import time


def run():
    file = 'temp.py'
    cmd = 'python ' + file
    popen = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
    while popen.poll() is None:
        line = popen.stdout.readline()
        print(line)
        # print(str(line,'UTF-8'))
        time.sleep(0.1)

run()





