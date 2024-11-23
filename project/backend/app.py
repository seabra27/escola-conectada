from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Simulação de banco de dados
users = [
    {"email": "aluno@gabriel", "password": "12345", "role": "student"},
    {"email": "professor@gabriel", "password": "12345", "role": "teacher"},
    {"email": "professor@fabiohenriquesilva", "password": "12345", "role": "teacher"}
]

subjects = [
    {"id": 1, "name": "Matemática", "description": "Cálculo e álgebra linear."},
    {"id": 2, "name": "História", "description": "Estudo dos eventos históricos."},
    {"id": 3, "name": "Ciências", "description": "Exploração do mundo natural."},
]

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = next((u for u in users if u["email"] == email and u["password"] == password), None)
    if user:
        return jsonify({"message": "Login successful", "role": user["role"], "email": email}), 200

    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/subjects', methods=['GET', 'POST'])
def handle_subjects():
    if request.method == 'GET':
        return jsonify(subjects), 200

    if request.method == 'POST':
        data = request.get_json()
        new_subject = {
            "id": len(subjects) + 1,
            "name": data.get("name"),
            "description": data.get("description"),
        }
        subjects.append(new_subject)
        return jsonify(new_subject), 201

@app.route('/subjects/<int:subject_id>', methods=['PUT', 'DELETE'])
def modify_subject(subject_id):
    subject = next((s for s in subjects if s["id"] == subject_id), None)
    if not subject:
        return jsonify({"message": "Subject not found"}), 404

    if request.method == 'PUT':
        data = request.get_json()
        subject["name"] = data.get("name", subject["name"])
        subject["description"] = data.get("description", subject["description"])
        return jsonify(subject), 200

    if request.method == 'DELETE':
        subjects.remove(subject)
        return jsonify({"message": "Subject deleted"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
