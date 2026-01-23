# BIA Serverless - Task Management Application

[![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-orange)](https://aws.amazon.com/lambda/)
[![Node.js](https://img.shields.io/badge/Node.js-22-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17.1-blue)](https://www.postgresql.org/)
[![SAM CLI](https://img.shields.io/badge/SAM-CLI-yellow)](https://aws.amazon.com/serverless/sam/)

A serverless task management application built with AWS Lambda, API Gateway, RDS PostgreSQL, and CloudFront. Features a React frontend and Express.js backend, optimized for cloud deployment.

## 🏗️ Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐      ┌──────────┐
│ CloudFront  │─────▶│ API Gateway  │─────▶│   Lambda    │─────▶│   RDS    │
│     CDN     │      │              │      │  (Node.js)  │      │PostgreSQL│
└─────────────┘      └──────────────┘      └─────────────┘      └──────────┘
                                                   │
                                                   ▼
                                            ┌─────────────┐
                                            │     VPC     │
                                            │  Subnets &  │
                                            │Security Grps│
                                            └─────────────┘
```

## 📁 Project Structure

```
.
├── bia/                      # Main application code
│   ├── api/                  # API routes and controllers
│   ├── client/               # React frontend
│   ├── config/               # Configuration files
│   │   ├── express.js        # Express configuration
│   │   ├── express-lambda.js # Lambda-optimized Express
│   │   └── database.js       # Database configuration
│   ├── lib/                  # Utility libraries
│   ├── lambda.js             # Lambda handler
│   ├── package-lambda.json   # Lambda-specific dependencies
│   ├── Makefile              # Custom build configuration
│   └── .samignore            # Files to exclude from Lambda package
├── hello-world/              # Sample Lambda function
├── template.yaml             # SAM template (infrastructure as code)
└── samconfig.toml            # SAM CLI configuration
```

## 🚀 Features

- **Serverless Architecture**: Fully serverless using AWS Lambda
- **RESTful API**: Express.js backend with CORS support
- **Database**: PostgreSQL RDS with VPC integration
- **CDN**: CloudFront distribution for global content delivery
- **Optimized Deployment**: Lambda package reduced from 484MB to 60MB
- **Local Development**: Docker Compose setup for local testing
- **Security**: VPC isolation, Security Groups, and IAM roles

## 📋 Prerequisites

- [AWS CLI](https://aws.amazon.com/cli/) configured with appropriate credentials
- [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- [Node.js 22](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 🛠️ Installation & Deployment

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bia-serverless
   ```

2. **Start local environment with Docker Compose**
   ```bash
   cd bia
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3001
   - API: http://localhost:3001/api/tarefas
   - Database: localhost:5433

### AWS Deployment

1. **Build the application**
   ```bash
   sam build
   ```

2. **Deploy to AWS**
   ```bash
   sam deploy --guided
   ```

   Follow the prompts:
   - **Stack Name**: `bia-serverless`
   - **AWS Region**: `us-east-1` (or your preferred region)
   - **Confirm changes**: `Y`
   - **Allow IAM role creation**: `Y`
   - **Save arguments**: `Y`

3. **Get your API endpoint**
   ```bash
   aws cloudformation describe-stacks \
     --stack-name bia-serverless \
     --query 'Stacks[0].Outputs[?OutputKey==`HelloWorldApi`].OutputValue' \
     --output text
   ```

## 🌐 API Endpoints

### Production URLs

- **API Gateway**: `https://gbr1pm9om8.execute-api.us-east-1.amazonaws.com/Prod`
- **CloudFront**: `https://d3nbs3ru10pk5s.cloudfront.net`

### Available Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ping` | Health check |
| GET | `/api/tarefas` | List all tasks |
| POST | `/api/tarefas` | Create a new task |
| GET | `/api/tarefas/{uuid}` | Get task by ID |
| PUT | `/api/tarefas/update_priority/{uuid}` | Update task priority |
| DELETE | `/api/tarefas/{uuid}` | Delete a task |

## 🧪 Testing

### Local API Testing

```bash
# Health check
curl http://localhost:3001/api/ping

# List tasks
curl http://localhost:3001/api/tarefas

# Create task
curl -X POST http://localhost:3001/api/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Test Task","dia_atividade":"2026-01-23","importante":true}'
```

### Production API Testing

```bash
# Via API Gateway
curl https://gbr1pm9om8.execute-api.us-east-1.amazonaws.com/Prod/api/tarefas

# Via CloudFront
curl https://d3nbs3ru10pk5s.cloudfront.net/api/tarefas
```

## 🔧 Configuration

### Environment Variables

The Lambda function uses the following environment variables:

```yaml
DB_HOST: db-lambda.cgrawk6w02jf.us-east-1.rds.amazonaws.com
DB_PORT: 5432
DB_USER: postgres
DB_PWD: <your-password>
```

### VPC Configuration

```yaml
VpcConfig:
  SecurityGroupIds:
    - sg-019f0b64bb4dbc460
  SubnetIds:
    - subnet-0c1cb898e60aac2e5
    - subnet-00a88060f765022e9
```

## 📊 Performance Optimizations

- **Lambda Package Size**: Reduced from 484MB to 60MB
- **Cold Start**: Optimized with async/await handlers
- **Timeout**: 30 seconds for database operations
- **Memory**: 512 MB allocated
- **CORS**: Pre-configured for cross-origin requests

## 🔒 Security

- VPC isolation for Lambda and RDS
- Security Groups restricting database access
- IAM roles with least privilege principle
- HTTPS enforced via CloudFront
- Environment variables for sensitive data

## 🐛 Troubleshooting

### View Lambda Logs

```bash
sam logs -n TarefasFunction --stack-name bia-serverless --tail
```

### Common Issues

1. **"Missing Authentication Token"**: Check if you're using the correct API endpoint
2. **Database Connection Error**: Verify VPC configuration and Security Groups
3. **Lambda Timeout**: Increase timeout in `template.yaml` if needed

## 🧹 Cleanup

To delete all AWS resources:

```bash
sam delete --stack-name bia-serverless
```

To stop local Docker containers:

```bash
cd bia
docker-compose down
```

## 📚 Resources

- [AWS SAM Documentation](https://docs.aws.amazon.com/serverless-application-model/)
- [AWS Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)

## 📝 License

This project is part of the AWS Serverless Bootcamp.

## 👥 Contributors

Built with ❤️ by the AWS Serverless Bootcamp team.

---

**Note**: This is a learning project for AWS serverless architecture. Not recommended for production use without additional security hardening and monitoring.
