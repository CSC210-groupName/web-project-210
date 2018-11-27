import json
from flask import Flask, request
from flask_cors import CORS
from argon2 import PasswordHasher
import sqlite3
app = Flask(__name__)
CORS(app)

@app.route('/get-example')
def exampleGetRequest():
    return json.dumps({'value':'Get Request Successful'});
    # Any url parameters can be accessed via request.args.get('paramName')

@app.route('/post-example', methods=['POST']) #This blocks GET requests
def examplePostRequest():
    data = json.loads(request.data);
    data1Val = data['p1'];
    return json.dumps({'dataValue':data1Val});

@app.route('/login', methods=['POST'])
def loginRequest():
    data = json.loads(request.data);
    userVal = data['username'];
    passVal = data['password'];
    try:
        existingPassHash = getStoredPassForUser(userVal); #If this throws exception, there is no username, drop into except block
        verified = verifyPassword(existingPassHash, passVal)
        if (verified):
            name = getNameForUser(userVal)
        result = 'Login successful. Welcome ' + name + '!' if verified else 'Incorrect password';
        success = True;
    except:
        result = 'Username not found';
        success = False;
    return json.dumps({'result':result, 'success': success});

@app.route('/signup', methods=['POST'])
def signupRequest():
    data = json.loads(request.data);
    name = data['name'];
    userVal = data['username'];
    passVal = data['password'];
    try:
        storeUserAndPass(userVal, name, ph.hash(passVal))
        result = 'Account creation successful';
    except:
        result = 'Failure!';
    return json.dumps({'result':result});


def verifyPassword(saved_hash, input_password_attempt):
    try:
        ph.verify(saved_hash, input_password_attempt);
        return True;
    except:
        return False;

def storeUserAndPass(username, name, password):
    try:
        getStoredPassForUser(username);
        usernameExists = True;
        print('Username already exists in database!');
    except:
        usernameExists = False;
    if not usernameExists:
        conn = sqlite3.connect(sqlite_file);
        c = conn.cursor();
        c.execute("insert into users values ('{}', '{}', '{}')".format(username, name, password));
        conn.commit();
        conn.close();

def getNameForUser(username):
    conn = sqlite3.connect(sqlite_file);
    c = conn.cursor();
    c.execute("select name from users where username = '{}'".format(username));
    result = c.fetchall()[0][0];
    conn.close();
    return result;

# This function throws an exception if the username is not found
def getStoredPassForUser(username):
    conn = sqlite3.connect(sqlite_file);
    c = conn.cursor();
    c.execute("select password from users where username = '{}'".format(username));
    result = c.fetchall()[0][0];
    conn.close();
    return result;

def removeUser(username):
    conn = sqlite3.connect(sqlite_file);
    c = conn.cursor();
    c.execute("delete from users where username = '{}'".format(username));
    conn.commit();
    conn.close();


def initDB():
    try:
        conn = sqlite3.connect(sqlite_file);
        conn.close();
        success = True;
    except Exception as e:
        print(e);
        print("Invalid db path");
        success = False;
    if success:
        conn = sqlite3.connect(sqlite_file);
        c = conn.cursor();
        try:
            c.execute("select * from users");
        except:
            c.execute("create table users (username TEXT PRIMARY KEY, name TEXT, password TEXT)");
            c.execute("select * from users");
        try:
            c.execute("select * from calevents");
        except:
            c.execute("create table calevents (eventid INT PRIMARY KEY, username TEXT, name TEXT, date TEXT, starttime TEXT, endtime TEXT, eventname TEXT)");
            c.execute("select * from calevents");
        conn.close();
    return success


if __name__ == '__main__':
    sqlite_file = './test_db.db';
    ph = PasswordHasher();
    dbInitialized = initDB();
    if (dbInitialized):
	    app.run(debug=True, port=5000) #run app in debug mode on port 5000
