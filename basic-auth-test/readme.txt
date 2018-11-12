To run backend:

1. Install python 3.x from https://www.python.org/downloads/
2. Open a command line terminal
3. Run the following commands to get set up:
	curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
	python get-pip.py
	pip install flask
	pip install -U flask-cors
	pip install argon2_cffi
4. Run the following to start the server (from the server directory):
	python server.py

Then open index.html in a browser.