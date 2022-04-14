import os
import re
import eventlet
eventlet.monkey_patch()

from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from pymeasure.instruments.hp import HP3478A
from pymeasure.adapters import VISAAdapter

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins='*', async_mode='eventlet')

instr: HP3478A = None
readout_thread_running = False
clients_connected = 0
readout_thread = None

@app.route('/')
def index():
    """
    renders demo.html
    """
    return render_template('./demo.html')

@socketio.on('connect')
def on_connect(message):
    global instr
    global readout_thread
    global readout_thread_running
    global clients_connected
    clients_connected += 1
    print(f'Client connected. {clients_connected} clients connected.')
    if instr is None:
        keysight_visa = '/usr/lib/libktvisa32.so.0'
        visa_library = keysight_visa if os.path.isfile(keysight_visa) else '@py'
        adapter = VISAAdapter(23, visa_library=visa_library)
        instr = HP3478A(adapter)
        instr.auto_zero_enabled = False
        instr.range = 3
        instr.resolution = 4
        instr.display_text_no_symbol = " " * 16

    if not readout_thread_running:
        readout_thread_running = True
        readout_thread = socketio.start_background_task(send_readout_thread, instr)

    emit("re_connect", {"msg": "connected"})


@socketio.on('disconnect')
def on_disconnect():
    global clients_connected
    global readout_thread_running
    global instr
    clients_connected -= 1
    print(f'Client disconnected. {clients_connected} clients connected')
    if clients_connected == 0:
        readout_thread_running = False
        readout_thread.join()
        #instr.reset()
        instr.shutdown()
        instr = None
        print('Instrument shut down.')


@socketio.event
def update_settings(settings):
    global instr
    print(settings)
    try:
        instr.resolution = settings['nrOfDigits']
        instr.range = settings['range']
        instr.auto_zero_enabled = settings['autozeroEnabled']
        emit('settings_updated', settings,
            broadcast=True, include_self=False)
    except ValueError as e:
        emit('error', {'msg': str(e)})



def send_readout_thread(instr: HP3478A):
    global readout_thread_running
    while readout_thread_running:
        socketio.sleep(0.000001)
        raw_read = instr.read().strip()
        if re.match(r'\+9\.[09]{5}E\+9', raw_read):
            readout = "OVLD"
        else:
            readout = float(raw_read)
        socketio.emit('readout', readout)


if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5005, debug=True)
