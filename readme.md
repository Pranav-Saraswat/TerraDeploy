# 🚀 TerraDeploy: Enterprise Multi-Cloud Automation Platform

![TerraDeploy Dashboard](./terradeploy.png)

TerraDeploy is a production-grade cloud infrastructure automation platform that simplifies multi-cloud management across AWS, GCP, and Azure. It provides a stunning dashboard, automated CI/CD pipelines, and built-in security governance.

## 🌟 Key Features

-   **Multi-Cloud Orchestration**: Unified Terraform modules for AWS, GCP, and Azure.
-   **Environment Isolation**: Full support for `dev`, `staging`, and `prod` with remote state management.
-   **Modern Dashboard**: Built with Next.js 14, Tailwind CSS, and Framer Motion for real-time visualization.
-   **CI/CD Automation**: Advanced GitHub Actions with approval workflows and drift detection.
-   **Security as Code**: Built-in OPA (Open Policy Agent) validation for infrastructure compliance.
-   **AI Recommendations**: Intelligent cost-saving and performance optimization suggestions.
-   **Observability**: Integrated health checks and cloud-native monitoring dashboards.

## 📂 Project Structure

```
.
├── .github/workflows/       # Advanced CI/CD Pipelines
├── dashboard/               # Next.js 14 Web Dashboard
├── terraform/
│   ├── modules/             # Reusable Cloud Modules
│   └── environments/        # Dev/Staging/Prod Configs
├── policy/                  # OPA Security Policies
├── scripts/                 # Automation & Health Scripts
└── README.md
```

## 🚀 Getting Started

### 1. Infrastructure Deployment
Navigate to the environment you want to deploy:
```bash
cd terraform/environments/dev
terraform init
terraform plan
terraform apply
```

### 2. Dashboard Development
Run the dashboard locally:
```bash
cd dashboard
npm install
npm run dev
```

### 3. CI/CD Setup
Configure the following GitHub Secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `GCP_PROJECT_ID`
- `GCP_SERVICE_ACCOUNT_KEY`

## 🛡️ Security & Compliance
All infrastructure changes are validated against OPA policies in `policy/infrastructure.rego` before deployment.

## 📊 Monitoring
Run the health check script to verify resource status:
```bash
chmod +x scripts/health-check.sh
./scripts/health-check.sh
```

---
Built with ❤️ by Antigravity for the TerraDeploy Community.
