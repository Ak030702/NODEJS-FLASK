from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow calls from frontend

notes = []  # in-memory list of notes
next_id = 1

@app.route("/notes", methods=["GET"])
def get_notes():
    return jsonify(notes)

@app.route("/notes", methods=["POST"])
def create_note():
    global next_id
    data = request.get_json()
    title = data.get("title", "")
    body = data.get("body", "")
    note = {"id": next_id, "title": title, "body": body}
    notes.append(note)
    next_id += 1
    return jsonify(note), 201

@app.route("/notes/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    global notes
    notes = [n for n in notes if n["id"] != note_id]
    return jsonify({"success": True})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
