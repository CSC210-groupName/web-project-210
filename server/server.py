import json
from flask import Flask, request, session
from flask_cors import CORS
from argon2 import PasswordHasher
import sqlite3
import pymongo
from pymongo import MongoClient
app = Flask(__name__)
CORS(app)

# endpoint for login, a post method
@app.route('/login', methods=['POST'])
def loginRequest():
    # gets data passed in request - username & password
    data = json.loads(request.data);
    userVal = data['username'];
    passVal = data['password'];
    try:
        # gets password from database and check they are equal to what was entered
        existingPassHash = getStoredPassForUser(userVal); #If this throws exception, there is no username, drop into except block
        verified = verifyPassword(existingPassHash, passVal)
        if (verified):
            name = getNameForUser(userVal) #gets their name to welcome them nicely
        # if successful, greet, otherwise tell them the password was incorrect
        result = 'Login successful. Welcome ' + name + '!' if verified else 'Incorrect password';
        success = True;
    except:
        # if the username wasn't in the database
        result = 'Username not found';
        success = False;
    # returns information about the result/success of the login 
    return json.dumps({'result':result, 'success': success});

# endpoint for a signup request, post method
@app.route('/signup', methods=['POST'])
def signupRequest():
    # gets data from client request, name, username and pass
    data = json.loads(request.data);
    name = data['name'];
    userVal = data['username'];
    passVal = data['password'];
    try:
        # store user and pass in database
        storeUserAndPass(userVal, name, ph.hash(passVal))
        result = 'Account creation successful';
    except:
        result = 'Failure!';
    #return result of signup
    return json.dumps({'result':result});

@app.route('/newevent', methods=['POST'])
def addNewEvent():
    data = json.loads(request.data);
    username = data['username'];
    date = data['date'];
    starttime = data['starttime'];
    endtime = data['endtime'];
    eventname = data['eventname'];
    eventdesc = data['eventdesc'];
    try:
        storeEvent(username, date, starttime, endtime, eventname, eventdesc);
        result = "Event Successfully Added";
    except:
        result = "An Error Occurred";
    return json.dumps({'success':result});

@app.route('/events/<username>', methods=['GET'])
def getAllEvents(username=None):
    return json.dumps(getCalendarEventsForUser(username));

# method to verify a password, true if match, false otherwise
def verifyPassword(saved_hash, input_password_attempt):
    try:
        # verify by checking the hashed password to the entered password
        ph.verify(saved_hash, input_password_attempt);
        return True;
    except:
        return False;

# method to store new username and password
def storeUserAndPass(username, name, password):
    try:
        # check if username already exists in database
        getStoredPassForUser(username);
        usernameExists = True;
    except:
        usernameExists = False;
    if not usernameExists:
        # connect to the database
        conn = sqlite3.connect(sqlite_file);
        c = conn.cursor();
        # insert statement to add new user with given values (hashed password already)
        c.execute("insert into users values ('{}', '{}', '{}')".format(username, name, password));
        # closing connection
        conn.commit();
        conn.close();

def storeEvent(username, date, starttime, endtime, eventname, eventdesc):
    conn = sqlite3.connect(sqlite_file);
    c = conn.cursor();
    c.execute("select count(*) from calevents")
    eventid = c.fetchall()[0][0];
    name = getNameForUser(username)
    c.execute("insert into calevents values (?, ?, ?, ?, ?, ?, ?, ?)", (eventid, username, name, date, starttime, endtime, eventname, eventdesc));
    conn.commit();
    conn.close();

# simple method to get only the name of a user
def getNameForUser(username):
    conn = sqlite3.connect(sqlite_file);
    c = conn.cursor();
    c.execute("select name from users where username = '{}'".format(username));
    result = c.fetchall()[0][0];
    conn.close();
    return result;

# simple method to get only the username of a user
def getStoredPassForUser(username):
    conn = sqlite3.connect(sqlite_file);
    c = conn.cursor();
    c.execute("select password from users where username = '{}'".format(username));
    result = c.fetchall()[0][0];
    conn.close();
    return result;

# gets all calendar events associated with a user
def getCalendarEventsForUser(username):
    conn = sqlite3.connect(sqlite_file);
    c = conn.cursor();
    c.execute("select * from calevents where username = '{}'".format(username));
    events = c.fetchall();
    schema = getTableColumns(conn, 'calevents')
    return listsToDicts(events, schema);

# gets just the column names of a table
def getTableColumns(db, table_name):
    curs = db.cursor()
    sql = "select * from %s where 1=0;" % table_name
    curs.execute(sql)
    return [d[0] for d in curs.description]

# creating dictionaries for returning json
# provide keys (labels) and values (lsts)
def listsToDicts(lsts, labels):
    fulldict = []
    for lst in lsts:
        newdict = dictionary = dict(zip(labels, lst))
        fulldict.append(newdict)
    return fulldict

# method to remove a user from the database - not currently used but helpful if we want to have
# "deactivate account" or something similar
def removeUser(username):
    conn = sqlite3.connect(sqlite_file);
    c = conn.cursor();
    c.execute("delete from users where username = '{}'".format(username));
    conn.commit();
    conn.close();

# initializes the databases when the server starts
def initDB():
    try:
        # setup connection to a sqlite database
        conn = sqlite3.connect(sqlite_file);
        conn.close();
        success = True;
    # just in case it couldn't create the database - shouldn't be a problem
    except Exception as e:
        print(e);
        print("Invalid db path");
        success = False;
    if success:
        # connect to database
        conn = sqlite3.connect(sqlite_file);
        c = conn.cursor();
        try:
            # check if there is a database called users
            c.execute("select * from users");
        except:
            #if not, create it
            c.execute("create table users (username TEXT PRIMARY KEY, name TEXT, password TEXT)");
            c.execute("select * from users");
        try:
            # check if there is a database of calendar events
            c.execute("select * from calevents");
        except:
            #if not, create it
            c.execute("create table calevents (eventid INT PRIMARY KEY, username TEXT, name TEXT, date TEXT, starttime TEXT, endtime TEXT, eventname TEXT, eventdesc TEXT)");
            c.execute("select * from calevents");
        conn.close(); #close connection to db
    return success

# main method - starts server and creates database
if __name__ == '__main__':
    sqlite_file = './test_db.db';
    ph = PasswordHasher();
    dbInitialized = initDB();
    connection = pymongo.MongoClient('ds249233.mlab.com', 49233)
    db = connection['csc210-project-dev']
    db.authenticate('Sarah', 'password210')
    users = db['users']
    print(type(users))
    print(users.find_one())
    if (dbInitialized):
	    app.run(debug=True, port=8080) #run app in debug mode on port 5000
