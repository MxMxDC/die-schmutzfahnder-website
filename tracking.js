const app = {
    currentUser: null,
    isTracking: false,
    startTime: null,
    logs: [],

    login: function() {
        const id = document.getElementById('employee-id').value;
        if (id) {
            this.currentUser = { name: "Mitarbeiter " + id, id: id };
            document.getElementById('auth-view').style.display = 'none';
            document.getElementById('tracking-view').style.display = 'block';
            document.getElementById('welcome-msg').innerText = `Hallo, ${this.currentUser.name}`;
            this.addLog("Eingeloggt");
        } else {
            alert("Bitte Personalnummer eingeben.");
        }
    },

    start: function() {
        if (!this.isTracking) {
            this.isTracking = true;
            this.startTime = new Date();
            this.updateStatus("Aktiv", "status-active");
            this.addLog(`Schicht gestartet um ${this.startTime.toLocaleTimeString()}`);
        }
    },

    pause: function() {
        if (this.isTracking) {
            this.updateStatus("Pause", "status-paused");
            this.addLog(`Pause eingelegt um ${new Date().toLocaleTimeString()}`);
        }
    },

    stop: function() {
        if (this.isTracking) {
            const entTime = new Date();
            this.addLog(`Schicht beendet um ${entTime.toLocaleTimeString()}`);
            this.isTracking = false;
            this.updateStatus("Ausgestempelt", "status-inactive");
            this.generatePDFMock();
        }
    },

    updateStatus: function(text, className) {
        const statusEl = document.getElementById('status');
        statusEl.innerText = text;
        statusEl.className = `status-indicator ${className}`;
    },

    addLog: function(msg) {
        const logEl = document.getElementById('log');
        const entry = document.createElement('div');
        entry.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
        logEl.prepend(entry);
        this.logs.push(msg);
    },

    generatePDFMock: function() {
        alert("Feierabend! Dein Tagesbericht wird als PDF generiert und an Tini gesendet. (Demo-Funktion)");
        console.log("PDF Generation for logs:", this.logs);
    }
};
