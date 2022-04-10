import eventlet
eventlet.monkey_patch()

from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from pymeasure.instruments.hp import HP3478A

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
        instr = HP3478A('GPIB::23')
        instr.auto_zero_enabled = False
        instr.range = 3
        instr.resolution = 5
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


def send_readout_thread(instr: HP3478A):
    global readout_thread_running
    while readout_thread_running:
        socketio.sleep(0.000001)
        readout = float(instr.read())
        socketio.emit('readout', readout)


if __name__ == '__main__':
    #import eventlet.wsgi
    #eventlet.wsgi.server(eventlet.listen(('', 5000)), app, log=open('log.txt', 'w'))
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
    #socketio.run(app)
