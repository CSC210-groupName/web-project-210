import json
from flask import Flask, request
from flask_cors import CORS
from argon2 import PasswordHasher
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
    result = 'Username not found';
    if userVal in validLogins:
        result = 'Login successful' if verifyPassword(validLogins[userVal], passVal) else 'Incorrect password';     
    return json.dumps({'result':result});

def verifyPassword(saved_hash, input_password_attempt):
    try:
        ph.verify(saved_hash, input_password_attempt);
        return True;
    except:
        return False;

# Here's the temporary 'database'. These hashes are for 'pass1' and 'pass2', respectively
validLogins = {
    'john':'$argon2id$v=19$m=102400,t=2,p=8$9Kzm/DEQghBwzas81kIKxg$Pu1bQL00PJkpPRmLU7Jigg',
    'jane':'$argon2id$v=19$m=102400,t=2,p=8$AuWPF6SH8a4QmKefLeUnaQ$2WzzozzQofJJxBKOY53yqg'
};
ph = PasswordHasher();


if __name__ == '__main__':
	app.run(debug=True, port=5000) #run app in debug mode on port 5000