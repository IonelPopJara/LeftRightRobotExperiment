# A simple Flask server that accepts requests to write to a CSV file

from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)
csv_file = 'responses.csv'

# Create the CSV file with headers if it doesn't exist
if not os.path.exists(csv_file):
    with open(csv_file, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Participant ID', 'Trial', 'Answer', 'Time Taken (s)', 'Timestamp'])

@app.route('/submit_quiz', methods=['POST'])
def submit_quiz():
    print("Received a request: ", request)
    data = request.json
    participant_id = data['participantId']
    print("Data: ", data)
    trial = data['trial']
    answer = data['answer']
    time_taken = data['timeTaken']
    timestamp = datetime.now().isoformat()

    # Append the data to the CSV file
    with open(csv_file, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([participant_id, trial, answer, time_taken, timestamp])

    return jsonify({'status': 'success'}), 200

@app.route('/get_trial_number', methods=['GET'])
def get_trial():
    # Get the trial number from the csv file for a specified participant_id
    participant_id = request.args.get('participant_id')
    trial = 0
    with open(csv_file, mode='r') as file:
        reader = csv.reader(file)
        for row in reader:
            if row[0] == participant_id:
                if trial < int(row[1]):
                    trial = int(row[1])
    return jsonify({'trial': trial}), 200 

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
