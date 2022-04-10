# make sure to use eventlet and call eventlet.monkey_patch()
import eventlet
eventlet.monkey_patch()

from flask import Flask, render_template, request, g, session, make_response, current_app, redirect, url_for
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"

# make sure to set the async_mode as 'eventlet'
socketio = SocketIO(app, async_mode='eventlet')


# our gloabal worker
workerObject = None

class Worker(object):

    switch = False
    unit_of_work = 0

    def __init__(self, socketio):
        """
        assign socketio object to emit
        """
        self.socketio = socketio
        self.switch = True

    def do_work(self):
        """
        do work and emit message
        """

        while self.switch:
            self.unit_of_work += 1

            # must call emit from the socket io
            # must specify the namespace
            self.socketio.emit("readout", {"msg": self.unit_of_work}, namespace="/work")

            # important to use eventlet's sleep method
            eventlet.sleep(1)

    def stop(self):
        """
        stop the loop
        """
        self.switch = False


@app.route('/')
def index():
    """
    renders demo.html
    """
    return render_template('./demo.html')



@socketio.on('connect', namespace='/work')
def connect():
    """
    connect
    """

    global worker
    worker = Worker(socketio)
    emit("re_connect", {"msg": "connected"})


@socketio.on('start', namespace='/work')
def start_work():
    """
    trigger background thread
    """

    emit("update", {"msg": "starting worker"})

    # notice that the method is not called - don't put braces after method name
    socketio.start_background_task(target=worker.do_work)


@socketio.on('stop', namespace='/work')
def stop_work():
    """
    trigger background thread
    """

    worker.stop()
    emit("update", {"msg": "worker has been stoppped"})



if __name__ == '__main__':
    """
    launch server
    """
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
