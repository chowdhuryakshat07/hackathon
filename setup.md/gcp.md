# ☁️ GCP Setup & Cloud Infrastructure Guide

This guide covers setting up Google Cloud Platform (GCP) services, local authentication, service accounts, and automated deployment for hackathon projects.

---

## 📋 Prerequisites

- **Google Cloud Account**: [console.cloud.google.com](https://console.cloud.google.com/)
- **Google Cloud SDK (`gcloud` CLI)**: [Install gcloud CLI](https://cloud.google.com/sdk/docs/install)
- **Docker** (optional, for Cloud Run container deployment): [docker.com](https://www.docker.com/)

---

## 🚀 1. Initial Project Setup

### A. Create a New GCP Project
```bash
# Set your desired Project ID (must be globally unique)
export PROJECT_ID="hackathon-app-$(date +%s)"

# Create project
gcloud projects create $PROJECT_ID --name="Hackathon Project"

# Set active project
gcloud config set project $PROJECT_ID
```

### B. Enable Required APIs
Enable common services required for AI web applications:
```bash
gcloud services enable \
  run.googleapis.com \
  containerregistry.googleapis.com \
  artifactregistry.googleapis.com \
  aiplatform.googleapis.com \
  secretmanager.googleapis.com \
  firestore.googleapis.com \
  cloudbuild.googleapis.com
```

---

## 🔑 2. Authentication & Service Accounts

### A. Create Service Account for Local Dev & Apps
```bash
# Create Service Account
gcloud iam service-accounts create hackathon-sa \
    --description="Service account for local development and cloud services" \
    --display-name="Hackathon SA"

# Grant Roles (e.g. Vertex AI User, Storage Admin, Cloud Run Admin)
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:hackathon-sa@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/aiplatform.user"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:hackathon-sa@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/datastore.user"
```

### B. Generate Service Account Key (Local Dev)
```bash
# Download JSON key file
gcloud iam service-accounts keys create ./gcp-key.json \
    --iam-account=hackathon-sa@${PROJECT_ID}.iam.gserviceaccount.com

# Set local environment variable (add gcp-key.json to .gitignore!)
export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/gcp-key.json"
```

---

## 🤖 3. Vertex AI / Gemini API Integration

### Node.js Setup (`@google/genai` or `@google-cloud/vertexai`)
```bash
npm install @google/genai
```

```javascript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

async function generateResponse(prompt) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  console.log(response.text);
}
```

### Python Setup (`google-genai`)
```bash
pip install google-genai
```

```python
from google import genai

client = genai.Client()
response = client.models.generate_content(
    model='gemini-2.5-flash',
    contents='Explain AI in one sentence.'
)
print(response.text)
```

---

## 📦 4. Cloud Run Deployment

### Option A: Deploy Directly from Source (Fastest for Hackathons)
```bash
gcloud run deploy hackathon-backend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production,GCP_PROJECT_ID=$PROJECT_ID
```

### Option B: Deploy Container via Artifact Registry
```bash
# Create Repository
gcloud artifacts repositories create hackathon-repo \
    --repository-format=docker \
    --location=us-central1

# Build and Push
gcloud builds submit --tag us-central1-docker.pkg.dev/$PROJECT_ID/hackathon-repo/app:latest

# Deploy to Cloud Run
gcloud run deploy hackathon-app \
    --image us-central1-docker.pkg.dev/$PROJECT_ID/hackathon-repo/app:latest \
    --region us-central1 \
    --allow-unauthenticated
```

---

## 🔐 5. Secret Manager Setup

Store sensitive API keys securely in GCP:
```bash
# Create secret
echo -n "your-secret-api-key" | gcloud secrets create API_KEY --data-file=-

# Access secret in Cloud Run by binding secret to container environment variable
gcloud run deploy hackathon-app \
  --region us-central1 \
  --set-secrets API_KEY=API_KEY:latest
```

---

## ⚡ Hackathon Checklist
- [ ] GCP Project created & Billing linked
- [ ] Required APIs enabled (`run`, `aiplatform`, `secretmanager`)
- [ ] Service Account created & credentials exported locally (`gcp-key.json`)
- [ ] `.gitignore` updated to include `gcp-key.json` and `.env`
- [ ] Cloud Run deployment tested & public URL verified
