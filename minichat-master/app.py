# Micro gevent chatroom.
# ----------------------
# Make things as simple as possible, but not simpler.

from flask import Flask, render_template, request, json, redirect, url_for,session,escape
from flask import jsonify
from gevent import queue
from gevent.pywsgi import WSGIServer
import prof_check
app = Flask(__name__)
app.debug = True

class Room(object):

    def __init__(self):
        self.users = set()
        self.messages = []

    def backlog(self, size=25):
        return self.messages[-size:]

    def subscribe(self, user):
        self.users.add(user)

    def add(self, message):
        for user in self.users:
            
            user.queue.put_nowait(message)
        self.messages.append(message)

class User(object):

    def __init__(self):
        self.queue = queue.Queue()

rooms = {
    'Room-1': Room(),
    'Room-2': Room(),
}

users = {}

@app.route('/', methods = ['GET', 'POST'])
def choose_name():
    
    error = None
    if request.method == 'POST':
        
        if not request.form['username'] == "" :
            
            return redirect(url_for('main',uid=request.form['username']))
        else:
            error = "The user name you entered isn't correct. Try entering it again."
    return render_template('login.html', error=error)

@app.route('/<uid>')
def main(uid):
    return render_template('main.html',
        uid=uid,
        rooms=rooms.keys()
    )

@app.route('/<room>/<uid>')
def join(room, uid):
    user = users.get(uid, None)

    if not user:
        users[uid] = user = User()

    active_room = rooms[room]
    active_room.subscribe(user)
    

    messages = active_room.backlog()

    return render_template('room.html',
        room=room, uid=uid, messages=messages,data="This is a fantain chatroom, you can talk here.")

@app.route("/put/<room>/<uid>", methods=["POST"])
def put(room, uid):
    user = users[uid]
    room = rooms[room]
    
    message = request.form['message']
    
    room.add(':'.join([uid, message]))

    return ''

@app.route("/poll/<uid>", methods=["POST"])
def poll(uid):
    try:
        msg = users[uid].queue.get(timeout=1)
    except queue.Empty:
        msg = []
    print(msg)
   
    user=''
    message=''
    if not msg==[]:
        user=msg.split(":")[0]
        message=msg.split(":")[1]
    if prof_check.check_prof(message)==False:
        message="It seems to be a false language. Please avoid using these terms here."
        check="false"
    else:
        check="true"
    return jsonify({'user':user,'msg':message,'check':check})

if __name__ == "__main__":
    http = WSGIServer(('0.0.0.0', 5030), app)
    http.serve_forever()
