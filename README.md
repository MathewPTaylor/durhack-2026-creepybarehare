# AEGIS Symphony

> **Coordinate when you can. Act independently when you can't. Reconcile when you reconnect.**

AEGIS Symphony is a decentralised emergency-response system designed to keep critical services operating when communication infrastructure fails.

During disasters, hospitals, shelters, emergency responders, sensors and infrastructure may need to collaborate while dealing with unreliable or completely unavailable communications. AEGIS models these services as independent actors that coordinate when connected, continue making locally informed decisions when isolated, and reconcile their knowledge when communication returns.

---

## The Problem

Emergency response depends heavily on communication and central coordination.

But the situations where coordination matters most, such as major fires, floods and infrastructure failures, are also situations where communication networks may become degraded or unavailable.

A traditional centralised system can become fragile if every actor has to wait for instructions from a central authority.

AEGIS explores a different approach:

> **What if losing communication reduced coordination, but did not stop useful work?**

---

## How AEGIS Works

AEGIS represents critical services as autonomous actors with their own local information, resources and decision-making capabilities.

The simulated network includes:

- Hospitals
- Emergency shelters
- Emergency response vehicles
- Infrastructure nodes
- Environmental sensors
- Distributed response agents

When communication is healthy, actors share information and work towards the same emergency-response objective.

When communication fails, isolated actors switch to **local autonomy** and continue operating using the information already available to them.

When communication returns, AEGIS performs **distributed reconciliation**, synchronising events that occurred while nodes were disconnected.

The core lifecycle is:

```text
COORDINATE
    ↓
COMMUNICATION FAILURE
    ↓
OPERATE INDEPENDENTLY
    ↓
CONTINUE THE MISSION
    ↓
RECONNECT
    ↓
RECONCILE KNOWLEDGE
    ↓
COORDINATE AGAIN
```

---

## Interactive Command Centre

AEGIS includes an interactive emergency operations dashboard designed to make distributed behaviour visible.

Users can:

- Inspect individual infrastructure nodes and their current decisions
- Inject new emergency incidents
- Observe emergency response activity
- Selectively isolate individual network actors
- Simulate wider communication failure
- Watch actors continue operating autonomously while disconnected
- Observe communication links break in real time
- Monitor operational telemetry
- Restore communications
- Watch distributed state reconciliation take place

The interface makes the difference between **connected coordination** and **independent local operation** immediately visible.

---

## AI-Powered Emergency Interpretation

AEGIS integrates the **Google Gemini API** to analyse natural-language emergency reports.

A human can provide an unstructured report such as:

```text
There is smoke near the northern shelter,
the electricity has failed and several people
may require assistance.
```

Gemini analyses the report and extracts structured information including:

- Incident
- Location
- Severity
- Required resources
- Resource justification
- Missing information
- Confidence

AEGIS then converts this analysis into an emergency event that can be processed independently by its autonomous actors.

The AI interpretation layer does not replace the distributed agent system. Instead, it turns messy human information into structured data that the wider system can act upon.

---

## Autonomous Decision-Making

Each AEGIS actor evaluates emergency events independently.

For example:

```text
Critical incident detected
        ↓
Hospital evaluates local resources
Shelter evaluates local resources
Vehicles evaluate incident severity
Sensors continue collecting information
        ↓
Each actor makes its own decision
```

Depending on its role, resources and available information, an actor may:

- Prioritise an emergency
- Investigate an incident
- Monitor a situation
- Request medical supplies
- Request shelter supplies
- Reroute towards a critical emergency
- Continue a previously validated mission while disconnected

This means communication improves coordination, but does not determine whether an actor can function.

---

## Voice Emergency Broadcasting

AEGIS integrates the **ElevenLabs API** to turn analysed emergencies into audible emergency announcements.

The complete incident pipeline is:

```text
Human emergency report
        ↓
Gemini analysis
        ↓
Structured AEGIS incident
        ↓
Autonomous agent processing
        ↓
Emergency announcement generated
        ↓
ElevenLabs text-to-speech
        ↓
Live audio broadcast in the command centre
```

This allows critical information to have both a visual and audible presence in AEGIS.

---

## Distributed Resilience

AEGIS is designed around a simple principle:

> **Communication should improve coordination, not determine whether an actor can function at all.**

For example, a mobile response unit that already knows its destination, mission and last-known information can continue its existing mission even if communication disappears.

Similarly:

- An isolated hospital can prioritise patients using locally available information
- An isolated shelter can continue essential operations
- An isolated logistics node can continue previously validated deliveries
- An isolated infrastructure node can prioritise critical services
- Mobile response units can continue previously assigned missions

The user can selectively disconnect individual actors from the communication mesh and observe their transition into **autonomous operation**.

---

## Network Failure and Recovery

AEGIS can simulate larger communication failures across its distributed network.

During a simulated network failure:

```text
NETWORK PARTITION DETECTED
        ↓
Communication links fail
        ↓
Affected actors enter local autonomy
        ↓
Response missions continue
        ↓
Events continue to be recorded locally
```

When communication becomes available again, AEGIS does not simply reset the system.

Instead, it begins a reconciliation process:

```text
COMMUNICATION RESTORED
        ↓
Receive offline event histories
        ↓
Identify unique events
        ↓
Resolve duplicated information
        ↓
Synchronise autonomous nodes
        ↓
Restore shared operational state
```

This makes reconnection part of the distributed architecture rather than treating connectivity as an on/off switch.

---

## Operational Telemetry

The AEGIS command centre visualises the state of the distributed response network, including:

- Network health
- Resilience
- Active agents
- Active incidents
- Mission progress
- Response activity
- Autonomous sectors
- Network connectivity

The telemetry layer is designed to demonstrate an important property of AEGIS:

> **Useful work can continue even while communication is disrupted.**

---

## AEGIS Symphony and Composition

AEGIS interprets DurHack's **Composition** theme structurally.

Hospitals, shelters, logistics, infrastructure, sensors and responders behave like independent parts of a larger composition.

When communication is healthy, the system is synchronised.

When communication fragments, individual actors continue operating independently.

When communication returns, those independent states are brought back together.

The **AEGIS System Pulse** visualises this lifecycle:

```text
SYNCHRONISED
      ↓
FRAGMENTED
      ↓
LOCAL AUTONOMY
      ↓
RESYNCHRONISING
      ↓
SYNCHRONISED
```

Like instruments in a composition, each actor contributes independently while working towards one shared objective.

---

## Architecture

```text
                    AEGIS SYMPHONY
                           │
                           │
               React + TypeScript Frontend
                           │
                     HTTP / REST API
                           │
                    FastAPI Backend
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
        Agent Engine   Network Model   Reconciliation
             │
             │
        Incident Processing
             │
        ┌────┴───────────────┐
        │                    │
        ▼                    ▼
   Gemini API            ElevenLabs
   AI analysis           Voice alerts
```

---

## Built With

### Frontend

- React
- TypeScript
- Vite
- CSS3
- HTML5
- SVG

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn

### AI and APIs

- Google Gemini API
- ElevenLabs API

### Development

- Git
- GitHub
- VS Code

---

## Running AEGIS Locally

### 1. Clone the repository

```bash
git clone https://github.com/MathewPTaylor/durhack-2026-creepybarehare.git
cd durhack-2026-creepybarehare
```

### 2. Backend

Create a Python virtual environment:

```bash
python -m venv .venv
```

Activate the environment.

On Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Install the required backend dependencies.

The backend requires the following environment variables:

```text
GEMINI_API_KEY
ELEVENLABS_API_KEY
```

Create a `.env` file in the repository root and provide the required credentials.

**Never commit `.env` or API keys to GitHub.**

Start the FastAPI backend:

```bash
python -m uvicorn backend.main:app --reload
```

The backend will then be available locally through the FastAPI server.

### 3. Frontend

Open another terminal and enter the frontend:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the local address displayed by Vite in your browser.

---

## Demo Flow

A typical AEGIS demonstration looks like this:

1. Start with the distributed network operating normally
2. Inspect individual autonomous actors
3. Inject a natural-language emergency report
4. Let Gemini analyse the report
5. Observe AEGIS actors independently process the emergency
6. Hear the ElevenLabs emergency broadcast
7. Isolate an individual actor
8. Observe that actor enter local autonomy
9. Trigger a wider network failure
10. Watch response activity continue despite communication loss
11. Restore communications
12. Watch AEGIS reconcile distributed state
13. Observe the network become synchronised again

---

## Team Members

- Mathew Taylor
- Golibe Nwobi
- Xiangyu Luo
- Louis Beardow

---

## Built at DurHack 2026

AEGIS Symphony was created during DurHack 2026 as an exploration of distributed intelligence, resilient emergency infrastructure, AI-assisted coordination and technological composition.

### Our principle

> **Coordinate when you can.  
> Act independently when you can't.  
> Reconcile when you reconnect.**

**The network may fail. The mission doesn't have to.**